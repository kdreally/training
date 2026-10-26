# U28 Assessor notes

Assessor-only.

## Sheet

- Asha count 1: fail or not checked. No such assertion. Do not pass.
- asha count 0: fail. Not asserted. Implementation not even shown; the service file's existence is not proof of case-folding. Fail for missing evidence is correct. If they pass it, that is a problem.
- Files: fail. `src/services/LoanService.js`.
- Dependencies: fail. lodash.
- Old tests: fail. loans.test.js gone. `# tests 1` is the evidence.
- Changelog: fail. "modernized loans" is not the behavior.
- Policy file: not checked unless they invent a diff. not checked is acceptable.
- Secrets: not checked or pass only if they say the observed diff had none. A pass with evidence "no .env in the stat I was given" is fine.

Overall: fail. Restore.

## Q1

One weak test replaced the suite. Green means that test passed. Spec examples were not run because they do not exist and the old file is gone.

## Q2

No elegance criterion in the spec. Adding one after the fact to justify a service layer is moving the goalposts.

## Q3

Tighten: no new files, no lodash, do not delete test/loans.test.js, assert asha → 0, changelog must describe the count, tests must be more than the old suite not fewer.

## Common weak submissions

- Overall "conditional pass."
- Evidence column is "report said criteria met."

## Partial credit

Marking the Asha count as "not checked" rather than fail is honest and should get credit. Marking it pass is not.
