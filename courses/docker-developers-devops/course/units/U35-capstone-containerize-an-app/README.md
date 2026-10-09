# U35 — Capstone: containerize a real app

**Phase 7 — Craft and capstone**

## Where you are

This is the capstone. You are going to take a small but real application — code plus a database — and package it so that anyone can run it with a couple of commands on their own machine. Along the way you will use almost everything from the course: a multi-stage Dockerfile (U16), `.dockerignore` (U13), Compose (U21–U25), a volume for the database (U17), an environment file for configuration (U24), a non-root user (U33), and calm debugging when it does not cooperate (U34).

The worked example below is a complete, runnable reference. Your assignment is to produce the **same kind of deliverable** for an app of your own (a starter is provided), with a README a stranger could follow.

## What you will be able to do

- Design a small multi-container application with an app and a database.
- Write a multi-stage Dockerfile that keeps the final image lean.
- Write a `.dockerignore` so secrets and junk do not enter the build context.
- Write a `compose.yaml` that wires app and database together with a health check.
- Persist database data with a named volume across `compose down` and `up`.
- Keep configuration out of the image using an environment file, and commit only an example file.
- Document the whole thing so another person can run it.

## What you need already

- **U11–U16** — Dockerfiles, `.dockerignore`, layers, multi-stage builds.
- **U17** — volumes (the database needs one).
- **U18–U20** — ports and container-to-container networking.
- **U21–U25** — Compose files, two-service apps, `.env`, and the Compose lifecycle.
- **U26–U27** — registries and tags (optional here; everything runs locally).
- **U31** — services and restart policies.
- **U33** — non-root users and keeping secrets out of images.

## Time and energy

About **2–4 hours**, ideally split over two sittings. The first half is understanding the reference; the second half is building your own. Take the break when the reference version runs. This unit is meant to feel like a small real project, not a quiz.

## Why this exists

Every earlier unit taught one tool. Real work never asks for one tool; it asks for a **working thing**. The gap between "I know each command" and "I can ship a small app" is where many learners get stuck. This capstone closes that gap on purpose, on a project small enough to finish and real enough to be worth finishing.

When you are done, you will have a folder you can zip, send to a colleague, and say: "run these two commands." That is the practical proof the course promised.

## Plain-language teaching

### What makes a project "containerized" rather than "works on my laptop"

A containerized project has three honest properties:

1. **Its environment travels with it.** The Dockerfile names the exact base image and installs the exact dependencies (U11–U16).
2. **Its configuration is supplied at run time.** Passwords and settings come from an environment file, not from inside the image (U24, U33).
3. **Its data has a home outside the container.** A volume keeps the database alive when containers are replaced (U17).

If all three are true, a fresh machine can run your project with only Docker installed. That is the bar.

### Why two services (app and database)

A web app that stores data needs a database. In Compose, each becomes a **service** in one file (U23). Compose gives them a shared network, so the app can reach the database by its service name — here, `db` — without you managing IP addresses (U19–U20).

### Why the app must wait for the database

