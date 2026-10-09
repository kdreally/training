# U34 — Debugging containers calmly

**Phase 7 — Craft and capstone**

## Where you are

You have built and run a lot of containers by now. Some of them have failed. Red text is normal in this work; what is not acceptable is freezing in front of it. This unit gives you a **repeatable method** for diagnosing a misbehaving container, so that "it is broken" becomes "here is what I know, here is what I will check next." The goal is calm, ordered steps — not genius.

## What you will be able to do

- Run a fixed diagnostic sequence instead of random clicking.
- Read a container's state, exit code, and logs.
- Use `docker inspect` to answer specific questions with `-f`.
- Enter a running container with `docker exec` (when a shell exists).
- Recognise and decode four common failures: exits immediately, port busy, cannot connect, out of memory.
- Read exit codes and connect them to likely causes.
- Use `docker events` briefly to watch container lifecycle changes live.

## What you need already

- **U00** — the stuck protocol (you will reuse it here).
- **U07–U10** — running containers, logs, exec, lifecycle.
- **U17–U20** — volumes, ports, networking (two of the four failures involve ports).
- **U21–U25** — Compose, for `docker compose logs`.
- **U31** — restart policies and restart loops.
- **U33** — why some minimal images have no shell.

## Time and energy

About **60–90 minutes**. You will break things on purpose; that is the point. Keep one terminal open just for `docker logs` or `docker events` if you can.

## Why this exists

When a container does not work, beginners do two harmful things: they run the same command again and again, or they start changing things at random. Both feel like action and produce nothing.

Experienced people are not smarter in these moments. They follow a sequence: **What state is it in? What did it say? What did it exit with? Can I get inside?** That sequence narrows the problem fast, and it works whether the problem is a typo, a port clash, or a memory limit.

This unit also reinforces the stuck protocol from U00. Debugging a container *is* the stuck protocol applied to Docker.

## Plain-language teaching

### The container lifecycle, as states

A container is always in one of a few **states**. Naming the state is the first move.

| State | Plain meaning |
|-------|---------------|
| `created` | It exists but has never started. |
| `running` | Its main process is alive. |
| `paused` | Frozen on purpose. |
| `restarting` | It exited and the restart policy is bringing it back (U31). |
| `exited` | The main process finished. It is not coming back unless you start it. |
| `dead` | Something is wrong and Docker could not remove it cleanly. |

`docker ps` shows only `running` containers. `docker ps -a` shows **all** states — including the failures. The `-a` means "all," and it is the single most useful debugging habit in this unit.

### Exit codes, in plain words

When a process ends, it returns a number called an **exit code**. Zero means "finished normally." Anything else means "something was not right." The number is a clue, not a verdict.

| Exit code | Common cause |
|-----------|--------------|
| `0` | Success. The process finished its work. |
| `1` | A general application error. |
| `125` | Docker itself failed to run the container (bad flag, bad command line). |
| `126` | The command was found but could not be executed (permissions). |
| `127` | The command was not found inside the image. |
| `137` | Killed with SIGKILL — often out-of-memory or `docker kill`. |
| `143` | Terminated with SIGTERM — the usual result of `docker stop`. |

You do not memorise these by force. You look them up *and* you look at the logs. The code tells you which family of problem you are in.

### Logs are just the process's output

Containers do not have a special logging system by default. Whatever the main process prints to its output streams is captured by Docker and shown by `docker logs`. If the process prints nothing, the logs are empty — that itself is information. Programs that buffer their output (some Python and Node setups) may hide logs until they flush; that is a common source of "there are no logs!"

### Reading `inspect`: ask a precise question

`docker inspect` dumps a large JSON description of a container. Reading all of it is a mistake. Use `-f` to pull **one field**:

- `.State.Status` — the state word.
- `.State.ExitCode` — the number the process returned.
- `.State.OOMKilled` — `true` if it was killed for using too much memory.
- `.Config.Image` — which image it is running.
- `.HostConfig.RestartPolicy.Name` — the restart policy (U31).
- `.NetworkSettings.Ports` — how ports are mapped.

### A method you can always run

When a container misbehaves, do these in order and **stop at the first answer**:

