# U27 — Pushing and pulling images

**Phase 6 — Registries and automation**

## Where you are

In U26 you learned what a registry is and how to read an image name. Now you actually move an image across the wire. You will build a small image, give it a **registry-ready name**, **push** it to Docker Hub, **pull** it back as if you were a different machine, and run it. We also cover the `denied` messages that scare people, and why a smaller image is a kinder image to push.

## What you will be able to do

- Explain the difference between a local image name and a registry-ready name.
- Use `docker tag` to give an existing image a name that points at a registry.
- Use `docker push` and `docker pull` and know what success output looks like.
- Decode `denied`, `unauthorized`, and `manifest unknown` failures.
- Name three concrete ways to make an image smaller *before* pushing it.

## What you need already

- **U11–U14** — Dockerfiles, `build`, and tags/naming.
- **U15** — layers and why pushes reuse layers.
- **U16** — multi-stage builds (referenced when slimming images).
- **U26** — what a registry, repository, namespace, and tag are; `docker login`.

## Time and energy

About **60–90 minutes**, and it needs an internet connection. Most of the effort is one push and one pull. Allow extra time for the first push; uploading layers over a slow connection is normal and not a sign anything is broken.

## Why this exists

A shared registry is only useful if you can put images *in* and take them *out*. `docker push` is how your work leaves your laptop; `docker pull` is how another machine receives the exact same artifact. Once you can do both, "it works on my machine" loses much of its power: the other machine runs your *image*, not a rebuild that might drift.

## Plain-language teaching

### Local names versus registry names

An image can have several names. All of them point at the same bytes; the names are just labels.

A **local name** like `shopping-list:1.0` is useful only to you. It has no registry part, so Docker will not try to push it anywhere.

A **registry-ready name** puts a registry and namespace at the front:

```text
<username>/shopping-list:1.0
```

That slash between the username and the image name is doing important work. It says: "this name belongs in a registry, under this account." When you push, Docker reads that name and sends the image to the matching registry and namespace.

**Important:** you do not rename the image's bytes; you *add a second name*. The old local name stays too. That is why `docker image ls` can show the same image id under two repository names.

### Command: `docker tag`

**What it does:** copies a name (not the image data) so an existing image also answers to a new name — here, a registry-ready one.

General shape: `docker tag <source> <target>`.

```bash
docker tag shopping-list:1.0 student-demo/shopping-list:1.0
```

- **Success looks like:** no output at all. That silence is success. Confirm with `docker image ls`, which now shows:
  ```text
  REPOSITORY                      TAG       IMAGE ID       SIZE
  shopping-list                   1.0       9f2c1ab77d10   148MB
  student-demo/shopping-list      1.0       9f2c1ab77d10   148MB
  ```
  Same image id, two names.
- **One decoded failure:**
  ```text
  Error response from daemon: No such image: shopping-list:1.0
  ```
  **Decoded:** the *source* name does not exist locally. Either you have not built it, or the tag is different from what you remember. Run `docker image ls` and copy the exact name and tag.

### Command: `docker push`

**What it does:** uploads an image (its layers plus its manifest) to the registry named in the tag. Layers the registry already has are skipped, which is why a second push of a nearly identical image is fast (U15).

```bash
docker push student-demo/shopping-list:1.0
```

- **Success looks like:** a progress report that ends with a digest:
  ```text
  The push refers to repository [docker.io/student-demo/shopping-list]
  5f70bf18a086: Pushed
  1c2b3d4e5f60: Pushed
  1.0: digest: sha256:ab12cd34... size: 1357
  ```
  The `digest` line is the receipt. That `sha256:...` is the exact content of the image you pushed.
- **One decoded failure:**
  ```text
  denied: requested access to the resource is denied
  ```
  **Decoded:** you are authenticated, but not allowed to write to *that* namespace. Almost always the namespace does not match the account you logged in as — you pushed `someone-elses-name/...`, or you are logged in as `sam` but tagged under `student-demo`. Fix the tag to match your own username, and make sure you ran `docker login` (U26).

Two more push failures we decode fully in "Common errors": `unauthorized: authentication required` and `name must be lowercase`.

