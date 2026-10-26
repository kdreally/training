# U24 Assignment — A feature packet

Submit `U24-YourName`.

## The feature

Add `hasActiveLoan(bookId, borrower)` to shelf.

- It returns `true` when that borrower has an active loan of that book, otherwise `false`.
- It does not create a loan and does not change `borrow`.
- Comparison is `===` on both fields.
- No HTTP, no new files, no dependencies.

## Files

### 1. `specs/has-active-loan.md`

The six headings, at least three examples (true, false when returned, false when a different borrower holds the book).

### 2. `prompts/has-active-loan.txt`

One behavior. Neighbor cited. Magnet or new-file fence. Verify and stop.

### 3. `oracle.md`

The `node:test` blocks you will require before acceptance. Include one assertion that an existing error (`no-copies` or `borrower-required`) still holds, so the feature turn cannot wreck `borrow`.

### 4. `answers.md`

1. Walk the seven workflow steps for this feature in your own words. One or two sentences each.
2. A generation adds `GET /has-active-loan`. Which step failed, and do you restore or extend the prompt in place?

### 5. `checklist.md`

```markdown
- [ ] I read the U24 README.
- [ ] The prompt does not also add a route.
- [ ] I read the rubric.
```

## Definition of done

The packet is enough for a human implementer or an agent turn, and the route extra is a restore.

## Submission format

```text
U24-YourName/
  specs/has-active-loan.md
  prompts/has-active-loan.txt
  oracle.md
  answers.md
  checklist.md
```
