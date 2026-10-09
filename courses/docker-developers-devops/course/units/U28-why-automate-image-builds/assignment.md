# U28 Assignment — Why automate image builds

Submit everything in **one folder or zip** named:

`U28-YourName`

## Files to submit

### 1. `answers.md`

Answer in your own words.

1. **Pain points.** Name three specific problems caused by building images by hand, and for each one say which step of a pipeline removes it.
2. **Pipeline stages.** Describe the three stages build → test → push. Why must test come before push? What happens to a bad image when the order is right?
3. **CI in plain words.** Explain *continuous integration* to a friend who has never heard the term. Do not use the words "integration" or "continuous" in your explanation (use your own phrasing instead).
4. **Reproducibility.** A teammate says "we pinned every version, so our image is reproducible." Is that enough? Name one more thing that must be true.
5. **Secrets.** Your pipeline needs a Docker Hub access token. Explain why it must go in the CI secrets store and not in a file in the repository. Say what to do if the token accidentally lands in the code after all.
6. **Predict then explain.** A pipeline builds successfully but the test stage fails with `ModuleNotFoundError: No module named 'pytest'`, even though the same command passed on your laptop. Explain the most likely cause and the fix.

### 2. `pipeline.md`

Choose a small app you know (a class project, a personal script, an app from earlier units). Write its pipeline as three labelled stages with the exact commands you would run. Follow this shape:

```text
trigger: <when should this run?>

stage build:
  <command(s)>

stage test:
  <command(s)>

stage push:
  <command(s)>

on failure at test:
  <what should happen?>
```

Then add two sentences: one naming what would break if the stages ran in a different order, and one naming a secret your pipeline would need.

### 3. `checklist.md`

```markdown
- [ ] I read the U28 README fully.
- [ ] I can name three hand-building pain points from memory.
- [ ] I can order build, test, and push correctly.
- [ ] I know secrets must not be committed to the repository.
- [ ] I read the U28 rubric before writing answers.md.
```

## Definition of done

- `answers.md`, `pipeline.md`, and `checklist.md` present with the names above.
- The pipeline uses correct stage order.
- Answers are in your own words.

## Definition of *not* done

- A pipeline where push runs before test.
- Copying the README's example stage list word-for-word with no commands of your own.
