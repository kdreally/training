# U16 — Modules: splitting code across files

**Phase 2**

## Where you are

One file works until it hurts. **Modules** split programs into files with clear borders.

## What you will be able to do

- Explain why modules exist.
- Export functions from one file; import/require them in another.
- Build a tiny two-file program and run the entry file.
- Prefer one idea per module at beginner scale.

## What you need already

- **U14**, **U15**
- **U07** functions

## Time and energy

**70–100 minutes.**

## Why this exists

Real apps are not one 2,000-line file. Modules are how teams (and future you) stay sane. Tests later import your modules.

## Plain-language teaching

### What a module is

A **module** is a file that intentionally **exports** some values (usually functions/objects) for other files to **import**.

### Why bother

- Smaller files
- Reuse
- Clear ownership (“math stuff lives here”)
- Testing pieces in isolation later

### Two systems (awareness)

Node historically used **CommonJS**: `require` / `module.exports`.  
Modern Node also supports **ES modules**: `import` / `export`.

**This course uses CommonJS first** (`require` / `module.exports`) because it works with zero config in classic Node setups. ES modules appear later if needed.

### Exporting

`math.js`:

```javascript
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  add: add,
  multiply: multiply
};
```

You are publishing an object with two functions.

### Importing (requiring)

`app.js`:

```javascript
const math = require("./math.js");

console.log(math.add(2, 3));
console.log(math.multiply(4, 5));
```

- `./` means “relative to this file’s folder”
- Run the **entry** file: `node app.js`
- You do **not** run `math.js` directly unless it is meant to be entry

### What `require` does (simple model)

1. Loads the target file
2. Runs it
3. Returns `module.exports`

### One export function style

```javascript
// greeter.js
function greet(name) {
  return "Hi, " + name;
}
module.exports = greet;
```

```javascript
const greet = require("./greeter.js");
console.log(greet("Ada"));
```

### Boundaries

Not everything needs exporting. Helper details can stay private in the file (not put on `module.exports`).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Module | File with exports | Not npm package yet |
| Export | Make available to others | |
| Require / import | Load another module | |
| Entry file | File you run with `node` | |
| CommonJS | require/exports system | |
| Relative path | `./file.js` path | |

## Worked example

`tax.js`:

```javascript
function withTax(amount, rate) {
  return amount + amount * rate;
}
module.exports = { withTax };
```

`receipt.js`:

```javascript
const tax = require("./tax.js");
const total = tax.withTax(100, 0.1);
console.log(total);
```

```bash
node receipt.js
```

```text
110
```

## Common errors

### Error: `Cannot find module './math'`

Wrong path/name. Check spelling and `./`.

### Error: `... is not a function`

Exported shape does not match how you import. Log the required value.

### Error: Running the library file instead of the entry

`node math.js` may print nothing — it only defines exports.

## Checkpoints

1. Why split modules?
2. What does `module.exports` represent?
3. Why `./` in `require("./math.js")`?
4. Which file do you pass to `node`?

## Practice

### P1 — math module

`add` and `sub` exported; entry logs both.

### P2 — private helper

File with internal helper not exported; only export one public function.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- npm packages (soon)
- Circular dependencies
- TypeScript paths

## Next unit

**U17 — Built-in modules (Node standard library)**
