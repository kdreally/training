# U04 Assignment — The folder is the first fence

Submit `U04-YourName`.

## Files

### 1. `answers.md`

1. **Explain.** In 5–8 sentences, explain why a local coding agent must be started in the project root. Include home directory, parent folder, and `src/` as three wrong starts, each with a distinct consequence.
2. **Predict, then prove.** Write, before you run a command, the path ending you expect for the shelf root on your machine. Then go there and run `pwd` or `Get-Location`. Paste the output under `What actually happened`. If you could not find the folder, paste the command you used and what you saw.
3. **Diagnose.** An agent transcript begins:

```text
Current directory: D:\work
Read src/loans.js → error, not found
Created src/loans.js
Created package.json
Command npm install express
```

The human meant to work in `D:\work\shelf`, which already has a `package.json` and no dependencies. Write a short diagnosis: what went wrong, which files are now suspect, and what you would do before any second prompt. Do not say "the AI broke."

### 2. `checklist.md`

```markdown
- [ ] I read the U04 README.
- [ ] Question 2 has a prediction before the pasted output.
- [ ] I read the rubric.
```

## Definition of done

Q1 covers three wrong starts. Q3 names the suspect files and a next action that is not "prompt again from the same folder."

## Submission format

```text
U04-YourName/
  answers.md
  checklist.md
```
