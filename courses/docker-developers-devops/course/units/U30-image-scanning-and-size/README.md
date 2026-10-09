# U30 — Image scanning and size hygiene

**Phase 6 — Registries and automation**

## Where you are

You can now build, push, and automatically publish images. The last phase-6 habit is stewardship: keeping images **small** and understanding **what is inside them**. Small images pull faster, waste less disk, and expose less to attackers. In this unit you tidy the images on your machine, learn what makes an image big, and read a security scan without panicking.

## What you will be able to do

- Explain why image size matters in concrete terms.
- Read the `SIZE` column of `docker image ls` and judge whether an image is unusually large.
- Use `docker image prune` safely and explain what each variant deletes.
- Name three ways to slim an image, and which unit taught each.
- Read the output of `docker scout` (or `trivy`) calmly and decide what actually needs action.

## What you need already

- **U10** — container lifecycle and `docker rmi`/`rm`.
- **U13** — `.dockerignore`.
- **U15–U16** — layers, cache, and multi-stage builds.
- **U26–U27** — pulling and pushing images (size matters most when images travel).

## Time and energy

About **50–75 minutes**. The scanning tool may download a database the first time it runs, which can take a few minutes; that is normal. Nothing here is dangerous to try — the cleanup commands only remove things you can rebuild or re-pull.

## Why this exists

Two quiet costs hide in a big image.

First, **time**. Every pull copies the image over the network. A 1 GB image pulled by ten machines is 10 GB of transfers; a 150 MB image is a tenth of that. In a pipeline (U29), that difference shows up on every single build.

Second, **risk**. Every program inside an image is code that could have a known security flaw. An image that carries a full compiler toolchain, a system package manager, and years of accumulated libraries has far more of those flaws than a lean image that ships only what the app needs. A **vulnerability scanner** looks inside your image and lists the known flaws in its packages. It is not a verdict on your skill — it is a map of where to tidy next.

## Plain-language teaching

### Why image size matters

Think of an image as a box you have to ship. Bigger box, slower shipping, more storage on every shelf, more surface for something to be wrong. Three concrete consequences:

1. **Pull time.** Slow pulls slow down teammates, CI runners, and deployments.
2. **Disk and cost.** Images accumulate locally and in registries; storage is finite and sometimes billed.
3. **Attack surface.** More packages mean more code that could contain a known vulnerability. Less is genuinely more.

### Where the size comes from

An image is a stack of **layers** (U15). Size usually comes from the **base image** and from what your Dockerfile installs on top.

A quick way to see the base image's weight: compare similar images in `docker image ls`. A full Python image is roughly 1 GB; `python:3.12-slim` is a fraction of that; `python:3.12-alpine` is smaller again. Node has `node:20` versus `node:20-slim` versus `node:20-alpine` in the same way.

### Command: `docker image ls`

**What it does:** lists local images with their tag and size — your starting point and your measuring stick.

```bash
docker image ls
```

- **Success looks like:**
  ```text
  REPOSITORY                      TAG       IMAGE ID       CREATED       SIZE
  python                          3.12      7ab1...        2 weeks ago   1.02GB
  myapp                           1.0       9f2c...         1 hour ago   148MB
  myapp                           <none>    1d0a...         3 days ago   997MB
  ```
  The `<none>` tag marks a **dangling image** — an untagged image, often an older build that a new tag replaced.
- **One decoded failure:** `Cannot connect to the Docker daemon` → decoded: Docker is not running; start it (U06). This is the same fix as always.

### Command: `docker image prune`

**What it does:** deletes images you are no longer using, freeing disk. Used carefully, it is routine housekeeping.

Two forms, and the difference matters:

```bash
docker image prune
```
- **Deletes:** only **dangling** images — untagged ones with no container using them. This is the safe default.
- **Success looks like:**
  ```text
  Deleted Images:
  deleted: sha256:1d0a...
  Total reclaimed space: 1.1GB
  ```

```bash
docker image prune -a
```
- **Deletes:** *all* images not used by a running or stopped container — including ones with tags you might still want.
- **Success looks like:** a longer `deleted:` list and a total reclaimed space line.

- **One decoded failure / surprise:** `-a` deleted an image you wanted, because no container was using it. Decoded: `-a` means "all unused," not "all broken." The image can almost always be rebuilt from its Dockerfile or re-pulled (U27). The lesson: read the prompt before confirming. `docker image prune` asks `Are you sure? [y/N]`; answer honestly, or type `--force` only when you are certain.

**A safe habit:** run plain `docker image prune` first and read the reclaimed-space number. Only reach for `-a` when you truly want a clean slate.

### Slimming an image: three levers you already own

