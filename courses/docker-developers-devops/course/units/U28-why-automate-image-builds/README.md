# U28 — Why automate image builds

**Phase 6 — Registries and automation**

## Where you are

In U27 you pushed an image by hand: build, tag, push. It worked, but it depended on you being at your laptop, remembering the exact commands, and not making a typo. This unit explains why teams move that routine off their desks and into a **build pipeline** that runs the same steps the same way, every time. There are no new Docker commands here — the point is the *why*. The next unit (U29) gives you a concrete pipeline to run for free.

## What you will be able to do

- Explain the pain of doing builds by hand and name at least three specific problems it causes.
- Explain what "the same input produces the same artifact" means and why it matters.
- Describe the three stages of a build pipeline: build → test → push.
- Explain what CI (continuous integration) means in plain language.
- Read a pipeline's stages and say which one is failing.

## What you need already

- **U14–U16** — building images, tags, and multi-stage builds.
- **U24** — environment variables and secrets (a pipeline needs secrets too).
- **U26–U27** — registries, `docker login`, `docker push`.
- A GitHub account is useful for U29 but not required for this unit's reading.

## Time and energy

About **40–60 minutes**, almost entirely reading and reasoning. If the word "pipeline" has ever sounded like corporate fog, this is the unit where it becomes a clear, small idea.

## Why this exists

Hand-building is fine while you are learning. It quietly becomes a problem the moment more than one person, or more than one machine, needs the image. Automating builds removes a whole category of "but it worked when I ran it" arguments. It also gives you a written, shared record of exactly how your image is produced — the kind of thing you can hand to a new teammate without a meeting.

## Plain-language teaching

### The pain of manual builds, named precisely

Imagine a team of four. The release procedure lives in a chat message that says: "pull the latest, `docker build -t app:1.0 .`, then `docker push ...`." What can go wrong?

1. **Someone forgets a step.** They push before running the tests, or they forget to pull the latest code first.
2. **Someone builds from their own mess.** A developer builds with uncommitted local changes, so the pushed image contains code nobody else can see.
3. **Machines differ.** One laptop has a different base-image version cached, or a different Docker version, and gets a slightly different result.
4. **Nobody can reproduce it.** Months later, no one knows which commands produced the image now running in production.
5. **It depends on a person being awake.** Saturday-night fix? Whoever is online becomes the release process.

Every one of these is a *process* failure, not a skill failure. The fix is not "try harder" — it is to write the steps down once and have a machine run them.

### What a build pipeline is

A **build pipeline** is an automated sequence of steps that starts when something changes (usually a push to your code repository) and ends with a tested image in a registry.

The word "pipeline" is just a metaphor for "things that happen in order, one after another." A useful concrete image: water flows in at one end and a finished bottle comes out the other. For us, the input is source code and the output is a tagged image.

Most pipelines have three stages. We will use these names throughout the course:

```text
  [ build ]  →  [ test ]  →  [ push ]
   make the      prove it     send the
   image         behaves      image to the
                              registry
```

- **Build:** create the image from the code, exactly as a developer would with `docker build`.
- **Test:** run something against the image to prove it is not broken — a smoke test, unit tests, a version check. If tests fail, the pipeline *stops* here. Nothing reaches the registry.
- **Push:** tag the image and push it to the registry, as in U27.

The crucial property is order and gates. Test runs *before* push. A failing test blocks the bad image from being published. There is no "I will test it later."

### What CI means, plainly

**CI** stands for **continuous integration**. The honest, low-jargon meaning: *every time someone adds code to the shared project, a machine automatically checks that the code still builds and still passes its tests.* "Continuous" means it happens on every change, not once a month before release. "Integration" means it checks that this new code works together with everyone else's.

CI is the build + test part of the pipeline. When people say "the CI is red," they mean the automated checks failed on the latest code. That red mark is a gift: it caught the problem in minutes instead of in production.

### The same input should give the same output

**Reproducibility** means: given the same source code and the same instructions, the build produces the same image, no matter who runs it or which machine runs it.

Manual builds quietly break reproducibility:

- An unpinned base image (`FROM python:latest`) can change between two builds.
- Builds that depend on files only on one person's laptop.
- Builds that depend on a dependency version resolving differently on different days.

Pipelines help by always starting from a clean machine and always running the same written steps. To get real reproducibility you also **pin your versions**: prefer `python:3.12.4-slim` over `python:latest`, and commit your lockfiles (`requirements.txt`, `package-lock.json`).

### What we would do without a pipeline

You would keep doing what U27 had you do, by hand, and trust the group to remember. This "works" in exactly the same way that a shared document of house rules "works": fine until someone forgets, and then everyone argues.

### Who runs the pipeline?

A **CI service** is the machine that watches your code repository and runs the pipeline when it changes. Popular free tiers include:

- **GitHub Actions** — built into GitHub; free for public repositories, with a monthly free allowance for private ones. This is what U29 uses.
- **GitLab CI/CD** — built into GitLab.
- **CircleCI, Travis CI** — dedicated services with free tiers for open projects.

The machine that runs your job is often called a **runner** or **agent**. It is a fresh, temporary computer that the service spins up, uses, and then throws away. Because it starts clean, "it worked on my laptop" cannot hide there.

### Secrets in a pipeline

The pipeline needs to log in to the registry (U26) to push (U27). That login needs a secret — your Docker Hub access token. You must **never** paste that token into a file in your repository, because everyone who can read the repo can read the file.

