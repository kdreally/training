# U25 — Compose lifecycle

**Phase 5 — Docker Compose**

## Where you are

You can define a two-service app (U23) and keep its settings in a `.env` file (U24). Now you will learn the day-to-day commands that a real developer types dozens of times: starting in the background, reading logs, checking status, running a command inside a container, rebuilding, and cleaning up. You will also learn the difference between **restarting** and **rebuilding**, which is where most confusion lives.

## What you will be able to do

- Start a project in the background with `docker compose up -d`.
- Inspect a project with `docker compose ps` and `docker compose logs`.
- Run a command inside a running service with `docker compose exec`.
- Rebuild images with `docker compose build` and understand when a rebuild is needed.
- Stop and remove with `docker compose down`, and know what `down -v` destroys.
- Decode port-in-use, stale-volume, and configuration errors.

## What you need already

- **U22** — `docker compose up` / `down`, services, ports, environment.
- **U23** — a two-service app with a named volume.
- **U24** — `.env` interpolation and `docker compose config`.
- **U10** — the container lifecycle ideas (`logs`, `exec`, `rm`) these commands generalize.

Docker must be running.

## Time and energy

About **80–120 minutes**. You will run several commands and read real output. Keep the U23/U24 project handy; open a second terminal for `exec`.

## Why this exists

Knowing how to *describe* an app is half the skill. The other half is operating it while you build: watching logs, restarting one service, rebuilding after a code change, and cleaning up without losing data by accident. These commands are the difference between "I wrote a Compose file once" and "I can work in a Compose project all day."

## Plain-language teaching

### Foreground vs detached

`docker compose up` runs in the **foreground**: logs pour into your terminal and `Ctrl+C` stops everything. That is perfect for watching a first start.

`docker compose up -d` runs **detached** (the `-d` means "detach"): the containers keep running while your terminal is free for other commands. This is what you use after the first few runs.

### "Restart" and "rebuild" are not the same

This is the single most important distinction in the unit.

| You changed… | What is needed | Why |
|--------------|----------------|-----|
| Nothing | `docker compose restart` | Just stops and starts the same containers. Fast. |
| A setting like `environment:` or `ports:` in `compose.yaml` (or `.env`) | `docker compose up -d` | Compose recreates the container with the new setting. |
| A file that is **copied into the image** (`COPY` in the Dockerfile, e.g. `app.py`) | `docker compose up -d --build`, or `docker compose build` then `up -d` | The old image still contains the old file. Only a rebuild makes a new image. |
| A file that is **bind-mounted** from your machine into the container | Often nothing | The container reads the file from your disk. |

A `restart` reuses the existing image and settings. A **rebuild** produces a new image. Recreating a container happens automatically when Compose notices the definition changed.

### What `down` and `down -v` remove

- `docker compose down` removes the project's **containers** and its **network**. It **keeps named volumes** by default, so your database data survives.
- `docker compose down -v` (the `-v` means "volumes") **also removes named volumes**. Your database data is destroyed. That is sometimes what you want — for example, to start clean after changing a database password — and sometimes exactly what you must not do.

Read the `-v` before you press Enter. It is the one flag in this unit that can delete work.

### Running a command inside a service

`docker compose exec` runs a command *inside an already-running container* for a service. This is how you open a database client or a shell without installing anything on your machine (U10). It is the safe, modern cousin of "SSH into the box."

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Detached (`-d`) | Run containers in the background | Not "disconnected from logs forever"; use `logs` to see them |
| `ps` | List this project's containers and status | Not the operating system's process list |
| `logs` | Print a service's output | Not stored forever; tied to containers |
| `exec` | Run a command in a running container | Fails if the container is not running |
| `build` | Build/rebuild images from Dockerfiles | Does not start containers by itself |
| Rebuild | Produce a new image from changed source | Not the same as restart |
| Restart | Stop and start the same containers | Does not pick up new images or settings |
| `down` | Remove containers and network | Keeps named volumes by default |
| `down -v` | Remove containers, network, **and volumes** | Deletes database data |
| Stale volume | A volume holding old data from a previous setup | Can preserve an old password or schema |

## Worked example

Use the two-service project from U23/U24 (the `web` + `db` app with a `db-data` volume). Open a terminal in that project folder. We will walk through the commands in the order a developer actually uses them.

