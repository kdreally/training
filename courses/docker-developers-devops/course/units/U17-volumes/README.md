# U17 — Volumes

**Phase 4 — Data and networking**

## Where you are

You have installed Docker (U06), run containers (U07–U10), and built your own images (U11–U16). You know a **container** is a running instance of an **image**, and that removing a container cleans up after it. This unit starts Phase 4 by fixing a problem you may have already felt: stop or remove a container and the work inside it is gone. We fix that with **volumes**.

## What you will be able to do

- Explain why a container's own filesystem is temporary.
- Tell a **named volume** apart from a **bind mount**, and say when to use each.
- Create, list, inspect, and remove a volume.
- Attach a volume to a container and prove the data survives removing the container.
- Decode a "permissions denied" volume error and a "my data disappeared" surprise.

## What you need already

- **U06–U10** — install Docker, run containers, images vs containers, container lifecycle.
- Recall from **U08**: an image is a recipe; a container is the cake made from it.

We use the small **`alpine`** image in examples. You pulled images before in **U09**. Alpine is a tiny Linux distribution; it is convenient because it downloads fast and includes a shell.

## Time and energy

About **75–110 minutes**. The idea of a volume is simple; permissions are the part that bites people. Take a break before you start the assignment. If a red error message appears, that is expected material in this unit, not a sign you are doing it wrong.

## Why this exists

Containers are meant to be thrown away. That is a feature: you can start ten identical containers and delete them with no residue. But real software keeps things: uploaded files, database rows, logs, user sessions. If everything a container writes vanishes when the container is removed, your data vanishes with it.

Picture a database. If its data lived only inside the container, then `docker rm` would erase every record. No real team ships that. A **volume** is how you say "this part is not throwaway." The container stays disposable; the data stays put.

## Plain-language teaching

### Containers are disposable (that is the point)

A container has its own small, private filesystem. When you remove the container with `docker rm` (U10), that private filesystem goes away with it — like a whiteboard wiped after a meeting.

This is deliberate. It is what makes containers clean and repeatable. But it means anything you write *inside* the container is temporary unless you take an extra step.

The part of disk a running container writes to is called its **writable layer**. It lives and dies with the container. In U15 you saw layers used to build images; the writable layer is the extra layer placed on top when a container starts.

### The problem, shown plainly

Imagine a notes app that writes to `/data/notes.txt` inside its container. You write a note, remove the container, start a fresh one from the same image, and the note is gone. The image never contained it; only the disposable writable layer did.

### The idea: keep data outside the container

A **volume** is storage that Docker manages separately from a container's disposable disk. It has a name and a lifetime you control. You attach it to a container at a **mount point** — a folder path inside the container, such as `/data`. The container sees a normal folder. In reality the bytes are stored by Docker, outside the container's writable layer.

Because the volume is not part of the container, removing the container does not remove the volume. Start a new container, attach the same volume, and your data is there.

A **mount point** is a folder path inside the container where outside storage becomes visible. "Mount" means "make this outside storage appear here."

### Named volumes vs bind mounts

There are two common ways to give a container outside storage. They solve different human problems.

| Kind | What it is | Good for | Who chooses the folder on your computer? |
|------|-----------|----------|------------------------------------------|
| **Named volume** | Docker-managed storage with a name such as `notes-data` | Keeping data (databases, uploads) where Docker should own the location | Docker |
| **Bind mount** | A specific folder on *your* computer mapped into the container | Live-editing source code, or using a folder you already have | You |

A **named volume** is created and stored by Docker. You refer to it by name. You usually do not care where on the host it physically sits.

A **bind mount** points at a folder you choose, such as `C:\projects\myapp` or `/home/me/myapp`. The container sees that exact folder. Change a file on your laptop and the container sees the change immediately.

Rule of thumb: **named volume for data you want Docker to look after; bind mount when you must point at a specific folder you already own.**

### Anonymous volumes

If you write `-v /data` (a container path with no name and no host path), Docker creates an **anonymous volume**: a volume with a random name. It works, but it is hard to find later, which is why named volumes are preferred when you intend to reuse data.

### The flag

`-v` is the shorthand flag on `docker run` that attaches storage. Its value is two paths joined by a colon:

```text
-v   source : destination
```

- **Named volume:** the source is a volume name, e.g. `notes-data:/data`.
- **Bind mount:** the source is a host folder path, e.g. `/home/me/project:/app`.