### Command: `docker pull`

**What it does:** downloads an image from a registry to your local storage. This is the same command you used in U09; now you understand that it is talking to a registry.

```bash
docker pull student-demo/shopping-list:1.0
```

- **Success looks like:**
  ```text
  Pulling from student-demo/shopping-list
  Digest: sha256:ab12cd34...
  Status: Downloaded newer image for student-demo/shopping-list:1.0
  ```
  If the image is already fully local, you will see `Status: Image is up to date for ...` instead. Both are success.
- **One decoded failure:**
  ```text
  Error response from daemon: manifest unknown
  ```
  **Decoded:** the registry does not have that exact repository/tag. A typo in the name or tag is the usual cause. Check for a missing tag (it defaults to `latest`, which may not exist) or a misspelling. It is not a connection problem.

### Verifying a pull by running it

Pulling proves the image arrived. Running it proves the image still works.

```bash
docker run --rm student-demo/shopping-list:1.0
```

- **What it does:** starts a container from the pulled image and removes it (`--rm`) when it exits, so you leave no clutter.
- **Success looks like:** whatever your app prints, ending back at your prompt because `--rm` cleaned up.
- **One decoded failure:** `Unable to find image '...' locally` followed by a pull attempt — decoded: the name you typed does not exactly match what you pushed, so Docker tried (and failed) to fetch it fresh.

### Keeping images small before pushing

A push copies every layer the registry does not already have. Big images mean slow pushes, slow pulls by whoever deploys next, and a larger attack surface (U30 goes deeper). Three concrete moves, all built on units you already did:

1. **Use a smaller base image.** `python:3.12` is roughly 1 GB; `python:3.12-slim` is far smaller and `python:3.12-alpine` smaller still. Choose the smallest base that still supports your app's native needs.
2. **Use a multi-stage build (U16).** Build/compile in one stage, then copy only the finished artifacts into a tiny final stage. Build tools never reach the pushed image.
3. **Respect `.dockerignore` (U13).** Every file in the build context can end up copied into a layer. Ignore `.git`, virtual environments, `node_modules`, logs, and test data you do not need at runtime.

A quick sanity check before any push:

```bash
docker image ls student-demo/shopping-list
```

Read the `SIZE` column. If it surprises you, slim it *before* pushing — fixing a bloated image costs one rebuild; re-pushing an already-published bloat costs everyone who pulls it.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Local name | A name only your machine uses | Cannot be pushed as-is |
| Registry-ready name | `username/image:tag` naming a registry destination | Not a rename of the data |
| `docker tag` | Adds a second name to an existing image | Does not copy the image bytes |
| `docker push` | Uploads image layers + manifest to a registry | May skip layers already there; not always a full upload |
| `docker pull` | Downloads an image from a registry | "Up to date" is success, not a failure |
| Digest | The `sha256:...` fingerprint of exact image content | Not a tag; a tag can move, a digest does not |
| `denied` | Authenticated but not permitted | Not the same as "not logged in" |
| `manifest unknown` | The registry has no such repository/tag | Usually a typo, sometimes a missing tag |
| Dangling image | An untagged image with no name | Cleaned up in U30 |

## Worked example

**Scenario:** Sam wrote a tiny "shopping list" script and containerized it. Sam will publish it to Docker Hub under the account `sam-demo` and prove it can be pulled back.

**File 1 — `app.py`** (the whole app):

```python
print("Shopping list service is running.")
```

Why only this? Because the point of this unit is the *push*, not the app. A one-line program keeps the lesson about registries.

**File 2 — `Dockerfile`**:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

- `FROM python:3.12-slim` — a small Python base; slimmer than the full image.
- `WORKDIR /app` — all later paths are relative to `/app`.
- `COPY app.py .` — puts the script into `/app`.
- `CMD ["python", "app.py"]` — the command run when a container starts.

**Step 1 — build with a local name.**

```bash
docker build -t shopping-list:1.0 .
```

