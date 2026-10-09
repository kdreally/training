# U25 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Q1:** `restart` stops and starts the **same** containers, reusing the existing image and settings — good when nothing changed. `up -d --build` rebuilds the image from changed source and recreates the container — needed when a `COPY`-ed file (like `app.py`) changed. Environment/port changes also need recreation, which a plain `up -d` performs.

**Q2:** `ps` shows the state of this project's containers (running/stopped, published ports). `logs` shows their output over time. `ps` answers "is it up?"; `logs` answers "what is it saying?"

**Q3:** The database is not published to the host, but `exec` does not go through the host network. It runs a process **inside** the already-running db container, which can reach its own local Postgres. Equivalently, the command runs within the project network namespace.

**Q4:** `down` removes containers and the project network, keeping named volumes. `down -v` also removes named volumes, destroying the data. Plain `down` keeps database data.

**Q5:** `POSTGRES_PASSWORD` is applied only when Postgres initializes a **fresh** data directory. The existing `db-data` volume already holds an initialized database, so the new value is ignored. Fixes: (a) if data is disposable, `docker compose down -v` then `up -d` to re-initialize; (b) if data matters, change the password inside the running database, e.g. `docker compose exec db psql -U <user> -d <db>` then `ALTER USER <user> WITH PASSWORD '<new>';`.

**Q6:** The key is misspelled: `port` must be `ports`. Corrected:

```yaml
services:
  web:
    build: .
    ports:
      - "8080:8000"
```

**Q7:** Yes. Plain `down` keeps the named volume, so the data persists across `down` and `up -d`. Only `down -v` would remove it.

## Expected artifacts

- Evidence with four labeled parts (A: detached start + ps + logs; B: restart vs rebuild; C: exec into db; D: down and volume retention).
- `answers.md` covering the distinctions above.
- Edited `app.py` matching the rebuild demonstration.

## Common weak submissions

- Claims `restart` rebuilds the image.
- Confuses `ps` (project containers) with the host process list, or with `docker compose ls`.
- Uses `exec` on a stopped service and does not decode the "not running" error.
- Describes `down -v` as the normal cleanup and wipes data without noting the consequence.
- Q5 fix is only "delete the volume," with no alternative for data that matters.
- Q6 fix changes indentation instead of the typo.
- Evidence is a single `up` run with no `ps`/`logs`/`exec`.

## Grading stance

This unit is about operating a project confidently and safely. The decisive evidence is Part B (restart vs rebuild, observed) and Part D (understanding what is retained vs destroyed). Be tolerant of messy output; be firm if the learner cannot distinguish restart from rebuild or does not understand that `down -v` deletes data.
