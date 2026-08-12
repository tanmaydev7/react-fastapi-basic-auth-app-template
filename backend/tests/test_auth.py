import pytest


@pytest.mark.asyncio
async def test_register_sets_cookies_then_me(client, user_payload):
    reg = await client.post("/auth/v1/register", json=user_payload)
    assert reg.status_code == 201
    assert reg.cookies.get("access_token")
    assert reg.cookies.get("refresh_token")
    assert reg.content in (b"", b"null")

    me = await client.get("/api/v1/me")
    assert me.status_code == 200
    profile = me.json()
    assert profile["email"] == user_payload["email"]
    assert profile["name"] == user_payload["name"]


@pytest.mark.asyncio
async def test_login_bad_password_401(client, user_payload):
    await client.post("/auth/v1/register", json=user_payload)
    bad = await client.post(
        "/auth/v1/login",
        json={"email": user_payload["email"], "password": "wrong-password"},
    )
    assert bad.status_code == 401


@pytest.mark.asyncio
async def test_refresh_rotates_cookies(client, user_payload):
    reg = await client.post("/auth/v1/register", json=user_payload)
    old_refresh = reg.cookies.get("refresh_token")
    old_access = reg.cookies.get("access_token")
    assert old_refresh
    assert old_access

    refreshed = await client.post("/auth/v1/refresh")
    assert refreshed.status_code == 204
    new_refresh = refreshed.cookies.get("refresh_token")
    new_access = refreshed.cookies.get("access_token")
    assert new_refresh
    assert new_access
    assert new_refresh != old_refresh


@pytest.mark.asyncio
async def test_logout_then_refresh_fails(client, user_payload):
    await client.post("/auth/v1/register", json=user_payload)
    logout = await client.post("/auth/v1/logout")
    assert logout.status_code == 204
    assert not logout.cookies.get("access_token")
    assert not logout.cookies.get("refresh_token")

    refreshed = await client.post("/auth/v1/refresh")
    assert refreshed.status_code == 401


@pytest.mark.asyncio
async def test_duplicate_email_409(client, user_payload):
    first = await client.post("/auth/v1/register", json=user_payload)
    assert first.status_code == 201
    second = await client.post("/auth/v1/register", json=user_payload)
    assert second.status_code == 409
