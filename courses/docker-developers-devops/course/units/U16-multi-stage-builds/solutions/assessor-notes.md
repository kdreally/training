# U16 Assessor notes

Assessor-only. Do not link from the learner README.

## Model answer sketch

**Q1:** A single-stage image carries everything used during the build — compilers, development headers, package-manager caches, temporary files — even though the app does not need them to run. Multi-stage builds separate build work from the final artifact, so the shipped image contains only what runs. Benefits: smaller images (faster to transfer), smaller attack surface, cleaner layers.

**Q2:** `AS builder` names the stage so it can be referenced later. `COPY --from=builder /venv /venv` copies the `/venv` folder out of that stage into the current one. The names must match exactly (case-sensitive) because `--from` looks the stage up by its `AS` name; a typo means "no such stage."

**Q3:** A build stage installs and prepares (may be large, includes tools). A runtime stage contains only what the running app needs. Only the final stage becomes the image; earlier stages are scaffolding.

**Q4:** Only the last `FROM` stage becomes the image. All earlier stages are discarded unless files are copied out of them.

**Q5:** Expected pattern: a large single-stage image (e.g. ~1GB with full `python:3.12`) versus a much smaller multi-stage image (e.g. ~150–250MB with `python:3.12-slim` plus the copied venv). Main sources: the smaller base image and the discarded build tools/caches.

**Q6:** Examples: the compiler toolchain, `pip` cache, build scripts, test tools. The app runs because those were only needed to *produce* the dependencies, not to execute them.

## Partial credit guidance

- If sizes are identical, likely causes: `COPY --from=builder . .`, or the final stage still uses the full base image, or they never actually built the multi-stage file. Award Q2/Q3 partial and request a corrected build.
- A Go/Rust example that copies a compiled binary into `scratch` or `alpine` is a strong submission; mark generously on Q1 and Q5.
- If the learner used `--from=0` (numeric stage reference) instead of a name, accept it as correct, but note that named stages are clearer.

## Common weak submissions

- Multi-stage file where the final stage is identical to the builder (no size gain).
- `COPY --from=builder` with no source/destination paths, or copying the entire builder.
- Forgetting `ENV PATH` for the venv, so the app fails at run time with an import error.
- The two Dockerfiles differ only in tag/base but not in structure.
- Claims the builder stage also appears in `docker images`.
- Evidence shows only build logs, no `docker images` size comparison.

## Red flags for a trainer conversation

- Learner copies the whole builder into the runtime stage "to be safe." Explain the cost before U30 (size hygiene) and U33 (security).
- Learner now writes multi-stage Dockerfiles without being able to say why. Gently require the explanation; the capstone (U35) rewards understanding.
