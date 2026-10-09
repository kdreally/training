# U13 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `.dockerignore` present in the context root and syntactically sensible | 4 | Yes | `.dockerignore` |
| Excludes `.git`, a dependency folder, and a secrets file | 3 | Yes | `.dockerignore` |
| Includes a comment and a working negation (`!`) rule | 2 | No | `.dockerignore` |
| Build-context is defined correctly, including what `COPY` can reach | 4 | Yes | `answers.md` Q1 |
| Two costs of a large context explained accurately | 3 | Yes | `answers.md` Q2 |
| Secret-leak path and the limits of `.dockerignore` explained | 2 | No | `answers.md` Q3 |
| Placement rule explained, including the subfolder failure | 2 | No | `answers.md` Q4 + Q5 |
| Before/after context-size evidence present | 1 | No | `evidence.md` |

### Partial credit notes (assessors)

- Q1: award 2/4 if they say "the files you copy" — that describes a symptom, not the context. Ask for a corrected version.
- Q2: award 1/3 for only one cost, or for "it is just slower" without connecting size to transfer or to secrets.
- Q3: award 1/2 if they know secrets can leak but claim `.dockerignore` removes them from images that already exist. It does not.
- Placement: the subfolder failure is the diagnostic. If they cannot say what happens, award 1/2.
- Evidence: accept any honest before/after numbers; do not compare to the lesson's exact figure.

### Must-have vs nice-to-have

- Missing `.dockerignore` or a file that excludes nothing means the must-have rows fail.
- A correct `.dockerignore` with a cosmetic issue (for example, a pattern that excludes slightly too little) still passes; note it rather than failing.
- Do not penalize imperfect English. Penalize empty answers or pasted lesson text.