- **What it does:** reads `Dockerfile` in the current directory (the `.`) and produces an image tagged `shopping-list:1.0`.
- **Success looks like:** build steps ending with `Successfully tagged shopping-list:1.0` (newer Docker may say `naming to ...shopping-list:1.0`).
- **One decoded failure:** `failed to read dockerfile: open Dockerfile: no such file or directory` — decoded: you ran the build from the wrong folder, or spelled the file `dockerfile`. Change into the folder that contains `Dockerfile`, or pass `-f path/to/Dockerfile`.

**Step 2 — log in (from U26).**

```bash
docker login
```

Success: `Login Succeeded`. Failure: `unauthorized: incorrect username or password` → use an access token as the password.

**Step 3 — add a registry-ready name.**

```bash
docker tag shopping-list:1.0 sam-demo/shopping-list:1.0
```

Silent success. `docker image ls` now shows the same image id under both names.

**Step 4 — push.**

```bash
docker push sam-demo/shopping-list:1.0
```

Ends with a `digest: sha256:...` line — your receipt.

**Step 5 — prove it as if you were elsewhere.**

Remove the local tags and pull the name fresh:

```bash
docker rmi shopping-list:1.0 sam-demo/shopping-list:1.0
docker pull sam-demo/shopping-list:1.0
docker run --rm sam-demo/shopping-list:1.0
```

- **What `docker rmi` does:** removes local image names/tags (and the image if nothing else references it).
- **Success:** the pull reports `Downloaded newer image` and the run prints `Shopping list service is running.`

**OS note:** the commands are identical in PowerShell, macOS Terminal, and Linux. PowerShell users: if a name is ambiguous, quote it — `docker tag "shopping-list:1.0" "sam-demo/shopping-list:1.0"`.

## Common errors

### Error: `denied: requested access to the resource is denied`

**What happens:** you are logged in, but the namespace in your tag is not yours to write to.

**Fix:** the namespace before the first slash must be your Docker Hub username (or an org you belong to). Re-tag with your own username and push again.

### Error: `unauthorized: authentication required`

**What happens:** you never logged in (or your stored login expired), and you tried to push or to pull a private image.

**Fix:** run `docker login`, then retry. Pulling *public* images never needs this.

### Error: `invalid reference format: repository name must be lowercase`

**What happens:** repository names may not contain uppercase letters. `Sam-Demo/Shopping-List` is rejected.

**Fix:** lowercase the repository and namespace parts. Tags and usernames follow the same rule — lowercase them. `sam-demo/shopping-list:1.0` is valid.

### Error: `manifest unknown`

**What happens:** the pull asked for a repository or tag the registry does not have.

**Fix:** check spelling and the exact tag. Remember that leaving off a tag means `latest`, which you may never have pushed.

### Error: push is extremely slow, then the connection drops

**What happens:** large layers over a weak connection.

**Fix:** slim the image first (smaller base, multi-stage, `.dockerignore`), push on a stable network, and retry — already-uploaded layers are not sent twice.

## Checkpoints

1. Why does `docker tag` print nothing, and how do you confirm it worked?
2. What is the difference between `unauthorized` and `denied`?
3. Why can a second push of a barely-changed image be much faster than the first?
4. Name three ways to make an image smaller before pushing.

## Practice exercises

### P1 — Predict then run

Predict what `docker image ls` shows immediately after `docker tag shopping-list:1.0 sam-demo/shopping-list:1.0`. Run it. Were there one or two lines? Why?

### P2 — Change one value

Push a second tag, `sam-demo/shopping-list:1.1`, built from the same Dockerfile. Compare the push output with the `1.0` push. Which layers say `Layer already exists`?

### P3 — Fix a broken name

Here is a failing command. Fix it and explain the error in your own words:

```bash
docker push Student-Demo/Shopping-List:1.0
```

### P4 — Write from a spec

Given a local image `notes-app:2.0` and Docker Hub user `aisha-dev`, write the exact `docker tag` and `docker push` lines you would use.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No private-repository creation walkthrough (the concept appeared in U26).
- No registry other than Docker Hub in the walkthrough.
- No CI or automation — that is U28 and U29.
- No image scanning or vulnerability analysis — that is U30.

## Next unit

**U28 — Why automate image builds** (the manual push you just did is exactly what a pipeline will do for you).