1. **A smaller base image.** Swap `python:3.12` for `python:3.12-slim` (or alpine where your dependencies allow). This removes a large slice of unneeded OS and tooling. Taught in U16 and previewed in U27.
2. **A multi-stage build.** Build in a stage with all the compilers and headers, then copy only the finished files into a tiny final stage. The toolchain never ships. Taught in U16.
3. **A good `.dockerignore`.** Everything in the build context can end up in a layer. Ignore `.git`, `node_modules`, virtual environments, logs, and test data. Taught in U13.

A fourth, smaller lever: combine related `RUN` steps and clean package caches in the same layer, so the cache is not stored permanently.

### Scanning: what a vulnerability scanner does

A **vulnerability scanner** reads the package list inside your image and compares it to databases of known vulnerabilities (often called **CVEs** — Common Vulnerabilities and Exposures). It reports what it finds with severity labels like `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`.

**What it is not:** it is not a test of your code, and it is not a score of you. Most findings come from the base image and from third-party packages, and many are not exploitable in your particular use. The scan is a map, not a verdict.

### Tool: `docker scout`

**Docker Scout** ships with recent Docker Desktop versions and is the natural first scanner because you likely already have it.

**What it does:** inspects an image and summarizes its base image and known vulnerabilities.

```bash
docker scout quickview myapp:1.0
docker scout cves myapp:1.0
```

- `quickview` gives a short summary (base image, counts by severity).
- `cves` lists the individual findings.
- **Success looks like (quickview, trimmed):**
  ```text
    Target   │  myapp:1.0
      digest │  sha256:...
    Base image │ python:3.12-slim
    Vulnerabilities │ 0C 2H 7M 19L
  ```
  The letters mean Critical, High, Medium, Low counts.
- **One decoded failure:** `docker: 'scout' is not a docker command` → decoded: your Docker version does not include Scout. Update Docker Desktop, or use the free alternative below. It is not a problem with your image.

### Alternative tool: `trivy` (free, open source)

If Scout is unavailable, **Trivy** is a free, widely used scanner. It is a separate download, so treat this as optional; ask your trainer if installing it fits your setup.

```bash
trivy image myapp:1.0
```

- **What it does:** scans the image and prints a table of vulnerabilities by severity.
- **Success looks like:** a table ending with a summary line such as:
  ```text
  python:3.12-slim (debian 12.5)
  Total: 14 (UNKNOWN: 0, LOW: 10, MEDIUM: 3, HIGH: 1, CRITICAL: 0)
  ```
- **One decoded failure:** `trivy: command not found` → decoded: Trivy is not installed or not on your `PATH`. Install it from the official project, or stay with `docker scout`.

**Everything here is free.** Scout is part of Docker Desktop; Trivy is open source.

### Reading scan output calmly

When you first see a list of vulnerabilities, the urge is to panic or ignore it entirely. Do neither. Work the list:

1. **Look at the base image first.** If 90% of findings are in the base image, the highest-value fix is usually to update or shrink the base (`slim`/`alpine`, newer pinned version).
2. **Start with `CRITICAL` and `HIGH`.** Ignore `LOW` for now; it will drown you.
3. **Check `Fixed Version`.** If there is a fixed version available, updating the package (or the base) resolves it. If not, note it and move on.
4. **Ask if it is exploitable here.** A flaw in a compiler that never ships (because of a multi-stage build) or in a network service your app never runs is often not reachable. Reduce risk by removing the code entirely where you can.
5. **Re-scan after a fix** and compare counts. You are looking for fewer high-severity findings, not zero — zero is rare and not the bar.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Dangling image | An untagged image (`<none>`) | Not the same as an unused, tagged image |
| `docker image prune` | Removes dangling images | The default is *not* "remove everything" |
| `docker image prune -a` | Removes all images not used by a container | More aggressive than the default |
| Base image | The image your `FROM` starts from | Usually the biggest single size contributor |
| `slim` / `alpine` | Smaller variants of common base images | Alpine can break Python packages that need native builds |
| Multi-stage build | Build big, ship small (U16) | Not a special flag; a Dockerfile pattern |
| CVE | A catalogued, known vulnerability | Not a bug in your code specifically |
| Scanner (Scout/Trivy) | Reads packages, compares to vulnerability databases | Not a test of correctness |
| Severity | CRITICAL/HIGH/MEDIUM/LOW ranking | Low is not "safe," just lower priority |

## Worked example

**Scenario:** Sam's `myapp:1.0` image is 997 MB, which feels too big for a one-line script. Sam measures, slims, cleans up, and scans.

**Step 1 — measure.**

```bash
docker image ls
```