The left side is *outside* the container; the right side is *inside* the container. On Windows the host path uses backslashes on disk (`C:\projects`), but inside `docker run` you can usually write it with forward slashes for Docker to understand.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Writable layer | The disposable disk a running container writes to | Not the image; it disappears with the container |
| Ephemeral | Temporary; gone when the container is removed | Not "slow" — it means short-lived |
| Persist | To keep existing after the container stops or is removed | Not the same as "running" |
| Volume | Docker-managed storage that outlives a container | Not a folder baked into the image |
| Named volume | A volume you gave a name such as `notes-data` | The name is not a file path |
| Anonymous volume | A volume Docker names randomly | Easy to lose track of |
| Bind mount | A host folder mapped into the container | Not managed by Docker; you choose the path |
| Mount / mount point | The folder inside the container where outside storage appears | The container path, not the host path |
| `-v` | The `docker run` flag that attaches storage | Short for "volume" but also used for bind mounts |
| Driver | The plugin that stores a volume; `local` is the default | Not a piece of hardware |

## Worked example

We use the `alpine` image. Every command below shows what it does, its expected output, and one failure you might meet.

### Step 1 — Watch data vanish without a volume

**Purpose:** prove that a container's own disk is temporary.

```bash
docker run --name ephemeral alpine sh -c "echo important > /notes.txt"
```

This starts a container named `ephemeral`, runs a shell that writes the word `important` into `/notes.txt` inside the container, then exits. (U07 introduced `--name`.)

Then remove the container:

```bash
docker rm ephemeral
```

**Success:** `docker rm` prints the container name:

```text
ephemeral
```

Now start a brand-new container from the same image and try to read the file:

```bash
docker run --rm alpine cat /notes.txt
```

**Expected output:**

```text
cat: /notes.txt: No such file or directory
```

That is not a bug. The file lived only in the removed container's writable layer. (`--rm` tells Docker to remove the container automatically when it exits — handy for throwaway checks.)

**Decoded failure:**

```text
docker: Error response from daemon: Conflict. The container name "/ephemeral" is already in use
```

This means step 1's container still exists. Run `docker rm ephemeral` first; the name must be free before you can reuse it.

### Step 2 — Create a named volume

**Purpose:** ask Docker to make a piece of storage we can reuse.

```bash
docker volume create notes-data
```

**Success output** (the name alone):

```text
notes-data
```

**Decoded failure:** 

```text
Error response from daemon: ... "notes-data" already exists
```

The volume is already there. That is harmless — you do not need to create it twice. Many current Docker versions instead print the name again without complaining.

### Step 3 — Write data into the volume

**Purpose:** attach the volume at the container path `/data` and write a file there.

```bash
docker run --rm -v notes-data:/data alpine sh -c "echo important > /data/notes.txt"
```

`-v notes-data:/data` means: attach the volume named `notes-data` (left of the colon) at the folder `/data` inside the container (right of the colon).

**Success:** no output. Command-line tools stay quiet when they work. "No news is good news" is normal in Docker.

**Decoded failure:**

```text
docker: Error response from daemon: ... volume name is too short
```

Check the spelling of the volume name between `-v ` and the colon. Volume names must be at least two characters.

### Step 4 — Prove the data survived

**Purpose:** with a brand-new container, read the file from the same volume.

```bash
docker run --rm -v notes-data:/data alpine cat /data/notes.txt
```

**Expected output:**

```text
important
```

The first container is long gone, yet the text is here. That is **persistence**.

**Decoded failure:** `cat: /data/notes.txt: No such file or directory` usually means a different volume name was used (for example `notesdata` versus `notes-data`). Volume names are exact.

### Step 5 — List and inspect volumes

**Purpose:** see what volumes exist and where Docker stores them on the host.

```bash
docker volume ls
```

**Expected output** (yours will differ):

```text
DRIVER    VOLUME NAME
local     notes-data
```

```bash
docker volume inspect notes-data
```

**Expected output** (paths differ by operating system):

```json
[
    {
        "CreatedAt": "2026-01-01T00:00:00Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/notes-data/_data",
        "Name": "notes-data",
        "Options": {},
        "Scope": "local"
    }
]
```

`Mountpoint` is the folder on the host where the bytes really live. With Docker Desktop on Windows or macOS, that path is inside Docker's own virtual machine, which is why you cannot browse it directly from File Explorer or Finder. That is normal.

