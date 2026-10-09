# U35 Rubric

Visible to learners. Total **30 points**. This is the capstone; the criteria reward a deliverable that actually runs.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Folder structure and file names match the assignment | 1 | Yes | submission tree |
| Dockerfile is multi-stage (two `FROM` lines, copies from builder) | 3 | Yes | `app/Dockerfile` |
| Base image is pinned and minimal (not `latest`) | 2 | Yes | `app/Dockerfile` |
| Non-root user created and used (`USER`) | 2 | Yes | `app/Dockerfile` |
| No secret values anywhere in the image definition | 2 | Yes | `app/Dockerfile` |
| `.dockerignore` excludes `.env`, `__pycache__/`, `*.pyc`, `.git` | 2 | Yes | `app/.dockerignore` |
| `compose.yaml` defines `app` and `db` services | 2 | Yes | `compose.yaml` |
| `app` builds from `./app` and publishes a host port | 1 | Yes | `compose.yaml` |
| Database data stored in a named volume | 2 | Yes | `compose.yaml` |
| `db` healthcheck plus `depends_on` with `condition: service_healthy` | 2 | Yes | `compose.yaml` |
| Sensible `restart:` policy set | 1 | No | `compose.yaml` |
| `.env.example` complete; no real `.env` submitted | 2 | Yes | files present |
| `README.md` gives run/stop commands, URL, file list, reflection | 2 | Yes | `README.md` |
| Explanations correct (properties, multi-stage, volume, secrets, DB wait) | 4 | Yes | `answers.md` |
| Evidence transcript proves data persisted across `down`/`up` | 2 | Yes | `evidence.txt` |

### Partial credit notes (assessors)

- **Fast score (≈3 minutes):** open `compose.yaml` and confirm `app` + `db`, a `volumes:` entry, a `healthcheck`, and `depends_on ... service_healthy`. Open `app/Dockerfile` and confirm two `FROM` lines, a pinned base, and `USER`.
- Multi-stage: award 1 if there are two `FROM` lines but the runtime stage still installs build tools; 0 if single-stage.
- Secrets: search the whole submission for the password string from `.env.example`; if a real secret is present, award 0 and flag it.
- Volume: award 2 if a named volume is mounted at `/var/lib/postgresql/data`. Award 1 if a bind mount is used but data still persists.
- Healthcheck: award 1 if a healthcheck exists but `depends_on` is missing the condition; 2 only if both are present.
- `answers.md`: 0.8 per correct item (five items, cap 4). The volume answer must say data would be lost because the container's writable layer is disposable (U17).
- Evidence: award 2 only if the second listing shows items added before `docker compose down`. Award 1 if the transcript is complete but truncated before the persistence check.
- Do not penalise OS-specific differences (PowerShell vs bash) in commands.
