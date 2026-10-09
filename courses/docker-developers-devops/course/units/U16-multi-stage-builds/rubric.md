# U16 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Both Dockerfiles present and building | 3 | Yes | files + `evidence.md` |
| Multi-stage Dockerfile uses a named stage and `COPY --from=` correctly | 4 | Yes | `Dockerfile.multistage` |
| Multi-stage image is measurably smaller than single-stage | 3 | Yes | `evidence.md` (`docker images`) |
| App runs correctly from the multi-stage image | 2 | Yes | `evidence.md` |
| Why stages exist explained, including what single-stage carries unnecessarily | 3 | Yes | `answers.md` Q1 |
| `AS` and `--from` explained; name-matching explained | 2 | Yes | `answers.md` Q2 |
| Build vs runtime stage explained | 2 | No | `answers.md` Q3 |
| Final-stage rule and discarded stages explained | 1 | No | `answers.md` Q4 |

### Partial credit notes (assessors)

- The diagnostic task is the size comparison. If the two sizes are equal, the multi-stage file is not actually discarding the build work; award Q2/Q3 partial and direct them back.
- Q1: award 2/3 if they know "smaller" but cannot name *what* is being removed (toolchains, caches, intermediate files).
- Q2: award 1/2 if they use `--from` but cannot explain why the names must match.
- Q4: award 0/1 for claiming all stages become images.
- Accept a Node, Go, or other app as long as the same multi-stage principles are demonstrated. A compiled-language example (where the final stage copies a binary) is excellent evidence.
- Do not penalize a runtime stage that is only modestly smaller if the explanation of *why* is sound; the pedagogy is the pattern, not a specific percentage.

### Must-have vs nice-to-have

- A multi-stage image that is not smaller, or an app that does not run, means the core task is incomplete.
- Q3 and Q4 are nice-to-have; they deepen understanding without gating progress.
- Do not penalize imperfect English. Penalize empty answers or pasted lesson text.
