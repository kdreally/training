# U13 Assignment — Slim down the build context

Submit the following to your trainer in **one folder or zip** named:

`U13-YourName`

## Files to submit

### 1. `.dockerignore`

A real `.dockerignore` file for the app you worked with in U11–U12 (or another small app of your choice). It must:
- Exclude at least `.git`, a dependency folder, and a secrets file.
- Include at least one comment line.
- Include at least one negation (`!`) rule.

### 2. `answers.md`

Answer in your own words.

1. **Context definition.** In 3–5 sentences, explain what the build context is. Include what `COPY` can and cannot reach.
2. **Two costs.** Name and explain two problems caused by a large or careless context.
3. **Secrets.** Explain how a `.env` file could end up inside a shared image, and what `.dockerignore` does and does not fix about that.
4. **Placement.** Explain where `.dockerignore` must live and why. Describe what happens if it lives in a subfolder.
5. **Negation.** Show your `!` rule and explain in 1–2 sentences why its position in the file matters.
6. **Prove it.** Describe (or show) one command you used to confirm a file was excluded from the context or absent from the image.

### 3. `evidence.md`

Paste the reported build-context size from one build **before** you added `.dockerignore` and one **after**. The absolute numbers can differ from the lesson's; what matters is that they changed.

### 4. `checklist.md`

Copy and mark `[x]` when true:

```markdown
- [ ] I read the U13 README fully (not only the assignment).
- [ ] My `.dockerignore` is in the root of the build context.
- [ ] I saw the reported context size change after adding it.
- [ ] I can explain why a secret in a context can leak into an image.
- [ ] I read the U13 rubric before writing answers.md.
```

## Definition of done

- `.dockerignore`, `answers.md`, `evidence.md`, and `checklist.md` are present with those names.
- The `.dockerignore` includes a comment and a negation rule.
- Evidence shows context sizes before and after.
- Every answer is in your own words.

## Submission format recap

```text
U13-YourName/
  .dockerignore
  answers.md
  evidence.md
  checklist.md
```
