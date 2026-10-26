# U17 — Built-in modules (Node standard library)

**Phase 2**

## Where you are

You can split local files. Node also ships **built-in modules** — tools included with Node, no download.

## What you will be able to do

- Explain built-in vs local vs (later) third-party packages.
- Use `path` to join paths safely.
- Use `fs` to read/write as review.
- Glance at `os` for one fact about the machine.

## What you need already

- **U15**, **U16**

## Time and energy

**50–80 minutes.**

## Why this exists

Before you install strangers’ code, learn what Node already gives you. That also prepares the “why packages” conversation: packages fill gaps the standard library does not cover.

## Plain-language teaching

### Three sources of modules

| Source | How you get it | Example |
|--------|----------------|---------|
| Local | You wrote it | `./tax.js` |
| Built-in | Comes with Node | `fs`, `path`, `http` |
| Third-party package | Downloaded later via package manager | Express (Phase 3–4) |

Built-ins are required **without** `./`:

```javascript
const fs = require("fs");
const path = require("path");
const os = require("os");
```

### Why `path` exists

Different operating systems write paths differently (`\` vs `/`). The `path` module builds paths portably.

```javascript
const path = require("path");
const full = path.join(__dirname, "data", "note.txt");
```

- `__dirname` — directory of the **current module file**
- `path.join` — joins segments with correct separators

Using `path.join` beats hand-stringing `"folder" + "/" + "file"` across OSes.

### `fs` review

```javascript
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "note.txt");
fs.writeFileSync(filePath, "saved by Node\n", "utf8");
const text = fs.readFileSync(filePath, "utf8");
console.log(text);
```

### `os` peek

```javascript
const os = require("os");
console.log(os.platform());
```

Prints something like `win32`, `darwin`, `linux`.

### `http` is coming

The `http` module can create servers. We wait until Phase 4 so networking concepts arrive first. Knowing it is built-in is enough now.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Standard library | Built-in modules | Not npm |
| `__dirname` | Folder of current file | Not cwd always |
| Portable path | Works across OSes | |
| Third-party | Outside Node core | Phase 3 |

## Worked example

See `fs` + `path` snippet above. Run from any cwd; file is created **next to the script** because of `__dirname`.

## Common errors

### Error: Assuming cwd === script folder

`fs.readFileSync("note.txt")` looks in **cwd**, not always script folder. Prefer `path.join(__dirname, "note.txt")`.

### Error: `require("fs.txt")` or wrong names

Built-in names are fixed: `fs`, `path`, `os`, `http`, …

## Checkpoints

1. Three module sources?
2. Why `path.join`?
3. What is `__dirname`?
4. Name one built-in you will use for servers later.

## Practice

### P1 — write/read beside script

Using `__dirname`.

### P2 — log platform

Use `os.platform()`.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full fs async API
- http server (Phase 4)
- Installing packages

## Next unit

**U18 — Asynchronous ideas when I/O forces them**
