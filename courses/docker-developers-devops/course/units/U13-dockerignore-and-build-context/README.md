# U13 — .dockerignore and build context

**Phase 3 — Building images**

## Where you are

U11 introduced the **build context** — the pile of files Docker receives when you build. U12 had you build a real app. This unit takes the next honest step: controlling exactly what goes into that pile. A small, deliberate `.dockerignore` file keeps your builds fast and stops secrets and junk from leaking into your image. This is a small unit with a big payoff.

## What you will be able to do

- Explain what the build context is and what Docker does with it.
- Explain why a large or careless context is a problem (speed and secrets).
- Write a `.dockerignore` file using plain patterns, comments, and negations.
- Verify the effect of `.dockerignore` on a build.

## What you need already

- **U11 — What a Dockerfile is.** You need the build context idea and `docker build -t`.
- **U12 — Dockerfile instructions.** You need `COPY`, `RUN`, and `CMD`.
- **U10 — Container lifecycle.** You may run a container to prove a file was or was not copied in.

## Time and energy

About **60–90 minutes**. No new commands are introduced; you use `docker build` and perhaps `docker run`. The thinking is the work here.

## Why this exists

Every build starts by handing Docker a folder of files. If that folder contains a multi-gigabyte `node_modules`, an old `.git` history, or a `.env` file full of passwords, all of it is sent to the builder. Sometimes it even ends up inside your image where anyone who receives the image can read it. A `.dockerignore` file is the cheap, standard fix. Learn it early and it saves you from a slow build and, eventually, a scary security conversation.

## Plain-language teaching

### What the build context really is

When you type:

```text
docker build -t myapp .
```

the trailing `.` means "this folder is the build context." Docker gathers the files under that folder and makes them available to the build. The Dockerfile's `COPY` lines can only reach files that are inside this gathered set — nothing outside it, ever.

A useful picture: the context is a sealed box of your project files that you hand to the builder. The Dockerfile says which items from the box to place into the image. Items not in the box cannot be placed, no matter what the Dockerfile says.

### Why context size matters

Two separate problems, and both are real.

**1. Speed and memory.** A large context takes longer to package and transfer to the build engine. A build that should take two seconds can take two minutes if it is dragging along a huge dependency folder or a long version-control history. Every build, every time, pays this cost.

**2. Secrets and noise.** Files you never intended to share can sit in the context. If any `COPY` instruction is broad — like `COPY . .` — those files land in the image. An image is easy to share and inspect, so a password file baked into a layer is a leak. Common offenders:

- `.env` files with API keys and database passwords.
- `.git` — your entire project history.
- `node_modules`, `venv`, `__pycache__` — large, local, and rebuildable.
- Logs, editor settings, and local databases.

### `.dockerignore` — the guest list for the box

A `.dockerignore` file lives in the **root of the build context** (the same folder as your Dockerfile, usually). It tells Docker which files to leave out of the context. One pattern per line. It uses simple glob-like rules:

- `node_modules` excludes that folder anywhere sensible in the context.
- `*.log` excludes every file ending in `.log`.
- `**/temp` excludes a `temp` folder at any depth (the `**` means "any subfolders").
- `!important.log` is a **negation**: it re-includes a file that an earlier line excluded.
- `#` starts a comment; blank lines are ignored.

Order matters: a later `!` rule can bring back something an earlier line removed.

### `.dockerignore` is not the same as `COPY` control

You can also narrow what `COPY` brings in by copying specific files (`COPY app.py .`) instead of everything (`COPY . .`). That is good practice. But `.dockerignore` works one level earlier: it decides what enters the box at all. Use both — they solve different halves of the problem.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Build context | The set of files Docker receives when you build | Not only the Dockerfile |
| `.dockerignore` | A file listing patterns to exclude from the context | Not the same as `.gitignore` (different syntax and purpose) |
| Pattern | A line in `.dockerignore` describing files to exclude | Not a Dockerfile instruction |
| Glob | A wildcard rule like `*.log` or `**/temp` | Not a regular expression |
| Negation `!` | Re-includes a file excluded by an earlier line | Not "important"; it means "except this one" |
| Secret | Sensitive data such as passwords or keys | Frequently stored in `.env` files and leaked by broad COPY |

## Worked example

We reuse the `hello-flask` project from U12, then prove that `.dockerignore` changes what Docker receives.

### Step 1 — Build without a `.dockerignore`

Inside `hello-flask/`, run:

```text
docker build -t ignore-demo:before .
```

**What it does:** builds the image and, before that, packages the context.

**What success looks like.** On classic builders you will see a line near the top reporting the size, for example:

```text
Sending build context to Docker daemon  62.4MB
```

