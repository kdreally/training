# U28 — Networks for programmers: address, port, listen

**Phase 4**

## Where you are

Client/server roles exist. Now: **where** a server can be reached on a machine.

## What you will be able to do

- Explain host, localhost, IP address at beginner level.
- Explain what a **port** is.
- Explain what it means to **listen** on a port.
- Read a URL piece: `http://localhost:3000/path`

## What you need already

- **U27**

## Time and energy

**45–70 minutes.**

## Why this exists

`localhost:3000` looks like magic runes. It is an address. We decode it.

## Plain-language teaching

### Host

A **host** is a computer on a network. It may have an **IP address** (numeric network address).

### localhost

**localhost** means “this same computer.”  
IP often associated: `127.0.0.1`.

When learning, client and server both run on your machine: browser or `curl` → `localhost`.

### Port

A computer has many possible **ports** — numbered doors for network conversations.

Examples you will see:

| Port | Common association |
|------|---------------------|
| 80 | HTTP default |
| 443 | HTTPS default |
| 3000, 4000, 8080 | Dev servers (convention, not law) |

Your Node app **listens** on a chosen port, e.g. 3000.

Only one process can listen on a given port at a time (generally). “Port in use” means another program is already there.

### Listen

When a server **listens**, it waits for incoming connections on host+port.

Until it listens, clients cannot connect to that service.

### URL anatomy (HTTP)

```text
http://localhost:3000/health
│      │         │    │
│      │         │    └─ path
│      │         └─ port
│      └─ host
└─ scheme (protocol)
```

### Firewall awareness

Corporate networks may block ports. Localhost learning is usually fine.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| localhost | This machine | Not “the internet” |
| IP address | Numeric host address | |
| Port | Numbered endpoint on a host | Not USB port |
| Listen | Wait for connections | |
| Path | Part of URL after host/port | |

## Worked example

Server listens on `3000`. Client requests `http://127.0.0.1:3000/`.  
Host matches local machine; port matches listener; path `/` is the resource path.

## Common errors

### Error: Confusing port with path

`/3000` is a path. `:3000` is a port.

### Error: Two apps on same port

EADDRINUSE style errors — stop the other process or choose another port.

## Checkpoints

1. What is localhost?
2. What is a port?
3. What does listen mean?
4. Parse `http://localhost:4000/api/books`.

## Practice

### P1 — Parse three URLs into scheme/host/port/path.

### P2 — Explain “port 3000 already in use” to a beginner.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- DNS deep dive
- HTTPS certificates
- Writing listen code (next HTTP units)

## Next unit

**U29 — HTTP fundamentals**
