# U22 Rubric

Visible to learners. Total **25 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `compose.yaml` is valid YAML with correct indentation and required keys | 4 | Yes | `project/compose.yaml` |
| Service is built from the local Dockerfile and named `web` | 3 | Yes | `project/compose.yaml` |
| Port mapping is host 8081 → container 8000 | 3 | Yes | `project/compose.yaml` |
| `GREETING` environment variable set to include the learner's name | 2 | Yes | `project/compose.yaml`, `project/app.py` |
| Project actually starts and the site is reached (evidence) | 5 | Yes | `evidence.txt` (and optional `evidence.png`) |
| Accurate line-by-line explanation of the four keys | 3 | Yes | `answers.md` Q1 |
| Correct host/container port direction and browser URL | 2 | No | `answers.md` Q2 |
| Clear distinction between `image:` and `build:` | 2 | No | `answers.md` Q3 |
| Debug task correctly identifies indentation/placement and fixes it | 2 | Yes | `answers.md` Q5 |
| Explains why the default network exists | 1 | No | `answers.md` Q6 |
| Files named correctly; checklist present | 1 | Yes | structure |

### Partial credit notes (assessors)

- Evidence: award 3/5 if the project clearly started but reaching the site is not shown; award 0 if there is no sign it was run at all. Do not accept a README screenshot as evidence.
- Q4: the key insight is that `environment` is applied when the **container** is created/recreated, not baked into the image, so no rebuild is needed. Award 1/2 for "no rebuild" without reasoning.
- Q5: the core bug is that the service name `web` is not indented under `services:`, and `ports` is misaligned. A fix that runs earns 2/2; a fix that solves only one of the two errors earns 1/2.
- Q1: award 2/3 if two keys are vague; 0 if definitions are copied verbatim from the lesson with no personal phrasing.

## Evidence the assessor should look for

- `evidence.txt` should show a `docker compose up` creation line (`Network ... Created`, `Container ... Created`) and a real HTTP response (a line of HTML or the greeting text from `curl`).
- The `GREETING` value in `compose.yaml` or `app.py` must be personalized, not the lesson default.
