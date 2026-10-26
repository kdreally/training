# U30 — JSON as a common API data format

**Phase 4**

## Where you are

HTTP can carry many body types. APIs often use **JSON**.

## What you will be able to do

- Explain JSON vs JavaScript object.
- Read/write simple JSON text.
- Use `JSON.parse` and `JSON.stringify` in Node.
- Set expectations for `Content-Type: application/json`.

## What you need already

- **U08** objects/arrays, **U29**

## Time and energy

**50–80 minutes.**

## Why this exists

You will send and receive JSON constantly. Parse errors will happen. Meet them now.

## Plain-language teaching

### JSON

**JSON** (JavaScript Object Notation) is a **text format** for structured data. Language-independent; very common on the web.

Example text:

```json
{
  "title": "Dune",
  "pages": 412,
  "tags": ["sf", "classic"]
}
```

### JSON vs JS object

| JS object in code | JSON text |
|-------------------|-----------|
| Can have functions, undefined, comments (in JS files) | No functions; no comments; keys in double quotes |
| Lives in memory as values | Lives as a string on the wire/disk |

### Convert in Node

```javascript
const obj = { ok: true, n: 3 };
const text = JSON.stringify(obj);
console.log(text); // '{"ok":true,"n":3}'

const back = JSON.parse(text);
console.log(back.n); // 3
```

- **`JSON.stringify`** — value → JSON string  
- **`JSON.parse`** — JSON string → value  

Invalid JSON → `JSON.parse` throws → handle carefully (U09).

### Content-Type

When sending JSON bodies, servers/clients often set:

```text
Content-Type: application/json
```

So the other side knows how to interpret the body.

### Types in JSON

Objects, arrays, strings, numbers, booleans, `null`.  
No `undefined`. No dates as a special type (usually ISO strings).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| JSON | Text data format | Not identical to JS |
| stringify | To JSON text | |
| parse | From JSON text | |
| Content-Type | Header declaring body format | |

## Worked example

```javascript
const payload = JSON.stringify({ message: "hi" });
const data = JSON.parse(payload);
console.log(data.message);
```

## Common errors

### Error: `JSON.parse([object Object])`

You stringified poorly or concatenated an object. Log types.

### Error: Trailing commas in JSON

```json
{ "a": 1, }
```

Invalid JSON. JS objects allow trailing commas; JSON does not.

### Error: Single quotes in JSON

JSON strings use double quotes.

## Checkpoints

1. JSON vs JS object?
2. What does parse do?
3. Why Content-Type matters?
4. Name one JSON limitation vs JS.

## Practice

### P1 — stringify/parse round trip

### P2 — fix invalid JSON samples on paper

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- JSON Schema
- Streaming JSON

## Next unit

**U31 — Minimal HTTP server with Node `http`**
