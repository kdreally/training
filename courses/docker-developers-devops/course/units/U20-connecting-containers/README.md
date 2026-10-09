# U20 — Connecting containers to each other

**Phase 4 — Data and networking**

## Where you are

In U19 you learned that containers get their own addresses and that `localhost` means the container itself. You also saw the limit of the default bridge: containers could reach each other by IP but not by name. This unit removes that limit. We create a **user-defined network**, attach an app and a database to it, and let them find each other by name — the pattern every real multi-service app depends on.

## What you will be able to do

- Create a network of your own and list it.
- Attach containers to it with `--network`.
- Reach one container from another by its **name**, and explain why this works here but not on the default bridge.
- Explain why `localhost` still fails between containers, even on a user-defined network.
- Attach an already-running container to a network with `docker network connect`.
- Decode a "bad address" failure and a "network has active endpoints" failure.

## What you need already

- **U19** — networks, container IPs, `localhost` inside vs outside, `docker network ls`.
- **U18** — ports (we still publish the app so *you* can reach it; containers reach each other without publishing).
- **U17** — volumes (the database example keeps its data in a named volume).
- **U09** — pulling images. We use `nginx`, `alpine`, and `postgres`.

## Time and energy

About **80–120 minutes**. This is the payoff unit of Phase 4: the moment names finally work. The database step can take a little longer because the image is larger. Take a break before the assignment; you have earned it.

## Why this exists

Real applications are rarely one container. A typical small app is a web process *and* a database. The web process must find the database, and it must keep finding it after restarts and renames. Hard-coding an IP address (U19) breaks the moment the database container gets a new address.

What you want to write in your app's configuration is a **name**: "the database is at `db`, port `5432`." This unit makes that name work. It is also the exact foundation Compose builds on (U21–U25), where service names are resolved the same way.

## Plain-language teaching

### The default bridge is not enough

Recall from U19: on the default `bridge` network, containers can reach each other by IP, but Docker does not publish their names into DNS. As soon as you want to say "connect to `db`" instead of "connect to `172.17.0.2`", you need a better network.

### User-defined networks

A **user-defined network** is a network *you* create with `docker network create`. It looks like the bridge network (it is also a bridge type), but it comes with one crucial upgrade: **Docker runs its own DNS server for it.** On that network, Docker registers each container's name so other containers can look the name up.

To put a container on your network, pass `--network <name>` to `docker run`. A container can be on several networks at once, but most of the time one is enough.

**Service name** (or **container name**) is the hostname you use to reach a container on a user-defined network. If the container is named `db`, other containers on the same network reach it at the address `db`.

### DNS, in one paragraph

**DNS** (Domain Name System) is the system that turns a human-friendly name into an IP address. On the public internet it turns `example.com` into a number. Docker's **embedded DNS** does the same thing inside a user-defined network: it turns `db` into the database container's current IP. You never see the IP; you use the name. This is why names survive restarts — the name stays `db` even when the IP changes behind it.

### localhost still means "me"

The biggest mistake people make once names work is going back to `localhost`. Names and `localhost` are not interchangeable.

- Container `app` connects to `db` → looks up the name `db` on the shared network → reaches the database container.
- Container `app` connects to `localhost` → reaches **container `app` itself** → connection refused, because `app` does not run a database.

The rule from U19 still holds: **`localhost` is always the container you are standing in.** Use the other container's name instead.

### Connecting a running container later

Sometimes a container is already running when you realize it needs to join a network. You do not have to destroy it. `docker network connect <network> <container>` attaches a running container to an additional network. Its counterpart, `docker network disconnect`, detaches it.

### A note on `-e` and `-v` in the database example

The database image needs two things we have seen or will see soon:

- `-v pgdata:/var/lib/postgresql/data` attaches a named volume so the database's data survives (U17).
- `-e POSTGRES_PASSWORD=devpass` sets an **environment variable** inside the container. An environment variable is a named setting (`POSTGRES_PASSWORD`) passed to a program, here telling PostgreSQL what password to use. `-e` is the flag that passes one in. We will study environment variables properly in U24; for now, read `-e` as "give the program this setting."

