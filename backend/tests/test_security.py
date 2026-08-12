import uuid

from app.security import (
    create_access_token,
    decode_access_token,
    generate_refresh_token,
    hash_password,
    hash_refresh_token,
    verify_password,
)


def test_password_roundtrip():
    hashed = hash_password("password123")
    assert verify_password("password123", hashed)
    assert not verify_password("wrong", hashed)


def test_access_token_roundtrip():
    user_id = uuid.uuid4()
    token = create_access_token(user_id)
    assert decode_access_token(token) == user_id
    assert decode_access_token("not-a-token") is None


def test_refresh_token_hash_is_stable():
    raw = generate_refresh_token()
    assert hash_refresh_token(raw) == hash_refresh_token(raw)
    assert hash_refresh_token(raw) != hash_refresh_token(generate_refresh_token())
