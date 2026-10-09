# U07 — Your first container

**Phase 2 — Docker basics**

## Where you are

Docker is installed and verified (U06). Now you run your first real containers and watch what happens. This unit is about **seeing the steps**, not memorizing flags.

## What you will be able to do

- Explain what `docker run hello-world` does step by step (pull, create, start).
- Run an interactive container with `docker run -it ubuntu` and explain `-i`, `-t`, `--name`.
- Know when you are "inside" a container vs on your host terminal.
- Exit cleanly with `exit` and see container state.
- Decode a typical `docker run` failure (name conflict) before trying to fix it.

## What you need already

- U00–U05 (course + why containers)
- U06 (install verified)

## Time and energy

About **30–60 minutes**. Slow is fine; observe output carefully.

## Why this exists

Running commands without seeing steps breeds guesswork. You need to see the pull/create/start sequence so future errors make sense.

## Plain-language teaching

### What `docker run` does (in order)

`docker run` is the command that asks Docker to start a container from an image. Roughly:
1. **Find image** locally; if not, **pull** (download) from registry.
2. **Create** a container from that image (a new writable instance).
3. **Start** the container (run its main process).

With `hello-world`, these steps produce the friendly message. With `ubuntu`, you get a shell inside a tiny Linux environment.

### Interactive vs non-interactive

- **Non-interactive** (hello-world): runs once and exits; prints output to your terminal.
- **Interactive** (`-it`): keeps your terminal connected so you can type commands inside the container.

Flags explained:
- `-i` (interactive): keep STDIN open so you can type.
- `-t` (tty/terminal): give you a pseudo-terminal so typing looks normal.
- `--name <name>`: give a friendly name to the container (easier to refer later; see U10).

### Host vs container

When you run `docker run -it ubuntu`, your prompt may change to look like `root@<id>:/#` or similar. That means **you are inside the container** — a different filesystem/process space. Commands you run there affect the container, not (usually) your host files unless you mounted them (mounts come later).

### Exit

Typing `exit` inside an interactive container ends the main process and the container stops (exits). You return to your host terminal prompt.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| pull | Download an image from a registry (if missing) | "Pull" is network action; not running yet |
| create | Make a new container object from an image | Creating is not starting |
| start | Begin running the container's main process | Start after create |
| interactive (`-i`) | Your keystrokes go into the container | Easy to forget; then typing does nothing obvious |
| tty (`-t`) | Allocates a terminal for readable input/output | Without -t, output can be hard to read |
| inside/outside | Container shell vs host shell | Thinking "cd" in container affects host |
| name conflict | Trying to create container with name that exists | Different from image name |

## Worked example

### Example 1: `docker run hello-world` (observe steps)
**What it does:** Pull (if needed), create, start; print message; exit.
- Windows (PowerShell): `docker run hello-world`
- macOS (Terminal): `docker run hello-world`
- Linux (Terminal): `docker run hello-world`

**Expected success output (key parts):**  
`Unable to find image 'hello-world:latest' locally` (only first time)  
`latest: Pulling from library/hello-world` (only first time)  
`Hello from Docker!`  
`...installation appears to be working correctly.`

**Typical failure decoded:** `Cannot connect to the Docker daemon...` → daemon not running (see U06). Another: network issues (rare in this unit) — but focus on daemon/name later.

### Example 2: Interactive Ubuntu shell
**What it does:** Start an interactive shell inside an Ubuntu container.
- Windows (PowerShell): `docker run -it --name myfirst-ubuntu ubuntu`
- macOS (Terminal): `docker run -it --name myfirst-ubuntu ubuntu`
- Linux (Terminal): `docker run -it --name myfirst-ubuntu ubuntu`

**Expected success (when inside):** prompt changes, e.g.  
`root@<short-id>:/#`

Now you are **inside** the container. Try a tiny read-only check:  
`cat /etc/os-release | head -n 1`  
(Expected: something like `PRETTY_NAME="Ubuntu ..."`)

Exit back to host:  
`exit`  
(You return to your host prompt.)

**Typical failure decoded (before trying):**  
`docker: Error response from daemon: Conflict. The container name "/myfirst-ubuntu" is already in use by container ...`  
→ You already created a container with that exact name. Use a different name, or remove the old one (see U10). Do not reuse names.

## Common errors

### CE1 — Name conflict
**Symptom:** "container name ... is already in use".  
**Why:** Names must be unique per container on this daemon.  
**Fix:** Pick new name, or remove existing container (U10 covers `docker rm`). For now, just note it.

### CE2 — Forgot `-it` and got stuck-looking behavior
**Symptom:** Container runs and exits immediately, or you cannot type.  
**Why:** No interactive terminal attached.  
**Fix:** Use `-it` for shells/interactive tools.

### CE3 — Thought changes inside affect host
**Symptom:** Created file in `/tmp` inside container; not visible on host Desktop.  
**Why:** Filesystem is isolated by default. (Mounts later.)

## Checkpoints

1. List the three steps `docker run` does (pull, create, start) in your own words.
2. What do `-i` and `-t` do together?
3. When you type `exit` inside `docker run -it ubuntu`, where are you and what happened to the container?

## Practice exercises

### P1 — Predict then read
Before running, predict: will `hello-world` stay running or exit? Write your guess, then run and observe.

### P2 — Name it
Run `docker run -it --name practice-ubuntu ubuntu`, run `pwd` and `ls /`, then `exit`. (Observe prompt changes.)

### P3 — Name conflict (intentional)
If you still have `practice-ubuntu`, try to create another with same name: observe the exact error. (Only do if safe; or just read CE1.) — Ungraded.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Listing/managing containers beyond observing (U10)
- Images list (U08)
- Ports/volumes (U18/U17)

## Next unit

**U08 — Images vs containers** (recipe vs running instance, and how to see both).