# U18 — Ports

**Phase 4 — Data and networking**

## Where you are

In U17 you kept data alive past a container's life. Now we handle the other half of "isolated." A container can be running perfectly and you still cannot open it in a browser. That is usually not a bug — it is a **closed door**. This unit explains what a port is and how to open one on purpose.

## What you will be able to do

- Explain, in plain words, what a port is and how it differs from an IP address.
- Describe why a server running inside a container is not automatically reachable from your computer.
- Publish a container port to your machine with `-p host:container`.
- Read `docker port` output and confirm a published mapping.
- Decode a "connection refused" and a "port is already allocated" failure.

## What you need already

- **U06–U10** — install Docker, run containers, pull images, container lifecycle (`docker run`, `docker rm`, `docker ps`).
- **U09** — pulling existing images from Docker Hub. We will pull `nginx`, a small web server.

You do not need U17 for this unit, but both belong to Phase 4 and are often used together.

## Time and energy

About **60–90 minutes**. Ports confuse many people at first because one number is doing two jobs (the door outside and the door inside). Go slowly through the worked example; it shows the exact moment the door opens.

## Why this exists

Here is a scene almost everyone meets. You run a database or a web server in a container. The container logs look happy. You open your browser to `http://localhost` and get nothing — "connection refused." You start to doubt the container.

Nothing is wrong with the container. A container has its own isolated network, so its doors face inward, not toward your laptop. To reach it you must deliberately connect one container door to a door on your computer. That deliberate connection is called **publishing a port**. Without it, the server may as well be in a locked room.

## Plain-language teaching

### What a port is

A **port** is a numbered door on a computer that network traffic can arrive at. A computer uses ports to tell apart different programs running at the same time. Web servers commonly listen on port `80`; encrypted web servers on `443`; databases on `5432` (PostgreSQL) or `3306` (MySQL).

An **IP address** answers "which computer?". A **port** answers "which program on that computer?". Both are needed to reach something: `192.168.1.10:80` means "the program on port 80 of the computer at 192.168.1.10."

To **listen** on a port means a program has opened that door and is waiting for connections.

### Containers have their own network

Every container gets its own isolated network space. That means the ports inside a container are separate from the ports on your computer. A web server inside a container can listen on port `80` inside that container, and your computer's port `80` is a completely unrelated door.

So by default, a container's doors face inward. Nothing on your computer can knock from outside. This isolation is a feature: two containers can both use port `80` internally without clashing.

### Publishing a port

**Publishing** (also called **mapping**) means connecting a port on your computer to a port inside the container. You do it with the `-p` flag on `docker run`:

```text
-p   hostPort : containerPort
```

- **hostPort** (left) is the door on *your computer*.
- **containerPort** (right) is the door *inside the container*.

For example, `-p 8080:80` says "when someone knocks on port 8080 of my computer, forward them to port 80 inside the container." After that, `http://localhost:8080` reaches the server.

The order matters and is a classic source of confusion: **host first, container second**. If you swap them you will usually hit a port conflict or an unreachable server.

### localhost

**localhost** (whose numeric form is `127.0.0.1`) means "this same computer." When you type `http://localhost:8080` on your laptop, you are knocking on a door of *your laptop*. When port 8080 is published to the container, that knock is forwarded inward. Without publishing, nothing is listening on your laptop's 8080, so you get "connection refused."

Inside a container, `localhost` means *the container itself* — a point we explore fully in U19.

### Publish vs expose

On a server inside an image you may see a line like `EXPOSE 80` (a Dockerfile instruction, U12). **EXPOSE** is documentation: it records which port the image's author expects the server to use. It does **not** open a door to your computer. Only `-p` (or `-P`) publishes.

- `-p 8080:80` publishes one specific mapping.
- `-P` (capital) publishes *all* ports the image marks with `EXPOSE`, each to a random free port on your computer. Useful for a quick look; less predictable.

### How to read a published mapping

Docker shows mappings as `container -> host`:

```text
80/tcp -> 0.0.0.0:8080
```

Read it as "container port 80 is reachable through host port 8080." `0.0.0.0` means "all of this computer's network interfaces." That is why `localhost:8080` and your machine's own IP both work.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Port | A numbered door for network traffic to one program | Not the same as an IP address |
| IP address | Which computer on the network | Not which program |
| Listening | A program has opened a port and waits for connections | Not the same as "published" |
| Publish / map | Connect a host port to a container port with `-p` | Not done automatically |
| Host port | The door on *your computer* (left of the colon) | People assume it is the container port |
| Container port | The door *inside the container* (right of the colon) | Must match what the server actually listens on |
| `-p` | The `docker run` flag that publishes one port | Its value is `host:container` |
| `-P` | Publish every `EXPOSE`d port to a random host port | Not the same as `-p` |
| `EXPOSE` | Dockerfile note of the expected port; documentation only | Does not publish anything |
| localhost / `127.0.0.1` | "This same computer" | Inside a container it means the container, not the host |
| `0.0.0.0` | All network interfaces of a machine | Not a specific address you browse to |
| Port conflict | Two programs trying to use the same host port | The second one fails to start |

## Worked example

We use the **`nginx`** image, a small web server. If you have not pulled it before, Docker pulls it automatically the first time (U09).

### Step 1 — Start a web server without publishing

**Purpose:** show that a running server can still be unreachable.

```bash
docker run -d --name web nginx
```

`-d` runs the container in the background (detached) so you get your prompt back. `--name web` gives it a name we can refer to.

**Success output:** a long container id:

```text
a1b2c3d4e5f6...
```

### Step 2 — Confirm there is no mapping

**Purpose:** ask Docker which ports are published.

```bash
docker port web
```

**Expected output:** nothing at all. Empty output is the honest answer "this container publishes no ports." That is the closed door.

