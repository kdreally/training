# U26 — Registries

**Phase 6 — Registries and automation**

## Where you are

You can already build an image on your own machine (U11–U16), keep data with volumes (U17), and stitch services together with Compose (U21–U25). But every image you have made lives *only* on your laptop. This unit introduces the **registry**: the online catalog where images are stored so they can travel to other machines and other people. We build the mental model first; the actual pushing and pulling happens in U27.

## What you will be able to do

- Explain what a registry is and what problem it solves for a team.
- Tell the difference between a registry, a repository, a namespace, an image, and a tag.
- Say what Docker Hub is, and name at least two other registries teams use.
- Explain what `docker login` is for, in plain language, without running it blindly.
- Read an image name like `ghcr.io/acme/shopping-list:1.2` and say where each part points.

## What you need already

- **U09** — pulling and running existing images from Docker Hub.
- **U14** — tags and naming your images.
- **U16** — multi-stage builds (referenced when we discuss image size).
- **U25** — Compose lifecycle (so you know how services are run locally).

If any of those feel shaky, a five-minute reread of their vocabulary tables is worth it before continuing.

## Time and energy

About **45–70 minutes**. Most of this unit is reading and thinking, not typing. There is one login command near the end; everything before it explains what that command is doing.

## Why this exists

Right now, sharing your work means sending a folder of code and hoping the other person can rebuild the exact same image. If you later run that image on a server, the server needs a way to *fetch* it. A registry is how images leave your laptop. Without one, every deployment would be "copy these files and pray the build matches." Teams also use registries as a single source of truth: the image a tester runs is the very same bytes a server runs.

## Plain-language teaching

### The problem, stated plainly

An **image** is a finished, frozen snapshot: your app plus everything it needs to run (U08). It lives inside your local Docker storage, on one computer.

That is fine until you want one of these:

- A teammate to run your exact image.
- A test server to run it without a developer sitting there.
- A production server in another building to run it.

At that point "the image is on my laptop" becomes the whole problem. You cannot email a multi-hundred-megabyte snapshot, and even if you could, the other machine would still need Docker to load it.

### What a registry is

A **registry** is a server that stores images and hands them out on request. Think of it as an app store or a library catalog for images: images go in with a name, and come out again by that same name.

That is the smallest honest definition. Everything else is detail.

**What a registry is *not*:**

- It is **not** a running container. A registry stores snapshots; it does not execute your app.
- It is **not** only Docker Hub. Docker Hub is *one* registry, the popular default. Many others exist.
- It is **not** magic. When you `docker pull`, your Docker client is really just making an HTTP request to a registry and downloading layers (U15).

### The parts of an image name

Every name you will push or pull has up to four parts. We met tags in U14; now we add the registry and namespace at the front.

```text
ghcr.io   /   acme   /   shopping-list   :   1.2
----------     ----       -------------      ---
registry       namespace  repository        tag
```

| Part | Plain meaning | Example |
|------|---------------|---------|
| Registry | The server that hosts the image | `ghcr.io`, `docker.io` |
| Namespace | The account or organization that owns it | `acme`, a username, `library` |
| Repository | The name of this one image, across versions | `shopping-list` |
| Tag | Which version of that repository | `1.2`, `latest` |

When you leave the registry out, Docker assumes **Docker Hub** (`docker.io`). When you leave the tag out, Docker assumes **`latest`**.

So `ubuntu:24.04` really means `docker.io/library/ubuntu:24.04`. The `library` namespace is where Docker Hub keeps its official, curated images (U09). Your own images go under *your* username instead.

### Registry vs repository: the confusion to kill now

These two words sound alike and trip people up for years.

- A **registry** is the whole building — Docker Hub, for example.
- A **repository** is one shelf in that building, holding every version of one image.

Docker Hub is a registry. `docker.io/library/nginx` is a repository inside it. You can have a thousand repositories in one registry.

### Docker Hub

**Docker Hub** is the default registry. It is run by Docker, it is where the images in U09 came from unless you said otherwise, and it has a generous free tier for public images.

- **Public repository:** anyone can pull it. Good for open projects and learning.
- **Private repository:** only you and the people you invite can pull it.

