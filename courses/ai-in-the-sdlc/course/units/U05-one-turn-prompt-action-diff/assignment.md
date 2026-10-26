# U05 Assignment — Narrate a turn

Submit `U05-YourName`.

## Files

### 1. `answers.md`

1. **Define a turn.** 4–6 sentences. Include prompt, actions, diff, and the human decision. Say what a session is in contrast to a turn, briefly.
2. **Narrate.** Using this record, write the six steps. For step 6, choose accept or restore and justify with the file list, not with the report.

```text
git status at start: clean
prompt: "In src/loans.js, reject borrow when the borrower already has that bookId out. Add a test. Error string: already-borrowed."
actions: Read src/loans.js; Edit src/loans.js; Edit test/loans.test.js; Edit src/server.js; Command npm test
npm test: pass 7, fail 0
report: "Added the already-borrowed rule and returned it from GET /loans for convenience. Tests pass."
```

3. **Dirty tree.** You had an uncommitted hand edit in `src/server.js` before the prompt above. Explain, in 4–6 sentences, why the `server.js` line in the file list is now hard to judge, and what you will do differently next time.
4. **Predict.** You restore every file from this turn and run the original six shelf tests. Predict pass count and fail count. Then, if Node is available, run `npm test` in `course/examples/shelf` (the untouched example). Paste the summary line under `What actually happened`. If you cannot run it, say so, and still give the prediction with a reason.

### 2. `checklist.md`

```markdown
- [ ] I read the U05 README.
- [ ] My decision in question 2 cites a file, not only the report.
- [ ] Question 4 has a prediction before any pasted output.
- [ ] I read the rubric.
```

## Definition of done

Q2 ends in a decision. Q3 talks about mixed authorship of a diff. Q4 has a number.

## Submission format

```text
U05-YourName/
  answers.md
  checklist.md
```
