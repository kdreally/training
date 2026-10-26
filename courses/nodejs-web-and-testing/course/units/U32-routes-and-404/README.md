# U32 — Multiple routes, 404, separating handlers

**Phase 4**

## Where you are

One server works. Now: several routes, honest **404**, and cleaner structure.

## What you will be able to do

- Route multiple GET paths.
- Return `404` with a clear body for unknown paths.
- Extract handler functions for readability.
- Keep method checks explicit.

## What you need already

- **U31**

## Time and energy

**70–100 minutes.**

## Why this exists

Real APIs have many endpoints. Spaghetti `if` chains need structure before frameworks.

## Plain-language teaching

### Router idea (manual)

```javascript
function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(body);
}

function sendText(res, status, text) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(text);
}

const server = http.createServer(function (req, res) {
  const { method, url } = req;

  if (method === "GET" && url === "/") {
    return sendText(res, 200, "home\n");
  }
  if (method === "GET" && url === "/health") {
    return sendJson(res, 200, { ok: true });
  }
  if (method === "GET" && url === "/time") {
    return sendJson(res, 200, { now: Date.now() });
  }

  sendJson(res, 404, { error: "not found" });
});
```

### 404 is a success of design

Telling the client “unknown route” is correct behavior — not a crash.

### Method not allowed (optional awareness)

If path exists for GET but client uses POST, some APIs return `405`. You may use `404` simply for now, or start distinguishing.

### Separate modules (optional stretch)

`handlers.js` exports functions; `server.js` routes. Applies U16.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Route | Method + path mapping | |
| Handler | Function that handles a route | |
| 404 | Not found | Not always “server down” |
| Helper | Shared send utility | |

## Worked example

Unknown path `/nope` → `404` + `{"error":"not found"}`.

## Common errors

### Error: Falling through without response

Every path must end a response exactly once.

### Error: Typos in path strings

`/heath` vs `/health` — 404 is a clue.

## Checkpoints

1. Why return 404 JSON?
2. Why helpers like `sendJson`?
3. What must every request end with?
4. How would you add `/about`?

## Practice

### P1 — three routes + 404

### P2 — move helpers to another file (stretch)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Express Router
- Path parameters `/items/:id` (can approximate later)

## Next unit

**U33 — Why frameworks; introduce Express deliberately**
