# U17 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Explains why container data is temporary, using *writable layer* correctly | 4 | Yes | `answers.md` Q1 |
| Distinguishes named volume from bind mount and gives a fitting use for each | 4 | Yes | `answers.md` Q2 |
| Predicts the read-back output correctly and runs it; explains any mismatch | 3 | Yes | `answers.md` Q3 |
| Decodes one plausible failure and names a sensible first check | 3 | Yes | `answers.md` Q4 |
| Explains the database case and how a volume changes it | 3 | Yes | `answers.md` Q5 |
| Transcript shows a real run where data survives container removal | 2 | Yes | `transcript.md` |
| Reflects honestly on a remaining confusion | 1 | No | `answers.md` Q6 |
| Files named correctly; checklist present and honest | 2 | Yes | folder structure |

### Partial credit notes (assessors)

- Q1: award 2/4 if they only say "containers are temporary" without connecting it to the container's own filesystem/writable layer.
- Q2: award 2/4 if they describe the two correctly but cannot give a realistic situation for either.
- Q3: award 1/3 if the prediction is absent but the run and output are present; award 0 if no real run is shown.
- Q4: any plausible error is acceptable **if** the reasoning is sound (for example, `Permission denied` → check which user the container runs as; or `No such volume: logs` → check the name was created). Do not require a specific error; reward correct reasoning.
- Q5: the key idea is that data in the writable layer is destroyed on `docker rm`, while a named volume at the data folder preserves it. Award full marks only if both halves are present.
- Do not penalize imperfect English. Penalize empty answers or lesson text pasted back with no personalization.
