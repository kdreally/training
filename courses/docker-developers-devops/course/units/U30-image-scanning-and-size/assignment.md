# U30 Assignment — Image scanning and size hygiene

Submit everything in **one folder or zip** named:

`U30-YourName`

## Files to submit

### 1. `evidence.md`

1. **Before and after sizes.** Paste the `docker image ls` line (repository, tag, size) for one image *before* you slim it, and *after*. If you cannot change the base image, slim a different way (for example `.dockerignore`) and say which lever you used.
2. **Cleanup.** Paste the `Total reclaimed space:` line from a `docker image prune` run, plus the `docker image ls` output showing your tagged images are still present.
3. **Scan summary.** If `docker scout` or `trivy` is available, paste the summary line (for example `0C 2H 7M 19L` or `Total: 14 (...)`). If neither tool is available, write `Scanner unavailable` and explain in `answers.md` what you would have run.

**Important:** no secrets or tokens in your submission.

### 2. `answers.md`

Answer in your own words.

1. **Why size matters.** Give two concrete costs of a large image and tie each to a situation a team actually hits (pulls, CI, storage, attack surface).
2. **Dangling vs unused.** Explain the difference between a dangling image and a tagged-but-unused image. Which one does plain `docker image prune` remove?
3. **Prune safety.** Explain the difference between `docker image prune` and `docker image prune -a`. Give one situation where each is the right choice.
4. **Three levers.** Name the three slimming levers, and for each say which earlier unit taught it and what it removes.
5. **Reading a scan.** A scan reports `0C, 6H, 40M, 120L`. Describe, step by step, how you would decide what to do first. Why is "120L" not your immediate priority?
6. **Predict then explain.** Predict what happens to your image's size if you switch `FROM node:20` to `FROM node:20-alpine`, and name one risk of that change. (Hint: not every native package builds cleanly on Alpine.)
7. **Debug this.** A teammate says: "`docker image prune -a` deleted our tagged test image and now CI cannot run." Explain what happened and the two ways to recover.

### 3. `checklist.md`

```markdown
- [ ] I read the U30 README fully.
- [ ] I measured at least one image's size before and after a change.
- [ ] I understand plain `prune` vs `prune -a`.
- [ ] I know a scan is a to-do list, not a verdict.
- [ ] I read the U30 rubric before writing answers.md.
```

## Definition of done

- `evidence.md`, `answers.md`, and `checklist.md` present with the names above.
- Real before/after size numbers reported.
- Answers are in your own words.

## If scanning tools are unavailable

That is allowed. Complete `evidence.md` with `Scanner unavailable` and answer Q5 in full. Your trainer cares that you can *read* a scan and reason about it, not that you installed a specific tool.
