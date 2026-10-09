# U23 — A two-service app

**Phase 5 — Docker Compose**

## Where you are

One service was a warm-up. Real apps are a web process plus a database, at minimum. This unit adds a second service, teaches how the two find each other by name, and shows why a database needs a volume or your data disappears every time you stop. You will bring the app up and actually reach it.

## What you will be able to do

- Write a `compose.yaml` with two services: a web app and a database.
- Explain `depends_on` and its honest limits.
- Pass database connection settings into a container with `environment:`.
- Explain why the database's data needs a named volume (U17).
- Bring the app up and confirm the web service can reach the database.
- Decode an "app cannot find database" failure.

## What you need already

- **U17** — volumes keep data beyond a container's life.
- **U18** — ports.
- **U19–U20** — container networking; services reach each other by name on a shared network.
- **U22** — services, `build`, `image`, `ports`, `environment`, `docker compose up` / `down`.

Docker must be running.

## Time and energy

About **85–120 minutes**. The database image is larger than the app image, so the first `up` may take a few minutes to download. That wait is normal.

## Why this exists

A web app with no database forgets everything. A database with no volume forgets everything when its container is recreated. A two-service app is the smallest realistic shape of real software — and the point at which manual `docker run` commands stop being reasonable. This unit is where Compose earns its keep.

## Plain-language teaching

### Two services, one file

A database is just another service. It uses a public image (U09) instead of a local build. Compose treats both the same way: reads the description, creates a container, connects them to the project network.

### How the app finds the database: the service name

Here is the single most important idea in this unit. Inside the project network, each service is reachable by **its service name** (U20). If the database service is named `db`, then from inside the web container the hostname `db` resolves to the database container.

So the app does **not** connect to `localhost`. Inside a container, `localhost` means *that same container*. The database is a different container. It connects to `db`.

This trips up almost everyone once. It is not a sign you are bad at this; it is the whole reason U20 exists.

### `depends_on`: start order, not readiness

`depends_on` tells Compose which services must be **started** before another. Two honest facts:

1. It controls **order of starting**, not **readiness**. A database container may be "started" before the database inside it is ready to accept connections.
2. It does **not** restart your app when the database becomes ready.

In this unit we dodge the timing problem by having the app check the database **on every request**. That way the first request might say "not ready yet," and a moment later it says "OK." In later courses this is solved with health checks and retries; here, checking per request keeps the lesson honest and simple.

### Databases need volumes

The PostgreSQL image stores its data inside the container at `/var/lib/postgresql/data`. Containers are disposable. If you do not mount a **named volume** there, then `docker compose down` removes the container and the data goes with it (U17).

A named volume is a piece of storage Docker manages for you and keeps until you explicitly remove it. We will use one called `db-data`.

### Should the database have a published port?

Usually **no**, and not here. The web app reaches `db` over the project network. Your browser does not need to talk to the database. Leaving the database unpublished means it is not reachable from your machine's network at all — a smaller, safer surface (U18/U19). We publish only the web port.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Service name | The label you give a service; also its hostname on the project network | Not the image name; not `localhost` |
| `depends_on` | Start these services first | Does **not** wait until they are ready |
| Connection settings | Host, port, user, password, database name | Not the same as publishing a port |
| Named volume | Docker-managed storage that survives `down` | Removed by `docker compose down -v` (U25) |
| `POSTGRES_*` variables | Settings the Postgres image reads on first startup | Only applied when initializing a fresh data directory |
| Project network | Private network Compose creates for the project | You do not create it by hand |
| Pull | Downloading an image from a registry | Postgres image is large; first pull is slow |

## Worked example

Create a new folder, for example `u23`, with four files.

### File 1: `app.py`

This app checks that it can open a network connection to the database, then reports the result. It uses only Python's standard library, so there is nothing extra to install.

```python
import os
import socket
from http.server import BaseHTTPRequestHandler, HTTPServer

DB_HOST = os.environ.get("DB_HOST", "db")
DB_PORT = int(os.environ.get("DB_PORT", "5432"))

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            with socket.create_connection((DB_HOST, DB_PORT), timeout=2):
                status = f"OK: reached database at {DB_HOST}:{DB_PORT}"
        except OSError as exc:
            status = f"FAIL: could not reach {DB_HOST}:{DB_PORT} ({exc})"
        body = (status + "\n").encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    HTTPServer(("0.0.0.0", 8000), Handler).serve_forever()
```

It reads `DB_HOST` and `DB_PORT` from the environment — those come from the Compose file.

### File 2: `Dockerfile`

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

Same shape as U22. No dependencies, so no `RUN pip install`.

### File 3: `compose.yaml`

```yaml
services:
  web:
    build: .
    ports:
      - "8080:8000"
    environment:
      DB_HOST: db
      DB_PORT: "5432"
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: changeme
      POSTGRES_DB: appdb
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

Line by line:

- `web:` — our app. `build: .` builds it from the Dockerfile.
- `ports: - "8080:8000"` — publishes only the web port to the host (U18).
- `environment:` under `web` sets `DB_HOST: db` (the database's service name) and `DB_PORT: "5432"`.
- `depends_on: - db` — start `db` before `web`.
- `db:` — the database. `image: postgres:16-alpine` pulls the official Postgres image (U09).
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` — settings the image uses **the first time** it initializes its data directory. We are using a plain-text password here only to keep the lesson focused. U24 will show how to keep such values out of the file, and U33 covers doing this properly.
- `volumes: - db-data:/var/lib/postgresql/data` — mount the named volume `db-data` at Postgres's data directory so the data survives (U17).
- `volumes:` at the **top level** declares the named volume `db-data` so Compose knows to create and manage it.

