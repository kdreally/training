# U19 — Container networking basics

**Phase 4 — Data and networking**

## Where you are

You can keep data (U17) and open a door to the outside world (U18). Now we look *inside* the container world: how containers are connected to each other, what an address means there, and why the word `localhost` means something different depending on where you are standing. This unit introduces the default **bridge network**; U20 builds on it to connect your own containers by name.

## What you will be able to do

- Name the networks Docker creates by default and list them with `docker network ls`.
- Explain what an IP address means for a container and find a container's IP.
- Reach one container from another **by IP** on the shared default network.
- Explain the classic confusion: `localhost` inside a container is the container itself, not your computer or another container.
- State why containers on the default network usually cannot reach each other **by name**, and that a network you create yourself changes that (U20).

## What you need already

- **U10** — container lifecycle (`docker run`, `docker ps`, `docker rm`, `docker exec`).
- **U18** — ports and the meaning of `localhost` / `127.0.0.1` from the outside.
- **U09** — pulling images. We use `nginx` again, and `alpine` from U17.

## Time and energy

About **70–100 minutes**. This is the unit where the word "network" stops being scary and becomes a small set of clear facts. Go slowly through the `localhost` part; it trips up experienced people too.

## Why this exists

The moment your app needs a second container, you must answer: "how does the app find the database?" The naive answer is `localhost`, and it fails every time. To understand why, you need a mental picture of where a container lives and what an address means inside it.

This unit builds that picture with real, visible commands. It also prepares you for U20, where two containers will finally talk to each other by name — the thing every real multi-service app depends on.

## Plain-language teaching

### A network is a group of things that can talk

A **network** is a set of machines (or containers) that can exchange data with each other. To talk, each member needs an address.

An **IP address** is a numeric address, such as `172.17.0.2`. It answers "which member of the network am I?" On the public internet, addresses look like `142.250.x.x`. Inside Docker's private networks, they are usually in ranges like `172.17.0.0/16` that never leave your computer.

A **subnet** is a range of addresses that belong together, written with a slash, such as `172.17.0.0/16`. Everything in that range is "on the same network."

### Docker creates networks for you

When Docker is installed, it creates a few networks. You can see them:

| Name | What it is |
|------|-----------|
| `bridge` | The **default** network. Any container you start without `--network` joins this one. |
| `host` | Removes isolation: the container shares your computer's network directly (Linux mainly). |
| `none` | No network at all. The container is cut off from everything. |

The one you must understand first is **`bridge`**. A **bridge network** is a private, internal network that Docker creates and manages. Containers attached to the same bridge can talk to each other, but nothing outside that bridge can reach them unless you publish a port (U18).

You do not create the `bridge` network; it exists already.

### Every container gets its own address

When a container joins the `bridge` network, Docker gives it its own IP address, such as `172.17.0.2`. Because every container on that network has an address, they can reach each other **by IP**.

This is the first honest answer to "how do containers find each other?": by IP address, if they share a network.

### Names vs addresses (and the catch)

IP addresses are hard to remember and can change every time you restart a container. Humans prefer names. Docker can answer "what is the IP for the name `db`?" — a service called **DNS** (Domain Name System), the same system that turns `example.com` into an address on the internet.

Here is the catch, and it is the whole reason U20 exists: **on the default `bridge` network, Docker does not give containers a DNS entry for each other's names.** Two containers on the default bridge can talk by IP, but asking for the other by name typically fails. When you create a network of your own (U20), Docker adds that name resolution. Many people meet this as a confusing `bad address` error, which this unit shows you on purpose.

So the accurate summary is:

- **Default bridge:** containers can reach each other by **IP**; names usually do **not** resolve.
- **A network you create:** containers can reach each other by **name** as well (U20).

### localhost inside vs outside

Remember from U18 that **`localhost`** (numeric form `127.0.0.1`) means "this same computer." The classic confusion is that "this same computer" depends on where you are standing.

- On **your laptop**, `localhost` is your laptop.
- Inside **container A**, `localhost` is container A.
- Inside **container B**, `localhost` is container B.

