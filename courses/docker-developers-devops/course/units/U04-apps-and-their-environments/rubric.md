# U04 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Environment spec complete (runtime, two libraries, manifest, two config values, port, one OS bit) | 6 | Yes | `environment-spec.md` spec block |
| Runtime, dependency, environment variable, port defined correctly and plainly | 4 | Yes | Q1 |
| Prediction recorded, compared, and meaning of the error correct | 3 | No | Q2 |
| Missing-library and port-in-use failures both described with expected messages | 4 | Yes | Q3 |
| Drift explained using three or more environment parts | 4 | Yes | Q4 |
| Flawed reasoning identified (presence vs version / mismatch, not code) | 3 | Yes | Q5 |
| Files named correctly; checklist present and honest | 0 (gate) | Yes | folder / zip structure |

The last row is a **gate**, not points. Flag missing or misnamed files to the learner without reducing the total out of 24.

### Partial credit notes (assessors)

- Spec: award 1 point per complete line (maximum 6). A line naming a value with no version earns half. "Does not listen" on Port is a valid answer for non-web apps.
- Q1: award 3/4 if three of four terms are correct; 0 if definitions are copied verbatim from the vocabulary table.
- Q2: award 1/3 if a prediction exists but is vague; award full for a wrong-but-reasoned prediction. The key marker is that the error is about a **missing library**, not about the runtime being absent.
- Q3: port-in-use is the commonly confused one. Full marks only if the learner says another program is occupying the door, not that the code is buggy.
- Q4: award 2/4 if only one or two environment parts are used.
- Q5: award 1/3 if they say "they should reinstall again" without naming versions.
- Do not penalize imperfect English. Penalize pasted lesson text with no personalization.

### Platform note

Accept any runtime, libraries, manifest, and port the learner chooses, as long as the spec is internally consistent. A Node.js app with `package.json`, port 3000, and `npm` libraries is as valid as the Python example.