`devpass` is a throwaway local password for learning. Never put a real secret in a command you share.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| User-defined network | A network you create with `docker network create` | Not the same as the default `bridge` |
| Service name | The name other containers use to reach a container | Not a web address; no scheme or port included |
| Hostname | The name a program uses in a network address | Here it is the container's name |
| Embedded DNS | Docker's built-in name-to-IP lookup on user-defined networks | Not the public internet DNS |
| `--network` | `docker run` flag that joins a named network | Omitting it puts the container on the default bridge |
| `docker network connect` | Attach a running container to a network | Not needed when you pass `--network` at run time |
| `docker network disconnect` | Detach a container from a network | Does not stop the container |
| Endpoint | A container's attachment point on a network | Not a port |
| Network alias | An extra name for a container on a network | A convenience; the container name works by default |
| localhost / `127.0.0.1` | The container itself | Still never another container |

## Worked example

We build a small app-and-database scene. Then we connect a late container.

### Step 1 — Create your own network

**Purpose:** make a network that includes name resolution.

```bash
docker network create appnet
```

**Success output:** a long network id:

```text
c9d0e1f2a3b4...
```

**Decoded failure:**

```text
Error response from daemon: network with name appnet already exists
```

The network is already there from an earlier attempt. That is fine; you can reuse it or remove it with `docker network rm appnet` first (it must have no containers attached).

### Step 2 — Confirm it exists

```bash
docker network ls
```

**Expected output** (ids differ): a row such as

```text
NETWORK ID     NAME      DRIVER    SCOPE
c9d0e1f2a3b4   appnet    bridge    local
```

**Decoded failure:** if `appnet` is missing, Step 1 did not succeed. Re-run it and read the message.

### Step 3 — Run a server on your network

**Purpose:** give the app a service name to reach.

```bash
docker run -d --name web --network appnet nginx
```

`--network appnet` puts this container on the network we created, so its name `web` is registered in that network's DNS.

**Success output:** a container id.

**Decoded failure:**

```text
Error response from daemon: network appnet not found
```

means the network name is misspelled or does not exist. Check `docker network ls` and match the name exactly.

### Step 4 — Reach it by name

**Purpose:** the whole point of this unit.

```bash
docker run --rm --network appnet alpine wget -qO- http://web
```

The second container is also on `appnet`, so Docker's DNS resolves the name `web` to its current IP. No published port is needed; this traffic stays inside the private network.

**Expected output** (abbreviated):

```html
<!DOCTYPE html>
<html>
...
<title>Welcome to nginx!</title>
```

**Decoded failure:**

```text
wget: bad address 'web'
```

means the client container is **not on the same network** as `web`, so Docker has no DNS entry for that name. A very common cause is forgetting `--network appnet` on one of the two `docker run` commands. Check both containers with `docker network inspect appnet`.

### Step 5 — Prove `localhost` still fails

**Purpose:** keep the two ideas separate: shared network *is not* the same as `localhost`.

```bash
docker run --rm --network appnet alpine wget -qO- http://localhost
```

**Expected output:**

```text
wget: can't connect to remote host (127.0.0.1): Connection refused
```

**Decoded meaning:** `localhost` refers to the client container itself, not to `web`. Being on the same network does not change that. Use the name `web`, not `localhost`.

### Step 6 — Add a database and prove the name resolves

**Purpose:** model the real app + database pair.

```bash
docker run -d --name db --network appnet -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=devpass postgres:16-alpine
```

This starts PostgreSQL, keeps its data in the named volume `pgdata` (U17), and sets the database password (see the `-e` note above).

Give it a few seconds to start, then confirm the name resolves from another container on the same network:

```bash
docker run --rm --network appnet alpine ping -c 1 db
```

**Expected output** (address differs):

```text
PING db (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.1 ms
--- db ping statistics ---
1 packets transmitted, 1 packets received, 0% packet loss
```

The name `db` resolved to an address. An app container would connect to host `db`, port `5432` — written in configuration as `db:5432`, never as `localhost:5432`.

**Decoded failure:** `ping: bad address 'db'` again means the client is not on `appnet`. A `Connection refused` (rather than `bad address`) when using a database client would mean the name resolved but the database was not ready yet — wait a few seconds and retry.

### Step 7 — Look at the network's members

```bash
docker network inspect appnet
```

**Expected output** (abbreviated): under `"Containers"` you will see `web` and `db`, each with an `IPv4Address`:

```json
"Containers": {
    "....": { "Name": "web", "IPv4Address": "172.18.0.2/16" },
    "....": { "Name": "db",  "IPv4Address": "172.18.0.3/16" }
}
```

**Decoded failure:** if `Containers` is empty, nothing is attached — check the `--network` flags.

