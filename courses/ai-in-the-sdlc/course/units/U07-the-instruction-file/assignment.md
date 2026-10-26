# U07 Assignment — Prose in one place, wiring in the other

Submit `U07-YourName`.

## Files

### 1. `answers.md`

1. **Define.** In your own words, define instruction prose and tool wiring. 4–6 sentences total. Say where prose lives in this course.
2. **Sort.** Label `prose`, `wiring`, or `task`:
   - Deny shell commands other than `npm test` and `node`.
   - Do not invent HTTP routes. The only route today is `GET /loans`.
   - Switch the assistant to a cheaper model for this repo.
   - Implement `countForBorrower` with tests.
   - If a behavior change is accepted, append one changelog line.
   - Do not open a network connection to a database.
3. **Other filename.** Your agent loads only `CLAUDE.md` or some other name you may invent for the answer. Show the entire contents of that other file, short, so it cannot drift from `AGENTS.md`. Then say where the real rules live.
4. **Wrong home.** A teammate puts "do not add dependencies" only as a sentence inside `package.json`'s `"description"` field. Explain why that is a weak home. 3–5 sentences.

### 2. `tool-notes.md`

Write two bullets a future you can use. You do **not** need a real product:

- Which file will hold prose on your team (`AGENTS.md`).
- Where you will look, when you choose a tool, for command permissions (say "the product's settings," and name the two facts from the README: does it load `AGENTS.md`, and where do permissions live).

If you already use a local agent, you may name it here and answer those two facts for real. That is welcome. It is not required.

### 3. `checklist.md`

```markdown
- [ ] I read the U07 README.
- [ ] I did not invent a JSON schema and call it required.
- [ ] I read the rubric.
```

## Definition of done

Q2 has six labels. Q3 shows a short pointer file, not a second copy of a long policy.

## Submission format

```text
U07-YourName/
  answers.md
  tool-notes.md
  checklist.md
```