**Decoded failure:** `Error: No such volume: notes-data` means the name does not exist yet. Create it, or check the spelling.

### Step 6 — Remove the volume

**Purpose:** delete storage you no longer need. Volumes are not cleaned up automatically.

```bash
docker volume rm notes-data
```

**Success output:**

```text
notes-data
```

**Decoded failure:**

```text
Error response from daemon: remove notes-data: volume is in use - [<container-id>]
```

A container (running or stopped) still uses this volume. List containers with `docker ps -a` (U10), remove the one shown, then try again.

### Step 7 — A bind mount, briefly

**Purpose:** see the other style, where *you* pick the host folder.

On macOS or Linux (bash), from inside a folder that contains a file:

```bash
docker run --rm -v "$(pwd)":/app alpine ls /app
```

On Windows (PowerShell), from your project folder:

```powershell
docker run --rm -v ${PWD}:/app alpine ls /app
```

**Expected output:** the list of files in your current folder.

`$(pwd)` (bash) and `${PWD}` (PowerShell) both mean "my current folder." The mapping `…:/app` says "make my current folder appear as `/app` in the container." On Windows, Docker Desktop may ask you to allow file sharing for that drive the first time; accept it.

**Decoded failure** (Linux/macOS): if the container reports it cannot read or write files, see the permissions error below.

## Common errors

### Error: "My data disappeared"

**What happens:** You wrote data inside the container (for example, `docker exec` writing to a normal folder) and removed the container. The data was in the writable layer.

**Fix:** Attach a named volume at the folder you write to. Confirm with `docker volume ls` that the volume exists, and reuse the same name next time.

### Error: `permission denied` writing to a volume

**What happens:** On Linux, a named volume or bind mount is owned by a host user's numeric id, while the process inside the container may run as a different user. The container prints:

```text
sh: can't create /data/notes.txt: Permission denied
```

**Why it surprises people:** the folder exists, but the container user is not allowed to write to it.

**Fix options:** For learning, run the container as the matching user with `--user` (for example `--user "$(id -u):$(id -g)"` on Linux/macOS). For a durable fix, set ownership when you build your image (U33 covers this). On Docker Desktop for Windows and macOS, permissions are usually handled for you, so this error is most common on native Linux.

### Error: `... is already in use`

**What happens:** You tried to reuse a `--name`, or remove a volume a container still uses.

**Fix:** Run `docker ps -a` to find the container, then `docker rm` it before reusing the name or removing the volume.

## Checkpoints

Answer in your own words before the assignment:

1. Why does a file written inside a container disappear when the container is removed?
2. What is the difference between a named volume and a bind mount?
3. In `-v notes-data:/data`, which side is the volume and which side is the path inside the container?
4. Where does a named volume physically live, and why might you not see it in your file manager?
5. Which refresh keeps a database's data alive across container restarts, and which one does not?

If you can answer those, you are ready for the exercises.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Predict then run

Predict what this prints, then run it:

```bash
docker run --rm alpine sh -c "echo hi > /tmp/f; cat /tmp/f"
```

Run it once more. Did the second run see the first run's file? Explain in one sentence why or why not.

### P2 — Change one value

Redo the worked example using the volume name `my-journal` instead of `notes-data`. Change only the name. Confirm `docker volume ls` shows it and that the read step prints your text.

### P3 — Fill in the blank

Complete the command so it writes `hello` into a volume named `greetings`:

```bash
docker run --rm -v ____:/data alpine sh -c "echo hello > /data/hi.txt"
```

### P4 — Inspect and decode

Run `docker volume inspect` on your `my-journal` volume. Write down the `Mountpoint` value. Then try to open that path in your file manager. What happens, and why (see Step 5)?

### P5 — Fix the broken command

This command is meant to save data that survives removal, but the author forgot to attach storage:

```bash
docker run --name keeper alpine sh -c "echo saved > /data/out.txt"
```

Rewrite it so `/data` is backed by a named volume `keeper-data`. Run your fixed version and prove the text survives by removing the container and reading it back from a fresh one.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No Compose volumes yet (U21–U25). Compose gives volumes a shorter syntax, but the idea is identical.
- No backing up or migrating volumes between machines.
- No full live-reload development workflow for an app (that arrives with Compose).
- No volume drivers other than the default `local` driver.
- No permissions hardening beyond the one fix shown here (U33).

## Next unit

**U18 — Ports** (letting the outside reach your container).
