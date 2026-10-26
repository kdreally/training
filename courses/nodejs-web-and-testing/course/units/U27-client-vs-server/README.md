# U27 — Client vs server; what “backend” means here

**Phase 4 — Backend web applications**

## Where you are

Tooling foundation is in place. Now web architecture words — **before** writing servers.

## What you will be able to do

- Define client, server, backend, frontend in course terms.
- Describe a request/response conversation in plain language.
- Explain why this course focuses on the server side.
- Draw a simple diagram of browser → server.

## What you need already

- **U11**, Phase 3 complete recommended

## Time and energy

**40–60 minutes.**

## Why this exists

“Backend developer” is a job title, not a definition. We define the **roles in a conversation**.

## Plain-language teaching

### Two roles

| Role | Job |
|------|-----|
| **Client** | Asks for something; starts a request (browser, mobile app, another server) |
| **Server** | Listens; handles requests; sends responses |

### Frontend vs backend (course usage)

| Term | Meaning here |
|------|----------------|
| **Frontend** | Client-side UI (pages, buttons) — mostly out of path |
| **Backend** | Server-side logic and data access — **our focus** |

A **backend web application** is a server program that speaks a web protocol (usually **HTTP**) to clients.

### The conversation

1. Client sends a **request**: “GET me `/health`.”
2. Server work: maybe read memory/DB, build answer.
3. Server sends a **response**: “200 OK” + body `{"ok":true}`.

You will implement the server side of this conversation.

### Many clients, one server program

Your Node process can handle many requests over time (async helps). Clients come and go.

### APIs

An **API** (Application Programming Interface) here often means: the set of HTTP requests your server understands and the responses it promises.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Client | Requester | Not always a human |
| Server | Listener/responder | Not always a separate physical machine — can be your laptop |
| Backend | Server-side app | |
| Request / response | Message pair | |
| API | Defined interface for program talk | Not only “third-party SaaS” |

## Worked example — restaurant analogy (and its limit)

Client = diner ordering. Server = kitchen.  
**Limit:** HTTP is more rigid and less intelligent than a waiter. Analogies help; protocol details (U29) matter more.

## Common errors

### Error: Thinking server means “cloud only”

Your laptop can run a server on `localhost` for learning.

### Error: Thinking backend means only database

Backend includes logic, validation, HTTP shaping — DB is optional/later.

## Checkpoints

1. Client vs server?
2. What is backend in this course?
3. Steps of request/response?
4. Can your PC be a server?

## Practice

### P1 — Diagram

ASCII diagram of phone app → your Node API → response JSON.

### P2 — Label

For online banking: which parts client, which backend? (guessing ok; reason)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Coding a server yet
- HTTP field details (soon)

## Next unit

**U28 — Address, port, listen**