The app starts at roughly the same moment as the database. PostgreSQL takes a few seconds to accept connections. If the app tries to connect too early, it crashes (U34's "exits immediately"). Two habits fix this:

- A **health check** on the database tells Compose how to test whether it is ready.
- `depends_on` with `condition: service_healthy` makes the app wait for that check.

Even with the health check, a small **retry loop** in the app code is wise, because "ready" and "ready right now" are not the same thing on a busy machine.

### Why a multi-stage build for a small app

Our app is Python. We install its dependencies in a **builder** stage and copy only the installed packages into a clean **runtime** stage (U16). Build tools do not ship to production. The final image is smaller and has a smaller attack surface (U33).

### Why non-root, and why `.dockerignore` still matters

The runtime stage creates an unprivileged user and switches to it with `USER` (U33). And `.dockerignore` keeps the real `.env` (with the real password) out of the **build context**, so it can never be copied into a layer by accident (U13, U33).

### The shape of the whole project

```text
counter-app/
  app.py
  requirements.txt
  Dockerfile
  .dockerignore
  compose.yaml
  .env.example        # committed (safe placeholder)
  .env                # NOT committed (real values)
  README.md
```

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Capstone | A final project combining the whole course | Not a separate new topic |
| Multi-stage build | A Dockerfile with more than one `FROM`, where later stages copy from earlier ones | Not the same as "multiple containers" |
| Health check | A command Compose runs to decide if a service is ready | Not the same as "the container is running" |
| `depends_on` | Ordering between services in Compose | It does not guarantee readiness unless paired with a condition |
| Named volume | Storage Docker manages and can reuse by name | Not a folder on your host that you edit directly |
| Env file | A file of `KEY=value` lines passed to a container | Not a safe place to commit secrets |
| Retry loop | Code that tries again a few times before giving up | Not a restart policy (that is the runtime's job, U31) |
| Build context | The files sent to the builder | Not the whole disk; only what is not ignored |
| Deliverable | The set of files you hand in | Not just "it runs on my machine" |

## Worked example

We will build a tiny **counter** service: a Flask app that keeps a count in PostgreSQL. Each visit increments the count; the count survives restarts because the database uses a volume. You may type these files yourself or copy them into a folder named `counter-app`.

### `app.py`

```python
import os
import time

import psycopg2
from flask import Flask

app = Flask(__name__)


def connect():
    for attempt in range(10):
        try:
            return psycopg2.connect(
                host=os.environ["DB_HOST"],
                dbname=os.environ["DB_NAME"],
                user=os.environ["DB_USER"],
                password=os.environ["DB_PASSWORD"],
            )
        except psycopg2.OperationalError:
            time.sleep(2)
    raise RuntimeError("could not reach the database after 10 tries")


def init(conn):
    with conn, conn.cursor() as cur:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS counter (id int PRIMARY KEY, value int)"
        )
        cur.execute(
            "INSERT INTO counter (id, value) VALUES (1, 0) "
            "ON CONFLICT (id) DO NOTHING"
        )


@app.route("/")
def index():
    conn = connect()
    with conn, conn.cursor() as cur:
        cur.execute(
            "UPDATE counter SET value = value + 1 WHERE id = 1 RETURNING value"
        )
        value = cur.fetchone()[0]
    conn.close()
    return f"Count: {value}\n"


@app.route("/health")
def health():
    return "ok\n"


if __name__ == "__main__":
    startup = connect()
    init(startup)
    startup.close()
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "8000")))
```

Two lines matter beyond the obvious: `host="0.0.0.0"` (otherwise the app is unreachable, U34) and the `connect()` retry loop (otherwise it crashes while the database warms up).

### `requirements.txt`

```text
flask==3.0.3
psycopg2-binary==2.9.9
```

Pinning exact versions is a habit from U33: the build is reproducible.

### `Dockerfile`

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
EXPOSE 8000
CMD ["python", "app.py"]
```

- `AS builder` names the first stage so the second can copy from it.
- `--prefix=/install` puts the Python packages in one folder we can copy wholesale.
- `COPY --from=builder /install /usr/local` brings only the dependencies forward; pip and compilers do not come along.
- `useradd` and `USER appuser` run the app unprivileged.
- `EXPOSE 8000` documents the port; the actual mapping happens in Compose.

### `.dockerignore`

```text
.env
__pycache__/
*.pyc
.git
.gitignore
*.md
```

The critical line is `.env`. It must never enter the build context (U13, U33).

### `.env.example` (committed)

```text
POSTGRES_DB=counter
POSTGRES_USER=counter
POSTGRES_PASSWORD=change-me-locally
DB_HOST=db
DB_NAME=counter
DB_USER=counter
DB_PASSWORD=change-me-locally
```

Copy this to `.env` and change the password if you like. Commit `.env.example`; never commit `.env`.

### `compose.yaml`

```yaml
services:
  app:
    build: .
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
      - counter-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U counter -d counter"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  counter-data:
```

Reading it aloud: the `app` service builds from this folder, publishes port 8000, reads `.env`, waits for a healthy `db`, and restarts unless stopped (U31). The `db` service uses a pinned PostgreSQL image, reads the same `.env` (which supplies `POSTGRES_*`), stores its data in the named volume `counter-data`, and reports its own health with `pg_isready`.

### Running it

**Build and start in the background:**

```bash
docker compose up --build -d
```

- **Purpose:** build the app image, start both services, and return your prompt.
- **Success looks like:** lines mentioning `Creating network`, `Creating volume`, `Creating counter-app_db_1`, `Creating counter-app_app_1`, all `Started` or `Running`. Then `docker compose ps` shows both services `running`, and `db` (or `app`, depending on timing) eventually `healthy`.
- **One decoded failure:** `Bind for 0.0.0.0:8000 failed: port is already allocated` means host port 8000 is busy (U18, U34). Change the left side to `"8001:8000"` in `compose.yaml` and rerun.

**Check the services:**

```bash
docker compose ps
```

- **Purpose:** see the state of each service.
- **Success looks like:** two rows, `app` running and `db` running/healthy.
- **One decoded failure:** `no configuration file provided: not found` means you are not in the project folder.

**Follow the app logs:**

```bash
docker compose logs -f app
```

- **Purpose:** watch the app's output live (U10, U34).
- **Success looks like:** startup lines and a request log line each time you visit. Stop with `Ctrl+C` — this does not stop the containers.
- **One decoded failure:** errors about `could not reach the database` mean the DB was not ready or the credentials do not match; check `docker compose logs db`.

**Use the service:**

```bash
curl http://localhost:8000/
```

On Windows PowerShell:

```powershell
Invoke-WebRequest http://localhost:8000/
```

- **Purpose:** make one request, which increments the counter.
- **Success looks like:** `Count: 1` (and `Count: 2` on the next request).
- **One decoded failure:** `Empty reply` or a hang usually means the app is not actually up yet, or it bound to the wrong interface (U34). Check `docker compose ps` and the logs.

### Proving the data persists (the whole point of the volume)

Stop everything **without** deleting volumes:

```bash
docker compose down
```

- **Purpose:** stop and remove the containers and network, but keep named volumes.
- **Success looks like:** lines mentioning `Removing` and `Stopping`, and the containers gone. The named volume remains.
- **One decoded failure:** `warning: ... the volume may still be in use` is usually harmless if containers are stopping.

Start again:

```bash
docker compose up -d
```

Now request the counter again:

```bash
curl http://localhost:8000/
```

**Success looks like:** the count continues from where it was (for example `Count: 3`), not from `1`. The database data survived because it lives in the `counter-data` volume.

See the volume:

```bash
docker volume ls
```

**Success looks like:** a line ending in `counter-app_counter-data` (Compose prefixes the project name).

### Cleaning up completely

```bash
docker compose down -v
```

- **Purpose:** stop everything **and delete the named volumes**.
- **Warning:** `-v` destroys your data. Use it only when you truly want a fresh start.
- **Success looks like:** lines removing containers, network, and `counter-app_counter-data`.

## Common errors

### Error: The app exits immediately with a database error

**Symptom:** `app` shows `Exited (1)` and the logs mention connection refused.

**Why:** the app started before PostgreSQL accepted connections. The health check usually prevents this; a retry loop in the app covers the rest.

**Fix:** ensure the `db` healthcheck is present and `app` has `depends_on: db: condition: service_healthy`. Confirm `docker compose ps` shows `db` as `healthy`.

### Error: Credentials do not match

**Symptom:** authentication failed for user, or database does not exist.

**Why:** `POSTGRES_*` values (used to *create* the database) and `DB_*` values (used by the app to *connect*) disagree in `.env`.

**Fix:** make `POSTGRES_DB`/`POSTGRES_USER`/`POSTGRES_PASSWORD` match `DB_NAME`/`DB_USER`/`DB_PASSWORD`. If you changed the password after the volume was created, PostgreSQL keeps the old one; run `docker compose down -v` for a clean start.

### Error: I committed my `.env`

**Symptom:** the real password is in version control.

**Why:** `.env` was not ignored.

**Fix:** rotate the password, delete the file from history or start a fresh commit, and rely on `.env.example`. Also confirm `.dockerignore` lists `.env`.

### Error: The final image still contains build tools

**Symptom:** the image is large, or `pip` and compilers are present in the runtime.

**Why:** the Dockerfile copied the whole environment instead of just the installed packages.

**Fix:** copy only the `--prefix` folder from the builder, as in the worked example.

### Error: "It works, but only on my machine"

**Symptom:** a teammate cannot reproduce it.

**Why:** a dependency, a version, or a secret was not pinned or documented.

**Fix:** pin versions, provide `.env.example`, and make the README start with the two exact commands to run.

## Checkpoints

Answer in your own words before the assignment:

1. Name the three properties that make a project truly containerized.
2. Why does the app need to wait for the database, and what two mechanisms handle that?
3. What does the `--prefix` trick in the builder stage let you copy?
4. Why must `.env` be in `.dockerignore` even though the app reads it at run time?
5. Which command proves the volume works, and which command destroys the volume?

## Practice exercises

### P1 — Run the reference

Get the counter app running exactly as shown. Take a screenshot or paste output of `Count: 1`, then `docker compose down && docker compose up -d`, then `Count: 2`.

### P2 — Break the password

Change only `DB_PASSWORD` in `.env` so it no longer matches `POSTGRES_PASSWORD`. Restart and watch the app fail. Read the logs, explain what you see, then fix it.

### P3 — Remove the health check

Delete the `healthcheck` block and the `condition: service_healthy` line. Restart. Observe whether the app still starts (the retry loop may save it). Write two sentences on what the health check added.

### P4 — Shrink the image

Build the reference as-is, then temporarily convert the Dockerfile to a single stage. Compare image sizes with `docker images`. Restore the multi-stage version.

### P5 — Add a health endpoint test

Confirm `curl http://localhost:8000/health` returns `ok`. Explain why a dedicated health endpoint is useful to a runtime (connect to U31's restart and U33's habits).

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No cloud deployment, no paid services, no domain names.
- No Kubernetes (U32 was a survey).
- No CI pipeline setup (U28–U29 covered the idea).
- No production monitoring, backups, or scaling.
- No advanced database tuning or migrations frameworks.

## Next unit

There is no U36. You have reached the end of the course. Your next step is to take the capstone folder, run it on a different machine if you can, and explain every file to someone — or to your trainer — out loud. If you can do that, you have finished well.
