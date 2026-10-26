# U19 — Why reuse exists (before packages)

**Phase 3 — Packages and package managers**

## Where you are

You can write Node programs with local and built-in modules. Next temptation: download the internet. **Stop.** First: *why* shared code exists at all.

## What you will be able to do

- Argue for and against code reuse.
- Explain cost of writing everything yourself.
- Explain risk of depending on strangers.
- State what problem “packages” will solve *before* meeting npm.

## What you need already

- **U16**, **U17**

## Time and energy

**40–60 minutes.**

## Why this exists

`npm install` without motivation is ritual. Ritual creates cargo cult engineers. We build motive first.

## Plain-language teaching

### You already reuse

- Language features (`if`, functions)
- Built-in modules (`fs`, `path`)
- Your own modules across files

Reuse is normal. The question is **whose code** and **how it arrives**.

### The fantasy of pure originality

Writing every HTTP parser, date formatter, and password hash yourself:

| Cost | Detail |
|------|--------|
| Time | Weeks or years |
| Bugs | Security mistakes are expensive |
| Maintenance | You alone fix everything |
| Opportunity | You never build *your* product |

Professionals reuse **carefully**.

### The fantasy of infinite install

Blindly installing hundreds of packages:

| Cost | Detail |
|------|--------|
| Supply chain risk | Malicious or abandoned code |
| Complexity | Upgrade hell |
| Opacity | You cannot explain your own app |
| Weight | Disk, install time, confusion |

Professionals reuse **minimally and deliberately**.

### A middle path

1. Prefer **standard library** when enough.
2. Write small modules yourself when the logic is your domain.
3. Use a **package** when the problem is common, well-solved, and the dependency is justified.
4. Know **what** you installed and **why**.

### What is coming (preview only)

- **Package** — a reusable unit of code published for others (U20)
- **Package manager** — tool to fetch/install/version packages (U22)
- **Manifest** — project file listing dependencies (U23)

Do **not** install anything for this unit.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Reuse | Use existing code instead of rewriting | Not plagiarism when licensed/attributed properly |
| Dependency | Code you rely on | Emotional meaning too — you depend |
| Supply chain | Path code takes to reach you | Not only physical shipping |
| Standard library | Built-ins | Free of npm install |

## Worked example — decision sketch

Need to parse dates in weird formats?

| Option | When |
|--------|------|
| Write yourself | Formats are trivial |
| Use a package | Formats are gnarly and well-known libraries exist |
| Avoid | Maybe store timestamps as numbers and skip parsing |

There is no single always-right answer. There is always a **reason**.

## Common errors

### Error: “Real devs install first, think later”

No. Real devs can explain dependencies.

### Error: “Using packages is cheating”

No. Unexamined packages are the problem — not packages themselves.

## Checkpoints

1. Two costs of writing everything yourself?
2. Two costs of installing everything?
3. Where do built-ins fit?
4. What question should you answer before adding a dependency?

## Practice

### P1 — Pros/cons table

Make a 2-column table: reuse vs rewrite for “sort an array of numbers” (hint: language already sorts).

### P2 — Justification drill

Pick one: UUID generation, advanced date time zones, or a full web framework. Write 4 sentences: when a package is justified.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- npm commands
- Installing anything

## Next unit

**U20 — What a package is**
