# U10 Assignment — Write shelf's standing file

Submit `U10-YourName`.

## Files

### 1. `AGENTS.md`

Write the standing instructions you would commit to the shelf root. Use your own sentences. The worked file in the README is a reference for coverage, not a text to paste unchanged.

The file must:

- map the real shelf paths and the test command,
- state that there are no npm dependencies,
- fence files,
- ban new dependencies and installs,
- ban database and network access,
- ban secrets,
- require matching the existing result-object style,
- require tests and forbid weakening them,
- tell the agent to stop on a conflict,
- limit commands,
- define the changelog rule as one line per accepted behavior change.

### 2. `answers.md`

1. Explain three bullets in your file: what bad diff each one is there to catch. Use a concrete shelf example for each.
2. A colleague pastes your file into a Python repo unchanged. What breaks, and what would you keep? 4–6 sentences.
3. **Predict.** If this file is loaded and the prompt is only "make loans nicer," what should the agent do under your honesty or file-scope rule? Predict in 3–4 sentences. There is no tool to run. The prediction is the answer.

### 3. `checklist.md`

```markdown
- [ ] I read the U10 README.
- [ ] My AGENTS.md is not a word-for-word paste of the worked file.
- [ ] No sprint tickets are in the file.
- [ ] I read the rubric.
```

## Definition of done

A reviewer who has never seen the worked file could still enforce your bullets on a diff.

## Submission format

```text
U10-YourName/
  AGENTS.md
  answers.md
  checklist.md
```
