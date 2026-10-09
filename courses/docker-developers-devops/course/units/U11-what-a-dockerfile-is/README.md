# U11 — What a Dockerfile is

**Phase 3 — Building images**

## Where you are

In U07–U10 you ran other people's images: you pulled them, started them, read their logs, and cleaned up after them. That was valuable, but you were always the guest. This unit is where you become the author. You will learn what a **Dockerfile** is, what it is *not*, and how Docker turns it into an image you own. This is the first unit of Phase 3, and everything that follows builds on the word you learn here.

## What you will be able to do

- Explain, in plain language, what a Dockerfile is and name three things it is not.
- Describe what a **build context** is at a high level, and why its size matters.
- Run `docker build -t` and explain every part of the command.
- Point to the line in a Dockerfile that decides what a container runs.

## What you need already

- **U08 — Images vs containers.** You need the recipe-and-cake idea: an image is the saved recipe, a container is a running instance of it.
- **U09 — Pulling and running existing images.** You need to have run an image you did not build.
- **U10 — Container lifecycle.** You need `docker run`, `docker ps`, and `docker rm` so you can inspect what your new image does.

You also need a working Docker install (U06). If `docker --version` prints a version, you are ready.

## Time and energy

About **60–90 minutes**. Most of it is reading and one very short build. Builds can feel slow the first time; that is normal and the wait is explained below.

## Why this exists

Pulling images works until the image you need does not exist. The moment you want to run *your* app — the one with your code, your settings, your files — you have to describe how to turn it into an image. A Dockerfile is that description. Without it, you would be emailing tarballs, writing install scripts, and hoping the other machine behaves. The Dockerfile is the single, readable source of truth for "how this image is made."

## Plain-language teaching

### The one-sentence definition

A **Dockerfile** is a plain text file named exactly `Dockerfile` that lists the instructions Docker follows to build an image, one instruction per line, read from top to bottom.

That is the whole idea. Everything else in Phase 3 is about the individual instructions and how Docker executes them efficiently.

### What a Dockerfile is *not*

This is where most confusion starts, so we name the wrong ideas on purpose.

- It is **not a script you run directly.** You never type `./Dockerfile` or `Dockerfile.exe`. That file is not executable on its own. You hand it to the `docker build` command, and `docker build` reads it. The Dockerfile is input, not a program.
- It is **not a program with logic.** A Dockerfile has no loops, no `if` statements, and no functions. It is a fixed list of steps. (Later, `ARG` and variables add a little flexibility, but the shape stays: a list.) Compare it to a recipe card, not to source code.
- It is **not the image itself.** The Dockerfile is the recipe; the image is the finished dish. You can copy the Dockerfile to another machine and build a brand-new image from it.
- It is **not sent into the running container.** The file stays on your machine. Its *effect* is baked into the image. A running container does not "have" your Dockerfile inside it.

### The build context, at a high level

When you run `docker build`, Docker does not receive only the Dockerfile. It receives a **bundle of files** from a folder on your computer. That bundle is called the **build context**.

The folder you point Docker at defines the context. The Dockerfile instructions that copy files (like `COPY`) can only reach files that are inside that context.

Why does this matter now? Two reasons, and both get a full unit later:

1. **Speed.** A bigger context takes longer to send to the build engine, even if most of the files are never used. (U13.)
2. **Safety.** Files you never meant to share can end up in the context, and a careless instruction can copy them into the image. (U13.)

For this unit, hold one idea: *the context is the pile of files Docker gets to look at.*

### `docker build -t` introduced

The build command has three parts worth naming:

```text
docker build  -t hello-docker  .
   │            │                │
   │            │                └── where the build context is (the dot means "this folder")
   │            └── give the resulting image a name (a "tag" — see U14)
   └── the command that reads a Dockerfile and builds an image
```

- `docker build` = "read a Dockerfile and produce an image."
- `-t hello-docker` = "call the result `hello-docker`." The letter `t` stands for **tag**, a name for an image. U14 gives tags their full treatment; for now, think "name."
- `.` = "use the current folder as the build context, and look for a file named `Dockerfile` there."

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Dockerfile | A text file named exactly `Dockerfile` listing instructions to build an image | Not a script you run; not a program with logic |
| Instruction | One line in a Dockerfile, such as `FROM` or `COPY` | Not a shell command you type yourself |
| Base image | An existing image your build starts from (named by `FROM`) | Confused with "the final image" |
| Build | The act of reading a Dockerfile and producing an image | Not the same as *running* a container |
| Build context | The pile of files Docker receives when you build | Not just the Dockerfile; not a web "browser context" |
| Tag | A name you give an image, set with `-t` | Not a price tag; not a git tag |
| Daemon / build engine | The background part of Docker that does the heavy build work | You talk to it through the `docker` command |

## Worked example

We will build the smallest honest image: one that prints a message and exits. You do not need to understand every instruction yet — they get their own unit next (U12). Here, notice the *shape* of the file and the *shape* of the build command.

