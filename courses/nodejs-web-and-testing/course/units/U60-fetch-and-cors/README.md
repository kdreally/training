# U60 — `fetch` to your API; the CORS idea

**Phase 7 — Frontend**

## Where you are

Your form works **locally in the page**. Real apps load and save data through your **HTTP API**. The browser tool for that is **`fetch`**. Cross-origin rules (**CORS**) will appear; we explain them before they scare you.

## What you will be able to do

- Call `GET` and `POST` with `fetch` and JSON.
- Update the DOM from API responses.
- Explain why `file://` pages struggle to talk to `http://localhost`.
- Define CORS in plain language and what a beginner must configure on the server.

## What you need already

- **U59**, **U30**, **U34–U36** (running API)
- Browser DevTools Network tab awareness (light)

## Time and energy

**90–120 minutes.**

## Why this exists

A UI that cannot talk to your backend is a demo. Connecting them is the point of full-stack learning — and the setup for Playwright journeys later.

## Plain-language teaching

### `fetch` is browser HTTP

```javascript
const res = await fetch("http://localhost:3000/notes");
const data = await res.json();
```

- Sends an HTTP request from the **page’s JavaScript**
- Returns a **Response** object
- You check `res.ok` / `res.status`, then parse JSON

Prefer **async/await** here (you met async ideas in U18). Classic `.then` also works.

### GET list and render

```javascript
async function loadNotes() {
  const res = await fetch("/api/notes"); // path depends on how you serve
  if (!res.ok) {
    showError("Could not load notes");
    return;
  }
  const notes = await res.json();
  list.innerHTML = "";
  for (const note of notes) {
    const li = document.createElement("li");
    li.textContent = note.title;
    list.appendChild(li);
  }
}
```

Using relative URLs like `/api/notes` works when the **page and API share the same origin** (U61). Absolute `http://localhost:3000/...` works only if CORS allows it.

### POST create

```javascript
async function createNote(title) {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title })
  });
  if (!res.ok) {
    const err = await res.json().catch(function () { return {}; });
    showError(err.error || "Create failed");
    return null;
  }
  return res.json();
}
```

Same contract you tested with curl and API tests — now the browser is the client.

### Same origin vs cross origin

An **origin** is roughly: scheme + host + port.

| Page URL | API URL | Same origin? |
|----------|---------|--------------|
| `http://localhost:3000/` | `http://localhost:3000/api/notes` | Yes |
| `file:///C:/notes/index.html` | `http://localhost:3000/notes` | No |
| `http://localhost:5500/` | `http://localhost:3000/notes` | No (different ports) |

Browsers enforce the **same-origin policy** for safety: a random site should not freely read your bank’s API with your cookies.

### CORS (plain)

**CORS** (Cross-Origin Resource Sharing) is a browser + server agreement: the **server** can opt in to allow certain cross-origin browser requests by sending headers like:

```http
Access-Control-Allow-Origin: http://localhost:5500
```

If you open HTML as `file://` or from another port without CORS, `fetch` fails in the console with a CORS error. That is not you being bad at JS — it is the browser protecting users.

**Beginner strategy for this course (U61):** serve the HTML **from the same Express app** as the API so most calls are same-origin. Enable CORS only when you truly need two origins.

### Error handling in UI

- Network down → show a clear message
- `400` from validation → show server’s `error` field
- Never fail silently

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| `fetch` | Browser function to make HTTP requests | Not Node `http` module |
| Origin | scheme + host + port | Not full path |
| Same-origin policy | Browser safety rule | |
| CORS | Server opt-in for cross-origin browser calls | Not a substitute for auth |
| Relative URL | Path on current origin (`/api/notes`) | |

## Worked example

1. Start API on 3000.
2. Temporarily use full URL + CORS **or** jump to U61 same-origin setup.
3. On page load, `loadNotes()`.
4. On submit, `createNote` then `loadNotes()` again.

## Common errors

### Error: CORS message in console

**Meaning:** browser blocked cross-origin response.  
**Fix for course:** serve static + API together (U61), or add explicit CORS middleware with understanding.

### Error: `res.json()` on empty/error HTML body

Check status first; use try/catch around parse.

### Error: Forgetting `Content-Type: application/json` on POST

Server may not fill `req.body`.

### Error: Testing only with `file://`

Move to an HTTP origin early.

## Checkpoints

1. What does `fetch` return?
2. Why set JSON Content-Type on POST?
3. What is an origin?
4. Why same-origin serving is the beginner-friendly path?

## Practice

### P1 — GET list into the DOM (API running)

### P2 — POST from form; reload list

### P3 — Force a 400; show error text from JSON

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full CORS header matrix
- Cookies/auth CORS
- GraphQL

## Next unit

**U61 — Serving static frontend + API together**
