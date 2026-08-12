from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

from app.auth import ACCESS_COOKIE
from app.security import decode_access_token

# ponytail: prefix list; per-route rules if public /api/v1 routes appear
PROTECTED_PREFIXES = ("/api/v1",)


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        if request.method == "OPTIONS":
            return await call_next(request)

        path = request.url.path
        if any(path.startswith(prefix) for prefix in PROTECTED_PREFIXES):
            token = request.cookies.get(ACCESS_COOKIE)
            if not token:
                return JSONResponse({"detail": "Not authenticated"}, status_code=401)
            user_id = decode_access_token(token)
            if user_id is None:
                return JSONResponse({"detail": "Invalid token"}, status_code=401)
            request.state.user_id = user_id

        return await call_next(request)
