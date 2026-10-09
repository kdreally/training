# U15 — Layers and build cache

**Phase 3 — Building images**

## Where you are

You can write a Dockerfile, slim the build context, and name your images. This unit answers a question you may have been carrying since U11: *why does Docker sometimes rebuild everything, and sometimes finish in a second?* The answer is **layers** and the **build cache**. Understanding them turns builds from magic into a plan you control — and it explains why we copied `requirements.txt` before the source in U12.

## What you will be able to do

- Explain what a layer is and how each instruction produces one.
- Explain how Docker decides to reuse a cached layer.
- Explain why instruction order changes build speed, and order a Dockerfile for fast rebuilds.
- Invalidate the cache deliberately when you need a clean build.

## What you need already

- **U12 — Dockerfile instructions.** You need `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`.
- **U13 — Build context.** You need to know what files are available to `COPY`.
- **U14 — Tags.** You need `docker images` and to be comfortable naming builds.
- **U08 — Images vs containers.** This unit extends the image idea from U08.

## Time and energy

About **75–105 minutes**. You will rebuild the same project several times and watch the output change. Reading build output carefully *is* the lesson.

## Why this exists

Builds that take ten minutes when they could take ten seconds are a daily tax on developers. Worse, a cached build can hide a mistake: the output says "success" but the image still contains yesterday's file. Knowing how layers and cache behave lets you make builds fast *and* correct. It also explains a huge share of real-world Docker advice you will read elsewhere.

## Plain-language teaching

### What a layer is

An image is not one solid blob. It is a **stack of layers**, like transparent sheets laid one on top of another. Each instruction in your Dockerfile generally creates one new layer on top of the previous one.

- `FROM python:3.12-slim` gives you the starting stack (the base image is itself many layers).
- `WORKDIR /app` adds a thin layer recording the working directory.
- `COPY requirements.txt .` adds a layer containing that file.
- `RUN pip install ...` adds a layer containing the installed packages.
- `COPY app.py .` adds a layer with your code.

The final image is the whole stack. Layers are **read-only** and **shared**: if two images both start `FROM python:3.12-slim`, they reuse the same base layers on disk instead of storing them twice.

At run time, a container adds one thin **writable layer** on top of the stack. Anything the running program writes there lives only as long as the container — which is exactly why data seems to disappear and why U17 introduces volumes. (That write layer is a preview for U17, not a task for this unit.)

You can see the layers of an image with:

```text
docker history hello-flask:1.0
```

### What the build cache is

When Docker builds a layer, it saves the result. On the next build, before doing the work again, it asks: *has anything that affects this layer changed?* If not, it reuses the saved layer and prints `CACHED`. You get the same result in a fraction of the time.

The cache key for a layer is essentially: **the parent layer's content + the instruction itself + the files it uses.** This has two consequences you must remember:

1. **Change anything a layer depends on, and that layer is rebuilt.** If the `COPY` instruction's source files changed, that `COPY` layer changes.
2. **When a layer is rebuilt, every layer above it is rebuilt too.** The stack has to be consistent. This is the part people miss: one early change can invalidate all the expensive work after it.

### Why instruction order matters

This is the payoff from U12. Compare two orders for the same project.

**Slow order** (source first):

```dockerfile
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
```

Every time you edit any file, `COPY . .` changes, so the `RUN pip install` layer above it is invalidated and all packages reinstall. A one-character code change costs a full dependency install.

**Fast order** (dependencies first):

```dockerfile
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
```

Now editing `app.py` changes only the last `COPY`. The dependency install layer sits *below* it, so it stays `CACHED`. You edit code all day and never wait for a reinstall.

The rule of thumb: **put things that rarely change low in the file, and things that change often near the bottom.**

### Invalidating the cache on purpose

Sometimes a cached layer is unwanted:

- A `RUN apt-get update` layer may hold a stale package list. Caching makes it fast but out of date.
- You suspect the image does not match the current source.
- You want a reproducible clean build to be sure.

For those cases, use `--no-cache`:

```text
docker build --no-cache -t hello-flask:clean .
```

This tells Docker to ignore the cache and run every instruction again. Use it sparingly; it is the slow path by design.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Layer | One read-only change in the image's stack, usually one instruction | Not a separate file on disk you can edit |
| Stack | The ordered set of layers that make up an image | Not a single monolithic file |
| Cache | Saved layer results Docker reuses when nothing changed | Not stored in your project folder |
| Cache hit / `CACHED` | Docker reused a saved layer | Not an error; it is the fast path |
| Cache invalidation | A change that forces a layer and everything above it to rebuild | Only affects layers above the change |
| `docker history` | Shows the layers of an image | Shows instructions, not your file contents |
| `--no-cache` | Build flag that ignores the cache | Not needed for normal edits |
| Writable layer | The thin layer a container adds at run time | Deleted when the container is removed |

