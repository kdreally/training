# U28 Assignment — Score the change, not the agent

Submit `U28-YourName`.

## The turn

Spec required:

- `countForBorrower` in `src/loans.js`
- `"Asha"` → `1` after one loan, `"asha"` → `0`
- files: `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md` only
- no dependencies
- old tests kept
- one behavior changelog line

What you observed:

- `npm test` printed `# fail 0`, `# tests 1`
- diff adds `src/services/LoanService.js` and a lodash dependency
- the only test checks `typeof n === "number"`
- `test/loans.test.js` is gone
- changelog says `- modernized loans`
- the report says "All acceptance criteria met."

## Files

### 1. `evaluation.md`

A sheet with one row per criterion above (at least six rows) plus the two standing rows from the README (policy file not turned into a ticket; no secrets). Columns: criterion, pass/fail/not checked, evidence. End with `Overall:` and the next action (restore or accept).

### 2. `answers.md`

1. Why is `# tests 1` and `# fail 0` not an overall pass?
2. Why is "the structure is elegant" not a row unless the spec made it one?
3. Which failed rows become tighten-lines on the retry prompt? List them.

### 3. `checklist.md`

```markdown
- [ ] I read the U28 README.
- [ ] Overall is fail.
- [ ] Evidence quotes a file or the test summary, not the agent's report alone.
- [ ] I read the rubric.
```

## Definition of done

A teammate who did not see the session would refuse the merge after reading your sheet.

## Submission format

```text
U28-YourName/
  evaluation.md
  answers.md
  checklist.md
```
