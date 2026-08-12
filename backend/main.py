from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.middleware import AuthMiddleware
from app.config import get_settings
from app.routers import auth, users


@asynccontextmanager
async def lifespan(_app: FastAPI):
    yield


settings = get_settings()
app = FastAPI(lifespan=lifespan)
# Auth first in source → CORS added last → CORS runs outermost (OPTIONS / preflight)
app.add_middleware(AuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
