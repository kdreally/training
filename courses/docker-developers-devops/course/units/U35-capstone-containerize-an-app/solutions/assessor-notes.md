# U35 Assessor notes

## Deliverable acceptance

A passing capstone:

1. Contains `app/Dockerfile`, `app/.dockerignore`, `app/app.py`, `app/requirements.txt`, `compose.yaml`, `.env.example`, `README.md`, `answers.md`, `evidence.txt`.
2. Brings up with: copy `.env.example` to `.env`, then `docker compose up --build -d`.
3. Serves `/`, `/add?item=...`, and `/health`.
4. Persists items across `docker compose down` then `docker compose up -d`.

## Model artifacts

**`app/Dockerfile`:**

```dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1
WORKDIR /app
COPY --from=builder /install /usr/local
COPY app.py .
RUN useradd --create-home --uid 10001 appuser
USER appuser
CMD ["python", "app.py"]
```

**`compose.yaml`:**

```yaml
services:
  app:
    build: ./app
    ports:
      - "8000:8000"
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
  db:
    image: postgres:16-alpine
    env_file:
      - .env
    volumes:
      - app-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d appdb"]
      interval: 5s
      timeout: 3s
      retries: 5
volumes:
  app-data:
```

Accept equivalent naming, ports, and base variants (for example `alpine`) as long as all mandatory properties hold.

## Model answer sketch (`answers.md`)

1. **Three properties:** environment travels with the image (Dockerfile `FROM`/`RUN pip install`); configuration supplied at run time (`.env` via `env_file`); data stored outside the container (named volume in `compose.yaml`).
2. **Multi-stage:** the builder installs dependencies into `/install`; the runtime stage copies only that folder, so pip and build tooling never enter the final image — smaller image, smaller attack surface.
3. **Volume:** without the named volume, `docker compose down` removes the database container and its writable layer, so on `up` a fresh empty database is created and stored items are lost. The volume lives outside the container lifecycle.
4. **Secrets:** the Dockerfile is part of the image; anything written there (even via `ARG` in a `RUN`) is recorded in an image **layer** and is visible with `docker history`. `env_file` injects values at run time instead.
5. **Waiting:** a `db` health check tells Compose when PostgreSQL is ready; `depends_on ... condition: service_healthy` holds the app until then. A retry loop in `connect()` covers any remaining race.
6. Accept any concrete debugging story using `docker compose logs`, `docker compose ps`, exit codes, etc.
7. Accept any honest reflection.

## Common weak submissions

- Dockerfile single-stage, or runtime stage re-running `pip install --no-cache` with build tools included.
- `USER` set but the user never created (image fails), or root retained.
- `.env` committed, or `.dockerignore` missing `.env`.
- Compose with no named volume (data lost) or a bind mount that assumes a host path.
- Missing health check / `depends_on` condition — app crashes on first boot but "works on second run."
- Evidence shows only a single `up` with no `down`/`up` persistence check.
- App bound to `127.0.0.1` instead of `0.0.0.0` (unreachable).

## Fast verification recipe

1. `docker compose config` (or read the file) for services, volume, healthcheck, condition.
2. Count `FROM` lines and search `USER` in the Dockerfile.
3. Search the submission for the real password value; expect none.
4. Read `evidence.txt`; confirm items persist across the restart cycle.
