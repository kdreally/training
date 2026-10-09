# U33 — Security habits

**Phase 7 — Craft and capstone**

## Where you are

You can now build, run, and compose real containers. This unit is about doing that **without leaving the door open**. We are not going to turn you into a security engineer. We are going to give you a short set of habits that remove the most common, most avoidable container mistakes — and a checklist you can run over any Dockerfile in about five minutes.

Every habit here is free, local, and testable on your own machine.

## What you will be able to do

- Run a container as a **non-root user** and verify which user an image would use.
- Choose a **minimal base image** and explain the trade-off.
- Keep **secrets out of image layers**, and prove with `docker history` why `ARG`/`ENV` are not safe places for them.
- **Pin** image versions instead of drifting on `latest`.
- Describe what image **scanning** is for and where you met it (U30).
- Apply a written **security review checklist** to a Dockerfile and fix what it finds.

## What you need already

- **U11–U16** — Dockerfiles, instructions, `.dockerignore`, layers, multi-stage builds.
- **U24** — environment variables and `.env` files (the intro to secrets).
- **U30** — image scanning and size hygiene.
- **U31** — running a service.

## Time and energy

About **60–90 minutes**. The hands-on part is short; the thinking part matters more. The "secrets in layers" demonstration is the moment most learners remember, so do not skip it.

## Why this exists

A container image is a file you can hand to anyone: a teammate, a registry, a server, the whole internet. Whatever is inside it travels with it. Mistakes that would be minor in a private folder become major when the image is pushed to a public registry, because anyone can download it and inspect every layer.

Security for containers is not mainly about exotic attacks. It is about a handful of ordinary oversights:

- running as root because that is the default,
- shipping a giant base image full of software you never use,
- pasting a password into a Dockerfile "for now,"
- using `latest` so your build changes under your feet,
- never checking the image for known problems.

None of those requires deep expertise to fix. They require habits. This unit installs them.

## Plain-language teaching

### The default is root, and that is a choice you should override

Inside a container, processes run as some **user**. If you do not say otherwise, that user is **root** — the all-powerful user, just like on a normal Linux machine. Many container images inherit this default.

Why does it matter? If an attacker ever gets code running inside your container, they get it running *as root*. If your container is misconfigured in ways that let it touch the host, root inside makes it worse. Running as a **non-root user** is a cheap, high-value habit: if the process cannot do much, neither can an intruder riding on it.

A **non-root user** is simply a user account that lacks administrator powers. The habit: create or use an unprivileged user in the Dockerfile and switch to it with the `USER` instruction.

### Minimal base images: less is genuinely safer

Your `FROM` line chooses a **base image**: the starting filesystem for your image. Every file in that base is a file that could contain a bug or a known vulnerability.

- `alpine` variants are tiny (a few megabytes).
- `-slim` variants strip documentation and tooling.
- **distroless** images (a Google-published family) contain your app and almost nothing else — no package manager, often no shell.

The trade-off is real: a **smaller base means a smaller attack surface, but fewer tools for debugging**. A distroless image has no `sh` to `docker exec` into (remember that for U34). The habit is to choose the *smallest base that still lets you do your job*, not the smallest possible by reflex.

### Secrets must never live in the image

A **secret** is any value that must stay private: a password, an API key, a token. The rule is blunt:

> **Never bake a secret into an image layer. Provide it at run time.**

Why "at run time" and not "in the Dockerfile"? Because image layers are permanent and inspectable. Two common traps:

1. **`ENV API_KEY=...`** writes the value into image metadata. `docker history` shows it.
2. **`ARG API_KEY`** looks temporary, but if you use it in a `RUN` command, the expanded command — including the value — is recorded in the layer.

Even deleting the file in a later layer does not help: the earlier layer still contains it. **Layers are history; you cannot un-ring the bell.**

The safe pattern: pass secrets when you **run** the container, via environment variables supplied at run time or an `env_file` that is not committed (U24). For build-time needs, BuildKit offers secret mounts, but that is an advanced topic; the habit that matters now is "not in the layer."

### Pin versions; do not drift on `latest`

An image **tag** is a human label like `1.27` or `latest`. A **digest** is a content fingerprint like `sha256:...` that identifies one exact image forever.

`latest` is a moving target: the same `FROM node:latest` can produce a different image next month. **Pinning** means naming a specific version (and optionally a digest) so your build is reproducible. This is not only a security habit; it is also how you avoid a build that "worked yesterday."