The free tier has limits — for example, a cap on how many pulls anonymous users get per window of time. If you ever see a new error mentioning rate limits, it is almost always this. We will decode that exact error later.

### Other registries you will meet

You do not have to use Docker Hub. Different organizations run their own registries, often for privacy or because it integrates with where their code already lives:

- **GHCR** (GitHub Container Registry, `ghcr.io`) — tied to GitHub. Free for public images. Useful in U29 because the code and the image can live in the same place.
- **GitLab Container Registry** — tied to GitLab.
- **Amazon ECR, Azure Container Registry (ACR), Google Artifact Registry** — cloud providers' registries.
- **Harbor** — software you can run yourself if a company wants its own private registry.

For this course we use **Docker Hub** in examples because it needs only a free account and no cloud provider.

### Why teams bother with a registry

- **One artifact, many places.** Build the image once; every environment pulls the same bytes.
- **Reproducibility.** The server does not rebuild from source and guess; it pulls a fixed, tagged image.
- **Access control.** Private images stay private; you decide who can pull.
- **Speed.** Layers already stored in a registry are reused, so pulls and pushes are often fast (U15).
- **Automation.** Pipelines can push image versions automatically, which is exactly what U28 and U29 are about.

### What `docker login` does (concept first)

A registry will not accept your image from just anyone. To push to *your* namespace, Docker needs to prove who you are.

`docker login` is the command that proves it. In plain words: **it sends your username and a secret to the registry, and if they are correct, the registry gives your Docker client permission for this session.** Docker then stores proof locally so you do not type the secret again every time.

You do **not** need to log in to pull public images — that is why U09 worked with no account. You *do* need to log in to push, or to pull a private image.

A key modern detail: **Docker Hub no longer accepts your account password for command-line logins.** You create an **access token** (a long, one-purpose password generated on the Docker Hub website) and use *that* as the password. This is safer: if a token leaks, you delete just that token instead of changing your real password.

Where the proof is stored depends on your system:

- **Windows (Docker Desktop):** the Windows Credential Manager.
- **macOS (Docker Desktop):** the macOS Keychain.
- **Linux:** a helper such as `pass`, or a plaintext file at `~/.docker/config.json` if no helper is set.

### Command: `docker login`

**What it does:** prompts for a username and secret (an access token for Docker Hub), then asks the registry to grant this machine permission.

Run it by itself for Docker Hub, or name another registry:

```bash
docker login
docker login ghcr.io
```

- **Success looks like:**
  ```text
  Login Succeeded
  ```
- **One decoded failure:**
  ```text
  Error response from daemon: Get "https://registry-1.docker.io/v2/":
  unauthorized: incorrect username or password
  ```
  **Decoded:** the registry did not accept the pair you typed. The most common cause is using your Docker Hub *account password* instead of an **access token**. Second most common: a typo in the username, or a trailing space when pasting the token. Create a fresh access token on the Docker Hub website and paste it as the password.

### Command: `docker logout`

**What it does:** removes the stored credential for a registry, ending that machine's logged-in state.

```bash
docker logout
docker logout ghcr.io
```

- **Success looks like:**
  ```text
  Removing login credentials for https://index.docker.io/v1/
  ```
- **One decoded failure:** running it when you were never logged in does not fail loudly; it prints the same "Removing login credentials" line. That is not an error — it means there was nothing to remove. If you expected to still be logged in and you are not, check whether a helper overwrote or cleared `~/.docker/config.json`.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Registry | A server that stores and serves images | Not the same as a single image or a running container |
| Repository | One named image inside a registry, across versions | Not the whole registry; not a Git repository |
| Namespace | The account/org that owns repositories | Confused with the username itself |
| Docker Hub | The default public registry, `docker.io` | Not the only registry; not required to run Docker |
| GHCR | GitHub's registry, `ghcr.io` | A GitHub *repo* is code; GHCR is images |
| Private registry | A registry with restricted access | Not "a registry only for big companies" |
| Access token | A generated, revocable password for tools | Not your account password |
| `docker login` | Proves identity so you can push/pull private images | Not needed to pull public images |
| Null/dangling image | An image with no tag or no container using it | Comes up again in U30 |

## Worked example

