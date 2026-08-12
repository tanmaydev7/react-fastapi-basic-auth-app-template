# React + FastAPI Auth Starter

> A batteries-included application template so the *next* project starts at feature work, not at boilerplate.

![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Rspack](https://img.shields.io/badge/Rspack-2-FF5A5F?logo=rspack&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.141-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-443E38?logo=react&logoColor=white)
![Python 3.12+](https://img.shields.io/badge/Python-3.12%2B-3776AB?logo=python&logoColor=white)
![uv](https://img.shields.io/badge/uv-managed-DE5FE9?logo=uv&logoColor=white)

---

## Why this repo exists

Every new side project burns its first week on the same undifferentiated work: wiring a bundler, standing up a server, building sign-up, login, session persistence, and route guards. That work is identical across projects and yet it is where most prototypes die — the interesting idea never gets built because the scaffolding ate the motivation.

This repository is my answer to that. It is a **template, not a product**. The contract is:

1. `git clone` this repo.
2. Restyle the sample marketing/auth surfaces for the new idea.
3. Build the authenticated product surface — the actual differentiated work.

Auth design, build tooling, typing, linting, and a mobile-first landing + login/signup shell are already decided so they never have to be decided again.

---

## Project status

This is an in-progress template and the README tracks reality rather than intent. Nothing below is claimed as done until it is on `main`.

| Area | Status | Notes |
| --- | --- | --- |
| Frontend build pipeline | ✅ Done | Rspack 2 + SWC, React Fast Refresh, TS 6, ESLint 10, Prettier |
| UI foundation | ✅ Done | Tailwind CSS 4, shadcn/Base UI primitives, Coda-inspired design tokens |
| Sample marketing + auth UI | ✅ Done | Fold landing (`/`), login (`/login`), signup (`/signup`), app shell (`/app`) |
| Routing | ✅ Done | React Router 7, SPA history fallback in Rspack, `RequireAuth` guard |
| Backend service skeleton | ✅ Done | FastAPI app, `uv`-managed deps, lockfile committed |
| Auth — backend | ✅ Done | register/login/refresh/logout + `/api/v1/me`; Argon2id; JWT access + rotating refresh, both HttpOnly cookies |
| Auth — frontend | ✅ Done | Zustand user/status store, guarded `/app`, cookie session + 401→refresh via axios interceptor |
| Persistence layer | ✅ Done | Postgres via `DATABASE_URL`, SQLAlchemy 2.0 async, Alembic initial migration |
| Test suites | ✅ Partial | Backend: pytest unit + integration (needs `DATABASE_URL`); Frontend: Vitest store/api |
| Containerisation & CI | 📋 Planned | Docker Compose for local parity, GitHub Actions for lint/test |

---

## Tech stack, and why

Anyone can list dependencies. The reason each one is here matters more.

| Choice | Why it beat the obvious alternative |
| --- | --- |
| **Rspack** over Vite/webpack | Rust-based bundler with a webpack-compatible config surface. Keeps webpack's loader/plugin ecosystem and mental model while removing the cold-start and rebuild cost that makes large webpack projects painful. |
| **SWC** over Babel | Transpilation happens in Rust inside the bundler — no separate JS-based transform pass in the hot path. |
| **React 19** | Current major, so the template doesn't ship a migration debt to its own clones. |
| **TypeScript** end to end on the client | The auth layer is where silent shape mismatches hurt most; types are non-negotiable there. |
| **React Router 7** | Explicit client routes for marketing vs auth surfaces without pulling in a full meta-framework. |
| **Tailwind CSS 4 + shadcn** | Utility-first styling with a small set of accessible primitives (`Button`, `Input`) instead of reinventing focus rings and variants. |
| **Zustand** for session state | Avoids Context prop-drilling for `user` / auth status; tokens stay in HttpOnly cookies, not the store. |
| **FastAPI** over Flask/Django | Native async, Pydantic validation at the boundary, and OpenAPI generated from the same type hints that enforce runtime validation — one source of truth for docs, validation, and the client contract. |
| **Postgres + SQLAlchemy 2.0 async** | Relational persistence with async sessions; schema owned by Alembic. Bring your own `DATABASE_URL` (Neon, Supabase, local, etc.). |
| **uv** over pip/Poetry | Fast resolution and a committed `uv.lock`, so every clone of this template resolves to byte-identical dependencies. |
| **Separate `frontend/` and `backend/`** | Independent deploy targets and independent dependency graphs. The frontend can go to any static host, the API anywhere that runs Python — without splitting the repo. |

---

## Architecture

```mermaid
flowchart LR
    subgraph Client["Browser"]
        UI["React 19 + TypeScript<br/>Rspack · React Router · Tailwind"]
    end

    subgraph Server["API"]
        API["FastAPI<br/>Pydantic-validated boundary"]
        AUTH["Auth module<br/>hashing · tokens · guards"]
        DB[("PostgreSQL")]
    end

    UI -- "JSON over HTTPS<br/>HttpOnly cookies" --> API
    API --> AUTH
    AUTH --> DB
```

The boundary between client and server is a plain JSON API (`withCredentials` so cookies travel). There is no server-rendered coupling, which keeps the two halves independently replaceable — swap React for anything else and the API is untouched.

### Frontend routes

| Path | Surface |
| --- | --- |
| `/` | Sample landing page (Fold) |
| `/login` | Login form → API |
| `/signup` | Signup form → API |
| `/app` | Protected app shell (requires session) |

---

## Authentication design

**Token strategy — short-lived access cookie + rotating refresh cookie (both HttpOnly).**

- **Access token**: JWT, ~15 minute lifetime, `HttpOnly` + `SameSite=lax` cookie on path `/` (`Secure` when `COOKIE_SECURE=true`). Short-lived so a leaked token has a small blast radius; middleware reads the cookie on `/api/v1/*` — no `Bearer` header, nothing for JS to store.
- **Refresh token**: long-lived, same cookie flags and path `/`. Rotated on every use, with reuse detection to invalidate a stolen family.
- **Password storage**: Argon2id via `pwdlib`. Never anything from the SHA family — general-purpose hashes are designed to be fast, which is precisely the wrong property here.

```mermaid
sequenceDiagram
    participant U as Browser
    participant A as FastAPI
    participant D as Database

    U->>A: POST /auth/v1/login (email, password)
    A->>D: fetch user record
    A->>A: verify password (Argon2id)
    A-->>U: Set-Cookie access_token + refresh_token (HttpOnly)

    U->>A: GET /api/v1/me (access cookie)
    A->>A: verify signature + expiry
    A-->>U: 200 profile

    Note over U,A: access cookie expires / 401
    U->>A: POST /auth/v1/refresh (refresh cookie)
    A->>D: validate + rotate refresh token
    A-->>U: Set-Cookie new access_token + rotated refresh_token
```

**API surface** (`/api/v1`, `/auth/v1` — bump the version segment when you need a breaking change)

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/auth/v1/register` | Create account; sets both cookies (201, empty body) |
| `POST` | `/auth/v1/login` | Exchange credentials for cookies (204) |
| `POST` | `/auth/v1/refresh` | Rotate refresh cookie, mint new access cookie (204) |
| `POST` | `/auth/v1/logout` | Revoke refresh family; clear both cookies |
| `GET` | `/api/v1/me` | Current user — the canonical protected route |

On the client, a Zustand `authStore` owns UI session state (`user`, `status`) only — tokens never enter JS. `RequireAuth` restores via `/api/v1/me` (and redirects to `/login` if that fails). The axios `api` client sends cookies (`withCredentials`) and retries once through `/auth/v1/refresh` on a `401` (except `/auth/v1/*` itself), so feature code never has to think about token expiry.

---

## Repository layout

```
.
├── backend/
│   ├── main.py                 # FastAPI application entrypoint
│   ├── pyproject.toml          # Dependencies (uv / PEP 621)
│   ├── uv.lock                 # Committed lockfile — reproducible installs
│   ├── .env.example            # DATABASE_URL + JWT / CORS settings
│   ├── alembic/                # Migrations (initial auth schema)
│   ├── app/
│   │   ├── config.py
│   │   ├── db.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py             # load_user helper for handlers
│   │   ├── middleware/         # AuthMiddleware (/api/v1 gate)
│   │   ├── security.py
│   │   └── routers/            # auth, users
│   └── tests/
└── frontend/
    ├── index.html
    ├── rspack.config.ts        # SWC, Fast Refresh, SPA fallback, BACKEND_URL
    ├── .env.example            # BACKEND_URL (API origin)
    ├── components/             # UI + layout + marketing + auth components
    ├── lib/
    │   ├── api.ts              # axios + cookie credentials + 401 refresh retry
    │   ├── authApi.ts          # register/login/logout/me/bootstrap/restore
    │   └── utils.ts
    └── src/
        ├── main.tsx            # boot (mark anonymous; no proactive refresh)
        ├── App.tsx             # Route table
        ├── stores/authStore.ts # Zustand user + status (no tokens)
        ├── constants/
        └── pages/              # Landing, Login, Signup, App
```

---

## Getting started

**Prerequisites** — Node.js 22+, Python 3.12+, [uv](https://docs.astral.sh/uv/), and a reachable Postgres database.

### Backend

```bash
cd backend
cp .env.example .env          # set DATABASE_URL to your Postgres (asyncpg URL)
uv sync                       # resolve from the committed lockfile
uv run alembic upgrade head   # create users + refresh_tokens tables
uv run fastapi dev main.py    # http://127.0.0.1:8000
```

`DATABASE_URL` must use the async driver, for example:

```
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/dbname
```

Interactive OpenAPI docs are at `http://127.0.0.1:8000/docs`.

### Frontend

```bash
cd frontend
cp .env.example .env          # BACKEND_URL=http://localhost:8000
npm install
npm run dev                   # http://localhost:8080 → calls BACKEND_URL directly
```

Use the **same hostname** for the page and `BACKEND_URL` (`localhost` with `localhost`, not mixed with `127.0.0.1`) so auth cookies stay same-site. Backend `CORS_ORIGINS` must include the frontend origin (default `http://localhost:8080`).

Open `/signup`, create an account, land on `/app`. Refresh the page to confirm the HttpOnly cookies restore the session (access cookie if still valid, otherwise refresh → new access cookie).

### Everyday commands

| Command | Location | Purpose |
| --- | --- | --- |
| `npm run dev` | `frontend/` | Dev server with Fast Refresh |
| `npm run build` | `frontend/` | Production bundle |
| `npm run preview` | `frontend/` | Serve the production bundle locally |
| `npm run lint` | `frontend/` | ESLint |
| `npm run format` | `frontend/` | Prettier |
| `npm test` | `frontend/` | Vitest |
| `uv run fastapi dev main.py` | `backend/` | API with autoreload |
| `uv sync` | `backend/` | Install/refresh the environment |
| `uv run alembic upgrade head` | `backend/` | Apply migrations |
| `uv run pytest` | `backend/` | Unit + integration tests (`DATABASE_URL` for integration) |

---

## Using this as a template

1. Clone it and re-point the remote at the new project.
2. Rebrand the sample UI: tokens in `frontend/src/index.css`, copy in `frontend/src/constants/`, and the page/component tree under `frontend/src/pages/` + `frontend/components/`.
3. Keep the route shape (`/`, `/login`, `/signup`, `/app`) or extend it — forms already talk to the FastAPI auth endpoints.
4. Add feature routes behind `RequireAuth` on the client, and under `/api/v1` on the server (AuthMiddleware gates the prefix; handlers call `load_user` when they need the row).
5. Everything else — build config, linting, dependency management, session design — is intended to be inherited untouched.

---

## Roadmap

- [x] Frontend toolchain: Rspack + SWC + TypeScript + ESLint + Prettier
- [x] FastAPI service skeleton with reproducible `uv` environment
- [x] Tailwind CSS 4 + shadcn/Base UI primitives
- [x] Mobile-first sample landing page + login/signup (React Router)
- [x] Postgres + SQLAlchemy 2.0 models and Alembic migrations
- [x] Auth endpoints: register, login, refresh, logout
- [x] Argon2id hashing and JWT issuance/verification
- [x] Zustand session store, guarded routes, transparent token refresh
- [x] Wire login/signup forms to the API
- [x] Backend unit tests + frontend Vitest for store/api (integration tests need `DATABASE_URL`)
- [ ] Docker Compose for local parity
- [ ] GitHub Actions running lint, type-check, and tests on every push

---

## Engineering notes

A few decisions worth stating explicitly, since a template propagates them into every project cloned from it:

- **The lockfile is committed.** A template whose dependencies drift between clones is not a template.
- **Neither access nor refresh token is readable by JavaScript.** Both live in `HttpOnly` cookies. Storing session credentials in `localStorage` (or Zustand) is convenient and turns any XSS into full account takeover; cookies are the whole point.
- **Validation lives at the boundary.** Pydantic models sit at the edge of the API so untrusted input is shaped and rejected before it reaches any business logic.
- **The two halves stay decoupled.** No shared build step, no server-rendered templates — either side can be rewritten or redeployed alone.
- **UI content lives in `src/constants/` by domain.** Presentational components stay in `components/`; nav/footer/marketing copy is not inlined next to JSX.
- **This README tracks what is true.** Planned work is labelled planned. A checklist that lies is worse than no checklist.