### Scanning: see known problems in the image

**Scanning** is automatic inspection of an image against databases of known vulnerabilities, usually tracked by **CVE** numbers. You met scanning in U30. The habit is simple: scan before you push, and re-scan images you already run, because new vulnerabilities are discovered in software you already shipped.

### Least privilege, in one line

**Least privilege** means: give the process the smallest powers it needs, and nothing more. Non-root users, minimal images, and read-only filesystems are all applications of that one idea.

### The five-minute review checklist

Run this over any Dockerfile:

- [ ] Does it set a non-root `USER` before the final `CMD`?
- [ ] Is the base image minimal and a specific pinned version (not `latest`)?
- [ ] Are there any `ENV`/`ARG`/`RUN` lines containing secrets? (They are not safe.)
- [ ] Is `.dockerignore` excluding `.env`, `.git`, and local junk (U13)?
- [ ] Does the final image contain build tools it does not need (multi-stage fix, U16)?
- [ ] Has the image been scanned recently (U30)?
- [ ] Does the app listen as a non-root user on a high port (or get the needed capability explicitly)?

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Base image | The filesystem your image starts from (`FROM`) | Not just "a starting point"; everything in it ships with you |
| Minimal image | A base with as little extra software as possible | Not "always the smallest possible" |
| Distroless | An image with the app and almost no OS tooling | Not a normal Linux distro; often no shell |
| Non-root user | An account without administrator powers | Not "a disabled user" |
| Attack surface | All the ways software could be attacked | Not only network ports |
| Secret | A value that must stay private (password, key, token) | Not the same as a variable, though often carried by one |
| `ARG` | A build-time variable | Not private, even if it feels temporary |
| `ENV` | An environment variable baked into the image | Not a place for secrets |
| Tag | A human-readable label for an image version | Not guaranteed to stay fixed |
| Digest | A content fingerprint for one exact image | Not a tag; it never moves |
| Pinning | Using a specific version (and possibly digest) | Not "using the newest" |
| CVE | A public identifier for a known vulnerability | Not a verdict on your app by itself |
| Scanner | Tool that checks an image for known issues | Not a guarantee of safety |
| Least privilege | Give the fewest powers needed | Not "lock everything down so nothing runs" |

## Worked example

**Goal:** see for yourself that a secret written into a Dockerfile is not hidden, then fix it.

### The wrong-on-purpose Dockerfile

Create a folder and a file named `Dockerfile.bad` with this content:

```dockerfile
FROM alpine:3.20
ARG API_KEY=sk-live-EXAMPLE-DO-NOT-USE
ENV API_KEY=$API_KEY
RUN echo "the key is $API_KEY" > /notice.txt
CMD ["sh", "-c", "echo running; sleep 3600"]
```

Two mistakes here: an `ENV` that bakes the key into image metadata, and a `RUN` that writes the key into a file on a layer. The default secret value is a harmless fake — never use a real one for this exercise.

Build it, tagging it `bad-image:1.0`:

```bash
docker build -f Dockerfile.bad -t bad-image:1.0 .
```

- **Purpose:** turn the Dockerfile into an image so we can inspect what got recorded.
- **Success looks like:** build steps complete and the last line says something like `Successfully tagged bad-image:1.0`.
- **One decoded failure:** `failed to solve: failed to read dockerfile: open Dockerfile.bad: no such file` means you are not in the folder containing the file. Move to the folder (U03) and rerun.

### Inspect the history — the reveal

This prints each layer's creating command **without truncation**, so the full text is visible.

```bash
docker history --no-trunc bad-image:1.0
```

- **Purpose:** show exactly what each layer recorded.
- **Success looks like:** a table whose `CREATED BY` column contains the full line `ENV API_KEY=sk-live-EXAMPLE-DO-NOT-USE` and the full `RUN echo "the key is sk-live-EXAMPLE-DO-NOT-USE" > /notice.txt`. Your "secret" is there in plain sight.
- **One decoded failure:** an empty or column-shuffled table in some terminals means the text is wrapping. Widen the window, or pipe to a file and read it (`docker history --no-trunc bad-image:1.0 > history.txt`).

### Prove the user default

This reads just the configured user from the image metadata. An empty result means "root," because no user was set.

