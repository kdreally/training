# U35 Assignment — Capstone deliverable

This is the graded capstone. You will containerize a small app with a database and hand in a folder a stranger could run.

Submit **one folder or zip** named:

`U35-YourName`

## The app

Containerize the **shopping list** app below (a Python/Flask service that stores items in PostgreSQL). If you would rather containerize a small app you wrote yourself, you may — but it must use one app plus one database and meet every requirement below. The starter is provided so the work is about containerization, not about writing a web app.

### `app.py`

```python
import os
import time

import psycopg2
from flask import Flask, request

app = Flask(__name__)


def connect():
    for _ in range(10):
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
            "CREATE TABLE IF NOT EXISTS items ("
            "id serial PRIMARY KEY, name text NOT NULL)"
        )


@app.route("/")
def index():
    conn = connect()
    with conn, conn.cursor() as cur:
        cur.execute("SELECT name FROM items ORDER BY id")
        rows = [row[0] for row in cur.fetchall()]
    conn.close()
    listing = "\n".join(f"- {name}" for name in rows)
    return f"Shopping list:\n{listing}\n"


@app.route("/add")
def add():
    name = request.args.get("item", "").strip()
    conn = connect()
    with conn, conn.cursor() as cur:
        cur.execute("INSERT INTO items (name) VALUES (%s)", (name,))
    conn.close()
    return f"added: {name}\n"


@app.route("/health")
def health():
    return "ok\n"


if __name__ == "__main__":
    startup = connect()
    init(startup)
    startup.close()
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "8000")))
```

### `requirements.txt`

```text
flask==3.0.3
psycopg2-binary==2.9.9
```

## Files to submit

Your folder must contain:

### 1. `app/Dockerfile`

A **multi-stage** Dockerfile that:

- Uses a minimal, pinned base image (not `latest`).
- Installs dependencies in a builder stage and copies only what is needed into the final stage.
- Copies `app.py` and runs it with `CMD ["python", "app.py"]`.
- Creates a non-root user and switches to it with `USER`.
- Does **not** contain any secret values.

### 2. `app/.dockerignore`

Must exclude at least `.env`, `__pycache__/`, `*.pyc`, and `.git`.

### 3. `app/app.py` and `app/requirements.txt`

The provided files (or your own app plus its dependency list).

### 4. `compose.yaml`

Must define two services, `app` and `db`, and:

- Build `app` from `./app`.
- Publish the app on a host port of your choice.
- Give `app` and `db` the environment they need from an env file.
- Put the database data in a **named volume**.
- Include a `healthcheck` for `db` and make `app` wait for it with `depends_on` and `condition: service_healthy`.
- Set a sensible `restart:` policy (U31).

Use the pinned image `postgres:16-alpine` for the database.

### 5. `.env.example` (committed)

Contains safe placeholder values for: `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`. The real `.env` must **not** be included in your submission.

### 6. `README.md`

A short README that a stranger can follow. It must include:

- One sentence on what the app does.
- The exact commands to run it (and to stop it).
- The URL to visit and an example request.
- A "Files" section listing each file and one line on its purpose.
- A "What I would do differently" paragraph.

### 7. `answers.md`

Answer in your own words:

1. **The three properties.** Name the three properties that make a project truly containerized, and point to the exact file/line that delivers each in your project.
2. **Multi-stage.** Explain what your builder stage does that the runtime stage does not, and why that keeps the final image lean.
3. **Volume.** Explain what would happen to the shopping list if you ran `docker compose down` and then `docker compose up` **without** the named volume, and why.
4. **Secrets.** Explain why the app reads `DB_PASSWORD` at run time instead of having it in the Dockerfile. Mention the word *layer*.
5. **Waiting for the database.** Explain the two mechanisms that keep the app from crashing while PostgreSQL starts, and what each one contributes.
6. **Debugging.** Describe one real problem you hit while building this and how you used the U34 method to fix it.
7. **Reflection.** Which earlier unit did you lean on most, and which skill still feels shaky?

### 8. `evidence.txt`

Paste a real transcript showing, in order:

1. `docker compose up --build -d`.
2. `docker compose ps` with both services up/healthy.
3. Add two items (`/add`) and list them (`/`).
4. `docker compose down`.
5. `docker compose up -d`.
6. List the items again — showing they **persisted**.
7. `docker compose down -v` to clean up.

Label each command with a short comment.

## Definition of done

- All files above are present with the names given.
- `docker compose up --build` works from a clean copy (no `.env` in the submission; a copy of `.env.example` to `.env` is the only setup step).
- Items persist across `docker compose down` then `up`.
- The Dockerfile is multi-stage, uses a pinned base, and runs as a non-root user.
- No real secret appears anywhere in the submission.
- `README.md` and `answers.md` are in your own words.
