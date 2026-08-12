import pytest
from httpx import ASGITransport, AsyncClient


@pytest.mark.asyncio
async def test_api_me_without_token_is_401():
    from main import app

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        res = await client.get("/api/v1/me")
    assert res.status_code == 401
    assert res.json()["detail"] == "Not authenticated"


@pytest.mark.asyncio
async def test_api_me_accepts_access_cookie(client, user_payload):
    await client.post("/auth/v1/register", json=user_payload)
    # Drop any Authorization habit — cookie alone must work
    res = await client.get("/api/v1/me")
    assert res.status_code == 200
    assert res.json()["email"] == user_payload["email"]
