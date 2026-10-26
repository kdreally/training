# U20 — What a package is

**Phase 3**

## Where you are

You know *why* reuse exists. Now: the unit of reuse in the Node world — a **package**.

## What you will be able to do

- Define package in plain language.
- Distinguish package vs module vs library vs dependency.
- Explain version identity at a high level.
- Describe what a package contains conceptually.

## What you need already

- **U19**

## Time and energy

**45–70 minutes.**

## Why this exists

People say “install the package” while meaning “folder,” “library,” “GitHub repo,” or “one function.” Precision reduces fear.

## Plain-language teaching

### Definition

A **package** is a **bundle of code** (and metadata) intended to be **installed and reused** in other projects, usually with a **name** and **version**.

In Node’s ecosystem, packages are commonly published to a **registry** (npm registry is the default public one). You are not installing yet — only defining.

### Package vs nearby words

| Term | Plain meaning |
|------|----------------|
| **Module** | A single file (or unit) that exports code — local or inside a package |
| **Package** | Distributable bundle with name/version/metadata; may contain many modules |
| **Library** | Informal: code meant to be used by other code (often a package) |
| **Dependency** | A package *your project relies on* |
| **Application** | A program you run for users; may *use* packages |

### What is inside (conceptually)

- JavaScript files (the actual code)
- A manifest (`package.json`) describing name, version, entry points, deps
- License, readme sometimes
- Possibly native bits (advanced — ignore for now)

### Name + version identity

`lodash@4.17.21` means: package name `lodash`, version `4.17.21`.

Versions exist so updates do not silently break everyone at once (U21 deepens this).

### Where packages live when installed (preview)

On disk, installed packages often appear under a folder called `node_modules`. That folder is a consequence of installing — not something you hand-write. Details in U24.

### Packages you already met without installing

Node **built-ins** are not npm packages you download, but they play a similar role: reusable modules provided by the environment. Third-party packages extend beyond built-ins.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Package | Named versioned reusable bundle | Not the same as package manager |
| Registry | Server that hosts packages | Like an app store for code |
| Metadata | Data about the package | name, version, license… |
| `node_modules` | Folder of installed packages | Generated, not hand-crafted |
| Publish | Upload a package for others | You will not publish yet |

## Worked example — sentence drills

Rewrite precisely:

- Vague: “I installed Express.”  
- Clearer: “I added the Express package as a dependency so my app can use its modules to handle HTTP more easily.” (Still future tense for you.)

- Vague: “My module is on npm.”  
- Clearer: “I published a package containing my modules to the npm registry.”

## Common errors

### Error: Calling every file a package

Local `./math.js` is a module. It becomes a package only when packaged/published/consumed as one.

### Error: Thinking the registry is npm-the-tool

**npm** the CLI talks to a **registry**. Separate ideas (U22).

## Checkpoints

1. One-sentence definition of package?
2. Package vs module?
3. Why versions?
4. What is a registry?

## Practice

### P1 — Label

For each: module / package / dependency / app — “my `server.js`”, “express in a real project”, “a notes API you build”, “lodash listed in dependencies”.

### P2 — Inventory imagination

List 3 problems that commonly become packages (e.g. validation, routing helpers, testing tools). No installs.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- npm install
- Semantic versioning details (next)

## Next unit

**U21 — Trust, versions, and dependencies**
