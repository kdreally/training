# U29 Rubric

Visible to learners. Total **26 points**. Must-have criteria decide pass/fail.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Workflow file valid, correctly located at `.github/workflows/`, right trigger | 5 | Yes | `workflow.yml` |
| Includes checkout + build steps | 4 | Yes | `workflow.yml` |
| At least one successful run documented | 4 | Yes | `evidence.md` |
| Explains workflow / job / step with own examples | 4 | Yes | `answers.md` Q1–Q2 |
| Explains `uses:` vs `run:` correctly | 3 | Yes | `answers.md` Q3 |
| Explains checkout step's role | 2 | Yes | `answers.md` Q4 |
| Correctly explains secrets masking and rotation-free safety | 2 | Yes | `answers.md` Q5 |
| Predicts missing-secret failure with the right error | 1 | No | `answers.md` Q6 |
| Diagnoses "workflow never ran" | 1 | No | `answers.md` Q7 |

### Bonus (nice-to-have, up to +4, not required to pass)

- Push-to-Docker-Hub half completed with secrets (no token exposed): +4.

## Partial credit notes (assessors)

- Workflow: award 3/5 if it builds correctly but the trigger is missing or wrong.
- Evidence: award 2/4 if the run happened but step-by-step evidence is thin; award 0 if invented.
- Q2: must include *both* "at `.github/workflows/`" and "ignored elsewhere."
- Q3: require that `uses:` references a prebuilt action and `run:` is a shell command. Blurring them costs 2.
- Q5: masking (`***`) and "never committed" are the two required ideas.
- Q6: accept `Error: Username and password required` or `denied`; the fix is creating/matching the secret name.

## Integrity flags

- A token or password anywhere in the submission — do not grade the push half, and tell the learner to rotate the token immediately.
- An `evidence.md` digest or run URL that does not resolve.

## Common wrong-but-thoughtful answers

- Putting the workflow at the repo root "so it is easier to find" — genuinely logical; explain GitHub's fixed path.
- Thinking `actions/checkout` downloads Docker images — it downloads the repository, not images.
