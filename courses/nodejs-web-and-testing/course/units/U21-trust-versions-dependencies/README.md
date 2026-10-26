# U21 — Trust, versions, and dependency relationships

**Phase 3**

## Where you are

Packages have names and versions. Now: what versions mean, what a dependency *relationship* is, and how trust works without naivety.

## What you will be able to do

- Explain semantic versioning at a beginner level (major.minor.patch).
- Explain direct vs transitive dependencies.
- Describe trust checks a careful beginner can do.
- Read a version range idea without memorizing all npm range grammar.

## What you need already

- **U20**

## Time and energy

**50–75 minutes.**

## Why this exists

Broken upgrades and malicious packages are real. Fear is not the goal; **informed caution** is.

## Plain-language teaching

### Dependency is a relationship

If project A needs package B to work, A **depends on** B. B is a **dependency** of A.

Dependencies can nest: B depends on C. C is a **transitive** dependency of A (you did not name C directly, but you get it).

### Semantic versioning (SemVer) — practical reading

Many packages use versions like `3.4.1`:

| Part | Name | Rough meaning of bump |
|------|------|------------------------|
| 3 | **major** | Breaking changes — old code may fail |
| 4 | **minor** | New features, hopefully compatible |
| 1 | **patch** | Bug fixes, hopefully compatible |

`0.x.y` often means “still immature; expect breaks.”

This is a **convention**, not a law of physics — authors can mis-version. Still useful.

### Why ranges exist (preview)

A project might accept “any 3.x” to get fixes without jumping to 4.x. Package managers resolve ranges. Details when we meet `package.json` (U23–U24).

### Trust is not binary

You never get perfect safety. You reduce risk:

1. Prefer well-known packages for security-sensitive jobs (e.g. password hashing).
2. Check last publish date / maintenance signals (abandoned?).
3. Prefer packages with clear readmes and licenses.
4. Minimize count of dependencies.
5. Lock versions when collaborating (lockfiles — U24).
6. Never paste unknown install commands from chat strangers.

### License (awareness)

Packages include licenses (MIT, Apache-2.0, etc.). Using code means respecting license terms. For learning projects, still notice “this has a license.”

### Malware reality (calm)

Occasionally malicious packages appear. Stick to official docs, known names, and trainer guidance. If a package name is one typo away from a famous package (**typosquatting**), be suspicious.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| SemVer | major.minor.patch convention | Not guaranteed perfection |
| Direct dependency | You named it | |
| Transitive dependency | Dependency of a dependency | |
| Breaking change | Requires you to change your code | |
| Lockfile | Pins exact resolved versions | U24 |
| Typosquatting | Evil similar name | |

## Worked example

You depend on `router@2.1.0`. Author releases:

- `2.1.1` patch — likely safe to take
- `2.2.0` minor — new helpers, likely safe
- `3.0.0` major — read changelog; your code might break

## Common errors

### Error: Always using latest blindly in production

Surprise breaks. Prefer deliberate upgrades.

### Error: Assuming many downloads = perfect safety

Helpful signal, not proof.

## Checkpoints

1. What does major bump signal?
2. Direct vs transitive?
3. Name three trust practices.
4. What is typosquatting?

## Practice

### P1 — Label versions

For bumps 1.2.3 → 1.2.4, → 1.3.0, → 2.0.0, say expected kind.

### P2 — Graph

A→B, B→C, A→D. List direct and transitive for A.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full npm semver range syntax exam
- Installing

## Next unit

**U22 — What a package manager is**
