# U31 — Minimal HTTP server with Node `http`

**Phase 4**

## Where you are

HTTP and JSON make sense. Now you **listen** and **respond** using Node’s built-in `http` module — **no Express yet**.

## What you will be able to do

- Create a server with `http.createServer`.
- Listen on a port.
- Respond to `GET /` with plain text and to `GET /health` with JSON.
- Stop the server (Ctrl+C) and explain the long-running process.

## What you need already

- **U17**, **U18** light, **U28–U30**
- Terminal skills

## Time and energy

**80–120 minutes.**

## Why this exists

Frameworks wrap this. If you can do it raw, frameworks become optional tools, not magic.

## Plain-language teaching

### A server process stays running

Unlike `node hello.js` that prints and exits, a server **keeps running** waiting for requests until you stop it.

### Minimal server

`server.js`:

```javascript
const http = require("http");

const server = http.createServer(function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Hello, server\n");
});

const PORT = 3000;
server.listen(PORT, function () {
  console.log("Listening on http://localhost:" + PORT);
});
```

Run:

```bash
node server.js
```

Leave it running. In a **second** terminal or browser:

- Visit `http://localhost:3000/`
- Or: `curl http://localhost:3000/`

You should see `Hello, server`.

Stop server: focus terminal → **Ctrl+C**.

### Request object (`req`)

Useful fields:

- `req.method` — `GET`, `POST`, …
- `req.url` — path + query string (e.g. `/health` or `/search?q=1`)

### Response object (`res`)

- `res.statusCode = 200`
- `res.setHeader(name, value)`
- `res.end(body)` — send body and finish

### Branch on path

```javascript
const http = require("http");

const server = http.createServer(function (req, res) {
  if (req.method === "GET" && req.url === "/health") {
    const body = JSON.stringify({ ok: true });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(body);
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Hello, server\n");
});

server.listen(3000, function () {
  console.log("Listening on http://localhost:3000");
});
```

### Why `return` after responding

Prevents accidentally sending twice in longer handlers.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| `createServer` | Make HTTP server object | |
| Listen | Bind port + accept | |
| `req` / `res` | Request / response objects | |
| `res.end` | Finish response | |
| Long-running process | Does not exit immediately | |

## Worked example

Hit `/health` → JSON `{"ok":true}`. Hit `/` → plain hello.

## Common errors

### Error: Port in use

Change `PORT` or stop the other process.

### Error: Browser shows forever loading

You never called `res.end`. Always end the response.

### Error: Comparing `req.url` with extras

`/health?x=1` is not `=== "/health"`. For now keep paths clean; parse later if needed.

## Checkpoints

1. Why doesn’t the process exit?
2. Role of `res.end`?
3. How do you test locally?
4. How do you stop the server?

## Practice

### P1 — plain server

### P2 — add `/health` JSON

### P3 — curl both routes

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Express
- POST bodies
- Routing libraries

## Next unit

**U32 — Multiple routes and 404**
