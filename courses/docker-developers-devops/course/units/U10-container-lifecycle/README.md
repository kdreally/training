# U10 — Container lifecycle

**Phase 2 — Docker basics**

## Where you are

You can run containers (U07), see them (U08), and pull real images (U09). Now you learn states and common actions: start, stop, logs, exec, rm, and cleanup.

## What you will be able to do

- Name container states (created, running, exited) in plain words.
- Use `docker stop` and `docker start`.
- Use `docker logs` to see output from a container.
- Use `docker exec` to run a command inside a running container.
- Use `docker rm` to remove stopped containers; explain when removal is safe.
- Explain detached mode (`-d`) and when to use it.
- Clean up safely (no image deletion required).

## What you need already

- U00–U09

## Time and energy

**30–50 minutes**.

## Why this exists

Leaving containers around causes name conflicts and clutter. You need calm, safe ways to control lifecycle.

## Plain-language teaching

### States

- **created:** container object exists but not started.
- **running:** actively executing main process.
- **exited:** finished or stopped; filesystem state remains in writable layer until removed.

You see states in `docker ps -a` under STATUS.

### Start/stop

- `docker stop <name-or-id>` sends stop signal, gives graceful time, then exits.
- `docker start <name-or-id>` restarts a stopped container (uses same writable layer).

### Logs

`docker logs <name-or-id>` shows stdout/stderr from container. Useful when detached or when something seems quiet.

### Exec (run command inside running container)

`docker exec -it <name-or-id> <command>` runs another process inside an already running container. Common: `docker exec -it web-test bash` to get shell (if bash exists).

### Detached mode (-d)

`-d` (detached) runs container in background; your terminal returns. Use for long-running services (like nginx). Without -d, container attaches to terminal.

### Remove

`docker rm <name-or-id>` removes a **stopped** container. You cannot remove a running container unless you stop it first (or use force, but not taught). Names free up after removal.

### Cleanup mindset

Remove stopped containers you no longer need. This prevents "name is already in use" errors.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| lifecycle | Sequence of states/actions over time | Vague term |
| stop/start | Pause/resume container | Stop != delete |
| logs | Output history of container | Not "files on host" unless logged there |
| exec | Run extra command inside running container | Different from `docker run` (creates new container) |
| detached (-d) | Runs in background | Foreground attached by default |
| rm | Remove container object | rm does not remove image |

## Worked example

### Start from U09: create a detached nginx
If you have `web-test` stopped: remove or reuse? Better create fresh named clearly.
- All shells: `docker run -d --name web-live nginx:latest`

**Expected:** prints container ID; terminal returns.

Check: `docker ps` shows `web-live` running.

### Logs
- All shells: `docker logs web-live` (shows startup logs)

### Exec
- All shells: `docker exec -it web-live sh` (nginx image has `sh`). Try `echo hello` inside, `exit`.

### Stop and start
- `docker stop web-live` → exits. `docker ps` empty now; `docker ps -a` shows exited.
- `docker start web-live` → running again. `docker ps` shows it.

### Remove
Stop if running: `docker stop web-live` (if needed). Then `docker rm web-live`. `docker ps -a` no longer shows it.

**Typical failure decoded:** try to `docker rm` running container → "You cannot remove a running container... Stop the container before attempting removal or use force."

## Common errors

### CE1 — rm running container
**Fix:** `docker stop <name>` then `docker rm <name>`.

### CE2 — exec on exited container
**Symptom:** cannot exec in stopped container.  
**Fix:** start it first.

### CE3 — Name conflict from old container
**Symptom:** "name already in use".  
**Fix:** `docker rm <old-name>` (if stopped) or use new name.

## Checkpoints

1. States: created/running/exited — difference?
2. `docker stop` vs `docker rm`?
3. `docker exec` vs `docker run`?

## Practice exercises

### P1 — Lifecycle round trip
Create detached container → logs → exec command → stop → start → stop → rm. Observe states each time.

### P2 — Name reuse
Create `temp-box`, stop, rm, create again with same name. Works now?

### P3 — Logs on exited
Run a short container that exits quickly (hello-world) — `docker logs <name>` shows nothing useful, which is normal.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Force remove (`-f`) deep explanation.
- Removing images.
- Volumes/networks beyond lifecycle.

## Next unit

**Phase 3 starts: U11 — What a Dockerfile is and is not** (build your own image).