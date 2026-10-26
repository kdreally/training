# U20 Assignment — Install an oracle

Submit `U20-YourName`.

## Files

### 1. `test-notes.md`

Write three `node:test` tests (full `test(...)` blocks, with imports listed once) that you would require before accepting code:

1. `countForBorrower("asha")` is `0` after `borrow("b1", "Asha")`, and `countForBorrower("Asha")` is `1`.
2. `already-borrowed` for a second active `b1` loan by Asha, while Ben may still borrow `b1`.
3. One existing contract you refuse to weaken: blank borrower, or `no-copies` on `b2`. Quote the error string in the assertion.

Use `resetLoans()` in each test. Do not import lodash or express.

### 2. `answers.md`

1. Explain why a green `typeof === "number"` test is not an oracle for the count feature. 4–6 sentences.
2. **Predict, then run.** Predict pass and fail counts for unmodified shelf. Run `npm test` in `course/examples/shelf`. Paste the summary under `What actually happened`.
3. An agent changes the expected error in test 3 from `no-copies` to `unavailable` and says the suite is now consistent. Is that acceptance? What do you restore?

### 3. `checklist.md`

```markdown
- [ ] I read the U20 README.
- [ ] My tests name concrete error strings or numbers.
- [ ] Question 2 has a prediction before the paste.
- [ ] I read the rubric.
```

## Definition of done

Someone could drop your tests into shelf, implement the two features, and know what "pass" means. The baseline run is documented.

## Submission format

```text
U20-YourName/
  test-notes.md
  answers.md
  checklist.md
```