## Worked example

We use the `hello-flask` project and prove the cache effect.

### Step 1 — Build once (nothing cached)

```text
docker build -t cache-demo:1 .
```

**What it does:** builds the image; the first build runs every instruction.

**What success looks like:** every step is executed, with no `CACHED` markers, ending in a success line.

### Step 2 — Change only the app code

Edit `app.py` to change the greeting. Then rebuild with a new tag:

```text
docker build -t cache-demo:2 .
```

**What it does:** rebuilds after a source change.

**What success looks like** (with the fast order from U12):

```text
=> [4/6] RUN pip install --no-cache-dir -r requirements.txt    CACHED
=> [6/6] COPY app.py .                                          0.1s
```

The dependency install shows `CACHED` even though the code changed. That is the whole benefit.

**One decoded failure.** If instead you see the `RUN pip install` step running again with no `CACHED`, the layer below it changed. The usual culprit is a `COPY . .` before the install, which drags every source file into that layer's key. Reorder to copy the dependency list first; see the slow-vs-fast orders above.

### Step 3 — Inspect the layers

**What it does:** lists the layers of the image and the instruction that created each.

```text
docker history cache-demo:2
```

**What success looks like:** a table of rows, one per layer, with a `CREATED BY` column showing instructions such as `/bin/sh -c pip install ...`, newest on top.

**One decoded failure.** If every row shows the same timestamp and you expected variety, remember that `CACHED` layers were created earlier; `docker history` shows the original creation times, not the reuse times. That is normal.

### Step 4 — Force a clean build

**What it does:** rebuilds ignoring all cached layers.

```text
docker build --no-cache -t cache-demo:fresh .
```

**What success looks like:** no `CACHED` markers anywhere; every step runs again.

### Step 5 — Prove the cache is about inputs, not time

Without changing any file, rebuild:

```text
docker build -t cache-demo:3 .
```

**What success looks like:** almost every layer is `CACHED`, even though time has passed. The cache keys on content, not on the clock.

## Common errors

### Error: `COPY . .` before installing dependencies

**What happens:** every code edit reinstalls all packages.

**Fix:** Copy the dependency manifest and run the install *before* copying the rest of the source. This is the single most valuable reordering a beginner can make.

### Error: trusting a stale `apt-get update`

**What happens:** a cached package list means `apt-get install` fetches old versions, or a package that should now exist is missing.

**Fix:** when package freshness matters, rebuild with `--no-cache`, or combine update and install in one `RUN` so they cache together and never drift apart.

### Error: thinking the cache lives in your project

**What happens:** you delete the build folder expecting a fresh build, but `CACHED` lines still appear.

**Fix:** the cache is managed by Docker, not stored in your project. Clear it deliberately with `--no-cache` (or broader pruning, which we discuss later) when you need to.

### Error: assuming order does not matter

**What happens:** you write a correct Dockerfile that is needlessly slow, then blame Docker.

**Fix:** order for the cache. Rarely changing steps low, frequently changing steps high. It is a design choice you now control.

## Checkpoints

Answer in your own words before the assignment:

1. What is a layer, and roughly how many does a five-instruction Dockerfile create?
2. What two things make up a layer's cache key?
3. Why does editing source code rebuild a `COPY . .` layer but not a `RUN pip install` layer placed below it?
4. Give one situation where you would use `--no-cache` on purpose.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Watch the cache

Build a project once. Edit one file. Rebuild and record which steps are `CACHED`. Then reorder the Dockerfile so a dependency install comes before a broad `COPY . .`, and show the difference.

### P2 — Break it on purpose

Place `COPY . .` above `RUN pip install -r requirements.txt`. Change one source file. Rebuild and observe the install re-running. Fix the order and prove the install is cached again.

### P3 — Stale cache

Build an image that runs `RUN apt-get update && apt-get install -y curl`. Then rebuild. Confirm that step is `CACHED`. Explain in one sentence when this could be a problem and how you would fix it.

### P4 — Predict then run

Predict the `docker history` output for an image you built. Then run `docker history <image>` and compare the number of layers to the number of instructions you wrote. Note where extra/alias layers appear.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No volumes or data persistence — that is **U17**; we only previewed the writable layer.
- No multi-stage builds — that is **U16**, though it builds directly on layers.
- No registry layer sharing or push optimisation — that is Phase 6.
- No `buildx` cache backends or remote caches.

## Next unit

**U16 — Multi-stage builds** (using separate stages so build tools never reach the final image).
