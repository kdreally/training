# U08 — Images vs containers

**Phase 2 — Docker basics**

## Where you are

You saw containers run (U07). Now we make the distinction precise: **image = recipe/template**; **container = running instance**. One image can produce many containers.

## What you will be able to do

- Explain image vs container with a plain analogy and precise terms.
- Say why images are read-only and containers have a writable layer.
- Use `docker images` to list local images.
- Use `docker ps` and `docker ps -a` to list containers (running vs all).
- Tell how many containers come from one image.

## What you need already

- U00–U07

## Time and energy

**20–40 minutes**. Mostly reading + listing commands.

## Why this exists

Mixing image/container causes confusion ("I deleted the image but container still there?"). Clear separation prevents that.

## Plain-language teaching

### Recipe vs cake

An **image** is the recipe (ingredients + instructions). A **container** is one cake baked from that recipe. You can bake many cakes from same recipe. You cannot "run" a recipe — you run an instance.

### Read-only image + writable container layer

Images are read-only. When you start a container, Docker adds a thin **writable layer** on top. Files you create/change inside the container live in that writable layer. Stop/remove container and that layer is gone (unless volumes used later). This is why containers feel disposable.

### Seeing images

`docker images` shows local images: repository, tag, image ID, size, etc. If nothing pulled, list may be short.

### Seeing containers

- `docker ps` → only **running** containers.
- `docker ps -a` → **all** containers (running + exited/stopped + created).

Flags: `-a` = "all states".

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Image | Immutable template/recipe | Called "container" sometimes |
| Container | Runtime instance of an image | Not same as image |
| Writable layer | Thin layer for changes inside container | People think changes persist after rm |
| Repository | Collection of images (often same app, different tags) | Registry vs repo |
| Tag | Version label (e.g. `latest`, `24.04`) | "latest" not always newest in a safe sense |
| ID | Unique identifier (short/long) | Names vs IDs |

## Worked example

### List images
**What it does:** Shows images stored locally.
- Windows (PowerShell): `docker images`
- macOS (Terminal): `docker images`
- Linux (Terminal): `docker images`

**Expected success:** table with REPOSITORY, TAG, IMAGE ID, CREATED, SIZE. After U07 you may see `ubuntu` and `hello-world`.

**Typical failure:** daemon not running → `Cannot connect to Docker daemon`.

### List containers

**Running only:**
- All shells: `docker ps`

**All states:**
- All shells: `docker ps -a`

**Expected success:** headers show CONTAINER ID, IMAGE, COMMAND, CREATED, STATUS, PORTS, NAMES. `ps` may be empty if nothing running; `ps -a` shows exited ones.

**Typical failure:** same daemon issue.

## Common errors

### CE1 — Deleting image while container exists
**Symptom:** `image is being used by stopped container`.  
**Why:** Container depends on image layers. Remove container first (U10).

### CE2 — Confusing ps vs ps -a
**Symptom:** "Where is my container?" — it exited, so `ps` hides it.  
**Fix:** use `ps -a`.

## Checkpoints

1. Image vs container: explain with recipe/cake in your own words.
2. Why are images read-only but containers can write?
3. Difference between `docker ps` and `docker ps -a`?

## Practice exercises

### P1 — Inspect your state
Run `docker images` and `docker ps -a`. Count how many images vs containers.

### P2 — One image, two containers (conceptual + optional)
Conceptually: run `ubuntu` twice with different `--name` (if you want) and see two containers from same image in `ps -a`. (Optional; not required.)

### P3 — Name the IDs
Pick one container and one image from output; identify which is which.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Removing images/containers (U10)
- Digging into layers (U15)

## Next unit

**U09 — Pulling and running existing images** (Docker Hub, tags like `latest` vs pinned).