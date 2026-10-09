# U15 Assessor notes

Assessor-only. Do not link from the learner README.

## Model answer sketch

**Q1:** An image is a stack of read-only layers. Each instruction generally adds a layer on top of the previous one. Because layers are content-addressed and read-only, two images that share a base reuse the same layers on disk instead of duplicating them.

**Q2:** Docker keys a layer's cache on the parent layer's content plus the instruction plus the files/inputs the instruction uses. If all of that is unchanged, the layer is reused (`CACHED`). It is content-based, not time-based.

**Q3:** `Dockerfile.fast` copies only `requirements.txt` before installing, so the install layer's inputs do not include the source files. Editing source changes only the later `COPY app.py`, leaving the install `CACHED`. `Dockerfile.slow` uses `COPY . .` first, so any source edit changes that layer and invalidates the install above it, forcing a reinstall.

**Q4:** When a layer changes, every layer above it is rebuilt, because the stack must be reconstructed consistently from the point of change. Layers below are unaffected.

**Q5 (any two):** stale `apt-get update` package lists; suspicion that an image does not match current source; reproducing a clean build; CI wanting deterministic results. `--no-cache` is the slow, guaranteed path.

**Q6:** A container adds a thin writable layer on top of the read-only stack. Anything written there disappears when the container is removed, which is why containers are called disposable and why volumes exist (U17).

## Partial credit guidance

- Time-based cache belief is the key diagnostic. If present, mark Q2 down and note clearly; it will cause confusion in U16 if left uncorrected.
- Accept concrete alternative demonstrations (for example, using a `RUN echo` step that changes) as valid evidence of caching.
- If the learner's two Dockerfiles differ only in naming but not order, the core task is not done; direct them back to the slow-vs-fast orders.

## Common weak submissions

- Two Dockerfiles that are identical, or that differ in unrelated ways.
- Claims the cache expires after a fixed time.
- Believes deleting the project folder clears Docker's cache.
- Evidence shows a build log with no `CACHED` anywhere, meaning the cache never got a chance to help (usually because a new tag was used every time, which is fine, but the rebuild must reuse content — check they rebuilt the same image name).
- Confuses the container's writable layer with the image's layers.

## Red flags for a trainer conversation

- Learner still writes `COPY . .` before installs after this unit. A five-minute replay of the worked example is worthwhile before U16.
- Learner believes cache is time-based. Correct before registry/CI units, where "why did CI rebuild everything?" depends on this.