All example outputs below are abbreviated; counts and container names vary with your project name.

### 1. `docker compose up -d`

**What it does:** builds and starts everything, then returns your terminal to you.

**Success looks like this:**

```text
[+] Running 3/3
 ✔ Network u25_default    Created
 ✔ Container u25-db-1     Started
 ✔ Container u25-web-1    Started
```

**A typical failure, decoded:**

```text
Error response from daemon: ... Bind for 0.0.0.0:8080 failed: port is already allocated
```

**What it means:** host port 8080 is already taken (another container or program). **Fix:** `docker compose ps` here, or `docker ps` globally (U10), to find the owner; or change the host port in `compose.yaml`/`.env`.

### 2. `docker compose ps`

**What it does:** lists only this project's containers with their status and published ports.

**Success looks like this:**

```text
NAME          IMAGE                COMMAND              SERVICE   STATUS         PORTS
u25-db-1      postgres:16-alpine   "docker-entrypoint…"  db        Up 2 minutes   5432/tcp
u25-web-1     u25-web              "python app.py"       web       Up 2 minutes   0.0.0.0:8080->8000/tcp
```

**A typical "failure," decoded:** the output is just a header with no rows:

```text
NAME                IMAGE               COMMAND             SERVICE             CREATED             STATUS              PORTS
```

**What it means:** no containers for this project are running (or exist). It is not an error; it means "nothing is up." **Fix:** check you are in the right folder (the one with `compose.yaml`), then `docker compose up -d`.

### 3. `docker compose logs`

**What it does:** prints the combined logs of the project's services.

Useful variations (all the same command, different views):

```text
docker compose logs            # everything, from the start
docker compose logs -f         # follow live output, like `tail -f`
docker compose logs db         # only the db service
docker compose logs --tail=50 web   # last 50 lines from web
```

**Success looks like this:**

```text
db-1   | database system is ready to accept connections
web-1  | 172.18.0.1 - - "GET / HTTP/1.1" 200 -
```

**A typical failure, decoded:**

```text
no container found for service "web"
```

**What it means:** that service has no container yet (it was never started, or it was removed). **Fix:** start it with `docker compose up -d`, then try again. Note that logs disappear when containers are removed; `down` deletes the logs with the container.

### 4. `docker compose exec`

**What it does:** runs a command inside a running service. You name the service, then the command.

**Example 1 — a shell inside the web container:**

```text
docker compose exec web sh
```

On the Python slim image there is a shell, `sh`. You will get a prompt inside the container. Type `exit` to leave. This is how you look around without installing anything on your machine.

**Example 2 — open the database client:**

```text
docker compose exec db psql -U appuser -d appdb
```

You get a `psql` prompt connected to your database. Try `\dt` to list tables (there may be none), then `\q` to quit. This works because the database is reachable **by service name** inside the project network (U20) — you did not publish port 5432, and you did not need to.

**Success looks like this:**

```text
psql (16.x)
Type "help" for help.

appdb=#
```

**A typical failure, decoded:**

```text
service "db" is not running
```

**What it means:** `exec` only works on a running container. **Fix:** `docker compose up -d` first. If the service keeps exiting, look at `docker compose logs db` — the container may be crashing, which is a different problem to solve.

### 5. `docker compose build`

**What it does:** builds (or rebuilds) the images for services that have a `build:` key, without starting anything.

**Success looks like this:**

```text
[+] Building 5.2s (8/8) FINISHED
 => [web] ...
```

**A typical failure, decoded:**

```text
ERROR: failed to solve: failed to compute cache key: "/app.py": not found
```

(Your exact wording may differ.) 

**What it means:** the Dockerfile tried to `COPY` a file that is not in the build context (U13). Often the file is missing, misspelled, or excluded by `.dockerignore`. **Fix:** confirm `app.py` exists next to the Dockerfile and is not ignored.

To build and then run in one step, use:

```text
docker compose up -d --build
```

### 6. `docker compose down`

**What it does:** stops and removes this project's containers and network. Named volumes are kept.

**Success looks like this:**

```text
[+] Running 3/3
 ✔ Container u25-web-1  Removed
 ✔ Container u25-db-1   Removed
 ✔ Network u25_default  Removed
```

Notice the volume is not listed. Your database data is still on disk.

### 7. `docker compose down -v`

