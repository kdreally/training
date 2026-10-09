# U31 — From image to service

**Phase 7 — Craft and capstone**

## Where you are

You have built images, run containers, kept data in volumes, published ports, and tied services together with Compose. Up to now the story has been "get this running on my laptop." This unit is about the next honest question: **how does an image become something that keeps running for other people?** That is what people loosely call "deploying." We will define it clearly and practise it locally — no cloud account, no credit card, no server rental required.

## What you will be able to do

- Explain what "deploy" means for a container, in plain language.
- Name the three things every running service needs: a **host**, a **runtime**, and a **process that stays up**.
- Run an existing image as a long-lived service using a **restart policy**.
- Read a container's restart policy and restart count back with `docker inspect`.
- Distinguish "it is running because I am watching it" from "it is running because the machine keeps it running."
- Decode the most common "it keeps restarting" failures.

## What you need already

- **U06** — Docker installed and verified.
- **U07–U10** — running containers, lifecycle commands, `docker logs`, `docker exec`.
- **U11–U16** — building images and multi-stage builds.
- **U17–U20** — volumes, ports, and how containers talk to each other.
- **U21–U25** — Compose basics (you will reuse `restart:` and `depends_on:` here).
- **U26–U27** — registries (this unit assumes the image already exists locally or can be pulled).

## Time and energy

About **60–90 minutes**. The ideas here are bigger than the commands. Read the "Why this exists" and "Plain-language teaching" sections slowly. Take a break before the practice exercises.

## Why this exists

On your laptop, you start a container, you look at it, you close the terminal, and it is still there in the morning. So why does everyone talk about deployment like it is hard?

Because your laptop is doing three invisible jobs at once. It is the **machine** that stays powered on. It is running the **Docker engine** that knows how to start containers. And there is a human — you — who notices when something dies and starts it again.

A real service has none of your attention. Nobody is watching it at 3 a.m. So the service must be started by the machine, and restarted by the machine when it falls over. "Deploy" is the honest word for: **take an image that runs, and arrange for a machine to run it, and keep running it, without a human standing there.**

That is the whole idea. The rest of this unit is vocabulary and a handful of commands so the idea stops being vague.

## Plain-language teaching

### The three ingredients of a running service

Every service, from a tiny notes app to a giant website, is made of the same three parts:

1. **A host.** A computer that is switched on and connected to a network. On your laptop, the host *is* your laptop. In a company, the host is usually a computer in a data centre that you never physically touch. A host is not magic; it is just a machine that stays on.
2. **A runtime.** The software on the host that knows how to turn an image into a running container. When the host runs Docker (or a compatible engine), Docker **is** the runtime. The host provides the electricity and the network; the runtime provides the container machinery.
3. **A process that stays up.** A container runs exactly one main process (the last `CMD` or `ENTRYPOINT` instruction from the image, U12). If that process exits, the container exits. A "service" is a container whose main process is written to run until it is told to stop — a web server, a queue worker, a database.

If any one of the three is missing, nobody can use your service. Your laptop quietly supplies all three. A production setup has to supply them deliberately.

### "Deploy" without cloud hype

To **deploy** is to make a built image into a running service on some host, in a way that survives you walking away. Nothing in that sentence requires a cloud provider. You can deploy to:

- your own laptop (fine for learning),
- a spare desktop in the corner,
- a small computer in your office,
- a rented server elsewhere (the "cloud" story).

This course stays on the first option so nobody needs to spend money. The concepts are identical on all four.

### Why a machine will not keep things running by default

When you run `docker run python:3.12-slim python -m http.server`, the container runs the web server. If that web server crashes, the container exits and Docker does nothing about it. Docker's default restart policy is **`no`**: "if it exits, leave it exited."

That default is sensible. Many containers are meant to run a job and finish (a build, a backup, a migration). Restarting a finished job forever would be a bug. So Docker makes you *ask* for restart behavior, per container.

### Restart policies, in plain words

A **restart policy** is an instruction attached to a container that tells the runtime what to do when the main process exits. You set it at run time with the `--restart` flag, or in Compose with the `restart:` key.

