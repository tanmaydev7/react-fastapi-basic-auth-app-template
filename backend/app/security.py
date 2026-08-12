import hashlib
import secrets
import uuid
from datetime import UTC, datetime, timedelta

from jose import JWTError, jwt
from pwdlib import PasswordHash

from app.config import Settings, get_settings

password_hash = PasswordHash.recommended()


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return password_hash.verify(password, hashed)


def create_access_token(user_id: uuid.UUID, settings: Settings | None = None) -> str:
    settings = settings or get_settings()
    expire = datetime.now(UTC) + timedelta(minutes=settings.access_token_minutes)
    return jwt.encode(
        {"sub": str(user_id), "exp": expire},
        settings.jwt_secret,
        algorithm="HS256",
    )


def decode_access_token(token: str, settings: Settings | None = None) -> uuid.UUID | None:
    settings = settings or get_settings()
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
        sub = payload.get("sub")
        if not sub:
            return None
        return uuid.UUID(sub)
    except (JWTError, ValueError):
        return None


def generate_refresh_token() -> str:
    return secrets.token_urlsafe(32)


def hash_refresh_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def refresh_expiry(settings: Settings | None = None) -> datetime:
    settings = settings or get_settings()
    return datetime.now(UTC) + timedelta(days=settings.refresh_token_days)
