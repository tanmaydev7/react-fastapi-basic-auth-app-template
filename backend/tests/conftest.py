import os
import uuid

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine


@pytest_asyncio.fixture(scope="session")
async def engine():
    url = os.getenv("DATABASE_URL")
    if not url:
        pytest.skip("DATABASE_URL not set — point at a reachable Postgres to run auth tests")

    from app.config import get_settings

    get_settings.cache_clear()
    eng = create_async_engine(url, pool_pre_ping=True)
    yield eng
    await eng.dispose()


@pytest_asyncio.fixture
async def client(engine):
    async with engine.begin() as conn:
        await conn.execute(text("TRUNCATE refresh_tokens, users CASCADE"))

    from app.db import get_db
    from main import app

    session_factory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    async def override_get_db():
        async with session_factory() as session:
            yield session

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest.fixture
def user_payload():
    return {
        "name": "Alex Rivera",
        "email": f"alex-{uuid.uuid4().hex[:8]}@example.com",
        "password": "password123",
    }