On newer BuildKit builders the wording differs:

```text
[+] Building 1.2s (9/9) FINISHED
 => transferring context: 62.4MB
```

Either way, note the number. That is what gets sent on every build.

### Step 2 — Add junk to see the effect

Create a file that should never ship — for example a fake secret and a big dummy file:

```text
# macOS/Linux
echo "API_KEY=super-secret" > .env
dd if=/dev/zero of=big.bin bs=1M count=50
```

```powershell
# Windows PowerShell
Set-Content -Path .env -Value "API_KEY=super-secret"
fsutil file createnew big.bin 52428800
```

Rebuild and watch the reported context size jump by about 50 MB. That is the cost.

### Step 3 — Write a `.dockerignore`

Create a file named exactly `.dockerignore` in the same folder as the Dockerfile:

```text
# Version control and local history
.git

# Dependency folders rebuilt inside the image
node_modules
venv
__pycache__

# Secrets and local settings
.env
*.key

# Logs and scratch files
*.log
big.bin
```

### Step 4 — Build again and compare

```text
docker build -t ignore-demo:after .
```

**What success looks like:** the reported size is back down to roughly the size of your real source files (a few kilobytes). The 50 MB dummy file and `.env` are gone from the box.

### Step 5 — Prove a secret is not in the image

A dangerous mistake is to write `COPY . .` in the Dockerfile and assume the ignored files cannot get in. With `.dockerignore` in place, they genuinely cannot. To confirm, start a shell in the built image and list the working folder:

```text
docker run --rm --entrypoint sh ignore-demo:after -c "ls -a"
```

**What success looks like:** a short listing of just your app files. `.env` and `big.bin` should not appear.

**One decoded failure.** If you see:

```text
docker: Error response from daemon: ... executable file not found in $PATH: "sh": ...
```

then the base image does not contain a shell called `sh` (some minimal images omit it). That is not a `.dockerignore` problem; it means this particular image is too minimal for the inspection trick. Use a `python:3.12-slim` base and the command works.

## Common errors

### Error: `.dockerignore` in the wrong place

**What happens:** The build still sends everything. Nothing is excluded.

**Fix:** `.dockerignore` must sit in the **root of the build context** — the folder you pass to `docker build`, next to the Dockerfile. A copy in a subfolder is not at the root and is ignored.

### Error: expecting `.gitignore` rules to apply

**What happens:** You assumed your `.gitignore` would keep files out of the image. It does not. Git and Docker read different files.

**Fix:** Write a `.dockerignore` even if a `.gitignore` exists. Some patterns look alike, but they are separate lists.

### Error: `COPY . .` copying local dependencies over installed ones

**What happens:** You installed dependencies inside the image with `RUN pip install ...`, then `COPY . .` copied your local `venv` or `node_modules` folder on top, and the app breaks with confusing native-module errors.

**Fix:** Add `node_modules`, `venv`, and `__pycache__` to `.dockerignore`. Let the image build its own dependencies. (U15 explains why the copy order also matters.)

### Error: a secret is already in an image you shared

**What happens:** You realize an old image contained a `.env` file.

**Fix:** Adding `.dockerignore` stops future builds from including it, but it does not remove it from images you already built and pushed. Rebuild and re-share. Rotation of the secret is the safe move. (Security habits get a full unit in U33.)

## Checkpoints

Answer in your own words before the assignment:

1. What exactly is in the build context?
2. Name two reasons a large context is a problem.
3. Where must `.dockerignore` live, and why there?
4. What does a line beginning with `!` do, and why does order matter?

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Observe the number

Build a project with no `.dockerignore` and note the reported context size. Add three pointless files (a big dummy file, a log, a `.tmp` file), rebuild, and note the increase. Then add a `.dockerignore` and confirm the size drops.

### P2 — Break it on purpose

Move your `.dockerignore` into a subfolder and rebuild. Confirm the exclusions stop working. Move it back to the context root and confirm they work again.

### P3 — Write from scratch

For a Node project, write a `.dockerignore` that excludes `node_modules`, `.git`, `.env`, `npm-debug.log`, and any `dist` folder at any depth. Include at least one comment line.

### P4 — Negation

Write a `.dockerignore` that excludes all `*.md` files but re-includes `README.md`. Explain in one sentence why the order of those two lines matters.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No layer or cache theory — that is **U15**, though context size and cache are cousins.
- No secrets-management tooling — that is **U24** and **U33**.
- No `docker buildx` or advanced builder configuration.
- No `.gitignore` tutorial; we only note it is a different file.

## Next unit

**U14 — Tags and naming your images** (naming images so humans and tools can tell them apart).
