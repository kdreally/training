# U14 — Running a `.js` file with Node

**Phase 2**

## Where you are

Terminal navigation works. Now: turn a text file into a **running program**.

## What you will be able to do

- Create a `.js` file in an editor.
- Run it with `node filename.js` from the correct folder.
- Use `console.log` to display values.
- Explain entry file / running vs editing.

## What you need already

- **U12**, **U13**
- Phase 1 JS reading skill

## Time and energy

**50–80 minutes.**

## Why this exists

Paper JS is practice. Execution is reality. This is the bridge.

## Plain-language teaching

### Edit vs run

| Action | Tool | Result |
|--------|------|--------|
| Edit | Text editor | File on disk changes |
| Run | `node file.js` | Node executes instructions |

Saving is not running. Running is not saving.

### Create a file

1. Open your editor.
2. Create folder `atlrn-work/u14` (terminal or editor).
3. New file `hello.js` with:

```javascript
console.log("Hello from Node");
```

4. Save.

### `console.log`

`console.log(...)` tells Node to **print** a value to the terminal (standard output).  
It is how beginners **see** results. Later you still use it for debugging.

### Run it

In the terminal:

```bash
cd path/to/atlrn-work/u14
node hello.js
```

Expected output:

```text
Hello from Node
```

### What Node did

1. Read the text of `hello.js`.
2. Parsed JS.
3. Executed statements top to bottom.
4. Printed to your terminal.
5. Exited (program finished).

### Multiple lines

```javascript
let name = "Ada";
let message = "Hello, " + name;
console.log(message);
console.log(2 + 2);
```

### Errors when running

If you see a stack trace, use **U09**. Fix file, save, run again.

### Naming

Use `.js` extension. Avoid spaces in filenames: `hello.js` not `hello world.js`.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Source file | Your `.js` text file | |
| Execute / run | Node carries out the file | |
| Standard output | Normal print stream to terminal | |
| Entry file | File you pass to `node` to start | Later projects may have one main entry |
| `console.log` | Print helper | Not the same as `return` |

## Worked example

`greet.js`:

```javascript
function greet(name) {
  return "Hi, " + name;
}
console.log(greet("Lee"));
```

```bash
node greet.js
```

```text
Hi, Lee
```

## Common errors

### Error: `Cannot find module` / cannot open file

Wrong directory or filename typo. `ls`/`dir`, `cd`, retry.

### Error: Running in the editor’s “output” without Node

Some editors run differently. This course standardizes on terminal: `node file.js`.

### Error: Forgetting to save

You run old content. Save first.

## Checkpoints

1. Difference between saving and running?
2. Full command to run `app.js` in the current folder?
3. What does `console.log` do?
4. Why does cwd matter?

## Practice

### P1 — hello

Create and run `hello.js`.

### P2 — math

File that logs `sum` of 17 and 25 using a function.

### P3 — intentional error

Remove a `)` temporarily, run, read error, fix.

## Assignment

See [assignment.md](./assignment.md) and `fixtures` instructions inside it.

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- npm projects
- modules across files (U16)
- servers

## Next unit

**U15 — Input and output basics**