**Decoded failure:**

```text
Error: No such container: web
```

means the container does not exist — perhaps the run in Step 1 failed, or you spelled the name differently. Check with `docker ps -a`.

### Step 3 — Try to reach it anyway

**Purpose:** see the closed door from the outside.

On macOS or Linux (bash):

```bash
curl http://localhost:80
```

On Windows (PowerShell), `curl` is an alias for a PowerShell command that ignores some options, so call the real program with `.exe`:

```powershell
curl.exe http://localhost:80
```

**Expected output** (one common form):

```text
curl: (7) Failed to connect to localhost port 80: Connection refused
```

**Decoded meaning:** nothing on your computer is listening on port 80. The container's own port 80 is not connected to your computer. The nginx server is fine; the door is closed.

### Step 4 — Recreate the container with a published port

**Purpose:** open the door.

Docker cannot add a port to an existing container; you must remove and run it again (this is the lifecycle idea from U10). Remove the old one first:

```bash
docker rm -f web
```

`-f` forces removal even though the container is running.

Now start it again with `-p 8080:80`:

```bash
docker run -d --name web -p 8080:80 nginx
```

**Success output:** a new container id.

### Step 5 — Confirm the mapping

```bash
docker port web
```

**Expected output:**

```text
80/tcp -> 0.0.0.0:8080
```

Read it as: container port `80` is reachable through host port `8080`.

### Step 6 — Reach the server

**Purpose:** prove the door is open.

On macOS or Linux (bash):

```bash
curl http://localhost:8080
```

On Windows (PowerShell):

```powershell
curl.exe http://localhost:8080
```

**Expected output** (abbreviated — an HTML page, not an error):

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
```

You can also open `http://localhost:8080` in a browser. The words "Welcome to nginx!" are your success signal.

**Decoded failure:** if you still get `Connection refused`, check `docker port web` and make sure the host port you typed matches. A very common mistake is browsing `:80` while the mapping was `8080:80`.

### Step 7 — Meet a port conflict

**Purpose:** see what happens when the host door is already taken.

While `web` is running on host port 8080, try to start a second nginx on the same host port:

```bash
docker run -d --name web2 -p 8080:80 nginx
```

**Expected failure:**

```text
docker: Error response from daemon: driver failed programming external connectivity on endpoint web2 (...): Error starting userland proxy: listen tcp4 0.0.0.0:8080: bind: address already in use.
```

**Decoded meaning:** host port `8080` is already used by the first container. Only one program can own a host door at a time. **Fix:** choose a different host port, for example `-p 8081:80`. (Docker Desktop may phrase the message as `Ports are not available: exposing port TCP 0.0.0.0:8080` — same cause.)

### Cleanup

```bash
docker rm -f web web2
```

`docker ps` should no longer list them.

## Common errors

### Error: reversing the ports

**What happens:** You write `-p 80:8080` when you meant `-p 8080:80`. When you browse `http://localhost:8080`, nothing answers because the host door is 80 and the container door is 8080 (which nginx does not use).

**Fix:** The left number is the host port; the right number must match the port the server listens on inside the container. For nginx, that is `80`, so `-p <anything-free>:80` is right.

### Error: forgetting `-p`, then blaming the app

**What happens:** The server runs, logs look fine, but the browser refuses to connect.

**Fix:** An isolated container is unreachable until you publish a port. Run `docker port <name>`; empty output means "not published."

### Error: `address already in use`

**What happens:** Another program (another container, or a local server such as a database or another web tool) already owns that host port.

**Fix:** Pick a different host port, or stop the program that owns it. `docker ps` shows your containers and their published ports.

### Error: changing the port but not the container

**What happens:** You edit the `docker run` command to a new port but the old container is still running, so the new mapping never appears.

**Fix:** Port mappings are fixed at container creation. Remove the container (`docker rm -f web`) and run it again with the new `-p` value.

## Checkpoints

Answer in your own words before the assignment:

1. What does a port identify, and how is that different from what an IP address identifies?
2. In `-p 9000:80`, which number is the door on your computer and which is the door inside the container?
3. Why is a container's web server unreachable before you add `-p`?
4. What does `docker port web` print when nothing is published, and why is that not an error?
5. What does `EXPOSE 80` in a Dockerfile do — and what does it *not* do?

If you can answer those, you are ready for the exercises.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Predict then run

Predict the output of `docker port web` for a container started with:

```bash
docker run -d --name web -p 4000:80 nginx
```

Then run it and compare. Write the real output in your notes.

### P2 — Change one value

Remove the container from P1 and start it again publishing host port `5050` instead. Browse or curl `http://localhost:5050`. Then try `http://localhost:4000`. Explain in one sentence why one works and the other does not.

### P3 — Fill in the blank

Complete the command so that `http://localhost:7000` reaches a server listening on port `80` inside a container named `site`:

```bash
docker run -d --name site -p ____:____ nginx
```

### P4 — Read a mapping

You run a container and `docker port db` prints:

```text
5432/tcp -> 0.0.0.0:6000
```

In one sentence, say which host port you would connect to from a database client, and which port the database is using inside the container.

### P5 — Fix the broken command

A learner wants their app reachable at `http://localhost:3000`, but the app listens on port `3000` inside the container. Their command is wrong:

```bash
docker run -d --name app -p 3000:8080 my-app:1.0
```

Rewrite the `-p` value so it works, and explain the mistake in one sentence.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No networking *between* containers (that is U19 and U20).
- No DNS or service names (U20).
- No Compose `ports:` syntax (U22).
- No HTTPS/TLS setup or domain names.
- No firewall configuration on the host.

## Next unit

**U19 — Container networking basics** (what `localhost` means inside a container, and how containers are connected).
