# U24 Rubric

Visible to learners. Total **25 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `compose.yaml` uses `${...}` for all configurable values, no hard-coded secrets | 5 | Yes | `project/compose.yaml` |
| `.env` defines the required keys with sensible values | 3 | Yes | `project/.env` |
| `.env.example` has the same keys with placeholders | 3 | Yes | `project/.env.example` |
| `.gitignore` ignores `.env` and allows `.env.example` | 2 | Yes | `project/.gitignore` |
| Project starts and the app reports a successful DB connection | 4 | Yes | `evidence.txt` |
| Evidence uses `config --quiet` and avoids printing secrets | 2 | Yes | `evidence.txt` |
| Configuration vs secret clearly distinguished with examples | 3 | Yes | `answers.md` Q1 |
| Interpolation and precedence explained correctly | 2 | No | `answers.md` Q2, Q4 |
| `.env` vs `env_file:` difference explained correctly | 2 | Yes | `answers.md` Q3 |
| Explains why baked-in secrets persist in image layers | 3 | Yes | `answers.md` Q5, Q6 |
| Explains why `.gitignore` cannot retroactively protect a commit | 1 | No | `answers.md` Q7 |
| Files named correctly; checklist present | 1 | Yes | structure |

### Partial credit notes (assessors)

- Secrets in Compose (5 pts): award 3 if most values are interpolated but one secret remains literal; award 0 if all values are still hard-coded.
- Evidence (2 pts): award 0 if the learner pasted full `config` output containing a real password, even if everything else is correct — this is the exact habit the unit teaches against. Award 1 if they used `config --quiet` but did not say why.
- Q3: award 1/2 if they know both involve variables but cannot say who reads each file.
- Q5/Q6: award full credit for identifying that image layers are permanent and readable; award 1/3 if they only say "it's unsafe" with no layer reasoning.
- Q4: the correct answer is that the shell environment wins over `.env`; award 1/2 for "shell wins" with no test idea.
- Note: a mild, honest password in the submitted `.env` is fine and expected for grading.

## Evidence the assessor should look for

- `compose.yaml` contains `${POSTGRES_USER}`, `${POSTGRES_PASSWORD}`, `${POSTGRES_DB}`, and `${WEB_HOST_PORT}`.
- `.gitignore` includes `.env` but not `.env.example` (or explicitly negates it).
- `evidence.txt` shows a `config --quiet` run and a successful app response, and explicitly avoids exposing the password.
