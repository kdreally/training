# U29 — A minimal GitHub Actions build

**Phase 6 — Registries and automation**

## Where you are

U28 gave you the *idea* of a pipeline: build → test → push. This unit makes it real with **GitHub Actions**, a CI service that is built into GitHub and free for public repositories. You will write one small YAML file, commit it, watch the pipeline run, and read its log. You do not need to own a server; GitHub lends you a clean machine for a few minutes at a time.

## What you will be able to do

- Explain what GitHub Actions is and what a **workflow** file is.
- Write `.github/workflows/build.yml` that checks out your code and builds your Docker image.
- Optionally extend the workflow to log in and push to Docker Hub using a secret.
- Read an Actions run: find the failing step and the exact error line.
- Decode two common failures: a missing secret and a wrong file path.

## What you need already

- **U27** — `docker tag`, `docker push`, `docker login`, and `denied` errors.
- **U28** — build → test → push and why secrets go in a secrets store.
- A free **GitHub account**, and a repository to push to.
- A free **Docker Hub account** (only needed for the optional push part).
- Basic comfort with `git add`, `git commit`, `git push` (you will use them here; the lesson shows each).

## Time and energy

About **75–110 minutes**, and it needs the internet. The first run of any workflow feels slow because you are watching a machine in another building. Take a break after your first green run; the optional push half is a second sitting if you are tired.

## Why this exists

A pipeline you cannot run is philosophy. GitHub Actions lets you *feel* the difference between "I think this build works" and "a fresh machine in the cloud just proved this build works from committed code alone." It is also the first totally free, honest taste of DevOps: code goes in, a verified image comes out, and you have a URL you can show anyone.

## Plain-language teaching

### What GitHub Actions is

**GitHub Actions** is an automation service built into GitHub. You give it a small instruction file inside your repository, and GitHub runs that file on a fresh machine whenever you tell it to — most often "whenever code is pushed."

Three words to separate now:

- **Workflow:** the whole instruction file. One `.yml` file, one workflow.
- **Job:** one bundle of steps that run on one machine. Simple workflows have one job.
- **Step:** one action inside a job, such as "check out the code" or "run `docker build`."

### Where the workflow file lives

GitHub only finds workflows in a specific place:

```text
.github/workflows/build.yml
```

- `.github` is a folder at the top of your repository.
- `workflows` is a folder inside it.
- `build.yml` is your file. The name is up to you as long as it ends in `.yml` or `.yaml`.

If the file is anywhere else, GitHub ignores it entirely. This location is the single most common "why did nothing happen?" cause, so it is worth reading twice.

### What YAML is, in one breath

YAML is a plain-text format for configuration, where **indentation is meaning**. Two spaces of indentation under a heading mean "these belong to that heading." Tabs and mixed indentation cause errors, so use spaces only. You do not need to master YAML; you need to copy this file carefully and keep the indentation as shown.

### What a "runner" is, again

From U28: the machine that runs your job. In GitHub Actions you choose it with one line, `runs-on: ubuntu-latest`. That asks GitHub for a fresh, clean Linux machine with common tools — including Docker — already installed. It is created for your run, used, and destroyed. That cleanliness is the point: nothing hidden on your laptop can leak into the build.

### Why we start with "build only"

Logging in and pushing from a pipeline needs a **secret**, and secrets are the part people get wrong under pressure. So we do it in two calm halves:

1. **Build only.** No login, no secret, nothing to leak. Prove the pipeline runs.
2. **Build and push.** Add login + push once the first half is green.

If anything goes wrong in a run, you only have one new thing to suspect.

### Secrets in GitHub Actions

GitHub stores pipeline secrets under **Settings → Secrets and variables → Actions → New repository secret**. You give a secret a name (for example `DOCKERHUB_TOKEN`) and a value. In the workflow you refer to it as:

```yaml
${{ secrets.DOCKERHUB_TOKEN }}
```