| Policy | Plain meaning | Use when |
|--------|---------------|----------|
| `no` | Do not restart. Leave it stopped. | One-shot jobs, tests. This is the default. |
| `on-failure[:N]` | Restart only if it exits with a non-zero (error) code, at most `N` times. | A service that should not loop forever on a permanent error. |
| `always` | Restart no matter how it exited, including after `docker stop`. | A service that must always be up; a reboot starts it again. |
| `unless-stopped` | Like `always`, but if *you* stopped it, it stays stopped after a reboot. | The usual friendly choice for a personal service. |

The difference between `always` and `unless-stopped` only shows after a machine reboot: `always` brings back a container you had stopped by hand; `unless-stopped` respects your decision.

### What a "host" is *not*

- A host is **not** the same as a container. A host contains containers.
- A host is **not** necessarily powerful. A useful service can run on tiny hardware.
- A host is **not** "the cloud." The cloud is other people's hosts.

### Desired state (the seed of the next unit)

When you say "this service should always be up," you are describing a **desired state**: the state you want the world to be in. A restart policy is the simplest possible version of that idea — one host, one container, "keep it up." In U32 you will meet tools that manage desired state across many hosts. Getting comfortable with the phrase now makes U32 much easier.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Host | A computer that stays on and runs your service | Not the same as a container; not automatically "the cloud" |
| Runtime | Software on the host that turns images into containers (Docker here) | Not the same as the app you are running |
| Service | A container whose main process keeps running for others to use | Not a Docker object you can list; it is a role |
| Deploy | Make a built image into a running service on a host | Not "write code"; not "upload to the cloud" |
| Daemon | The background program (the runtime) that manages containers | Not your app's process |
| Restart policy | Rule for what to do when a container's main process exits | Not a health check; it does not look *inside* the app |
| Exit code | The number a process returns when it finishes (0 = success) | Not always an error — read it, do not fear it |
| Uptime | How long something has been running without stopping | Not a guarantee of correctness |
| Disposable | Able to be deleted and recreated safely | Not "unimportant" |
| Desired state | The state you want (e.g. "this service is up") | Not the current state; tools work to close the gap |
| Restart count | How many times the runtime has restarted this container | Not the number of crashes of your app *logic* alone |

## Worked example

**Goal:** run a tiny web service that stays up by itself, prove it restarts when its process dies, and read the evidence back with `docker inspect`. Everything here runs on your own machine.

**Step 1 — start the service with a restart policy.**

This command runs the `python:3.12-slim` image, starts a small built-in web server, publishes port `8085` (outside) to `8085` (inside), names the container `demo-service` for easy reference, and asks the runtime to restart it unless you stop it by hand.

```bash
docker run -d --name demo-service --restart unless-stopped -p 8085:8085 python:3.12-slim python -m http.server 8085
```

- `-d` means **detached**: run in the background and give you your prompt back.
- `--name demo-service` gives the container a stable name instead of a random one.
- `-p 8085:8085` maps a port from the host to the container (U18). The left number is the host port; the right is the container port.
- `--restart unless-stopped` is the restart policy from the table above.
- The final part after the image name is the command to run: `python -m http.server 8085`.

**Success looks like:** a long container ID printed, and your prompt back. Check with:

```bash
docker ps
```

You should see `demo-service` with `Up` and a few seconds in the `STATUS` column.

**Step 2 — confirm it answers over the network.**

On macOS/Linux:

```bash
curl http://localhost:8085
```

On Windows PowerShell, `curl` is an alias for `Invoke-WebRequest`. Either use the alias, or call the real curl explicitly:

```powershell
Invoke-WebRequest http://localhost:8085
```

**Success looks like:** an HTML directory listing (the server has no files, so it shows an empty index). Any HTML back means the service is reachable.

**Step 3 — kill the main process and watch the runtime bring it back.**

This runs a command *inside* the running container. `kill 1` sends a termination signal to process number 1, which is the main process. When the main process dies, the container exits — and because of the restart policy, Docker starts it again.

```bash
docker exec demo-service kill 1
```

**Success looks like:** no error, and a moment later:

```bash
docker ps
```

shows `demo-service` as `Up` again with a small uptime (for example `Up 3 seconds`). It restarted without you running `docker run` again.

**Step 4 — read the evidence.**

This prints just the restart count from the container's JSON description. The `-f` flag means "format the output using this Go template."

```bash
docker inspect -f "{{.RestartCount}}" demo-service
```

On bash you may prefer single quotes; PowerShell favours double quotes. Both work; if your shell mangles the braces, try the other.