1. **State:** `docker ps -a` — is it running, exited, or restarting?
2. **Logs:** `docker logs --tail 50 <name>` — what did it last say?
3. **Exit code:** `docker inspect -f "{{.State.ExitCode}}" <name>` — how did it end?
4. **Details:** `docker inspect <name>` fields for image, ports, and memory.
5. **Get inside (if running):** `docker exec -it <name> sh` — look around.
6. **Fix one thing**, recreate, and observe. If it fails the same way, you have learned something.

This is the U00 stuck protocol, dressed for Docker.

### Windows / macOS / Linux note

Docker Desktop on Windows and macOS runs a Linux engine behind the scenes. Commands are identical, but shell access differs: minimal images often have `sh` but not `bash`; Windows-only images may offer `cmd` instead. Compose commands are the same on all three platforms.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| State | Whether a container is created, running, paused, restarting, or exited | Not the same as "healthy" |
| Exit code | Number a process returns when it ends | Not always an error |
| Logs | Captured output of the main process | Not a separate logging service |
| `inspect` | Full JSON description of a container | Not a summary; use `-f` to focus |
| `exec` | Run a command inside an already-running container | Not for exited containers |
| SIGTERM | Polite "please stop" signal | Default from `docker stop` |
| SIGKILL | Immediate "stop now" signal | Not catchable by the process |
| OOM | Out of memory | Not the same as a crash from a bug |
| `docker events` | Live feed of Docker activity | Not your app's logs |
| Health check | A command Docker runs to test if the app is responsive | Not the same as "process is alive" |
| Restart loop | A container restarting endlessly | A symptom, not a root cause |

## Worked example

**Scenario:** a container exits almost immediately, and you do not know why. We will diagnose one deliberate example from start to fix.

### Step 1 — run something that fails on purpose

```bash
docker run --name boom alpine sh -c "echo starting up; sleep 1; exit 3"
```

- **Purpose:** create a container whose main process prints a line and then exits with a non-zero code.
- **Success looks like:** the line `starting up` printed, then your prompt returns. This is *expected* failure.
- **One decoded failure:** `docker: Error response from daemon: Conflict. The container name "/boom" is already in use` means you ran this before and the old container still exists. Remove it with `docker rm boom` and rerun.

### Step 2 — what state is it in?

```bash
docker ps -a
```

- **Purpose:** list all containers, including stopped ones.
- **Success looks like:** a row for `boom` with `Exited (3)` and a few seconds ago. That `(3)` is the exit code.
- **One decoded failure:** if `boom` does not appear at all, the container was created and auto-removed (for example via `--rm`) or you are looking at the wrong Docker context. Confirm you are on the expected context.

### Step 3 — what did it say?

```bash
docker logs boom
```

- **Purpose:** read the captured output of the main process.
- **Success looks like:** a single line: `starting up`. Nothing more, because the program printed nothing more.
- **One decoded failure:** empty output usually means the program died before printing, or it buffers output. Try a longer sleep, or check the exit code next.

### Step 4 — how did it end?

```bash
docker inspect -f "{{.State.ExitCode}}" boom
```

- **Purpose:** print just the exit code.
- **Success looks like:** `3`, matching the `exit 3` in the command.
- **One decoded failure:** `template parsing error` means the shell mangled the braces. In PowerShell use double quotes as shown; in bash single quotes are safer.

### Step 5 — form a hypothesis, fix one thing, observe

Here the picture is complete: the command deliberately exits with `3`. In real life, you would now change the command or configuration and rerun. To demonstrate, run a corrected version:

```bash
docker rm boom
docker run --name boom alpine sh -c "echo starting up; sleep 3600"
```

Now `docker ps` shows `boom` as `Up` and `docker logs boom` shows `starting up`. One change, then observe.

### A quick look with `docker events`

In a second terminal, start this live feed:

```bash
docker events --filter container=boom
```

- **Purpose:** watch lifecycle events (start, die, stop) for one container in real time.
- **Success looks like:** when you start and stop `boom` in the other terminal, lines appear such as `container start` and `container die`.
- **One decoded failure:** if nothing appears, either no events happened yet (start/stop the container) or the filter name is misspelled. Stop the feed with `Ctrl+C`.

