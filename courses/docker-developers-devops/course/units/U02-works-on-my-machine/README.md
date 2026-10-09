# U02 — The works-on-my-machine problem

**Phase 1 — Why containers exist**

## Where you are

This is the first unit of Phase 1. We are not touching Docker yet. Instead we study the **human problem** that Docker was invented to solve. If you understand the problem clearly, every tool later will feel like a sensible answer instead of an arbitrary ritual.

## What you will be able to do

- Explain what people mean by "it works on my machine" and describe when it happens.
- Name the parts of a software **environment**: operating system, runtime, libraries, versions, and configuration.
- Explain why "install the same thing" often fails to fix the problem.
- See the problem as a systems issue rather than a personal failure.

## What you need already

- **U00 — How this course works.**
- **U01 — What we are building toward.** You need the journey map and the rough preview of containers.

No Docker, no programming setup, and no terminal commands are required in this unit.

## Time and energy

About **45–70 minutes**. There are no commands to type. If the story below feels uncomfortably familiar, that recognition is the point — it means the unit is working.

## Why this exists

This exact frustration is the reason Docker exists. Teams lose days to it every year. When you can name the problem precisely, you stop blaming yourself and start seeing a solvable engineering situation. That shift is worth a whole unit.

## Plain-language teaching

### A short story

A small team builds a web app. On Dana's laptop it runs perfectly. Dana sends the project to a colleague, Omar, who follows the same setup instructions. Omar gets errors before the app even starts.

Dana says, "It works on my machine." Omar hears, "You did something wrong." A week disappears into screen-sharing before someone discovers the truth: the two laptops were never actually running the same thing.

### What an "environment" actually means

An app never runs in a vacuum. It runs inside an **environment** — everything around the code that the code depends on. Five pieces matter most for now:

1. **Operating system.** Windows, macOS, and Linux differ in thousands of small ways: file paths, permissions, case sensitivity of filenames, and the low-level system libraries available.
2. **Runtime.** The engine that executes the code. Python, Node.js, the Java runtime, and .NET are all runtimes. The code cannot run without its runtime.
3. **Libraries.** Bundles of code the app uses but did not write. A web app might rely on forty of them.
4. **Versions.** The *specific* versions of the runtime and each library. Library version 2.1.0 and 2.2.0 can behave differently, even in ways that break the app.
5. **Configuration.** Settings that are not code: database addresses, passwords, feature flags, and environment variables (settings passed in from outside the program).

### Dependencies and version drift

A **dependency** is anything the app needs in order to run — a runtime, a library, a system tool. When two machines install those dependencies at different times, they slowly stop matching. We call this **version drift**. It is gradual and sneaky: each person's machine is a little different, and nobody noticed the day it happened.

### Why copying the project folder is not enough

The project folder usually contains only the *code*. It does not contain the operating system, the installed runtime, the exact library versions, or the settings. That is why two people can open the same folder and get two different results. The folder is identical; the **environment around it** is not.

### How teams used to cope (and where each falls short)

- **A long setup document.** Works until the document goes out of date, which is quickly.
- **A shared server everyone logs into.** Consistent, but fragile, shared, and hard to reproduce.
- **Virtual machines hand-built by an expert.** More consistent, but large, slow, and still hand-made unless carefully automated.

Notice the pattern: none of these fully solve the problem of shipping **the app plus its environment together**. That is the gap containers fill — later in this course.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Environment | Everything around the code that the code needs to run | People think "environment" means only settings |
| Runtime | The engine that executes the code (Python, Node.js, Java) | Not the same as the operating system |
| Library | A bundle of ready-made code the app uses | People call libraries "dependencies," which is broader |
| Dependency | Anything the app needs to run: runtime, library, or system tool | Not only external packages |
| Version | The specific release number of a piece of software | "Same software" is not the same as "same version" |
| Version drift | Two machines slowly drifting to different versions | Not a single event; it accumulates |
| Reproducibility | Getting the same result again and again on any machine | Not the same as "it worked once" |
| "Works on my machine" | A bug that only appears in some environments | Not proof the reporter is lying or careless |
| Configuration | Settings the app reads from outside its code | Not the same as the code itself |

## Worked example

You are not running anything. Read the two machines and notice exactly where they differ.

**Scenario:** A small Node.js web app. The team checked in the code plus a file called `package.json`, which lists the libraries the app wants. It does **not** pin exact versions for all of them.

```text
package.json (excerpt)
{
  "name": "todo-app",
  "dependencies": {
    "express": "^4.0.0",
    "pg": "latest"
  }
}
```

The caret (`^`) and the word `latest` tell the package installer "any recent version is fine." That is the trap.

```text
Dana's machine (it works)              Omar's machine (it fails)
-------------------                    -------------------
Node.js 20.11                          Node.js 18.19
express 4.18                           express 4.19
pg 8.11                                pg 8.13
macOS Sonoma                           Windows 11
DATABASE_URL set                       DATABASE_URL missing
```

Omar runs the app and sees:

```text
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Decoding it:** the app tried to reach a database at the address `127.0.0.1` (this computer) on port `5432`, and nothing answered. On Dana's machine a database was running; on Omar's it was not, and the setting that points to it was missing entirely.

Nothing here is Omar's fault. The environment was never the same. This is the exact class of problem containers are designed to remove: instead of hoping two machines match, you ship the environment as part of the product.

## Common errors

### Error: telling the other person to "reinstall everything"

**What happens:** They reinstall, versions drift again, and the bug returns next week.

**Fix:** The problem is not a missing install; it is an **unmatched** install. Reinstallation does not guarantee the same versions.

### Error: assuming the code is buggy

**What happens:** The team spends days hunting through code that is fine on one machine.

**Fix:** Ask first: "Do the two environments match?" Code that fails on one machine and works on another is usually an environment difference before it is a code bug.

### Error: blaming the person

**What happens:** "You must have done it wrong" damages trust and hides the real cause.

**Fix:** Separate the *work* from the *person*. The environment drifted; the person did nothing wrong. Every mature team treats this as a systems problem.

## Checkpoints

Answer in your own words before the assignment:

1. What are the five parts of an environment this unit named?
2. What is version drift, and why is it sneaky?
3. Why does copying the project folder not fix "works on my machine"?

If you can answer these, you are ready.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Inventory a real environment

Pick any program or project you have used. List its runtime, at least two libraries, one configuration setting, and the operating system. If you do not know a value, write "unknown" and note what you would check.

### P2 — Spot the drift

Two machines are described below. Circle every line where they differ.

```text
Machine A: Python 3.11, macOS, numpy 1.24, "DEBUG=false"
Machine B: Python 3.12, Linux,  numpy 1.26, "DEBUG=true"
```

Then write one sentence about which difference could most easily change behaviour.

### P3 — Predict then read

Before reading further, predict: if the database setting is missing on Machine B, what error would it likely produce? Then re-read the worked example and compare your prediction to the real error. Predictions that are wrong are more useful than ones that are right.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No Docker commands, no installing anything.
- No container or image mechanics yet (precise versions arrive in U05 and U08).
- No terminal navigation (that is U03).
- No networking deep dive — you only met the idea of a database address.

## Next unit

**U03 — The terminal, deliberately** (the tool where Docker commands will later be typed).
