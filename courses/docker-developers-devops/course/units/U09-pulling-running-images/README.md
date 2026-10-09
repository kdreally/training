# U09 — Pulling and running existing images

**Phase 2 — Docker basics**

## Where you are

You know image vs container (U08). Now you work with images from **Docker Hub** (public registry), understand **tags** (`latest` vs pinned), and run a real service image (like `nginx`) while being careful about trust.

## What you will be able to do

- Explain what Docker Hub is (plain language) and why we use it.
- Explain `docker pull` and when it runs automatically with `docker run`.
- Explain image tags: `latest` vs a specific/pinned tag, and trade-offs.
- Run an existing image (e.g. `nginx`) and understand it starts a service.
- Explain basic trust: use official images and avoid running unknown images blindly.
- Decode common pull/run failures.

## What you need already

- U00–U08

## Time and energy

**30–50 minutes**.

## Why this exists

Most learning starts by reusing existing images. You need to know pulling, tags, and safe choices before building your own (U11+).

## Plain-language teaching

### What is a registry? What is Docker Hub?

A **registry** is a place to store and share images (like a library). **Docker Hub** is a public registry many people use. Official images are published by projects/maintainers and marked "official" — easier to trust for learning.

### docker pull vs docker run

- `docker pull <image>:<tag>` downloads the image only (no container started).
- `docker run <image>:<tag>` will pull if not local, then create+start container.

So pulling explicitly is optional but useful (see what you download, control timing).

### Tags: latest vs pinned

A **tag** is a label for an image version (e.g. `nginx:1.27.2`, `nginx:latest`). 
- `latest` means "the default tag" the publisher sets — convenient, but can change over time.
- **Pinned tag** (specific version) is more predictable/reproducible. For learning both are fine; be aware of difference.

### Running a service image (nginx)

`nginx` is a web server. When you run it in a container, it listens on ports inside the container. To reach it from your host, you need to map ports (covered in U18). For this unit, focus on: pull/run works and container stays running (detached idea introduced gently) or just observe it runs.

### Trusting images

- Prefer **official** images when learning (`nginx`, `redis`, `ubuntu` official).
- Do not blindly `docker run` random images from untrusted sources.
- This is hygiene, not paranoia.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Registry | Storage for images | Docker Hub is one registry |
| Docker Hub | Public image registry | Not the only one (GHCR, ECR etc.) |
| Repository | Name of app/image set | e.g. `library/nginx` or `nginx` |
| Tag | Version label | `latest` is just a tag name |
| Official image | Verified publisher | Looks safer for first steps |
| Pull | Download image | Different from run |

## Worked example

### Pull explicitly
**What it does:** Downloads `nginx:latest` without starting container.
- All shells: `docker pull nginx:latest`

**Expected success:** lines showing layers pulled/downloaded, ending with "Status: Downloaded newer image...".

**Typical failure:** network offline → timeout/error; or rate limits (rare for learning). Also daemon down.

### Run nginx (observe it runs)
**What it does:** Runs nginx container. Let us run in foreground briefly to see logs, or note it runs. For now:
- All shells: `docker run --name web-test nginx:latest`

**Expected:** nginx starts and may print logs to terminal (foreground). To stop: `Ctrl+C` in that terminal (sends stop). Container exits.

**Note:** To run in background use `-d` (detached) — introduced in U10; here we focus on pull/run behavior.

### Check with ps
After starting (and maybe stopping), run `docker ps -a` to see `web-test` from `nginx:latest`.

**Typical failure:** name conflict if `web-test` exists → remove or use different name (U10).

## Common errors

### CE1 — Image not found
**Symptom:** `manifest for ... not found`.  
**Why:** Wrong name/tag or typo.  
**Fix:** check spelling/tag exists on Docker Hub (mentally) or use correct name.

### CE2 — Network issues
**Symptom:** timeouts pulling.  
**Why:** No internet or proxy.  
**Fix:** verify connectivity, retry once.

### CE3 — Using unknown images
**Symptom:** Temptation to run arbitrary image.  
**Why:** Risk unclear.  
**Fix:** Prefer official images for learning.

## Checkpoints

1. What is Docker Hub in plain words?
2. Difference between `docker pull` and `docker run`?
3. `latest` vs pinned tag — trade-off?

## Practice exercises

### P1 — Pull without run
`docker pull redis:latest` and see it in `docker images`.

### P2 — Run and see
`docker run --name redis-test redis:latest` (foreground) then Ctrl+C; check `docker ps -a`.

### P3 — Predict tag
Why might `nginx:1.27.2` behave more predictably than `nginx:latest` over months? Write 1–2 lines.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Port mapping (`-p`) details (U18)
- Detached mode deep dive except awareness (U10)
- Building/pushing to your own repo (U14, U27)

## Next unit

**U10 — Container lifecycle** (start, stop, logs, exec, rm, cleanup).