So a web app in container A that tries to reach a database at `localhost` is asking a question about *itself*, not about the database container. The database is not inside container A, so the connection is refused. To reach container B, container A must use B's IP address (or, on a user-defined network, B's name — U20).

Think of `localhost` as the word "home." Saying "it's at home" means a different building depending on who says it.

### Many containers, many views of the network

Each container has its own isolated network space (sometimes called a **network namespace**). That is why two containers can each have something listening on port 80 without clashing (U18). It is also why their idea of `localhost` differs. Isolation is not a bug; it is exactly what keeps containers predictable.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Network | A group of machines/containers that can exchange data | Not the same as the internet |
| Bridge network | A private, Docker-managed network containers join | The default one already exists; you do not create `bridge` |
| Driver | The piece of Docker that implements a network type (`bridge`, `host`, `null`) | Not a hardware device |
| IP address | A numeric address of one member on a network | Not a name, and not a port |
| Subnet | A range of addresses that belong together, e.g. `172.17.0.0/16` | Written with a slash |
| DNS | The system that turns a name into an IP address | Docker provides it on user-defined networks (U20) |
| Name resolution | Looking up the IP address for a name | Does not work by default on the `bridge` network |
| localhost / `127.0.0.1` | "This same computer" | Means the container itself when used inside one |
| Network namespace | A container's private view of the network | Why ports and localhost are isolated |
| `--network` | The `docker run` flag that puts a container on a named network | Defaults to `bridge` when omitted |

## Worked example

We use `nginx` for a small server and `alpine` for a small client. Both download quickly.

### Step 1 — List the networks Docker made

**Purpose:** see what already exists before changing anything.

```bash
docker network ls
```

**Expected output** (ids differ):

```text
NETWORK ID     NAME      DRIVER    SCOPE
9f1c...        bridge    bridge    local
7a2b...        host      host      local
3d4e...        none      null      local
```

The `bridge` row is the default network we will use.

**Decoded failure:** `Cannot connect to the Docker daemon` means Docker Desktop or the Docker service is not running (U06). Start it and try again.

### Step 2 — Look inside the default network

**Purpose:** see the address range and which containers are attached.

```bash
docker network inspect bridge
```

**Expected output** (abbreviated):

```json
[
    {
        "Name": "bridge",
        "Driver": "bridge",
        "IPAM": {
            "Config": [
                { "Subnet": "172.17.0.0/16" }
            ]
        },
        "Containers": {}
    }
]
```

`Subnet` is the address range. `Containers` is empty because nothing is running yet.

**Decoded failure:** `Error: No such network: bridge` is very unusual; it would mean the default network was removed. Recreate it with `docker network create bridge` (or restart Docker).

### Step 3 — Start two containers on the default network

**Purpose:** give ourselves two members of the same network.

```bash
docker run -d --name site1 nginx
docker run -d --name site2 nginx
```

We did not pass `--network`, so both join `bridge` automatically.

**Success:** each command prints a container id.

**Decoded failure:** if you see `Conflict. The container name "/site1" is already in use`, a container with that name already exists. Remove it with `docker rm -f site1` and try again.

### Step 4 — Find a container's IP address

**Purpose:** learn the address we will connect to.

```bash
docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" site1
```

**Expected output** (yours may differ):

```text
172.17.0.2
```

The `-f` flag formats the output. The template walks every network the container is on and prints its `IPAddress`. Write this address down; it is your "destination."

**Decoded failure:** if the output is blank, the container is not attached to any network, or the name is wrong. Check `docker ps` and re-run Step 3.

### Step 5 — Reach the other container by IP

**Purpose:** prove containers on one network can talk.

Replace `172.17.0.2` with the address you found in Step 4:

```bash
docker run --rm alpine wget -qO- http://172.17.0.2
```

`wget` fetches a web page. `-q` keeps it quiet; `-O-` sends the page to your screen instead of a file.

**Expected output** (abbreviated): the nginx welcome page.

```html
<!DOCTYPE html>
<html>
...
<title>Welcome to nginx!</title>
```

That is a container-to-container request working by IP address, with no published port needed. Container-to-container traffic stays inside Docker's private network.

**Decoded failure:** `wget: can't connect to remote host (172.17.0.2): Connection refused` means the address is wrong or belongs to a container that is not running the server. Re-run Step 4 and confirm `site1` is up with `docker ps`.