Sam sees `myapp` at **997MB** and a `python` base at **1.02GB**. The base is the obvious culprit.

**Step 2 — slim the Dockerfile.** Before:

```dockerfile
FROM python:3.12
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

After:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

Only `FROM` changed. Rebuild:

```bash
docker build -t myapp:1.1 .
docker image ls myapp
```

- **What `docker build` does:** produces the new, smaller `myapp:1.1` (U11–U14).
- **Success looks like:** a `myapp` line whose `SIZE` is dramatically smaller (often around 150–200 MB for slim Python).
- **One decoded failure:** `python:3.12-slim not found` → decoded: the tag was mistyped or you are offline and do not have it cached. Check the spelling, or pull it once with a network connection.

**Step 3 — clean the leftovers.** The old 997 MB image is now dangling:

```bash
docker image prune
```

- **What it does:** removes dangling images only.
- **Success looks like:** `Total reclaimed space:` followed by a large number.
- **One decoded failure / surprise:** running `docker image prune -a` and losing a tagged image you wanted. Decoded: `-a` removes all unused images, tagged included. Rebuild or re-pull to get it back.

**Step 4 — scan.**

```bash
docker scout quickview myapp:1.1
```

- **What it does:** summarizes the base image and vulnerability counts.
- **Success looks like:** a short block headed `Target` and `Base image` with counts like `0C 2H 7M 19L`.
- **One decoded failure:** `'scout' is not a docker command` → decoded: update Docker Desktop, or use `trivy image myapp:1.1` instead.

**Step 5 — read it calmly.** The findings cluster in the base image. The response is not to panic; it is to (a) keep the slim base up to date, and (b) re-scan after updating. Sam's count drops. Sam does not chase it to zero.

**OS note:** `docker image ls`, `docker image prune`, and `docker scout` are identical across Windows, macOS, and Linux. Trivy installation differs by OS — prefer your OS's official instructions if you choose it.

## Common errors

### Error: "prune deleted something I needed"

**What happens:** `docker image prune -a` removed tagged images that no container was using.

**Fix:** rebuild from the Dockerfile or re-pull from the registry (U27). Next time, use plain `docker image prune` unless you want a clean slate. Nothing is unrecoverable as long as the source or the registry still has it.

### Error: `permission denied` while pruning on Linux

**What happens:** your user is not allowed to talk to the Docker daemon.

**Fix:** add your user to the `docker` group or run the command with appropriate privileges. On Docker Desktop (Windows/macOS) this does not occur. Treat "add myself to the docker group" as a security decision, not a magic fix — it grants broad power.

### Error: `'scout' is not a docker command`

**What happens:** your Docker is older than the version that bundles Scout.

**Fix:** update Docker Desktop, or use the free `trivy` alternative.

### Error: a scan reports a `CRITICAL` finding

**What happens:** a package in your image has a serious known vulnerability.

**Fix:** check whether a fixed version exists — often updating the base image or that package resolves it. If no fix exists yet, assess whether the affected code is actually reachable in your app, and reduce it (smaller base, multi-stage) where possible. One critical finding is a to-do item, not a failure of your character.

## Checkpoints

1. Give two concrete costs of a large image.
2. What exactly does plain `docker image prune` delete, and how is that different from `-a`?
3. Name the three slimming levers from earlier units, and which unit taught each.
4. Why is a scan with 40 findings not necessarily 40 things you must personally fix?

## Practice exercises

### P1 — Measure and predict

Run `docker image ls`. Pick your largest image. Predict its size as a percentage of the smallest. Then write one sentence naming the likely cause of the difference.

### P2 — Change one thing

Take any Dockerfile you built in earlier units and change only its `FROM` line to a `slim` or `alpine` variant. Rebuild. Record the before/after size. If the build breaks, note the error — that is useful information, not a failure.

### P3 — Safe cleanup

Run `docker image prune` (no `-a`). Record the reclaimed space. Then run `docker image ls` again and confirm your tagged images are still present.

### P4 — Read a scan

If you have `docker scout` or `trivy`, scan one of your images. Sort the findings: how many are in the base image versus added packages? Which single action would remove the most high-severity findings?

### P5 — Debug this

A teammate runs `docker image prune -a` on a shared build machine and later cannot run a test because the image is gone. Write two sentences on what happened and how they would recover it.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No deep vulnerability remediation, patching, or CVE triage policy.
- No registry-side scanning (that belongs to a later, deployment-focused unit).
- No hardening beyond size and base-image hygiene — non-root users and secrets-in-layers come in U33.
- No recommendation to install paid scanner plans; Scout and Trivy are enough here.

## Next unit

**U31 — From image to service** (where a pushed image actually gets run, and what "deploy" means in this course).
