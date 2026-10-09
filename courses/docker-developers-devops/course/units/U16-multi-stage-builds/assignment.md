# U16 Assignment — Shrink the image with stages

Submit the following to your trainer in **one folder or zip** named:

`U16-YourName`

## Files to submit

### 1. `Dockerfile.single` and `Dockerfile.multistage`

Two Dockerfiles for the same small app:
- `Dockerfile.single` uses one `FROM` stage.
- `Dockerfile.multistage` uses a named build stage and a smaller runtime stage, with `COPY --from=`.

Both must build and both must run the same app successfully.

### 2. `answers.md`

Answer in your own words.

1. **Why stages.** In 3–5 sentences, explain the problem multi-stage builds solve. Include what the single-stage image carries that it does not need.
2. **`AS` and `--from`.** Explain what `AS builder` does and what `COPY --from=builder /venv /venv` does. Why must the two names match?
3. **Build vs runtime.** Describe the difference between a build stage and a runtime stage in your own words.
4. **Final image.** If a Dockerfile has three `FROM` lines, which stage becomes the image, and what happens to the others?
5. **Sizes.** State the two image sizes you measured. Explain, in your own words, the main sources of the difference.
6. **Trim.** Name one thing you could remove from a runtime stage that a build stage needed, and why the app still works without it.

### 3. `evidence.md`

Paste, in order:
- The build command and success line for both Dockerfiles.
- `docker images` output showing both images and their sizes side by side.
- A run command and the app's response from the multi-stage image.
- The error you saw (or would see) from a stage-name mismatch, and the fix.

### 4. `checklist.md`

Copy and mark `[x]` when true:

```markdown
- [ ] I read the U16 README fully (not only the assignment).
- [ ] Both Dockerfiles build successfully.
- [ ] I used `AS` to name a stage and `COPY --from=` to move a result.
- [ ] I measured and compared the two image sizes.
- [ ] I ran the multi-stage image and reached the app.
- [ ] I read the U16 rubric before writing answers.md.
```

## Definition of done

- Both Dockerfiles are present and build.
- The multi-stage image is smaller than the single-stage one.
- The app runs from the multi-stage image and responds.
- `answers.md`, `evidence.md`, and `checklist.md` are present with those names.
- Every answer is in your own words.

## Submission format recap

```text
U16-YourName/
  Dockerfile.single
  Dockerfile.multistage
  app.py
  requirements.txt
  answers.md
  evidence.md
  checklist.md
```
