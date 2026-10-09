# U06 — Installing Docker safely

**Phase 2 — Docker basics**

## Where you are

You are in Phase 2. You already understand (from U00–U05) how this course works and why containers exist. Before running your first container, you need to install Docker with understanding. This unit shows you how to choose, install, and verify Docker safely, without assuming it is already on your machine.

## What you will be able to do

- Explain what Docker Desktop and Docker Engine are, and when each is used.
- Verify your system meets basic requirements (including virtualization on Windows) before installing.
- Install Docker for your OS (Windows/macOS/Linux) by following a safe checklist.
- Explain what the Docker daemon (background service) is, at a gentle level.
- Verify your install using `docker --version` and `docker run hello-world`.
- Decode and fix one common install failure for your OS.

## What you need already

- U00 — How this course works
- U01 — What we are building toward
- U02 — The "works on my machine" problem
- U03 — The terminal, deliberately
- U04 — Apps and their environments
- U05 — Virtual machines vs containers (honest trade-offs)

## Time and energy

About **45–75 minutes**. Take breaks. This is an install unit; allow time to read errors if any appear.

## Why this exists

Docker only helps if it runs correctly on your machine. Installing blindly leads to confusing errors. You deserve to know what you are installing and how to tell if it is working.

## Plain-language teaching

### Docker Desktop vs Docker Engine

- **Docker Desktop**: An app you install on Windows/macOS that bundles Docker Engine, a small helper for virtualization (WSL2 or Hyper-V on Windows), a GUI, and extras. It is easy for local development.
- **Docker Engine**: The core part that runs containers (the "engine"). On Linux it is often installed directly as Docker Engine. Docker Desktop also uses Docker Engine underneath.

You do not need to master the internals. The key: if you installed Docker Desktop, the Engine is there. If you installed Engine directly on Linux, you have the Engine.

### The Docker daemon (gentle definition)

The **Docker daemon** is the background program (a service/process) that actually runs and manages containers. When you type `docker` commands in your terminal, the `docker` tool talks to the daemon. 

Think of it this way: the terminal client asks; the daemon does the work. If the daemon is not running, commands will fail even if Docker is "installed".

### Verifying before you run containers

Before running real apps, you want two quick proofs:
1. **Version check** — confirms the client (and usually daemon connection) is reachable.
2. **Smoke test** (`hello-world`) — pulls a tiny public image and runs a container to prove the whole chain works.

### Cross-platform note

- **Windows:** PowerShell is fine. WSL2 is recommended for Docker Desktop. Some commands shown may differ slightly in cmd; prefer PowerShell for consistency.
- **macOS:** Terminal (bash/zsh) is fine. Docker Desktop runs a small VM for the Engine.
- **Linux:** Usually Docker Engine. Some commands may need `sudo` depending on install; this unit explains that only if it happens (do not assume).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Docker Desktop | A local app (Windows/macOS) that includes Docker Engine + helpers | Not "the same as Docker" in name, but it gives you Docker |
| Docker Engine | The core program that runs containers | People think Desktop is different tech — often it uses Engine |
| Docker daemon | Background service that runs/controls containers | "Daemon" sounds scary; just means "background worker" |
| Image | Recipe for a container (see U08) | Not the running thing |
| Container | Running instance (see U08) | Not the same as an image |
| hello-world | Tiny test image to prove install works | Not a tutorial app, just a smoke test |
| Virtualization | Hardware trick allowing VMs/containers to run | Sometimes disabled in BIOS/firmware on Windows |
| PATH | List of folders where terminal looks for commands | If Docker not in PATH, `docker` not found |

## Worked example

We keep this tiny and verifiable. The commands below are the exact checks you should run after installing. (You do not need to run them yet if Docker is not installed; just read what they do.)

### Step 1: Check Docker version
**What this does:** Asks the Docker client for its version and confirms it can reach the daemon.
- **Windows (PowerShell):** `docker --version`
- **macOS (Terminal):** `docker --version`
- **Linux (Terminal):** `docker --version`

**Expected success output (example shape):**  
`Docker version 28.x.x, build ...`

**Typical failure decoded (before trying):**  
`'docker' is not recognized as an internal or external command` (Windows) or `command not found` (macOS/Linux) → means Docker not in PATH or not installed. Check install location and PATH.

### Step 2: Run the smoke test
**What this does:** Downloads `hello-world` (if needed) and runs a tiny container that prints a confirmation message.
- **Windows (PowerShell):** `docker run hello-world`
- **macOS (Terminal):** `docker run hello-world`
- **Linux (Terminal):** `docker run hello-world` (if permission denied, see common error below)

**Expected success output (key lines):**  
`Hello from Docker!`  
`This message shows that your installation appears to be working correctly.`

**Typical failure decoded (before trying):**  
`Cannot connect to the Docker daemon at ... Is the docker daemon running?` → daemon not started. Start Docker Desktop (Windows/macOS) or start Docker service (Linux).

## Common errors

### CE1 — Virtualization disabled (Windows)
**Symptom:** Docker Desktop fails to start or warns about virtualization/Hyper-V/WSL2.  
**Why:** Your PC firmware has virtualization turned off.  
**Fix (safe approach):** Reboot into BIOS/UEFI, enable VT-x/AMD-V, save, boot. Also ensure WSL2 is enabled if using WSL2 backend. (This is hardware-level; no Docker command fixes it.)

### CE2 — Docker not found in terminal
**Symptom:** `'docker' is not recognized...` or `command not found`.  
**Why:** Docker not installed, or its folder not in your shell's PATH.  
**Fix:** Re-open terminal after install; on Windows, open "Docker Desktop" first then terminal; on Linux, log out/in after install.

### CE3 — Permission denied on Linux
**Symptom:** `permission denied while trying to connect to the Docker daemon socket`.  
**Why:** Your user is not in the `docker` group (common on Linux Engine installs).  
**Fix:** Add user to group (`sudo usermod -aG docker $USER`) and log out/in. Do **not** habitually run `sudo docker` as a long-term fix if you can avoid it; understand the group instead.

## Checkpoints

1. In your own words: What is the difference between Docker Desktop and Docker Engine?
2. What is the Docker daemon, in one sentence?
3. What two commands would you run to verify a fresh install, and what should each show if it worked?

## Practice exercises

### P1 — Read before installing (predict)
Look at your OS. Predict: will you use Docker Desktop or Docker Engine? Write one reason.

### P2 — Verify the checklist
Before installing, write down: OS, CPU, and (Windows) whether virtualization is known to be enabled. (Ungraded; honest notes.)

### P3 — Proof of working
After install, run `docker --version` and `docker run hello-world` (exactly as above). Save the exact first line of version output and the "Hello from Docker!" line in your notes. (Practice only.)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Building images (U11+)
- Running custom apps yet (that is U07)
- Registry login/push (U26–U27)
- Docker Compose (U21+)

## Next unit

**U07 — Your first container** (now that Docker is working, you run real containers and see what happens step by step).