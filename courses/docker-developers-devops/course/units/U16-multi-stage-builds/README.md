# U16 — Multi-stage builds

**Phase 3 — Building images**

## Where you are

This is the last unit of Phase 3. You can build images, control their contents, name them, and exploit the build cache. Now you meet the technique that separates a beginner's Dockerfile from a production one: **multi-stage builds**. The idea is to use throwaway stages for building and keep only the small result in the final image. It is the natural next step after layers and cache, and it gives you your smallest, cleanest images so far.

## What you will be able to do

- Explain why a final image should not contain build tools or caches.
- Use `AS <name>` to label a stage and `COPY --from=<name>` to move results between stages.
- Tell the difference between a **build stage** and a **runtime stage**.
- Build a single-stage and a multi-stage version of the same app and compare their sizes.

## What you need already

- **U12 — Dockerfile instructions.** You need `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, `EXPOSE`.
- **U14 — Tags and naming.** You need `docker images` and the idea of pinning versions.
- **U15 — Layers and build cache.** Multi-stage builds are layers with a deliberate discard at the end.

## Time and energy

About **75–105 minutes**. You will build two images and compare them. The first build downloads a base image, so allow a few minutes.

## Why this exists

A normal Dockerfile uses one base image for everything: it installs compilers, package managers, test tools, and helper files just to produce the app. All of that stays in the final image. The image is large (slow to download everywhere), and it carries tools an attacker could use. Multi-stage builds separate "the kitchen" from "the plate": you do messy work in one stage, then copy only the finished dish into a clean final stage. Smaller, safer, and usually not much harder to write.

## Plain-language teaching

### The problem with one stage

Consider a Python app whose dependencies include a package that must be *compiled* from source. To compile it you need a C compiler and development headers. If you install those in the same stage as the app, they stay in the final image forever, even though the app only needs the compiled result.

The final image then contains:

- the app and its dependencies (wanted),
- the compiler and headers (unwanted),
- package-manager caches (unwanted),
- build-time scripts and temporary files (unwanted).

None of that is needed to *run* the app. Multi-stage builds let you throw it away.

### Stages, named with `AS`

A Dockerfile can contain more than one `FROM`. Each `FROM` starts a new **stage**. You give a stage a name with `AS`:

```dockerfile
FROM python:3.12 AS builder
```

Now the word `builder` refers to that stage. A stage is a full, temporary image used *during the build*. Stages that are not the last one are thrown away at the end unless something is copied out of them.

- **Build stage** — where you install everything needed to prepare the app. May be large and full of tools.
- **Runtime stage** — the final stage, where only what is needed to run the app remains. Should be small.

### `COPY --from=<stage>` — moving the result across

You move files from an earlier stage into the final stage with `--from`:

```dockerfile
COPY --from=builder /venv /venv
```

Read it as: "copy the folder `/venv` from the stage named `builder` into `/venv` here." You can also copy from an external image (`COPY --from=nginx:latest ...`), but stages are the common case.

Only the final `FROM` stage becomes the image you get. Everything before it is scaffolding.

### A note on `ENV`

The Python example below needs the copied virtual environment to be found. We set that with `ENV PATH="/venv/bin:$PATH"`. `ENV` sets an **environment variable** inside the image. Environment variables get a full unit later (U24); here it means "look for programs in `/venv/bin` first." You are not expected to invent this line — copy it once and understand its purpose.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Stage | One `FROM` section of a Dockerfile | Not a build phase label; it is a base image context |
| `AS <name>` | Names the current stage | Not related to SQL `AS` |
| Build stage | A temporary stage where preparation happens | Not the image you ship |
| Runtime stage | The final stage; the one that becomes the image | Not necessarily the first stage |
| `COPY --from=` | Copies files from another stage (or image) | Not a host path |
| Virtual environment (venv) | A self-contained folder of installed Python packages | Not the system Python |
| `-f` | Build flag choosing which Dockerfile to use | Not the same as the context dot |
| Final image | The result of the last stage only | Not the sum of all stages |

## Worked example

We build the same `hello-flask` app two ways and compare sizes. We use a virtual environment to keep the installed packages in one folder that is easy to copy between stages.

### The single-stage Dockerfile (`Dockerfile.single`)

```dockerfile
FROM python:3.12
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
EXPOSE 8000
CMD ["python", "app.py"]
```

This uses the full `python:3.12` image, which includes a compiler toolchain and many extras. Everything stays in the final image.

### The multi-stage Dockerfile (`Dockerfile.multistage`)

```dockerfile
FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN python -m venv /venv && /venv/bin/pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /venv /venv
COPY app.py .
ENV PATH="/venv/bin:$PATH"
EXPOSE 8000
CMD ["python", "app.py"]
```

Read it stage by stage:

- **`builder`** starts from the full `python:3.12` image, creates a virtual environment at `/venv`, and installs the dependencies there. This stage is allowed to be large; it will be discarded.
- **`runtime`** starts fresh from the much smaller `python:3.12-slim`. It copies the finished `/venv` folder out of `builder` and copies the app code. It never includes a compiler.
- `ENV PATH` makes the copied environment findable. `EXPOSE` and `CMD` are as before.

Notice that `runtime` does not inherit anything from `builder` except what `COPY --from` explicitly brings over. The scaffolding stays behind.

### Build both

The `-f` flag chooses which Dockerfile to build when it is not named `Dockerfile`:

**What it does:** builds the single-stage image.

```text
docker build -f Dockerfile.single -t hello-single:1.0 .
```

**What it does:** builds the multi-stage image.

```text
docker build -f Dockerfile.multistage -t hello-multi:1.0 .
```

**What success looks like:** both end with a success line. The multi-stage build shows two `FROM` sections in its output, often labelled with the stage names.

**One decoded failure.** If you see:

```text
ERROR: failed to solve: failed to compute cache key: ... "/venv": not found
```

Docker could not find `/venv` when running `COPY --from=builder /venv /venv`. The usual causes are a misspelled stage name (the `AS` name and the `--from` name must match exactly, including case) or the copy source path does not exist in that stage. Check both names and confirm the builder actually created the folder.

### Compare the sizes

**What it does:** lists your images with their sizes.

```text
docker images
```

**What success looks like** (your exact numbers will vary):

```text
REPOSITORY     TAG    IMAGE ID       CREATED          SIZE
hello-single   1.0    111aaa222bbb   1 minute ago     1.03GB
hello-multi    1.0    333ccc444ddd   1 minute ago     178MB
```

The multi-stage image is dramatically smaller. Most of the saving is that it starts from `python:3.12-slim` instead of `python:3.12`; the point is that the build work lives in a discarded stage, so the final image holds only the virtual environment and your code.

**One decoded failure.** If the two sizes are nearly identical, check that the final stage is `runtime` (the last `FROM`) and that you did not accidentally copy the whole builder. A `COPY --from=builder . .` would drag the scaffolding back in. Copy only what you need.

### Run the multi-stage image

```text
docker run -d -p 8001:8000 --name hello-multi hello-multi:1.0
```

Then reach it at `http://localhost:8001` (or `curl.exe http://localhost:8001` in Windows PowerShell). Port 8001 avoids clashing with anything still on 8000.

