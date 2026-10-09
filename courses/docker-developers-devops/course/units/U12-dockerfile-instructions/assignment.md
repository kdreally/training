# U12 Assignment — Build and run a small app image

Submit the following to your trainer in **one folder or zip** named:

`U12-YourName`

## Files to submit

### 1. `Dockerfile`

A working Dockerfile for the app described below. It must use `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, and `CMD`.

### 2. The app files

Include the app source and its dependency list that your Dockerfile copies in (for example `app.py` and `requirements.txt`). The app should respond with a text greeting on its home page.

### 3. `answers.md`

Answer in your own words.

1. **Instruction map.** For each of `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, and `EXPOSE`, write one sentence saying what it does and whether it acts at **build time** or **run time**.
2. **RUN vs CMD.** Explain the difference in 2–4 sentences, including what happens if you use `RUN` to launch a long-running server.
3. **EXPOSE.** Explain what `EXPOSE` does and what it does *not* do. Then explain what `-p 8080:8000` connects.
4. **Order of COPY lines.** Explain why the worked example copies `requirements.txt` before the source code. A reasoned guess is acceptable; label it as a guess if you are unsure.
5. **ENTRYPOINT (brief).** In 1–2 sentences, describe what `ENTRYPOINT` is for and how it relates to `CMD`.
6. **Debug on purpose.** Remove one required dependency from your dependency list, rebuild, run, and paste the resulting error. Decode it in one or two sentences, then restore the dependency and confirm the app works again.

### 4. `evidence.md`

Paste:
- The `docker build -t ... .` output (trimmed is fine, but keep the final success line).
- The `docker run -d -p ...` command and the container ID it printed.
- The `curl` (or browser) output showing your greeting.
- The output of `docker logs <container-name>`.
- The decoded error from question 6.

### 5. `checklist.md`

Copy and mark `[x]` when true:

```markdown
- [ ] I read the U12 README fully (not only the assignment).
- [ ] My Dockerfile builds successfully.
- [ ] I can reach my app and see its greeting.
- [ ] I can explain RUN vs CMD without looking at the lesson.
- [ ] I stopped and removed my container when finished.
- [ ] I read the U12 rubric before writing answers.md.
```

## Definition of done

- `Dockerfile` and app files are present and actually build.
- `answers.md`, `evidence.md`, and `checklist.md` are present with those names.
- Every answer is in your own words.
- Evidence matches what your Dockerfile and commands actually produced.

## Submission format recap

```text
U12-YourName/
  Dockerfile
  app.py
  requirements.txt
  answers.md
  evidence.md
  checklist.md
```
