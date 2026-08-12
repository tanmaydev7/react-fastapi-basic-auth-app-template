from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import load_user
from app.db import get_db
from app.schemas import UserOut

router = APIRouter(prefix="/api/v1", tags=["users"])


@router.get("/me", response_model=UserOut)
async def me(request: Request, db: AsyncSession = Depends(get_db)):
    return await load_user(request, db)
