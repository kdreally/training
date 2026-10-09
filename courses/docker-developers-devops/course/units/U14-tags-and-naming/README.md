# U14 — Tags and naming your images

**Phase 3 — Building images**

## Where you are

You can build images now (U11–U12) and control what goes into them (U13). But an image without a good name is hard to talk about, hard to pin down, and easy to confuse with yesterday's version. This unit is about **tags**: the names and version labels you attach to images. It is short, but the habit it teaches — never trusting `latest` — will save you real confusion later.

## What you will be able to do

- Read and write image references in the form `name:tag`.
- Explain why `latest` is a moving target and why pinning versions matters.
- Follow common naming conventions (lowercase, meaningful tags).
- List images and remove images and tags confidently.
- Decode the common naming and removal errors.

## What you need already

- **U11–U12 — Dockerfile and instructions.** You need to build an image and know the `-t` flag.
- **U08 — Images vs containers.** You need to know a tag names an image, not a running container.
- **U13 — .dockerignore.** Not strictly required, but you are building images anyway.

## Time and energy

About **50–75 minutes**. No new build concepts; the work is mostly naming and cleanup commands with clear output.

## Why this exists

Humans and tools refer to images by name. A registry (U26) stores images by name and tag. A deployment (U31) says "run this exact image," and it needs the name to mean one specific thing. If two people both have an image called `myapp:latest` that differs, then "it works for me" returns through the back door. Tags are how we make a name point at one specific build. Get this habit right early.

## Plain-language teaching

### An image reference has parts

The full form of an image reference is:

```text
[registry/][namespace/]name[:tag]
```

Most of the time on your laptop you use the short form:

```text
hello-flask:1.0
     │        │
     │        └── the tag (a version or variant label)
     └── the repository name
```

- **Repository name** — what the image *is* (`hello-flask`, `my-team/api`). Lowercase.
- **Tag** — which *version* or *variant* (`1.0`, `stable`, `2026-10-09`). Optional; defaults to `latest` when omitted.

When you build, `-t` sets this. You can set several tags at once:

```dockerfile
docker build -t hello-flask:1.0 -t hello-flask:latest .
```

Both names point at the same image for now. Whether that is wise is the next topic.

### Why `latest` is dangerous

`latest` is not "the newest image." It is only the **default tag** Docker uses when you do not specify one. Three consequences:

1. **It moves.** Every time someone builds with `-t hello-flask:latest`, that name points at the newest build. Yesterday's `latest` and today's `latest` can be different images.
2. **Two machines disagree.** Your laptop's `latest` and a teammate's `latest` may be different images, both wearing the same name. That is the "works on my machine" problem in a fresh costume.
3. **It is ambiguous for rollback.** If something breaks, "go back to the previous `latest`" is not a real instruction, because there is no previous `latest` — it was overwritten.

None of that means the word `latest` is forbidden. It means you should not rely on it when you need a specific build. For deployment, pin something that cannot be silently reused.

### Semver-ish version tags

A common, honest scheme is a version number with decreasing specificity, all on Docker Hub-style images:

```text
hello-flask:1.4.2     ← the exact release (most specific)
hello-flask:1.4       ← latest patch in the 1.4 line
hello-flask:1         ← latest minor in the 1.x line
hello-flask:latest    ← whatever was built last (least specific)
```

For anything you deploy, pin the exact one (`1.4.2`) or, better, an immutable identifier like a git commit hash (`hello-flask:g7f3a1c`). The looser tags are conveniences, not promises. Pin exact versions in your Dockerfile's `FROM` too — you already wrote `flask==3.0.3` and `python:3.12-slim` in U12 for the same reason.

### Naming conventions

A few rules and habits make names work everywhere:

- **Lowercase only.** Repository names must be lowercase; uppercase causes an error (see below).
- **Allowed characters:** lowercase letters, digits, and the separators `.`, `-`, `_`. Start with a letter or digit.
- **Be descriptive:** `team-api`, `checkout-service`, not `test1`, `new`, `final-final`.
- **Namespaces:** a slash groups images, e.g. `my-team/api`. On a registry this encodes the owner/org (U26).
- **Meaningful tags:** dates (`2026-10-09`), semantic versions (`1.4.2`), or commit hashes all beat `latest`.

### Listing and removing images

You already met `docker images`. Here it is with its columns named. Then we remove things.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Repository name | The name of the image, e.g. `hello-flask` | Confused with a git repository |
| Tag | A label for a specific version/variant of an image | Not a git tag; not permanent |
| `latest` | The default tag used when none is given | Wrongly assumed to mean "newest" |
| Image reference | The full `name:tag` string | Not the same as a container name |
| Namespace | A slash-separated prefix like `my-team/` | Not a folder on disk |
| `docker tag` | Adds another name/tag to an existing image | Not a copy; it is another label |
| `docker rmi` | Removes an image tag or image | Blocked if a container uses it |
| Digest | A long hash identifying exact image content | More precise than a tag; appears later |