### Step 8 — Attach a running container with `docker network connect`

**Purpose:** add a container to a network without recreating it.

Start a container that is *not* on `appnet`:

```bash
docker run -d --name late nginx
```

From `appnet`, the name `late` does not resolve yet. Attach it:

```bash
docker network connect appnet late
```

**Success:** no output. Now, from a container on `appnet`, the name works:

```bash
docker run --rm --network appnet alpine ping -c 1 late
```

**Expected output:** a ping reply, as in Step 6.

**Decoded failure:**

```text
Error response from daemon: container ... is not connected to network appnet
```

would mean a typo in a name. In the other direction, `network appnet not found` means the network name is wrong.

To detach later:

```bash
docker network disconnect appnet late
```

### Cleanup

Remove the containers before removing the network:

```bash
docker rm -f web db late
docker network rm appnet
docker volume rm pgdata
```

**Decoded failure:**

```text
Error response from daemon: error while removing network: network appnet ... has active endpoints
```

means containers are still attached. Remove or disconnect them first.

## Common errors

### Error: one container forgot `--network`

**What happens:** `bad address 'web'` or `bad address 'db'`, even though the other container is clearly running.

**Fix:** Every container that must talk to the others has to be on the **same** network. Run `docker network inspect appnet` to see who is attached. Add missing containers with `docker network connect appnet <name>`.

### Error: reaching the database at `localhost`

**What happens:** `Connection refused`, because `localhost` is the app container itself.

**Fix:** Use the database container's name (`db`) as the host, and the correct port (`5432`). Configuration reads `db:5432`, not `localhost:5432`.

### Error: using the wrong hostname

**What happens:** `bad address 'postgres'` when the container is actually named `db`.

**Fix:** The hostname is the container's name (or a network alias), exactly as given at run time. Check with `docker network inspect appnet`.

### Error: removing a network that is still in use

**What happens:** `network appnet has active endpoints`.

**Fix:** Remove or disconnect the containers attached to it, then remove the network.

### Error: starting the database again and losing data

**What happens:** A learner removes the database container and starts a new one with no volume, then finds the data gone.

**Fix:** Attach the same named volume, as in Step 6, so the data lives outside the container (U17). The name and network are separate concerns: the network is how containers find each other; the volume is how data survives.

## Checkpoints

Answer in your own words before the assignment:

1. What is the key difference between the default `bridge` network and a user-defined network?
2. If a database container is named `db` and both it and the app are on the same user-defined network, what hostname does the app use to reach it?
3. Why does `localhost` still fail between containers on a user-defined network?
4. Which command attaches an already-running container to a network?
5. Why does a name survive a container restart, while a hard-coded IP might not?

If you can answer those, you are ready for the exercises.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Predict then run

Predict what this prints when `web` and the client are both on a user-defined network `appnet`:

```bash
docker run --rm --network appnet alpine ping -c 1 web
```

Then run it and compare. Then run the same command *without* `--network appnet` and compare again.

### P2 — Change one value

Recreate the server with the name `site` on `appnet`. Change only the name. Reach it by name from another `appnet` container and confirm.

### P3 — Fill in the blank

Complete the command so the client joins the `appnet` network and reaches `db`:

```bash
docker run --rm ____ appnet alpine wget -qO- http://____:5432
```

(The database will not return a web page; the point is that the **name resolves**. Expect a `Connection refused` or a protocol error from PostgreSQL, not `bad address`.)

### P4 — Read an inspect

Run `docker network inspect appnet`. List every container under `Containers`, with its `IPv4Address`. Explain in one sentence how Docker turns the name `db` into that address.

### P5 — Fix the broken command

An app and a database both need to talk to each other. The learner's setup is:

```bash
docker network create appnet
docker run -d --name db --network appnet -e POSTGRES_PASSWORD=devpass postgres:16-alpine
docker run -d --name app --network webnet my-app:1.0
```

The app cannot reach `db`. In two sentences, name the problem and the exact fix.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No Compose (U21–U25). Compose creates the network and the names for you, using the same ideas.
- No environment variables deep dive (U24); `-e` is introduced only as far as the database example needs.
- No database client setup or SQL. We prove reachability, not queries.
- No custom DNS servers, network aliases in depth, or multiple network attachments beyond the one `connect` example.
- No cross-machine or overlay networking.

## Next unit

**U21 — Why Compose exists** (one file instead of several long `docker run` commands).
