# U28 Rubric

Visible to learners. Total **22 points**. Must-have criteria decide pass/fail.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Names three real hand-building pain points, each mapped to a pipeline step | 4 | Yes | `answers.md` Q1 |
| Explains build → test → push and the gating role of test | 4 | Yes | `answers.md` Q2 |
| Explains CI in plain language without jargon-dumping | 3 | Yes | `answers.md` Q3 |
| Understands reproducibility needs more than pinned versions | 2 | No | `answers.md` Q4 |
| Correctly explains secrets handling and token rotation | 3 | Yes | `answers.md` Q5 |
| Diagnoses the "works on laptop, missing module on runner" case | 2 | Yes | `answers.md` Q6 |
| `pipeline.md` has correct stage order and plausible commands | 3 | Yes | `pipeline.md` |
| Files named correctly; checklist present | 1 | Yes | folder/zip structure |

## Partial credit notes (assessors)

- Q1: award 2/4 if pain points are real but not linked to a pipeline step.
- Q2: award 2/4 if stages are correct but the *why test-before-push* reasoning is missing.
- Q3: award 1/3 for a restatement that still leans on "continuous." Look for "checks every change automatically."
- Q4: acceptable extra conditions include: starting from a clean environment, committing all inputs, reproducible dependency resolution (lockfiles), not depending on host state.
- Q5: must mention rotation ("regenerate/replace the token"), not only deletion.
- Q6: cause = host-installed dependency; fix = install test deps inside the image/stage.

## Common wrong-but-thoughtful answers

- "Automation is only for big companies." Reasonable, and worth addressing directly in feedback — the free GitHub Actions tier exists precisely for small projects.
- "The pipeline should push first so people can get the image sooner." Thoughtful, but explain why shipping an untested image is the exact failure the pipeline prevents.
