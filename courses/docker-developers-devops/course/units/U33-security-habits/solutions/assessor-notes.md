# U33 Assessor notes

## Problems in the review Dockerfile (full list)

1. `FROM python:latest` — unpinned, mutable tag; also a large full base.
2. `ENV DB_PASSWORD=SuperSecret123` — secret baked into image metadata; visible in `docker history`.
3. `ENV API_TOKEN=abc123-live-token` — same problem.
4. No `USER` — runs as root.
5. `apt-get install -y build-essential curl` — build tools and a downloader left in the final image; larger attack surface (and no cleanup of apt lists).
6. `COPY . .` — copies everything, including `.env`, `.git`, and local junk, unless a `.dockerignore` excludes them.
7. Single stage — build dependencies and runtime share one image.

## Model fixed Dockerfile

```dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /install /usr/local
COPY app.py .
RUN useradd --create-home --uid 10001 appuser
USER appuser
CMD ["python", "app.py"]
```

Accept equivalent approaches (alpine variant, venv-based copy, Debian `useradd` vs Alpine `adduser`). The mandatory properties: two `FROM` lines, pinned base, no secrets, non-root `USER`, tools absent from the final stage.

## Model answer sketch (explain.md)

1. **Secrets:** `ENV` becomes image metadata, recorded in a layer and shown by `docker history`. Deleting a file in a later layer only records a deletion; the earlier layer still contains the value. Layers are permanent and stack.
2. **Non-root:** `USER` sets the account the container runs as. Root inside the container can do far more if code is compromised or if misconfiguration exposes the host. Non-root limits the blast radius.
3. **Base image:** smaller base = smaller attack surface and smaller pull, but fewer debugging tools, and sometimes no shell (distroless). Accept a clear, specific trade-off.
4. **Pinning:** a tag is a movable label; a digest identifies one exact image permanently. `latest` can change without warning, breaking reproducibility.
5. Any accurate summary of the habits is fine.

## Common weak submissions

- Believes deleting the secret file removes the layer.
- Adds `USER` but never creates the user (build fails) or never switches.
- Multi-stage that still installs `build-essential` in the final stage.
- Pins `latest` as if that were a version.
- Uses banned filler words in the summary.

## Fast verification recipe

1. Open `Dockerfile.fixed`; count `FROM` lines (expect two) and search for `USER`.
2. Grep the fixed Dockerfile for the strings `SuperSecret123` and `abc123-live-token`; either must be absent.
3. Confirm `audit.md` has a pass/fail per checklist item.
