# U23 Rubric

Visible to learners. Total **25 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `compose.yaml` has two services named `web` and `database` with valid YAML | 3 | Yes | `project/compose.yaml` |
| `web` builds locally; `database` uses `postgres:16-alpine` | 3 | Yes | `project/compose.yaml` |
| `web` maps host 8083 → container 8000 | 2 | Yes | `project/compose.yaml` |
| `DB_HOST` points at the service name; `DB_PORT` is `"5432"` | 3 | Yes | `project/compose.yaml` |
| `depends_on` makes `web` start after `database` | 2 | Yes | `project/compose.yaml` |
| Named volume mounted at `/var/lib/postgresql/data`; declared top-level | 4 | Yes | `project/compose.yaml` |
| Project starts and the app reports a successful DB connection | 5 | Yes | `evidence.txt` |
| Correct explanation of service name vs `localhost` | 2 | No | `answers.md` Q1 |
| `depends_on` order-not-readiness explained accurately | 2 | No | `answers.md` Q2 |
| Explains why the database is not published | 1 | No | `answers.md` Q4 |
| Debug task correctly identifies the wrong mount path and fixes it | 3 | Yes | `answers.md` Q6 |
| Top-level vs per-service `volumes:` distinguished | 2 | No | `answers.md` Q7 |
| Files named correctly; checklist present | 1 | Yes | structure |

### Partial credit notes (assessors)

- Connection evidence (5 pts): award 3 if the project starts and the web page loads but the DB-reached message is absent; award 0 if there is no run evidence.
- Q6: the bug is the mount path `/data` instead of `/var/lib/postgresql/data`. Award 3 for a correct fix with explanation; 2 if the fix is right but explanation is missing; 1 if they only say "wrong path" without the correct path.
- Q1: award 1/2 if they say "use the service name" without explaining that `localhost` means the current container.
- Q2: award 1/2 if they only state the order guarantee and omit the readiness limitation.
- Q7: award 1/2 if they can say the top-level key "defines" the volume but not that the service list "mounts" it.
- Accept any reasonable user/DB/password values; only path, service names, and wiring are graded.

## Evidence the assessor should look for

- `evidence.txt` should show `Container ... database ... Started` (or similar) and a response containing `OK: reached database at database:5432`.
- The `down` output should remove containers and network but **not** the named volume.
- A first-request `FAIL` followed by a later `OK` is acceptable evidence if the learner explains the readiness gap.