## Worked example

We build one image, give it several names, list them, and remove one.

### Build with two tags

**What it does:** builds once and applies two names to the same image.

```text
docker build -t hello-flask:1.0 -t hello-flask:latest .
```

**What success looks like:** the usual build output, ending with lines naming both tags, such as `naming to docker.io/library/hello-flask:1.0` and `...:latest`.

### List images

**What it does:** shows the images on your machine, one row per name/tag.

```text
docker images
```

**What success looks like** (columns matter more than the exact values):

```text
REPOSITORY     TAG       IMAGE ID       CREATED          SIZE
hello-flask    1.0       a1b2c3d4e5f6   2 minutes ago    154MB
hello-flask    latest    a1b2c3d4e5f6   2 minutes ago    154MB
python         3.12-slim 9f8e7d6c5b4a   3 weeks ago      130MB
```

Notice both `hello-flask` rows share the same **IMAGE ID**. They are two names for one image.

**One decoded failure.** On very old setups you might see the header `REPOSITORY  TAG  IMAGE ID  CREATED  SIZE` but with no rows. That is not an error — it means you have no local images yet. Build one first.

### Add a third tag without rebuilding

**What it does:** attaches a new tag to an existing image. `docker tag` does not copy the image; it adds a label.

```text
docker tag hello-flask:1.0 hello-flask:2026-10-09
```

**What success looks like:** no output at all. That is success for this command. Run `docker images` and you will see the new row, with the same IMAGE ID.

### Remove one tag

**What it does:** removes the `1.0` tag. If other tags still point at the image, the image stays; only the label goes.

```text
docker rmi hello-flask:1.0
```

**What success looks like:**

```text
Untagged: hello-flask:1.0
```

**One decoded failure.** If you see:

```text
Error response from daemon: conflict: unable to remove repository reference "hello-flask:1.0" (must force) - container 8f3c... is using its referenced image ...
```

then a container — running or stopped — still refers to this image. Remove the container first (`docker rm <name>` for a stopped one, `docker stop` then `docker rm` for a running one), then remove the image. This safety feature prevents you from deleting a base image out from under a container. Do not reach for `-f` until you understand what is using it.

### Clean up untagged images

**What it does:** removes images that have no tag and are not used by any container (often old intermediate builds).

```text
docker image prune
```

**What success looks like:** a prompt to confirm, then a line like `Deleted Images:` listing freed space. Read the prompt before agreeing; `prune` is tidy, not magic.

## Common errors

### Error: uppercase letters in the name

**What happens:** `docker build -t MyApp .` fails with `invalid reference format: repository name must be lowercase`.

**Fix:** Use lowercase: `myapp`. Tags may contain more, but keep names simple and lowercase.

### Error: assuming `latest` means "newest"

**What happens:** You run `docker run myapp` and get an older image, because `myapp:latest` had not been rebuilt.

**Fix:** Specify the tag you mean: `docker run myapp:1.4.2`. Then `latest` stops being a source of surprises.

### Error: confusing image names with container names

**What happens:** You try `docker rmi hello` and nothing matches, or you try to `docker run` a container name.

**Fix:** Containers are named with `--name` at run time (U10). Images are named with `-t` or `docker tag`. They are different namespaces.

### Error: removing an image a container uses

**What happens:** `docker rmi` refuses with a conflict message.

**Fix:** Remove the container first, or accept that the image is still in use. Only force with `-f` once you know it is safe.

## Checkpoints

Answer in your own words before the assignment:

1. What are the two parts of `hello-flask:1.0`, and which part is optional?
2. Give two reasons `latest` is risky.
3. What is the difference between `docker tag` and `docker build -t`?
4. What happens to the underlying image when you remove the last tag pointing at it?

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Three names, one image

Build an image with `-t practice:1.0`. Add tags `practice:stable` and `practice:2026-10-09`. Run `docker images` and confirm all three rows share one IMAGE ID.

### P2 — Break it on purpose

Try `docker build -t Practice_App .` (note the uppercase). Read the error, then fix it. You are learning to read naming errors calmly.

### P3 — Predict then run

Predict what `docker rmi practice:stable` prints when two other tags still point at the image. Then run it and check.

### P4 — Write a naming scheme

Write a short naming scheme for a small project: a repository name, a rule for tags, and an example of a "safe to deploy" tag versus an "unsafe" one. Explain the difference.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No registries, pushing, or pulling by name — that is Phase 6 (U26–U27).
- No image digests in depth; they appear when we discuss pinning for production.
- No layers or cache — that is **U15**.
- No multi-stage builds — that is **U16**.

## Next unit

**U15 — Layers and build cache** (why the order of instructions changes how long builds take).