### Step 1 — Make a folder and a file

Create a folder called `hello-docker`, and inside it a file named `Dockerfile` with exactly these two lines:

```dockerfile
FROM alpine
CMD ["echo", "hello from my first image"]
```

- `FROM alpine` means "start from the tiny Linux image called **alpine**." We build on someone else's base instead of an empty nothing.
- `CMD ["echo", ...]` means "when a container starts, run this command by default."

### Step 2 — Build the image

Open your terminal **inside the `hello-docker` folder** (see U03 for `cd`).

**What it does:** reads the `Dockerfile` in the current folder, uses the current folder as the build context, and produces an image named `hello-docker`.

```text
docker build -t hello-docker .
```

**What success looks like** (your timings will differ; the important line is the last one):

```text
[+] Building 0.9s (5/5) FINISHED
 => [internal] load build definition from Dockerfile
 => [1/2] FROM docker.io/library/alpine:latest
 => [2/2] CMD ["echo", "hello from my first image"]
 => exporting to image
 => => naming to docker.io/library/hello-docker:latest
```

On older Docker versions you may instead see several `Step 1/2 ...` lines ending in `Successfully tagged hello-docker:latest`. Either format means the same thing: it worked.

**One decoded failure.** If you run this from the wrong folder, you may see:

```text
ERROR: failed to solve: failed to read Dockerfile: open Dockerfile: no such file or directory
```

This does **not** mean Docker is broken. It means the current folder has no file named `Dockerfile`. Move into the folder that contains it (`cd hello-docker`) and try again.

### Step 3 — Run the image

**What it does:** starts a container from your new image; `--rm` removes the container when it finishes, so you do not leave clutter behind (introduced back in U10).

```text
docker run --rm hello-docker
```

**What success looks like:**

```text
hello from my first image
```

**One decoded failure.** If you see:

```text
docker: Error response from daemon: failed to create task for container: ... exec: "echo": executable file not found
```

then your base image does not contain the program you asked `CMD` to run. Here `alpine` does contain `echo`, so this error usually means a typo in the command or a base image that lacks the tool. Read the quoted program name — that is what Docker could not find.

## Common errors

### Error: the file is named `Dockerfile.txt` (Windows, often)

**What happens:** On Windows, Explorer and Notepad hide file extensions by default. You think the file is `Dockerfile`, but it is really `Dockerfile.txt`, and the build cannot find a Dockerfile.

**Fix:** In File Explorer, turn on "File name extensions" (View → Show → File name extensions) and rename the file to `Dockerfile`. In PowerShell, run `Get-ChildItem` and confirm the name has no extra suffix. The name is exact and case-sensitive: `Dockerfile`, not `dockerfile`.

### Error: expecting to run the Dockerfile like a script

**What happens:** You try `./Dockerfile` or double-click it, and nothing useful happens.

**Fix:** A Dockerfile is data for `docker build`, not a program. The command is always `docker build ...`, never `./Dockerfile`.

### Error: building from the wrong folder

**What happens:** The build fails with `open Dockerfile: no such file or directory`, or it succeeds but seems to contain the wrong files.

**Fix:** Check where you are with `pwd` (macOS/Linux) or `Get-Location` (PowerShell). The dot in `docker build -t name .` means "this folder." Aim it at the folder that holds the Dockerfile.

## Checkpoints

Answer in your own words before the assignment:

1. Why can you not run a Dockerfile with `./Dockerfile`?
2. In `docker build -t hello-docker .`, what does each of the three parts do?
3. What is the build context, and why is it more than just the Dockerfile?
4. Name two things a Dockerfile is *not*.

If you can answer these, you are ready to practice.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Read the shape

Write down, without looking, the three parts of `docker build -t hello-docker .` and what each does.

### P2 — Break it on purpose

Rename your `Dockerfile` to `recipe.txt` and run the build again. Read the error. Rename it back and confirm the build succeeds. You are training yourself to read that message calmly.

### P3 — Predict then run

Look at this Dockerfile and predict exactly what a container will print before you build and run it:

```dockerfile
FROM alpine
CMD ["echo", "dockerfile practice"]
```

Then build it as `docker build -t practice-11 .` and run it with `docker run --rm practice-11`. Compare reality to your prediction.

### P4 — Spot the wrong idea

Which of these statements are false? For each false one, write the correction.

- "A Dockerfile is a script you execute."
- "The Dockerfile is stored inside the running container."
- "The build context is the set of files Docker receives when building."
- "`-t` gives the image a name."

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No deep dive into individual instructions — that is **U12**.
- No `.dockerignore` — that is **U13**.
- No serious discussion of tags — that is **U14**.
- No layers or build cache — that is **U15**.
- No multi-stage builds — that is **U16**.
- No pushing images anywhere — that is Phase 6.

## Next unit

**U12 — Dockerfile instructions** (what `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, `EXPOSE`, and `ENTRYPOINT` actually do).