GitHub substitutes the real value at run time and **masks** it in logs (it prints `***`). A secret never appears in your file, so it can never be read by someone browsing your repo.

For Docker Hub you need two secrets: `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` (an access token from U26 — not your password).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| GitHub Actions | GitHub's built-in automation service | Not a separate download |
| Workflow | One `.yml` pipeline definition | Not a job; a workflow can have several jobs |
| Job | A bundle of steps on one runner | Not a single command |
| Step | One action in a job | `uses:` and `run:` steps look different but are both steps |
| Runner | The clean machine GitHub provides | Not your computer |
| `on:` | The trigger that starts the workflow | Forgetting it means the workflow never runs |
| `uses:` | Run a prebuilt action (e.g. checkout) | Not a shell command |
| `run:` | Run a shell command | Not a prebuilt action |
| Secret | A masked value stored in GitHub settings | Not a value written in the YAML |
| `runs-on` | Which runner operating system to use | Usually `ubuntu-latest` |

## Worked example

**Scenario:** Priya has a repository `bookclub-app` with this `Dockerfile` at its top level:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

We will make GitHub build that image on every push to `main`.

### The commands that put code on GitHub

You need your files in a GitHub repository. If you have never done this, these commands do the job from inside your project folder:

```bash
git init
git add .
git commit -m "Add Dockerfile for bookclub app"
git branch -M main
git remote add origin https://github.com/priya-hub/bookclub-app.git
git push -u origin main
```

- **What they do:** `git init` starts tracking this folder; `git add .` stages every file; `git commit` saves a snapshot; `git branch -M main` names the branch `main`; `git remote add origin ...` links your folder to the GitHub repository; `git push -u origin main` uploads it.
- **Success looks like:** the final command prints progress and ends with a line like `branch 'main' set up to track 'origin/main'.`
- **One decoded failure:** `remote: Support for password authentication was removed` → decoded: GitHub no longer accepts your account password for `git push`. Create a **personal access token** or use the GitHub CLI / SSH key. This is the same "use a token, not a password" lesson as Docker Hub in U26.

### File: `.github/workflows/build.yml` — build only

```yaml
name: Build image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Check out the code
        uses: actions/checkout@v4

      - name: Show Docker version
        run: docker version

      - name: Build the image
        run: docker build -t bookclub:ci .
```

Read it line by line:

- `name:` — a human label shown in GitHub's Actions tab. Free text.
- `on:` — the trigger. Here, a push **to the `main` branch**.
- `jobs:` — the container for one or more jobs.
- `build:` — the job's name (ours to choose).
- `runs-on: ubuntu-latest` — run on GitHub's current Linux runner.
- `steps:` — the ordered list. Indentation under `steps:` matters.
- `- name:` — a label for one step. The `-` starts a list item.
- `uses: actions/checkout@v4` — a prebuilt action that copies your repository onto the runner. Without it, the runner has an empty folder and there is no Dockerfile to build.
- `run: docker version` — a shell command proving Docker exists on the runner. A small, honest sanity check.
- `run: docker build -t bookclub:ci .` — exactly the build you have run by hand (U11–U14); the `.` is the current folder on the runner.

**Success looks like:** in the GitHub **Actions** tab, a green check beside your commit. Click it: each step has a green check, and the last step's log ends with `Successfully tagged bookclub:ci` (or `naming to ...bookclub:ci`).

### File: `.github/workflows/build.yml` — build and push (optional)

Once the build-only run is green, add login and push. First create the two secrets in GitHub settings (values from Docker Hub, U26), then replace the workflow with:

```yaml
name: Build and push image

on:
  push:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Check out the code
        uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/bookclub-app:ci
```

New pieces explained:

- `uses: docker/login-action@v3` — a prebuilt action that runs `docker login` for you, using the values under `with:`.
- `with:` — inputs to an action, laid out as `key: value` pairs.
- `${{ secrets.DOCKERHUB_USERNAME }}` — look up the secret named `DOCKERHUB_USERNAME` and substitute it (masked in logs).
- `uses: docker/build-push-action@v6` — a prebuilt action that builds the image and pushes it in one step.
- `context: .` — the build folder; `.` is the repo root, where the Dockerfile is.
- `push: true` — yes, actually push (the same action can build without pushing).
- `tags:` — the registry-ready name from U27. Notice it uses your username so the namespace matches your account.

