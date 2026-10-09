# U15 Assignment — Prove the cache

Submit the following to your trainer in **one folder or zip** named:

`U15-YourName`

## Files to submit

### 1. `Dockerfile.slow` and `Dockerfile.fast`

Two versions of the same app's Dockerfile:
- `Dockerfile.slow` copies all source before installing dependencies.
- `Dockerfile.fast` copies the dependency manifest and installs before copying the rest.

Both must build successfully.

### 2. `answers.md`

Answer in your own words.

1. **What a layer is.** Explain in 3–5 sentences what a layer is, how instructions relate to layers, and why layers can be shared between images.
2. **Cache key.** Explain what Docker compares to decide whether a layer can be reused.
3. **Ordering.** Explain why `Dockerfile.fast` makes code edits faster to rebuild than `Dockerfile.slow`. Refer to what you observed.
4. **Invalidation.** Explain what happens to layers *above* a changed layer, and why.
5. **When to bypass.** Describe two situations where you would use `--no-cache` and why.
6. **Writable layer preview.** In 1–2 sentences, describe the extra layer a running container adds and one consequence of it. (U17 covers this fully.)

### 3. `evidence.md`

Paste, in order:
- The first build of `Dockerfile.fast` (no `CACHED` markers).
- A rebuild of `Dockerfile.fast`, where it shows the install step `CACHED`.
- A rebuild of `Dockerfile.slow` that re-runs the install step, demonstrating the slower behaviour.
- The output of `docker history` on the fast image, with the layer rows visible.

### 4. `checklist.md`

Copy and mark `[x]` when true:

```markdown
- [ ] I read the U15 README fully (not only the assignment).
- [ ] I built both Dockerfile.slow and Dockerfile.fast.
- [ ] I saw a `CACHED` install step in the fast build.
- [ ] I saw the install step re-run in the slow build.
- [ ] I read the U15 rubric before writing answers.md.
```

## Definition of done

- Both Dockerfiles are present and build.
- `answers.md`, `evidence.md`, and `checklist.md` are present with those names.
- Evidence clearly contrasts `CACHED` and non-cached install steps.
- Every answer is in your own words.

## Submission format recap

```text
U15-YourName/
  Dockerfile.slow
  Dockerfile.fast
  app.py
  requirements.txt
  answers.md
  evidence.md
  checklist.md
```