**What success looks like:** `Hello from inside a container!` — the same app, from a much smaller image.

```text
docker stop hello-multi
docker rm hello-multi
```

## Common errors

### Error: stage name mismatch

**What happens:** `COPY --from=build /venv /venv` fails because the stage was named `builder`.

**Fix:** Use the same name in `AS` and `--from`. Names are case-sensitive.

### Error: copying the whole builder

**What happens:** `COPY --from=builder . .` brings build junk into the runtime stage, and the size advantage vanishes.

**Fix:** Copy only the specific folders or files the app needs at run time (for example, the virtual environment and the source).

### Error: forgetting `ENV PATH` after copying a venv

**What happens:** the container starts but cannot find `python` from the virtual environment, or the app cannot import its packages.

**Fix:** Set `ENV PATH="/venv/bin:$PATH"` in the runtime stage so the copied environment is used. (U24 explains environment variables fully.)

### Error: expecting intermediate stages in `docker images`

**What happens:** you look for the `builder` image and cannot find it.

**Fix:** intermediate stages are discarded. Only the final stage is tagged and listed. That is the design, not a bug.

## Checkpoints

Answer in your own words before the assignment:

1. Why does a final image ideally not contain compilers or package caches?
2. What does `AS builder` do, and what does `COPY --from=builder` do?
3. Which stage becomes your image if a Dockerfile has three `FROM` lines?
4. Name two reasons a multi-stage image is better than a single-stage one.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Two sizes

Build the single-stage and multi-stage versions and record both sizes. Write one sentence explaining where the size difference comes from.

### P2 — Break it on purpose

Rename the `builder` stage to `buildstage` but leave `COPY --from=builder`. Build and read the error. Fix it and confirm success.

### P3 — Trim further

Starting from the multi-stage Dockerfile, remove anything the runtime stage does not need. Write down what you removed and why. (Keep the app working.)

### P4 — Predict then run

Predict whether the `builder` stage will appear in `docker images` after a build. Then run `docker images` and confirm. Explain the result.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No push to a registry, and no `buildx` or platform targeting — that is Phase 6.
- No environment-variable deep dive — that is **U24**.
- No image-scanning tools — that is **U30**.
- No orchestration or deployment — that is Phase 7.

## Next unit

**U17 — Volumes: keeping data alive beyond a container** (the first unit of Phase 4, Data and networking).