Clean up:

```bash
docker rm -f boom
```

## Common errors

### Failure 1: The container exits immediately

**Symptom:** `docker ps -a` shows `Exited (0)` or `Exited (something)` seconds after start.

**Diagnose:** read the exit code and the logs from the method above.

**Common causes and fixes:**

- The main command does its job and finishes (for example a script with no long-running process). Fix: run a process that stays alive, or treat it as a one-shot job on purpose.
- Command not found → exit `127`. Fix: correct the command or use the right shell.
- The app crashes on startup → exit `1` with an error in the logs. Fix: read the error.

### Failure 2: "port is already allocated"

**Symptom:** `Bind for 0.0.0.0:8085 failed: port is already allocated`.

**Diagnose:** something else already uses host port `8085`.

**Fix:** find the other process (`docker ps` shows other containers; on Windows `netstat -ano | findstr :8085`; on macOS/Linux `lsof -i :8085`), or choose a different host port: `-p 8090:8085`. Remember only the left number is the host side (U18).

### Failure 3: "The container is running but I cannot connect"

**Symptom:** `docker ps` shows `Up`, but `curl http://localhost:PORT` fails or hangs.

**Diagnose:** work checks in order:

1. Is the port **published**? `docker inspect -f "{{.NetworkSettings.Ports}}" <name>`. Missing mapping means the app is unreachable from outside.
2. Is the app listening on **all interfaces**, not just `127.0.0.1`, inside the container? An app bound to `127.0.0.1` inside the container is unreachable through a mapping. The app must bind `0.0.0.0`.
3. Is the app actually listening on the port you published? A mismatch between the internal port and `containerPort` is common.
4. Are you connecting from the right place? From another container, `localhost` means *that* container (U19), not the app.

**Fix:** publish the correct port, bind the app to `0.0.0.0`, and match internal/external ports.

### Failure 4: Out of memory (OOM)

**Symptom:** the process dies with exit code `137`, or the container restarts under load.

**Diagnose:** `docker inspect -f "{{.State.OOMKilled}}" <name>` returns `true`. `docker stats --no-stream` shows current memory use. `docker events` may show a `die` event with an `oom` cause.

**Fix:** raise or remove the memory limit (if it was set), reduce the app's memory use, or give the task less work. A frequent cause is a runaway loop or a huge file loaded into memory.

### Error: "I cannot `exec` into it"

**What happens:** `docker exec -it <name> sh` says the container is not running, or `sh: not found`.

**Why:** `exec` needs a running container, and some images (distroless, U33) have no shell at all.

**Fix:** if it exited, start it or use `docker logs`/`inspect`. If there is no shell, debug from outside using logs, inspect, and a temporary debug image, or rebuild with a shell for investigation only.

## Checkpoints

Answer in your own words before the assignment:

1. Write the five steps of the diagnostic method from memory.
2. What does `docker ps -a` show that `docker ps` does not, and why is that the first command?
3. What does exit code `127` usually mean? What about `137`?
4. Name the two most common reasons a running container is unreachable from outside.
5. Why can a container be "running" yet still be useless to users?

## Practice exercises

### P1 — Deliberate failures

Create three containers that fail in three different ways: exit code `1`, exit code `127`, and a bad host port mapping. For each, write the state, exit code, and one sentence of cause.

### P2 — Read one field only

Using `docker inspect -f`, print each of these for a running container you already have: `.State.Status`, `.Config.Image`, `.NetworkSettings.Ports`. Write what each value tells you.

### P3 — Events in the background

Run `docker events` in one terminal and start/stop a container in another. Copy two event lines and explain what each means.

### P4 — Connect failure hunt

Run a small web server that binds to `127.0.0.1` inside the container, publish its port, and try to reach it. Explain why it fails. Then make it bind `0.0.0.0` and reach it successfully.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No advanced tracing, profilers, or debuggers.
- No log-aggregation products.
- No monitoring dashboards or alerting.
- No Kubernetes debugging (U32 was a survey only).
- No deep Linux performance tuning.

## Next unit

**U35 — Capstone: containerize a real app** (put everything together in one deliverable).
