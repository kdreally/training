# U27 Assignment — Evidence before edits

Submit `U27-YourName`.

## The output

```text
not ok 2 - blank borrower is rejected
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal.
  + actual - expected

  + { ok: true, loan: { bookId: 'b1', borrower: '', returned: false } }
  - { ok: false, error: 'borrower-required' }
```

The test called `borrow("b1", "   ")`. Six other tests passed. You have not been shown the function body.

## Files

### 1. `prompts/debug-blank.txt`

A debug prompt. It must include what the failure proves, a request for one hypothesis and a quoted condition, and a ban on editing files, adding packages, and rewriting the test.

### 2. `answers.md`

1. What the output proves, and two things it does not prove.
2. You then read this line in `borrow`:

```javascript
if (!borrower || borrower.trim() === "") {
  return { ok: true, loan: { bookId, borrower: borrower.trim(), returned: false } };
}
```

Is the hypothesis "the blank check returns success" confirmed? What workflow do you switch to, and what is the smallest fix? Do not redesign validation.

3. Give an example of thrash for this bug (two or three edits). Say what you do instead after a second wrong hypothesis.

### 3. `checklist.md`

```markdown
- [ ] I read the U27 README.
- [ ] My debug prompt forbids file edits.
- [ ] I read the rubric.
```

## Definition of done

Nobody following your prompt could honestly reply with a 200-line rewrite as the first action.

## Submission format

```text
U27-YourName/
  prompts/debug-blank.txt
  answers.md
  checklist.md
```