**Scenario:** Your teammate Priya wants the small `shopping-list` web app you containerized last week. You do not want to send source code. You want to point her at one name.

For this unit we will only *read* names and log in — no push yet. That happens in U27.

**Step 1 — see what images you already have.**

```bash
docker image ls
```

- **What it does:** lists the images stored locally, with repository, tag, image id, and size.
- **Success looks like:** a table. One line might read:
  ```text
  REPOSITORY          TAG       IMAGE ID       CREATED         SIZE
  shopping-list       1.0       9f2c1ab77d10   2 hours ago     148MB
  ```
- **One decoded failure:** `Cannot connect to the Docker daemon` — decoded: Docker Desktop or the Docker Engine is not running. Start it (U06) and try again.

**Step 2 — translate that local name into a registry name.**

The local line above says `shopping-list:1.0`. That name has no registry part, so it means "local only, Docker Hub implied but not addressed." To share it as Priya, the name becomes:

```text
priya-hub-user/shopping-list:1.0
```

Read it aloud: "on Docker Hub, in Priya's namespace, the shopping-list repository, tag 1.0." Before any network operation, you can check you understand the name. If you can explain each part, you are ready for U27.

**Step 3 — log in (only when you are ready to push).**

```bash
docker login
```

- **What it does:** asks Docker Hub to grant this machine permission; stores the proof locally.
- **Success looks like:** `Login Succeeded`.
- **One decoded failure:** the `unauthorized: incorrect username or password` text above — decoded: use an access token, not your password.

**Step 4 — confirm who you are.**

```bash
docker logout
```

Logging straight back out is a harmless way to prove the login really worked and to leave your machine tidy.

**Everywhere it differs by OS:** the *text* of these commands is identical on Windows PowerShell, macOS, and Linux. Only the credential *storage* differs (Credential Manager / Keychain / helper). Docker handles that for you.

## Common errors

### Error: `unauthorized: incorrect username or password`

**What happens:** you typed your Docker Hub account password instead of an access token, or the token has a typo or extra space.

**Fix:** open Docker Hub in a browser, create an access token, and paste *that* as the password. Delete the bad token so it cannot be misused.

### Error: `toomanyrequests: You have reached your pull rate limit`

**What happens:** too many pulls of public images were made from your network or account in a short window, so Docker Hub paused you.

**Fix:** log in (logged-in users get a higher free limit), wait for the window to reset, or pull a specific private image instead of re-pulling public ones. This error is about *volume*, not about your images being wrong.

### Error: `Cannot connect to the Docker daemon`

**What happens:** the Docker engine is not running.

**Fix:** start Docker Desktop (Windows/macOS) or the engine service (Linux), wait for the whale icon to settle, then retry. This is the same failure you first met in U06.

## Checkpoints

Answer in your own words before the assignment:

1. What problem does a registry solve that a local image cannot?
2. In `ghcr.io/acme/shopping-list:1.2`, name the registry, namespace, repository, and tag.
3. Why is `ubuntu:24.04` the same as `docker.io/library/ubuntu:24.04`?
4. Why does pulling a public image not require `docker login`, but pushing does?

If those four feel comfortable, you are ready to practise.

## Practice exercises

### P1 — Name decoding

Write out the registry, namespace, repository, and tag for each name:

- `nginx:1.27`
- `docker.io/library/postgres:16`
- `ghcr.io/team-alpha/inventory:2.4`
- `shopping-list`

### P2 — Predict, then run

Predict what `docker login` prints when you type a **wrong** password on purpose, then run it with a made-up username and see. Which error do you get? Does it match the decoded failure above? (Running it with wrong details is safe; it fails harmlessly.)

### P3 — Change one thing

Take any local image from `docker image ls` and write the *registry-ready* name it would need for a Docker Hub user called `student-demo`. Do not push — just write the name and read it back aloud.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). It is short and visible on purpose.

## What is *not* in this unit

- No `docker push` or `docker tag` yet — that is U27.
- No private-registry setup, server hosting, or cloud accounts.
- No access-token creation walkthrough beyond "generate one on Docker Hub."
- No pricing or enterprise features beyond "there is a free tier."

## Next unit

**U27 — Pushing and pulling images** (tag for a registry, push, pull, and decode `denied`).
