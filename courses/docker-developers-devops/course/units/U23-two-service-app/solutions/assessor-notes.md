# U23 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Q1:** Inside a container, `localhost` (127.0.0.1) is that container itself. The database is a different container, so the app must use the database's **service name** (`database`), which Compose's project network resolves to the database container (U20).

**Q2:** `depends_on` guarantees start **order** (database starts before web). It does **not** guarantee the database is ready to accept connections, and it does not restart the app when the database becomes ready.

**Q3:** Containers are disposable. Without a named volume mounted at the Postgres data directory, recreating the container creates a fresh, empty data directory and the data is lost. The volume keeps it.

**Q4:** The database does not need to be reached from the host; only `web` talks to it over the project network. Not publishing it keeps the database off the host network, reducing exposure.

**Q5:** The app would report `FAIL: could not reach db:5432` (name resolution error — `db` no longer exists), because the service was renamed but `DB_HOST` still says `db`.

**Q6:** The bug is the mount path. Postgres stores data at `/var/lib/postgresql/data`; mounting at `/data` leaves the real data directory inside the disposable container. Corrected:

```yaml
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: changeme
    volumes:
      - db-data:/var/lib/postgresql/data
```

**Q7:** The top-level `volumes:` key **declares** named volumes Compose should create/manage. A service's `volumes:` list **mounts** a volume (or path) into that container. One declares; the other attaches.

## Expected artifacts

- Two services, `web` (build) and `database` (postgres:16-alpine).
- `web`: `ports: ["8083:8000"]`, `environment: DB_HOST: database`, `DB_PORT: "5432"`, `depends_on: [database]`.
- `database`: chosen `POSTGRES_*` values, `volumes: [db-data:/var/lib/postgresql/data]`.
- Top-level `volumes: db-data:`.
- Evidence with a successful DB-reached response and a `down` that keeps the volume.

## Common weak submissions

- `DB_HOST: localhost` — app reports connection refused; award DB_HOST points 0.
- `depends_on` assumed to wait for readiness, and the app reports failure with no explanation.
- Volume mounted at `/data` or omitted; no top-level declaration.
- Database service also publishes `5432:5432` with no reason offered.
- `DB_PORT` left as a YAML number (`5432`) rather than a string — usually still works via interpolation, but note it.
- Evidence only shows `docker compose up` and no request to the app.

## Grading stance

The connection proof is the heart of this unit. A learner who runs the app and correctly reads `OK: reached database at database:5432` has demonstrated networking, service naming, and environment wiring at once. Be strict on the volume path and the `localhost` misconception, because U24 and U25 both assume the two-service project exists and persists its data.