Note the shape: `web` uses `build`, `db` uses `image`; both use `environment`. The top-level `volumes:` block is separate from the per-service `volumes:` list.

### Bringing it up and reaching it

**Command:**

```text
docker compose up
```

**What it does:** builds `web`, pulls `postgres:16-alpine` if needed, creates the project network and the `db-data` volume, then starts `db` (because of `depends_on`) and `web`, and attaches to the combined logs.

**Success looks like this** (abbreviated; the Postgres lines may appear a few seconds late):

```text
[+] Building 3.8s (8/8) FINISHED
[+] Running 3/3
 ✔ Network u23_default    Created
 ✔ Volume "u23_db-data"   Created
 ✔ Container u23-db-1     Started
 ✔ Container u23-web-1    Started
db-1   | database system is ready to accept connections
```

**Reach the app:** in a browser or a second terminal, open `http://localhost:8080` (or `curl http://localhost:8080`). You should see a line like:

```text
OK: reached database at db:5432
```

If the very first request says `FAIL`, wait a few seconds and refresh. That is `depends_on` starting the container before the database inside is ready — the lesson described above, happening live.

**To stop and clean up:**

```text
docker compose down
```

**Success looks like this:**

```text
[+] Running 3/3
 ✔ Container u23-web-1  Removed
 ✔ Container u23-db-1   Removed
 ✔ Network u23_default  Removed
```

Notice the volume is **not** listed — `down` keeps named volumes by default. Your data stays. (Removing it is U25, and you usually should not.)

### Reaching the database's data is not required here

You do not need a database client on your machine. The web app is your evidence that the network path works. If you *do* have `psql` installed, note this: the database port is not published, so `psql -h localhost` will not connect. That is intentional. We will inspect the database from inside its container later, in U25.

### A note on operating systems

- Commands are identical on Windows, macOS, and Linux.
- On Windows/macOS, Docker Desktop must be running and have enough memory for the Postgres image. If Docker reports a memory error, increase the memory limit in Docker Desktop settings, then try again.
- On Linux with Docker Engine, the Compose v2 plugin must be present (same as U22).

## Common errors

### Error: The app reports it cannot reach the database

**What you see** at `http://localhost:8080`:

```text
FAIL: could not reach localhost:5432 (Connection refused)
```

**What it means:** the app is looking for the database at `localhost`, which inside the web container is the web container itself. Someone set `DB_HOST: localhost` in the Compose file.

**Fix:** set `DB_HOST: db` — the database's **service name**. Compose's network resolves `db` to the database container (U20).

### Error: "FAIL" on the first request, then "OK"

**What you see:** the very first request reports failure; a refresh a few seconds later reports success.

**What it means:** `depends_on` started the `db` container, but Postgres was still initializing its data directory. The connection was refused until it finished.

**Fix:** nothing is broken. Wait and try again. This is exactly why `depends_on` is described as order, not readiness. (In real projects you add health checks so the app waits; that is out of scope here.)

### Error: Data vanishes after a restart

**What it means:** the `db` service has no `volumes:` mount, or the mount points somewhere other than `/var/lib/postgresql/data`. When the container is recreated, Postgres starts with an empty data directory.

**Fix:** mount a named volume at `/var/lib/postgresql/data` exactly as in the example, and declare the volume under the top-level `volumes:` key.

## Checkpoints

1. Why does the web service use `db` instead of `localhost` to reach the database?
2. What does `depends_on` guarantee, and what does it *not* guarantee?
3. After `docker compose down`, is the data in `db-data` gone? Why?

If those are clear, you are ready.

## Practice exercises

### P1 — Predict then run

Before running anything, predict what the page shows if you change `DB_HOST: db` to `DB_HOST: database`. Run it and check. Explain the result in one or two sentences.

### P2 — Change one value

Change the host port from `"8080:8000"` to `"8082:8000"` and the `DB_PORT` from `"5432"` to `"5433"`. Predict which one breaks the app and which one only changes your browser URL. Then run and confirm.

### P3 — Fill in the blank

The `db` service is missing its volume mount. Write the two lines you would add (one under `db:`, one at the top level).

### P4 — Write from a specification

Write a `compose.yaml` with a service `cache` that runs `redis:7-alpine` and a service `web` that builds locally, depends on `cache`, publishes host 8090 to container 8000, and sets `CACHE_HOST=cache` and `CACHE_PORT=6379`. Do not run it yet.

### P5 — Debug this broken snippet

Explain why this file fails to keep the database data, and give the corrected `db` service:

```yaml
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: changeme
    volumes:
      - db-data:/data
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No `.env` files or `${VAR}` interpolation (U24).
- No lifecycle commands such as `up -d`, `logs`, `ps`, or `exec` (U25).
- No health checks or retry logic (later craft work).
- No secrets management (YAML keeps a plain password for now; U24 introduces the problem, U33 goes deeper).

## Next unit

**U24 — Environment variables and .env files** (keeping configuration out of the Compose file and secrets out of Git).
