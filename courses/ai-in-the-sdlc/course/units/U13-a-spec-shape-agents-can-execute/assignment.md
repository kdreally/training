# U13 Assignment — Write a spec in the shape

Submit `U13-YourName`.

## Files

### 1. `specs/already-borrowed.md`

Write a spec, using the six headings, for this feature:

> A borrower cannot have two active loans of the same book. A second `borrow` of the same `bookId` and same borrower returns `{ ok: false, error: "already-borrowed" }`. Copies still matter for *different* borrowers. `b1` has two copies, so Asha and Ben may both hold `b1`. Asha may not hold `b1` twice. Do not change HTTP. Do not add dependencies. Existing error codes stay.

Make the behavior section include at least three concrete calls and return values. Choose files that match shelf.

### 2. `answers.md`

1. Which non-goals did you include, and which agent habit is each one blocking?
2. Show a worse Behavior section you almost wrote (one or two sentences of wish or implementation), and the replacement you kept.
3. Why is "Done: the model says it is finished" not a Done section?

### 3. `checklist.md`

```markdown
- [ ] I read the U13 README.
- [ ] My spec has all six headings.
- [ ] I did not include a function body.
- [ ] I read the rubric.
```

## Definition of done

A developer who has not heard you explain the feature could implement it from the spec alone, or could reject a diff that added Express.

## Submission format

```text
U13-YourName/
  specs/already-borrowed.md
  answers.md
  checklist.md
```