```bash
docker inspect -f "{{.Config.User}}" bad-image:1.0
```

- **Purpose:** check which user the image would run as.
- **Success looks like:** a blank line — confirming the image does not set a user and would run as root.
- **One decoded failure:** `Error: No such object` means you mistyped the image name; confirm it with `docker images`.

### The fixed Dockerfile

```dockerfile
FROM alpine:3.20
RUN adduser -D -u 10001 appuser
WORKDIR /app
COPY notice.txt .
USER appuser
CMD ["sh", "-c", "echo running; sleep 3600"]
```

Notes:

- `adduser -D -u 10001 appuser` creates an unprivileged user with a fixed id (`-D` makes a system user without a password; `-u` sets the numeric id).
- `USER appuser` switches to it for the rest of the build and the container's runtime.
- The secret is gone. It would be supplied at run time with `--env` or `--env-file`, never in the Dockerfile.

Build and verify:

```bash
docker build -t good-image:1.0 .
docker inspect -f "{{.Config.User}}" good-image:1.0
```

**Success looks like:** the build succeeding, and the inspect printing `appuser`. Compare the two history outputs — the fix removed the leak.

Clean up when done:

```bash
docker rmi bad-image:1.0 good-image:1.0
```

## Common errors

### Error: "I put the key in a file and deleted it in the next layer, so it is gone"

**What happens:** You believe the secret is removed. It is not.

**Why:** Each layer stores a filesystem difference. Deleting a file in a later layer only records a deletion; the earlier layer still contains the bytes, and `docker history`/extraction reveals them.

**Fix:** Never write the secret in the first place. Supply it at run time.

### Error: "An unused `ARG` cannot leak"

**What happens:** A build-time `ARG` used inside a `RUN` shows its value in history.

**Why:** The build substitutes the value into the command before recording the layer.

**Fix:** Treat `ARG` as public. For genuine build secrets, use BuildKit secret mounts (advanced) or avoid build-time secrets.

### Error: "`curl | sh` as root is fine, it is only inside the container"

**What happens:** Scripts run as root during the build, widening what a compromised script can do.

**Why:** Build steps run with the build's privileges.

**Fix:** Prefer pinned package installs; switch to a non-root user as early as the build allows.

### Error: "`latest` keeps me current"

**What happens:** A build silently changes when upstream moves `latest`, breaking reproducibility and hiding version changes.

**Why:** `latest` is a label, not a promise.

**Fix:** Pin a version tag (for example `alpine:3.20`) and update it deliberately.

### Error: "Non-root means the app cannot bind to port 80"

**What happens:** The app fails to start because it is not allowed to listen on a low port.

**Why:** On Linux, ports below 1024 usually require elevated privileges.

**Fix:** Listen on a high port internally (for example 8000) and map it externally with `-p 80:8000` (U18). The app stays unprivileged; the mapping handles the outside port.

## Checkpoints

Answer in your own words before the assignment:

1. Why is running as root inside a container a risk worth removing?
2. Name two Dockerfile instructions that are *not* safe for secrets, and explain why.
3. What is the trade-off of choosing a minimal or distroless base image?
4. What is the difference between a tag and a digest?
5. What does a scanner check, and why must you re-run it over time?

## Practice exercises

### P1 — Audit and fix

Take the `Dockerfile.bad` from the worked example and fix **three** separate problems. Build the fixed image and confirm `docker inspect -f "{{.Config.User}}"` is non-empty.

### P2 — History detective

Run `docker history --no-trunc` on any image you have built in this course. Find one line you did not expect to see recorded. Write down what it is and whether it is a concern.

### P3 — Base image compare

Pull `python:3.12`, `python:3.12-slim`, and `python:3.12-alpine`. Compare their sizes with `docker images`. Write two sentences: which would you choose for a small web app, and what do you give up?

### P4 — Checklist on your own work

Apply the five-minute review checklist to a Dockerfile you built in an earlier unit. Mark each item pass/fail. You do not have to fix everything; you have to *see* it.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No kernel hardening, seccomp, AppArmor, or capability deep dives.
- No secret-management products (Vault and similar).
- No network security, TLS, or firewalls.
- No supply-chain tools beyond the scanning you met in U30.
- No advanced BuildKit secret-mount tutorials.

## Next unit

**U34 — Debugging containers calmly** (a repeatable method for when things go wrong).
