# U30 Rubric

Visible to learners. Total **24 points**. Must-have criteria decide pass/fail.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Reports real before/after image sizes | 4 | Yes | `evidence.md` |
| Documents a cleanup with reclaimed space and surviving tagged images | 3 | Yes | `evidence.md` |
| Explains two concrete costs of large images | 3 | Yes | `answers.md` Q1 |
| Distinguishes dangling vs tagged-unused images | 3 | Yes | `answers.md` Q2 |
| Correctly separates `prune` from `prune -a` with a use case each | 3 | Yes | `answers.md` Q3 |
| Names three slimming levers from correct earlier units | 3 | Yes | `answers.md` Q4 |
| Reads a scan by severity and base image, not by panic | 2 | No | `answers.md` Q5 |
| Predicts size drop and names a real Alpine risk | 1 | No | `answers.md` Q6 |
| Diagnoses the over-aggressive prune and recovery | 2 | Yes | `answers.md` Q7 |

### Bonus (nice-to-have, up to +2, not required to pass)

- Includes a real scan summary (Scout or Trivy): +2.

## Partial credit notes (assessors)

- Evidence: award 2/4 if only one size is reported; 0 if numbers are clearly fabricated (identical "before/after" with a claimed change).
- Q2: require that dangling = untagged, and that plain prune does not touch tagged images.
- Q3: `prune` = routine, `-a` = clean slate / reclaim when nothing is running that you need.
- Q4: three of — smaller base (U16/U27), multi-stage (U16), `.dockerignore` (U13), combining RUN/cache cleanup.
- Q5: must mention prioritizing CRITICAL/HIGH and fixing the base image first. "120L" is low priority because of volume, not because low is meaningless.
- Q7: cause = `-a` removes all unused images including tagged ones; recovery = rebuild from Dockerfile or re-pull from registry.

## Integrity flags

- Claimed scan output with a malformed `Total:` line.
- Secret or token in the submission.

## Common wrong-but-thoughtful answers

- Believing `prune -a` only removes dangling images — very common; correct it clearly.
- Thinking "all CVEs must be fixed before pushing" — reassure: prioritize by severity and reachability.
