# U22 — What a package manager is

**Phase 3**

## Where you are

You know packages, versions, trust. Now the **tool** that fetches and organizes them: a **package manager**. Still no random installing of app frameworks — concept first, then careful use.

## What you will be able to do

- Define package manager responsibilities.
- Distinguish npm CLI vs registry vs package.
- Name alternate managers exist (yarn, pnpm) without multi-learning them.
- Explain the job `npm install` will do *before* relying on it.

## What you need already

- **U20**, **U21**
- Node installed (**U12**) so `npm` exists

## Time and energy

**45–70 minutes.**

## Why this exists

Typing `npm` without a mental model is superstition. Superstition collapses under errors.

## Plain-language teaching

### Definition

A **package manager** is a tool that:

1. **Downloads** packages from a registry
2. **Places** them in your project (typically `node_modules`)
3. **Tracks** what you depend on (with `package.json` and often a lockfile)
4. **Resolves** versions (picks concrete versions for ranges)
5. Often runs **scripts** defined by the project

**npm** is the package manager that ships with Node. The word “npm” originally related to “Node Package Manager,” but treat it as the **tool name**.

### Three different things people mix up

| Thing | Role |
|-------|------|
| **npm CLI** | Program you run: `npm ...` |
| **npm registry** | Default online warehouse of packages |
| **A package** | The code bundle you install |

### Other managers

**Yarn** and **pnpm** are other package managers in the same ecosystem. This course standardizes on **npm** so you master one. Knowing others exist prevents confusion when blogs differ.

### What `npm install` means (concept)

When a project already has a `package.json` listing dependencies, `npm install` means roughly:

> Read the manifest → download needed packages → put them in `node_modules` → record exact versions in a lockfile.

When you `npm install express` (later), it means:

> Add express as a dependency → download it (and its deps) → update manifest/lockfile.

You will do this carefully in U24 after `package.json` (U23).

### What a package manager is *not*

- Not your code editor
- Not Node itself (though it ships with Node)
- Not a substitute for understanding code
- Not automatically “secure forever”

### Offline mental model

Without a package manager you might manually download zip files, drop folders around, and lose version tracking. Package managers automate that mess — **that** is why they exist.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Package manager | Tool to install/track packages | Not the package |
| CLI | Command-line program | |
| Registry | Package warehouse | |
| Resolve | Pick concrete versions | |
| Lockfile | Exact version pin record | |

## Worked example — decode a sentence

Blog: “npm install the package from npm.”

Clearer: “Use the **npm CLI** to download a **package** from the **npm registry** into your project.”

## Common errors

### Error: “npm is Node”

Node runs JS. npm manages packages. Related, not identical. `node -v` vs `npm -v`.

### Error: Learning yarn and npm and pnpm simultaneously

Pick one while learning. Here: npm.

## Checkpoints

1. Five jobs of a package manager?
2. CLI vs registry vs package?
3. Why does this course pick one manager?
4. What problem do managers solve vs manual zips?

## Practice

### P1 — Analogy

Write a non-tech analogy (library, warehouse, app store — pick one) and also state where the analogy fails.

### P2 — Command meaning

In your own words, what *should* `npm install` do when dependencies are listed?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full npm subcommand reference
- Creating packages for publish

## Next unit

**U23 — package.json as a project manifest**
