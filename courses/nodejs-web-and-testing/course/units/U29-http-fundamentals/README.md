# U29 — HTTP fundamentals

**Phase 4**

## Where you are

You know hosts and ports. **HTTP** is the conversation rules most web backends speak.

## What you will be able to do

- Define HTTP as request/response protocol.
- Identify method, path, headers, body, status code.
- Explain common methods GET/POST and status families 2xx/4xx/5xx.
- Read a simple raw HTTP example.

## What you need already

- **U27**, **U28**

## Time and energy

**70–100 minutes.**

## Why this exists

Frameworks hide HTTP. Hiding without understanding creates helpless developers. We learn the conversation first.

## Plain-language teaching

### HTTP is a protocol

A **protocol** is an agreed set of rules for communication.  
**HTTP** (Hypertext Transfer Protocol) defines how clients and servers exchange **requests** and **responses**.

### Request parts

| Part | Meaning | Example |
|------|---------|---------|
| **Method** | Verb: what kind of action | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| **Path** | Which resource | `/api/books`, `/health` |
| **Headers** | Metadata lines | `Content-Type: application/json` |
| **Body** | Optional payload | JSON for POST |

**GET** usually means “read/fetch.”  
**POST** usually means “submit/create.”  
Conventions, widely followed.

### Response parts

| Part | Meaning | Example |
|------|---------|---------|
| **Status code** | Numeric outcome | `200`, `404`, `500` |
| **Headers** | Metadata | `Content-Type: application/json` |
| **Body** | Optional payload | `{"ok":true}` |

### Status code families

| Range | Meaning |
|-------|---------|
| **2xx** | Success (`200 OK`, `201 Created`) |
| **3xx** | Redirect (awareness) |
| **4xx** | Client problem (`400` bad request, `404` not found, `401` unauthorized) |
| **5xx** | Server problem (`500` internal error) |

### Example exchange (conceptual)

Request:

```http
GET /health HTTP/1.1
Host: localhost:3000
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"ok":true}
```

### Idempotent idea (light)

Repeating a GET should not change server state (ideally). POST often does create/change. Useful when designing APIs.

### HTTPS

HTTPS is HTTP over an encrypted channel. Learning servers often use plain HTTP on localhost. Production uses HTTPS. Details later if ever needed.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Protocol | Agreed rules | |
| Method / verb | GET/POST/… | Not JS method only |
| Status code | Numeric result | Not your grade |
| Header | Metadata field | |
| Body | Payload | |
| Resource | Thing identified by path | |

## Worked example — classify

- Browser opens `http://localhost:3000/health` → typically **GET** `/health`
- Submitting JSON to create a note → often **POST** `/notes` with body
- Missing route → **404**
- Your code throws unhandled → often **500** if you map it that way

## Common errors

### Error: Putting sensitive data in GET URLs carelessly

URLs get logged; prefer bodies/headers for secrets (and better auth later).

### Error: Using 200 for every failure

Clients need status codes. Prefer honest 4xx/5xx.

## Checkpoints

1. Parts of a request?
2. Parts of a response?
3. Meaning of 404 vs 500?
4. GET vs POST typical use?

## Practice

### P1 — Status matching

Match scenarios to codes: success JSON, unknown path, invalid JSON body, server crash.

### P2 — Design

List 3 routes for a tiny notes API (method + path + purpose).

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Coding server
- All HTTP headers
- HTTP/2 details

## Next unit

**U30 — JSON for APIs**
