# U25 Rubric

Visible to learners. Total **25 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Project started detached; `ps` shows running containers | 3 | Yes | `evidence.txt` Part A |
| Logs for at least one service shown | 2 | Yes | `evidence.txt` Part A |
| Restart vs rebuild demonstrated and correctly explained | 5 | Yes | `evidence.txt` Part B; `answers.md` Q1 |
| `exec` into the database works; commands shown | 3 | Yes | `evidence.txt` Part C |
| `down` run and volume-retention stated correctly | 3 | Yes | `evidence.txt` Part D; `answers.md` Q4 |
| `ps` vs `logs` roles distinguished | 2 | No | `answers.md` Q2 |
| `exec` + service name + network reasoning correct | 2 | No | `answers.md` Q3 |
| Stale-volume cause and two fixes explained | 3 | Yes | `answers.md` Q5 |
| Broken config correctly fixed with explanation | 2 | Yes | `answers.md` Q6, P5 |
| Files named correctly; checklist present | 1 | Yes | structure |

### Partial credit notes (assessors)

- Part B (5 pts): award full credit only if the learner shows that `restart` did **not** pick up the code change and `--build` did. Award 2 if they ran both but did not observe or explain the difference.
- Q5 (3 pts): award 3 for both the initialization-only cause and two sensible fixes (wipe with `down -v` if data is disposable; `ALTER USER` inside the database if it is not). Award 1 for "delete the volume" only.
- Q6/P5: the key is `port` → `ports`; award 2 for the corrected key, 1 if they identified the typo but did not show the fix.
- Q4: award full credit only if they state that plain `down` keeps named volumes and `down -v` removes them.
- Part C: accept any working `exec` command that reaches Postgres; the `psql` client is installed in the Postgres image.
- Do not penalize if the learner chose not to run `down -v` on real data — that restraint is correct.

## Evidence the assessor should look for

- `docker compose up -d` returns the terminal with `Started` lines.
- `ps` shows `Up` status and the published host port.
- Part B clearly contrasts two outcomes (unchanged then changed).
- `exec db psql ...` reaches a prompt and lists tables (empty is fine).
- `down` output does not list a volume being removed, and the learner says the data survived.
