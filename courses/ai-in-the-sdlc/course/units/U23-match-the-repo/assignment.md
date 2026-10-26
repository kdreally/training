# U23 Assignment — Join the file, do not replace it

Submit `U23-YourName`.

## Files

### 1. `mismatch.md`

Review this generation. The allow list was `src/loans.js` and `test/loans.test.js`. No new packages appeared.

```javascript
export class LoanCounter {
  count(name) {
    if (!name) throw new Error("Borrower required");
    return activeLoans().filter((loan) => loan.borrower === String(name)).length;
  }
}
```

The diff also exports `loans` and changes `borrow`'s blank-name branch to `throw new Error("Borrower required")`. Tests were updated to `expect` throws. (There is no `expect` in shelf's runner; they imported a different assertion style in the test file.)

Write a mismatch table of at least five rows. End with accept or restore.

### 2. `prompts/retry.txt`

The tighten prompt for one retry: match fences, behavior fences, verify, stop. One behavior: `countForBorrower`.

### 3. `answers.md`

1. Why can this generation be green and still wrong?
2. When would a class be legitimate in this repo? One short paragraph.

### 4. `checklist.md`

```markdown
- [ ] I read the U23 README.
- [ ] My decision is restore.
- [ ] I read the rubric.
```

## Definition of done

The retry prompt would reject a throw, a class, an exported `loans` array, and a test-runner change.

## Submission format

```text
U23-YourName/
  mismatch.md
  prompts/retry.txt
  answers.md
  checklist.md
```
