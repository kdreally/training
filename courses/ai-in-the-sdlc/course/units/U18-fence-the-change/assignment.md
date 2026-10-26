# U18 Assignment — Draw the fence

Submit `U18-YourName`.

## Files

### 1. `prompts/overdue-fenced.txt`

Write a prompt that implements `specs/overdue-loans.md`. You do not have to write the full spec. The prompt must stand alone as a fence:

- closed allow list of real shelf paths,
- dependency fence that names date-library magnets,
- a clock ban,
- behavior fences for at least two existing error strings,
- server.js forbidden,
- verify and stop from U16.

### 2. `answers.md`

1. Explain why "do not edit server.js" alone would not have stopped `src/services/LoanService.js`.
2. A bug is in `src/server.js`: `GET /loans` returns 500 because of a typo in the path string. Why is "forbidden: server.js" the wrong fence? Write the replacement allow list and one behavior fence.
3. List three magnets (the words) and one package each, from your own experience or from this unit. Mark imagined examples as imagined.

### 3. `checklist.md`

```markdown
- [ ] I read the U18 README.
- [ ] My allow list is closed (no other files).
- [ ] I read the rubric.
```

## Definition of done

The U17 Express rewrite and the date-fns import are each banned by a line a reviewer can quote.

## Submission format

```text
U18-YourName/
  prompts/overdue-fenced.txt
  answers.md
  checklist.md
```