Instead, CI services have a **secrets store**: a private place on the service's website where you save a named value (for example `DOCKERHUB_TOKEN`) that the pipeline can use without ever printing it. U24 introduced the idea of secrets; a CI secrets store is the same idea, on the server side. We use this for real in U29.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Pipeline | An automated, ordered set of build steps | Not a mysterious corporate process; just steps in order |
| CI | Automatically building + testing every code change | Not a tool name; a practice |
| Build stage | Makes the image | Not where tests live |
| Test stage | Proves the image works; blocks the push if it fails | Optional but strongly recommended |
| Push stage | Sends the image to the registry | Same act as U27's manual push |
| Runner / agent | The clean machine a CI service uses to run your steps | Not your laptop |
| Trigger | The event that starts the pipeline | Usually "a push to the main branch" |
| Artifact | A file the pipeline produces and keeps | Here, usually the built image or a test report |
| Reproducibility | Same input → same output | Not "it built once" |
| Secrets store | A private place to keep tokens for CI | Not a file in your repo |

## Worked example

**Scenario:** A book-club team maintains a small web app. Their manual release procedure has failed twice: once someone pushed an untested image, once someone pushed code that was not committed. We will rewrite the procedure as a pipeline on paper, then preview how it will look in U29.

**The manual procedure they were using:**

```text
1. git pull
2. docker build -t bookclub:1.0 .
3. docker run --rm bookclub:1.0 python -m pytest   # tests
4. docker tag bookclub:1.0 priya-hub/bookclub:1.0
5. docker push priya-hub/bookclub:1.0
```

This is already almost a pipeline — it is just on a human's keyboard. Every command here is one you have seen:

- `git pull` — fetch the latest code.
- `docker build -t bookclub:1.0 .` — build the image (U11–U14).
- `docker run --rm bookclub:1.0 python -m pytest` — run the tests inside the image, then remove the container (U07, U10).
- `docker tag ... ` and `docker push ...` — the U27 steps.

**The same procedure as a pipeline, described in plain stages:**

```text
trigger: someone pushes to the main branch
  stage build:  docker build -t bookclub:1.0 .
  stage test:   docker run --rm bookclub:1.0 python -m pytest
   → if tests fail: STOP. The push stage never runs.
  stage push:   docker tag ... ; docker push priya-hub/bookclub:1.0
  on success:   the registry has a new bookclub:1.0
```

**One decoded failure at pipeline level:**

```text
test stage failed: 2 failed, 7 passed
build passed; push was skipped
```

**Decoded:** the tests found a real problem. Because test sits before push, the broken image was *not* published. The team's registry is still serving the last good image. This is the pipeline doing its job — a red pipeline is often a success story, not a disaster.

**A second decoded failure, the one pipelines are famous for:**

```text
build works on my laptop but fails on the runner with:
ModuleNotFoundError: No module named 'pytest'
```

**Decoded:** the laptop had `pytest` installed globally, so it "worked"; the clean runner only has what the Dockerfile installs. The fix is to make the image self-sufficient: install test dependencies *inside* the image (for example in the Dockerfile or a test-specific stage), not on the host. This is precisely the class of bug automation is built to surface early.

## Common errors

### Error: "the pipeline passes but the app is broken"

**What happens:** the test stage is too thin — it checks that the image *starts*, not that it *works*.

**Fix:** add at least one meaningful test (a real request, a real function call). A `docker version` step is not a test.

### Error: "it worked when I ran the commands, but the pipeline fails"

**What happens:** something existed on your laptop that the pipeline does not have — an installed package, a cached layer, a file you never committed.

**Fix:** commit everything needed, install tools inside the image, and pin versions. Read the failing stage's log line by line; the difference will be named there.

### Error: secret appears in the pipeline log

**What happens:** the token was echoed or written into a file in the repo.

**Fix:** rotate (regenerate) the token now — assume it is compromised — store it in the CI secrets store, and never print it. Secrets belong in the store, not the code.

## Checkpoints

1. Name three specific problems caused by building images by hand.
2. What does a pipeline do between build and push, and why does the order matter?
3. Explain "continuous integration" without using the word "integrate."
4. Why should the token never live in a file in your repository?

## Practice exercises

### P1 — Read and predict

Here is a broken pipeline order:

```text
trigger: push to main
  stage push:  docker push team/app:1.0
  stage test:  docker run --rm team/app:1.0 python -m pytest
  stage build: docker build -t team/app:1.0 .
```

Predict what generally goes wrong. Then write the correct order.

### P2 — Change one thing

In the book-club pipeline, change the trigger to "every pull request" instead of "every push to main." Write two sentences on what improves and one on what could get noisier.

### P3 — Write from a spec

Write the three pipeline stages for a Node.js app whose tests run with `npm test`, under the namespace `aisha-dev`, image name `notes-app`, tag `2.0`. You do not need real YAML yet — plain stages are fine.

### P4 — Debug this

A teammate says: "Our pipeline is useless; it has been red all week and we cannot ship." Write three sentences explaining what the red pipeline is actually telling them.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No real workflow file or CI service setup — that is U29.
- No deployment, orchestration, or Kubernetes.
- No advanced pipeline features (matrix builds, caching, parallel jobs).

## Next unit

**U29 — A minimal GitHub Actions build** (we turn the pipeline we just described into a real, free, working file).