**Success looks like:** a green run, and the image appears on Docker Hub under your username.

### Reading the Actions log

1. Open your repository on GitHub and click the **Actions** tab.
2. Click the run (named after your commit message or the workflow's `name`).
3. You see the job and a list of steps, each with a green check or a red X.
4. Click the **failing step** — the red one. Expand it and read the **last lines first**; errors are usually there.
5. The `##[error]` line is GitHub's marker for the exact failure. The lines just above it give context.

A calm reading order: which step is red → last 10 lines of that step → the first line that names a file, a name, or a command.

## Common errors

### Error: a missing secret

```text
Error: Username and password required
```

Or, during push:

```text
denied: requested access to the resource is denied
```

**What happens:** the secret name in the YAML does not match the secret name in GitHub settings (they are case-sensitive), the secret was never created, or the account does not own the namespace in `tags:`.

**Fix:** open **Settings → Secrets and variables → Actions** and check the names match exactly (`DOCKERHUB_TOKEN`, not `DOCKERHUB_TOKEN `, not `dockerhub_token`). Then confirm the `tags:` namespace is your own username. When in doubt, add a temporary step that prints only the *username* (never the token) to confirm substitution.

### Error: a wrong path

```text
failed to solve: failed to read dockerfile: open Dockerfile: no such file or directory
```

**What happens:** the build ran in a folder without a `Dockerfile`, or your file is named `dockerfile`, or you set `context:` to the wrong directory.

**Fix:** confirm the Dockerfile's exact name and location in the repo (case matters on Linux). Set `context:` to the folder that contains it. If it lives in a subfolder, use `context: ./subfolder` and, if needed, `file: ./subfolder/Dockerfile`.

### Error: the workflow never runs at all

**What happens:** no run appears in the Actions tab.

**Fix:** the file is not at `.github/workflows/<name>.yml`, or the trigger does not match. If you pushed to a branch other than `main`, `on: push: branches: [ main ]` will not fire. Check the path first, then the branch name.

### Error: YAML indentation

```text
Invalid workflow file: .github/workflows/build.yml#L12
```

**What happens:** YAML is sensitive to indentation. A stray tab, or a `-` step not aligned with its siblings, breaks the file.

**Fix:** use two spaces per level, never tabs, and keep each `- name:` aligned with the others under `steps:`.

## Checkpoints

1. In what exact folder must a workflow file live?
2. What does `uses: actions/checkout@v4` do, and what breaks without it?
3. What is the difference between `uses:` and `run:`?
4. Why do we start with a build-only workflow before adding a push?

## Practice exercises

### P1 — Read and predict

Look at this trigger. Will the workflow run when Priya pushes to a branch named `dev`? Explain.

```yaml
on:
  push:
    branches: [ main ]
```

### P2 — Change one thing

Change the build-only workflow so it runs on every push to **any** branch. What did you remove or change in the `on:` section?

### P3 — Debug this

A learner's workflow builds fine but the push step fails with `denied: requested access to the resource is denied`. List three things you would check, in order.

### P4 — Write from a spec

Write the `steps:` list for a workflow that (a) checks out the code, (b) logs in to Docker Hub, (c) builds and pushes `aisha-dev/notes-app:ci`. You may copy the shapes from the lesson; you are not expected to invent new YAML keys.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No GitHub Actions beyond one job and a small number of steps.
- No matrix builds, caching, environments, or reusable workflows.
- No deployment stage — that is discussed from U31.
- No explanation of every `git` command; we use the minimum needed to publish the file.

## Next unit

**U30 — Image scanning and size hygiene** (your automated image now exists; let us keep it small and look at what is inside it).
