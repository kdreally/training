# U13 Assessor notes

Assessor-only. Do not link from the learner README.

## Model answer sketch

**Q1:** The build context is every file under the folder passed to `docker build` (the trailing `.`), minus anything matched by `.dockerignore`. `COPY` can reach only files inside this set; it cannot reach files above the context folder or files excluded by `.dockerignore`.

**Q2:**
- Speed/memory — a larger context takes longer to package and transfer on every build.
- Secrets/noise — broad `COPY` instructions can bake passwords, `.env` files, or huge dependency folders into the image, where they are easy to inspect and share.

**Q3:** A `.env` file inside the context is copied into a layer by an instruction like `COPY . .`, so it travels with the image. `.dockerignore` prevents it entering *future* contexts. It does **not** remove it from images already built or pushed — those must be rebuilt, and the exposed secret should be rotated.

**Q4:** `.dockerignore` must be at the root of the build context (next to the Dockerfile). In a subfolder it is not read, so exclusions silently stop working and the full context is sent again.

**Q5:** `!` re-includes a file. Because rules are applied in order, the `!` line must come *after* the broader exclusion it is undoing, or the earlier exclusion would not yet apply (or would re-exclude it).

**Q6:** Examples: comparing `Sending build context to Docker daemon <size>` before/after; or `docker run --rm --entrypoint sh <image> -c "ls -a"` and observing the absent file. Either is fine.

## Partial credit guidance

- A `.dockerignore` missing the negation but otherwise correct: award must-haves, deduct the 2-point nice-to-have and note it. Do not fail the unit.
- Learners often write `.gitignore` syntax such as `node_modules/` with a trailing slash. That usually still works; do not nitpick syntax unless the build demonstrably fails.
- If they used `COPY app.py .` (specific) instead of `COPY . .`, they may never have seen a leak. The written answers still carry the marks. Accept the learning.

## Common weak submissions

- `.dockerignore` committed in a subfolder such as `src/`; exclusions do not apply.
- Claims `.dockerignore` "deletes" files from the image that is already built and pushed.
- Confuses `.dockerignore` with `.gitignore` and submits only the latter.
- Evidence shows two identical context sizes because the dummy file was not inside the context.
- Excludes `Dockerfile` itself, breaking the build; note that the Dockerfile must remain available.

## Red flags for a trainer conversation

- Learner plans to ship `.env` values inside images "for convenience." Surface this before U24/U33; it is exactly the habit those units push against.
- Learner cannot explain why a big `node_modules` slows every build. Revisit before U15, where cache mechanics make this concrete.
