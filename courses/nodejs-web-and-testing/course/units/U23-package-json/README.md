# U23 — `package.json` as a project manifest

**Phase 3**

## Where you are

Package managers need a **project declaration**. In Node, that file is **`package.json`**.

## What you will be able to do

- Explain what a manifest is.
- Create a `package.json` with understanding (`npm init`).
- Read fields: `name`, `version`, `description`, `main`, `scripts`, `dependencies`.
- Open and edit `package.json` as ordinary text.

## What you need already

- **U22**
- Terminal + Node/npm

## Time and energy

**60–90 minutes.**

## Why this exists

`package.json` is not mystical config — it is a **JSON file describing the project**. If you can read it, npm stops feeling like magic.

## Plain-language teaching

### Manifest

A **manifest** is a document that declares what something *is* and what it *needs*.

`package.json` declares:

- Project identity (name, version)
- How to run common tasks (`scripts`)
- What packages it depends on (`dependencies`, `devDependencies`)

### JSON reminder

JSON is a data format: braces, quotes, commas. No comments. Trailing commas can break it. You met the *idea* with objects; JSON is stricter text.

### Create one carefully

```bash
mkdir u23-project
cd u23-project
npm init -y
```

- `npm init` walks you through creating `package.json`
- `-y` means “yes to defaults” — fine for learning; you will open the file and understand fields

Open `package.json` in your editor. Typical fields:

```json
{
  "name": "u23-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

| Field | Meaning |
|-------|---------|
| `name` | Project/package name |
| `version` | Project version |
| `description` | Human blurb |
| `main` | Default entry file hint |
| `scripts` | Named commands npm can run |
| `license` | License id |

`dependencies` appears when you install packages (U24).

### Scripts (preview, used in U25)

```json
"scripts": {
  "start": "node index.js"
}
```

Then `npm start` runs that command. Deeper in U25.

### You can edit by hand

Change `description` to `"learning package.json"`. Save. Valid JSON required.

### This file is shared with humans and tools

Commit it to version control later. It is the project’s declaration — not a secret cache.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Manifest | Declaration document | |
| `package.json` | Node project manifest | Not lockfile |
| `npm init` | Create package.json | |
| JSON | Data text format | Almost-but-not JS object literal |
| `scripts` | Named command shortcuts | |

## Worked example

After `npm init -y`, set:

```json
"description": "U23 learning project",
"main": "index.js"
```

Create `index.js`:

```javascript
console.log("project alive");
```

Run with `node index.js` (scripts next unit).

## Common errors

### Error: Invalid JSON after hand-edit

Missing comma or extra comma. Use an editor that highlights JSON errors.

### Error: Wrong folder

Multiple projects nested accidentally. Always `pwd` before `npm init`.

## Checkpoints

1. What is a manifest?
2. What does `npm init -y` do?
3. Meaning of `name`, `version`, `scripts`?
4. Is `package.json` generated binary or editable text?

## Practice

### P1 — init project

Create folder, `npm init -y`, edit description.

### P2 — read aloud

Explain each default field in one phrase.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Installing dependencies (U24)
- Publishing to npm

## Next unit

**U24 — Installing packages, node_modules, lockfiles**
