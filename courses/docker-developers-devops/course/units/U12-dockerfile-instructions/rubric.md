# U12 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Dockerfile builds successfully from a clean build | 4 | Yes | `Dockerfile` + `evidence.md` |
| App is reachable and returns the expected greeting | 3 | Yes | `evidence.md` (curl/browser) |
| All six required instructions used correctly (`FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`) | 3 | Yes | `Dockerfile` |
| Instruction map correct, including build-time vs run-time | 3 | Yes | `answers.md` Q1 |
| `RUN` vs `CMD` explained correctly | 2 | Yes | `answers.md` Q2 |
| `EXPOSE` vs `-p` explained correctly | 2 | No | `answers.md` Q3 |
| COPY ordering explained (reasoned guess accepted) | 1 | No | `answers.md` Q4 |
| Debug task shows error + working fix | 2 | No | `answers.md` Q6 + `evidence.md` |

### Partial credit notes (assessors)

- Build: if it builds only after the learner fixes it, award full marks and note that iterating is expected. If it never builds, the must-have rows cannot be met.
- Instruction map: award 1/3 if meanings are right but build-time/run-time is muddled (the most common error puts `RUN` at run time).
- Q2: award 1/2 if they describe "RUN makes the image, CMD runs the container" but cannot say what happens if `RUN` launches a server (the build hangs).
- Q6: award 1/2 for the error alone without diagnosis.
- Do not penalize a different but valid app (Node, plain Python `http.server`, etc.) as long as all six instructions are used meaningfully.
- Do not penalize imperfect English. Penalize empty answers or pasted lesson text.

### Must-have vs nice-to-have

- A failed build or an unreachable app means the unit is not yet complete regardless of the written answers.
- Nice-to-have rows can be missing at a small point cost; they are not grounds to fail the unit.