**Success looks like:** a number greater than `0` (the kill in Step 3 caused at least one restart).

**Step 5 — clean up.**

Stopping with `docker stop` is you telling the runtime "stop." With `unless-stopped`, the runtime remembers that and does **not** bring it back.

```bash
docker stop demo-service
docker rm demo-service
```

**Success looks like:** the container ID printed twice, and `docker ps -a` no longer lists `demo-service`.

### A wrong-on-purpose run, to see a restart loop

Run a container whose command fails instantly, with `--restart always`:

```bash
docker run -d --name will-loop --restart always alpine sh -c "echo starting; exit 7"
```

`docker ps -a` will show `will-loop` in a **`Restarting`** state, and the restart count climbs. The point: a restart policy does not fix a broken command — it hides it in a loop. The fix is to read the logs:

```bash
docker logs will-loop
```

which shows `starting`, and then fix the command. Remove it when done:

```bash
docker rm -f will-loop
```

## Common errors

### Error: "The container is `Restarting` forever"

**What happens:** `docker ps -a` shows `Restarting (1) 2 seconds ago` and the count grows. Your image's command keeps failing immediately.

**Why:** The restart policy faithfully restarts a process that keeps dying. It cannot tell you *why*.

**Fix:** Read the logs (`docker logs <name>`), check the exit code (`docker inspect -f "{{.State.ExitCode}}" <name>`), fix the command or configuration, then recreate the container. To stop the loop while you think, `docker rm -f <name>`.

### Error: "I thought `-d` meant it stays up"

**What happens:** You ran `docker run -d ...` without a restart policy, the process later exited, and it never came back.

**Why:** `-d` only means "do not hold my terminal." It says nothing about restarting. Without `--restart`, Docker's default is `no`.

**Fix:** Add `--restart unless-stopped` (or your chosen policy) when you run the container. You can also change it on an existing container with `docker update --restart unless-stopped <name>`.

### Error: "port is already allocated"

**What happens:** `docker: Error response from daemon: driver failed programming external connectivity ... port is already allocated.`

**Why:** Another container (or a program on the host) already uses host port `8085`.

**Fix:** Pick a different host port, for example `-p 8090:8085`. Only the left number must change.

### Error: "It restarted, so it must be healthy"

**What happens:** A service restarts quietly in a loop and looks "up" if you glance at `docker ps`.

**Why:** A restart policy only notices that the *process* exited. It cannot see that the app answers requests incorrectly.

**Fix:** Add a **health check** (you have the tools from Compose, U23) and watch the restart count, not just the word `Up`.

## Checkpoints

Answer in your own words before the assignment:

1. Name the three ingredients a running service needs, and say which one your laptop supplies invisibly.
2. What is the default restart policy, and why is that default reasonable?
3. What is the practical difference between `always` and `unless-stopped` after a reboot?
4. If a container says `Restarting` forever, what is your *first* diagnostic command, and why?
5. Why is `-d` not the same as "keep it running"?

## Practice exercises

### P1 — Feel the default

Run the worked example's service **without** any `--restart` flag. Kill its main process with `docker exec <name> kill 1`. Note what `docker ps -a` shows. Then delete it.

### P2 — Change your mind without rebuilding

Start a simple container, then use `docker update --restart always <name>` to add a policy after the fact. Confirm with `docker inspect -f "{{.HostConfig.RestartPolicy.Name}}" <name>`. Then remove it.

### P3 — Predict, then run

Before running anything: for a container started with `--restart unless-stopped`, predict what `docker ps -a` shows after you run `docker stop <name>`, and what it shows after `docker kill <name>`. Run both and compare. Write one sentence explaining the difference.

### P4 — Read an exit code

Run `docker run --name codecheck alpine sh -c "exit 9"`. Then run `docker inspect -f "{{.State.ExitCode}}" codecheck`. Write down the number. Remove the container.

### P5 — Write your own restart policy sentences

In one line each, describe a situation where you would choose `no`, `on-failure:3`, and `unless-stopped`. (No commands; this is about judgement.)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No cloud providers, no server rental, no accounts, no costs.
- No Kubernetes (that survey is U32).
- No new image-building techniques (those were U11–U16).
- No monitoring or alerting products.
- No deep security hardening (that is U33).

## Next unit

**U32 — Where Kubernetes fits** (a survey of orchestration, and when *not* to reach for it).
