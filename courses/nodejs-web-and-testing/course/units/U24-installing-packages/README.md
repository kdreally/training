# U24 — Installing packages, `node_modules`, lockfiles

**Phase 3**

## Where you are

You have `package.json`. Now the first **deliberate** third-party install — a tiny package — with full understanding of what appears on disk.

## What you will be able to do

- Install one small package with npm and use it in code.
- Explain `node_modules` and why you usually do not edit it by hand.
- Explain `package-lock.json` purpose.
- Add a dependency entry’s meaning in `package.json`.

## What you need already

- **U19–U23**
- Network access for registry

## Time and energy

**70–100 minutes.**

## Why this exists

This is the moment many courses start — we arrive **prepared**.

## Plain-language teaching

### Choose a simple package

We will use **`ms`** — a tiny package that converts time strings like `"2 days"` to milliseconds. Small surface area; easy to understand.

(If `ms` is unavailable, trainer may substitute another tiny utility. Same lessons.)

### Install into a project

```bash
mkdir u24-project
cd u24-project
npm init -y
npm install ms
```

What you should observe:

1. Download activity in the terminal
2. `package.json` gains a `dependencies` entry for `ms`
3. A `package-lock.json` file appears/updates
4. A `node_modules` folder appears with package files inside

### Use it

`index.js`:

```javascript
const ms = require("ms");

const twoDays = ms("2 days");
console.log(twoDays);
```

```bash
node index.js
```

You should see a large number (milliseconds in two days: `172800000`).

Note: `require("ms")` has **no** `./` — Node looks inside `node_modules` for package names.

### What `node_modules` is

A folder where npm places installed packages (and their dependencies).  

**Do not hand-edit** code inside `node_modules` for real work — reinstalls wipe changes.  
**Do not** usually submit `node_modules` to trainers if they say “install yourself”; they can run `npm install` from lockfile. Follow trainer policy.

### What `package-lock.json` is

A **lockfile** recording the **exact** versions npm resolved (including transitive deps).  

Purpose: another machine (or future you) gets the **same** tree when running `npm install`.

`package.json` may say “ms at a compatible range.”  
`package-lock.json` says “exactly these versions.”

### Reinstall from lockfile

If you delete `node_modules` but keep `package.json` + lockfile:

```bash
npm install
```

Restores packages.

### Uninstall (awareness)

```bash
npm uninstall ms
```

Removes dependency metadata and package (generally).

### Security note

You just executed a trust decision. For `ms` the risk is low and purpose is learning. Always keep U21 checklist for future installs.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| `npm install <name>` | Add + download package | |
| `dependencies` | Runtime deps listed in package.json | |
| `node_modules` | Installed packages folder | Not your source code home |
| Lockfile | Exact resolution record | Not the same as package.json |
| Bare require | `require("ms")` package name | vs `require("./local")` |

## Worked example

See install + `ms("2 days")` above.

## Common errors

### Error: `Cannot find module 'ms'`

Forgot install, wrong folder, or deleted `node_modules`. Run `npm install` in project root.

### Error: Installing globally by accident

`npm install -g` affects global environment. This course uses **local** project installs unless told otherwise.

### Error: Editing node_modules to “fix” something

Your fix vanishes. Fix your code or choose versions deliberately.

## Checkpoints

1. What four things change/appear after `npm install ms`?
2. Why bare `require("ms")` works?
3. Lockfile vs package.json?
4. Why not edit node_modules?

## Practice

### P1 — install and run

As above.

### P2 — delete node_modules and restore

`npm install` again; run.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Express (later)
- Dev vs prod deps deep (U26)
- Publishing

## Next unit

**U25 — Scripts in package.json**