**What it does:** the same as `down`, and additionally removes the project's named volumes.

**Success looks like this:**

```text
[+] Running 4/4
 ✔ Container u25-web-1  Removed
 ✔ Container u25-db-1   Removed
 ✔ Volume u25_db-data   Removed
 ✔ Network u25_default  Removed
```

**A typical consequence, decoded:** the next `docker compose up -d` starts with an **empty** database. That is expected — you removed the data. Use this deliberately, for example to clear a stale database. Never use it casually on data you care about.

### Putting it together: a normal edit cycle

You change `app.py`, which the Dockerfile `COPY`s into the image.

```text
docker compose up -d --build     # rebuild the image and recreate the container
docker compose logs -f web       # watch it start
```

You change only an environment value in `.env`:

```text
docker compose up -d             # Compose recreates the affected container
```

You change nothing and just want a clean restart:

```text
docker compose restart
```

### A note on operating systems

- All commands are identical on Windows (PowerShell), macOS, and Linux.
- `docker compose exec web sh` works on Linux-based images, which all images here are. (A `bash` shell may not exist in slim images; `sh` does.)
- Ensure Docker Desktop (Windows/macOS) is running before any command.

## Common errors

### Error: Port already in use

**What you see:** `Bind for 0.0.0.0:8080 failed: port is already allocated`.

**What it means:** another container or program owns host port 8080. Common cause: you started the project twice from two different folders (two projects, same host port).

**Fix:** run `docker compose ps` in each suspected project folder, or `docker ps` globally (U10), and `down` or stop the other holder; or change the host port.

### Error: Stale volume keeps an old password

**What you see:** you change `POSTGRES_PASSWORD` in `.env`, run `docker compose up -d`, and the app still fails to authenticate — or the old password still works.

**What it means:** the Postgres image applies `POSTGRES_PASSWORD` only when it **initializes a fresh data directory**. Your `db-data` volume already contains an initialized database, so the new password is ignored.

**Fix:** if the data does not matter, `docker compose down -v` then `docker compose up -d` to re-initialize. If the data matters, do not wipe it; instead change the password inside the database with `docker compose exec db psql -U <user> -d <db>` and an `ALTER USER` statement. Choose consciously.

### Error: Configuration error

**What you see:**

```text
yaml: line 6: did not find expected key
```

or

```text
services.web additional properties 'port' not allowed
```

**What it means:** a YAML mistake (bad indentation, tabs) or a misspelled key (`port` instead of `ports`).

**Fix:** run `docker compose config --quiet` to get a fast validation pass (U24), fix the line, and try again. Read the line number Compose gives you; it is usually close to the truth.

## Checkpoints

1. What is the difference between `docker compose restart` and `docker compose up -d --build`?
2. What does `docker compose down -v` remove that `docker compose down` keeps?
3. When you edit an environment value in `.env`, which command applies it?

If those are clear, you are ready.

## Practice exercises

### P1 — Background and logs

Start the project with `docker compose up -d`. Run `docker compose ps`, then `docker compose logs db`. Write one line from the database log that proves it started.

### P2 — Change one value

Change `WEB_HOST_PORT` in `.env` to a new free port. Run `docker compose up -d`, then `docker compose ps`, and confirm the new host port appears. Visit the new URL.

### P3 — Rebuild vs restart

Change the greeting or status text inside `app.py`. First run `docker compose restart` and note whether the page changed. Then run `docker compose up -d --build` and check again. Explain the difference in two lines.

### P4 — Inside the database

With the project running, run `docker compose exec db psql -U appuser -d appdb`. List tables with `\dt`, then quit with `\q`. Write the two commands you used.

### P5 — Fix a broken config

This `compose.yaml` fails to start. Run `docker compose config --quiet`, fix the error, and explain it in one sentence.

```yaml
services:
  web:
    build: .
    port:
      - "8080:8000"
```

### P6 — Deliberate cleanup

State the exact command that would remove the project **and** its database data. Then state one situation where you would use it and one where you would not. (Do not run it if the data matters.)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No registries, pushing, or pulling your own images (Phase 6).
- No CI automation (Phase 6).
- No health checks or readiness gating between services.
- No production deployment or orchestration (Phase 7).

## Next unit

**U26 — Registries** (images beyond your laptop, and why `docker push` is not magic).
