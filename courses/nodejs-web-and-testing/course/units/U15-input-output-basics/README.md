# U15 — Input and output basics

**Phase 2**

## Where you are

You can print. Now: **outputs**, **command-line arguments** as simple input, and a first look at **reading a file**.

## What you will be able to do

- Explain stdin/stdout at a beginner level.
- Read `process.argv` for simple CLI args.
- Write a tiny program that takes a name argument and greets.
- Read a text file with `fs.readFileSync` (blocking, simple).

## What you need already

- **U14**

## Time and energy

**70–100 minutes.**

## Why this exists

Programs that only hardcode data are demos. Real programs take **input** and produce **output**. Servers later take network input; start smaller.

## Plain-language teaching

### Output you already know

`console.log(value)` writes a line to **standard output** (stdout) — usually your terminal.

### Standard streams (picture)

| Stream | Role |
|--------|------|
| stdin | Input into the program |
| stdout | Normal output |
| stderr | Error output (also often terminal) |

You need not master all three now. Know that printing is stdout.

### Command-line arguments

When you run:

```bash
node greet.js Ada
```

Node makes arguments available on **`process.argv`** — an **array of strings**.

Typical shape:

| Index | Meaning |
|-------|---------|
| `0` | path to node |
| `1` | path to your script |
| `2` | first user argument |
| `3` | second user argument… |

So `Ada` is often `process.argv[2]`.

```javascript
const name = process.argv[2];
console.log("Hello, " + name);
```

If missing:

```javascript
const name = process.argv[2];
if (name === undefined) {
  console.log("Please provide a name");
} else {
  console.log("Hello, " + name);
}
```

### Why arguments matter

They let you reuse one program with different inputs without editing the file each time — a tiny CLI.

### Reading a file (sync, honest simplicity)

Node can talk to the operating system. The built-in **`fs`** module (file system) can read files.

```javascript
const fs = require("fs");
const text = fs.readFileSync("note.txt", "utf8");
console.log(text);
```

- `require("fs")` loads Node’s file system module (modules: U16–U17 deepen this).
- `readFileSync` reads the whole file and returns a string when using `"utf8"`.
- **Sync** means “wait until finished before continuing” — simple for learning; async comes when needed.

Run from the folder that contains `note.txt`.

### Writing a file (optional peek)

```javascript
fs.writeFileSync("out.txt", "saved\n", "utf8");
```

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| stdout | Normal program output | |
| Argument (CLI) | Value after the command | Not function argument only |
| `process.argv` | Array of CLI args | Indexes 0–1 are special |
| `fs` | File system module | |
| utf8 | Text encoding for files | |
| Sync | Wait for completion | Opposite of async |

## Worked example

`greet.js`:

```javascript
const name = process.argv[2];
if (name === undefined) {
  console.log("Usage: node greet.js <name>");
} else {
  console.log("Hello, " + name);
}
```

```bash
node greet.js Sam
```

```text
Hello, Sam
```

## Common errors

### Error: `undefined` name

Forgot argument or wrong index (used `[1]` instead of `[2]`).

### Error: `ENOENT` file not found

Wrong cwd or filename. Check `ls` and path.

### Error: Treating numbers from argv as numbers automatically

`process.argv` values are **strings**. `"2" + "2"` is `"22"`. Convert later with `Number(...)` when needed.

## Checkpoints

1. What is usually in `process.argv[2]`?
2. Why are CLI args useful?
3. What does `readFileSync` do?
4. Why does cwd matter for file reads?

## Practice

### P1 — greet

Build `greet.js` as above.

### P2 — sum args

`node sum.js 3 4` logs `7` (convert with `Number`).

### P3 — file

Create `note.txt`, write a program that prints its contents.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Interactive prompts libraries
- Full async fs
- HTTP

## Next unit

**U16 — Modules: splitting code across files**
