# U25 Assignment — Change borrow, keep the old rules

Submit `U25-YourName`.

## The request

```text
Same person shouldn't be able to take two of the same book.
Different people still share when there are copies.
Don't break the one-copy books.
```

## Files

### 1. `specs/already-borrowed.md`

A change-request spec: stays, changes, and a conflict example for Asha borrowing `b2` twice. Six headings. Non-goals: no HTTP, no rewrite of `returnLoan`, no new error except `already-borrowed`.

### 2. `keep.md`

Bullet list of results that must remain true, each as a concrete call and error string or `ok: true`.

### 3. `prompts/already-borrowed.txt`

Prompt with a behavior fence quoting at least one keep, a file fence, verify, and stop ("do not edit existing expected error strings").

### 4. `answers.md`

1. How this packet differs from a new-feature packet. 4–6 sentences.
2. The agent replaces the copies check with the duplicate check and updates the old test so Ben's borrow of `b2` expects `ok: true`. Walk stop → restore → tighten in a short paragraph.

### 5. `checklist.md`

```markdown
- [ ] I read the U25 README.
- [ ] The conflict case is an example, not a vibe.
- [ ] I read the rubric.
```

## Definition of done

A diff that drops `no-copies` fails your spec by a quoted example.

## Submission format

```text
U25-YourName/
  specs/already-borrowed.md
  keep.md
  prompts/already-borrowed.txt
  answers.md
  checklist.md
```