### Step 6 — Watch a name lookup fail on the default bridge

**Purpose:** meet the limitation this unit warns about.

```bash
docker run --rm alpine ping -c 1 site2
```

**Expected output:**

```text
ping: bad address 'site2'
```

**Decoded meaning:** the name `site2` was not found. On the default `bridge` network Docker does not publish container names into DNS, so the name cannot be turned into an address. This is not your mistake; it is how the default network behaves. U20 fixes it.

**Decoded failure:** if `ping` instead reports `1 packets transmitted, 1 packets received`, you are on a network that does provide name resolution (for example, a user-defined network from U20). That is also a correct outcome — note which network you were on.

### Step 7 — Meet the localhost confusion

**Purpose:** see that `localhost` points at the client container itself, not at `site1`.

```bash
docker run --rm alpine wget -qO- http://localhost
```

**Expected output:**

```text
wget: can't connect to remote host (127.0.0.1): Connection refused
```

**Decoded meaning:** inside this short-lived `alpine` container, `localhost` is that alpine container. Nothing is listening on its port 80, so the connection is refused. It is not looking at `site1` at all. To reach `site1`, use its IP (Step 5) or, later, its name on a user-defined network (U20).

### Cleanup

```bash
docker rm -f site1 site2
```

## Common errors

### Error: using `localhost` to reach another container

**What happens:** `connection refused`, even though the other container is running fine.

**Fix:** Inside a container, `localhost` is that container. Use the other container's IP (this unit) or its name on a user-defined network (U20).

### Error: using a container name on the default bridge

**What happens:** `ping: bad address 'site2'` or `wget: bad address`.

**Fix:** Use the IP address on the default bridge, or create your own network so names resolve (U20).

### Error: the IP changed after a restart

**What happens:** A container restarts, gets a new IP, and your hard-coded address stops working.

**Fix:** This is exactly why names are better. IPs are not stable across restarts; names on a user-defined network are. U20 shows the pattern that avoids hard-coding IPs.

### Error: expecting published ports between containers

**What happens:** A learner publishes ports and tries to have one container reach another through the host.

**Fix:** Containers on the same network reach each other directly by internal IP; publishing (U18) is for reaching a container from *outside* Docker, not for container-to-container traffic.

## Checkpoints

Answer in your own words before the assignment:

1. Name the three networks `docker network ls` shows by default and say what the `bridge` network is for.
2. Can two containers on the default `bridge` network reach each other by IP? By name? Explain both.
3. What does `localhost` mean inside a container, and why does that cause a confusing failure?
4. Which command finds a container's IP address?
5. Why is using an IP address fragile compared with using a name?

If you can answer those, you are ready for the exercises.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Predict then run

Predict the output of:

```bash
docker run --rm alpine ping -c 1 site1
```

while `site1` is running on the **default bridge**. Then run it and compare. Explain the result in one sentence.

### P2 — Change one value

Start a third container named `site3` on the default bridge. Find its IP with `docker inspect`, then reach it by IP from a throwaway alpine container. Change only the name and address.

### P3 — Read an inspect

Run `docker network inspect bridge` while two containers are running. In your notes, write which containers appear under `Containers` and one of their `IPv4Address` values.

### P4 — Explain the confusion

Write a short note (3–5 lines) you could give a teammate explaining why `http://localhost:5432` inside an app container does not reach a database container. Use the words *namespace*, *localhost*, and *name*.

### P5 — Fix the broken command

A learner wants a temporary client container to reach `site1` by name on the default bridge:

```bash
docker run --rm alpine ping -c 1 site1
```

They get `bad address`. Explain in two sentences why, and say what U20 will let them do instead. (Do not fix it here; explain only.)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No creating your own networks yet (that is U20).
- No connecting two different services (app + database) yet (U20).
- No Compose networking (U22).
- No DNS configuration or custom hostnames.
- No `--network host` deep dive (mentioned only as an existing default).
- No firewalls or cross-machine networking.

## Next unit

**U20 — Connecting containers to each other** (create a network, use service names, and make `localhost` mistakes impossible).
