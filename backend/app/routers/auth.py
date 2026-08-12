import uuid
from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request

from app.config import Settings, get_settings
from app.db import get_db
from app.models import RefreshToken, User
from app.schemas import LoginRequest, RegisterRequest
from app.security import (
    create_access_token,
    generate_refresh_token,
    hash_password,
    hash_refresh_token,
    refresh_expiry,
    verify_password,
)

router = APIRouter(prefix="/auth/v1", tags=["auth"])

ACCESS_COOKIE = "access_token"
REFRESH_COOKIE = "refresh_token"
# Same path as access so both survive SPA reloads / DevTools views for `/app`.
# (Path=/auth/v1 made refresh look "gone" on document requests and confused the jar.)
COOKIE_PATH = "/"


def _set_access_cookie(response: Response, token: str, settings: Settings) -> None:
    response.set_cookie(
        key=ACCESS_COOKIE,
        value=token,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        path=COOKIE_PATH,
        max_age=settings.access_token_minutes * 60,
    )


def _clear_access_cookie(response: Response, settings: Settings) -> None:
    response.delete_cookie(
        key=ACCESS_COOKIE,
        path=COOKIE_PATH,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
    )


def _set_refresh_cookie(response: Response, token: str, settings: Settings) -> None:
    # Remove legacy Path=/auth/v1 cookie so it can't shadow the new one
    response.delete_cookie(
        key=REFRESH_COOKIE,
        path="/auth/v1",
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
    )
    response.set_cookie(
        key=REFRESH_COOKIE,
        value=token,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        path=COOKIE_PATH,
        max_age=settings.refresh_token_days * 24 * 60 * 60,
    )


def _clear_refresh_cookie(response: Response, settings: Settings) -> None:
    response.delete_cookie(
        key=REFRESH_COOKIE,
        path=COOKIE_PATH,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
    )
    response.delete_cookie(
        key=REFRESH_COOKIE,
        path="/auth/v1",
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
    )


async def _issue_tokens(
    db: AsyncSession,
    user: User,
    response: Response,
    settings: Settings,
    family_id: uuid.UUID | None = None,
) -> None:
    access = create_access_token(user.id, settings)
    raw_refresh = generate_refresh_token()
    family = family_id or uuid.uuid4()
    db.add(
        RefreshToken(
            user_id=user.id,
            token_hash=hash_refresh_token(raw_refresh),
            family_id=family,
            expires_at=refresh_expiry(settings),
        )
    )
    await db.commit()
    _set_access_cookie(response, access, settings)
    _set_refresh_cookie(response, raw_refresh, settings)


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(
    body: RegisterRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> None:
    user = User(
        email=body.email.lower(),
        name=body.name,
        password_hash=hash_password(body.password),
    )
    db.add(user)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    await db.refresh(user)
    await _issue_tokens(db, user, response, settings)


@router.post("/login", status_code=status.HTTP_204_NO_CONTENT)
async def login(
    body: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> None:
    result = await db.execute(select(User).where(User.email == body.email.lower()))
    user = result.scalar_one_or_none()
    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    await _issue_tokens(db, user, response, settings)


@router.post("/refresh", status_code=status.HTTP_204_NO_CONTENT)
async def refresh(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> None:
    raw = request.cookies.get(REFRESH_COOKIE)
    if not raw:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing refresh token")

    token_hash = hash_refresh_token(raw)
    result = await db.execute(select(RefreshToken).where(RefreshToken.token_hash == token_hash))
    stored = result.scalar_one_or_none()

    if stored is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    now = datetime.now(UTC)
    expires_at = stored.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=UTC)
    if stored.revoked_at is not None or expires_at < now:
        await db.execute(
            update(RefreshToken)
            .where(RefreshToken.family_id == stored.family_id, RefreshToken.revoked_at.is_(None))
            .values(revoked_at=now)
        )
        await db.commit()
        _clear_access_cookie(response, settings)
        _clear_refresh_cookie(response, settings)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token revoked")

    stored.revoked_at = now
    result = await db.execute(select(User).where(User.id == stored.user_id))
    user = result.scalar_one()
    await db.commit()
    await _issue_tokens(db, user, response, settings, family_id=stored.family_id)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> None:
    raw = request.cookies.get(REFRESH_COOKIE)
    if raw:
        token_hash = hash_refresh_token(raw)
        result = await db.execute(select(RefreshToken).where(RefreshToken.token_hash == token_hash))
        stored = result.scalar_one_or_none()
        if stored is not None:
            now = datetime.now(UTC)
            await db.execute(
                update(RefreshToken)
                .where(RefreshToken.family_id == stored.family_id, RefreshToken.revoked_at.is_(None))
                .values(revoked_at=now)
            )
            await db.commit()
    _clear_access_cookie(response, settings)
    _clear_refresh_cookie(response, settings)
