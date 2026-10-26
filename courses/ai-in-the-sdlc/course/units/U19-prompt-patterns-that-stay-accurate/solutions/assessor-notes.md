# U19 Assessor notes

Assessor-only.

## count.txt

One function. Neighbor: `activeLoans` or `borrow`. Example: after `borrow("b1","Asha")`, count is 1, and `countForBorrower("asha")` is 0. Fence: no new files, no lodash, no server. `npm test`. Stop without weakening tests.

## not-this.txt

All seven items fail, or item 1 fails because there is no spec and no single contract. "Think hard" is not verify. A learner who passes item 7 because "perfect implies tested" is wrong; award at most 2/4.

## Answers

- Class in `src/services`: pattern 2 (cite neighbor, no class) and pattern 1 / file fence. Accept either if the mechanism is right. Best answer uses the neighbor citation plus "no new files."
- Case-folding: pattern 3, the explicit example.
- "Handle returns properly" splits into, for example, `returnAll("Asha")` returns both loans, postponed: HTTP.

## Common weak submissions

- `count.txt` also updates `GET /loans`.
- Persona sentence added "because the unit mentioned it," despite the unit retiring it.
- Checklist marks the proverb prompt as mostly passing.

## Partial credit

An extra second example in the prompt is fine. A third feature is not.
