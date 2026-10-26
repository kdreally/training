# U45 — Testing HTTP/APIs

**Phase 5**

## Where you are

Your app speaks HTTP. Tests should speak HTTP too: **request in, status/body out**.

## What you will be able to do

- Explain API/HTTP tests.
- Use a simple approach to hit your Express `app` without manual curl each time.
- Assert status codes and JSON bodies.
- Cover happy and error paths over HTTP.

## What you need already

- **U36** (`app` export), **U40**, **U34–U35**

## Time and energy

**90–130 minutes.**

## Why this exists

Unit tests can pass while routes are wrong. HTTP tests guard the **contract clients rely on**.

## Plain-language teaching

### API test

An **HTTP/API test** sends an HTTP request to your app and checks the response status, headers, and body.

### Approach A — `fetch` against running server

Start server, `fetch("http://localhost:3000/health")`, assert.  
Downside: port management, leftover processes.

### Approach B — inject requests into Express app (preferred learning path)

Use a helper library **or** Node’s test patterns with `http` + `app.listen` on ephemeral port.

**Lightweight pattern** (no extra package): listen on port `0` (OS picks free port), then fetch.

```javascript
const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");

function listen(app) {
  return new Promise(function (resolve) {
    const server = app.listen(0, function () {
      const { port } = server.address();
      resolve({ server, base: "http://127.0.0.1:" + port });
    });
  });
}

test("GET /health returns ok", async function () {
  const { server, base } = await listen(app);
  try {
    const res = await fetch(base + "/health");
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.deepEqual(body, { ok: true });
  } finally {
    server.close();
  }
});
```

Requires Node version with global `fetch` (modern LTS). Close server in `finally`.

### What to assert

- Status code
- Critical JSON fields
- Error messages you promised

### Reset state

If in-memory store is shared, call `reset()` in arrange — export reset from store.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| API test | HTTP contract test | |
| Ephemeral port | Port 0 → OS assigns | |
| Contract | Promised request/response behavior | |

## Worked example

Health test above; add POST /notes 201 and 400 tests similarly.

## Common errors

### Error: Not closing server

Hangs or port leaks. Use `finally`.

### Error: Shared state across tests

Reset store.

### Error: Asserting entire huge body unnecessarily

Assert what matters.

## Checkpoints

1. What is an API test?
2. Why export app without listen?
3. Why port 0?
4. Why finally close?

## Practice

### P1 — health + notes create + 400 over HTTP

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full browser e2e
- Load testing

## Next unit

**U46 — Test doubles (gentle)**
