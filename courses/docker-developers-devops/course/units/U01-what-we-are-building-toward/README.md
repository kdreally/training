# U01 — What we are building toward

**Phase 0 — Orientation**

## Where you are

You have finished the orientation unit (U00) and you know how the course runs. This unit shows you the **destination** before the journey: what you will actually be able to do with Docker by the end, and what this course honestly will not teach you. Seeing the whole mountain first makes each later step feel like progress instead of random homework.

## What you will be able to do

- Describe, in your own words, the journey from source code on your laptop to an app running in a container.
- Name the main ideas you will meet (image, container, Dockerfile, Compose, registry, CI, deploy) and the human problem each one solves.
- State honestly what this course covers and what it leaves out.

## What you need already

- **U00 — How this course works.** You need the unit structure, the practice-vs-assignment idea, and the stuck protocol. Nothing else.

No programming and no Docker are needed for this unit.

## Time and energy

About **45–70 minutes**, almost all of it reading and reflecting. There are no commands to run here. If your eyes glaze over, stop at a heading and come back. This unit is a map, and maps are worth studying slowly.

## Why this exists

Being told "learn Docker" is like being dropped in a city with no map. You wander, you get lost, and you start to believe the problem is you. It is not. The problem is that nobody showed you the shape of the journey.

This unit hands you the map. When a later unit feels hard, you can look back and see which part of the larger goal you are standing on.

## Plain-language teaching

### The destination in one sentence

By the end of this course you will take a small app that runs on your laptop, wrap it and everything it needs into a **container**, and run that same container on another machine so it behaves the same way there.

### The stops on the journey

Here is the whole route. Each stop gets its own unit later; you do not need to master any of it now.

1. **A program needs an environment.** The app is not only its code. It also needs a runtime, libraries, settings, and a way to receive network traffic. (U04.)
2. **"Works on my machine" is the pain.** Two machines with "the same app" behave differently because their environments drifted apart. (U02, and you met this idea in the course map.)
3. **Containers package the app *and* its environment.** (U05, U07.)
4. **An image is the recipe; a container is the running instance of that recipe.** (U08.) This sentence is the heart of the course, and you will earn it properly later.
5. **A Dockerfile is how we write the recipe.** (U11–U16.)
6. **Compose runs several containers together** so a real app (web + database, say) can start with one command. (U21–U25.)
7. **A registry lets images travel** from your laptop to a teammate or a server. (U26–U27.)
8. **CI builds images automatically** when code changes, and **deployment runs those images somewhere.** (U28–U31.)

### Plain-language preview of the two central words

You will meet these two words constantly, so here is a first, rough taste. U08 gives you the precise version.

- A **container** is a box that holds a running program together with everything that program needs to run. It is isolated from the rest of your computer but shares your computer's core operating system, which is why containers are small and fast.
- An **image** is the saved, reusable blueprint that a container is created from. You build an image once and can start many containers from it.

Think *image = blueprint, container = building made from the blueprint*. You are **not** expected to invent anything from this preview — it is orientation only.

### Honest scope: what this course promises

- You will be able to **containerize a small app end to end** (the capstone, U35).
- You will be able to **read any Dockerfile or Compose file** and explain what each line does.
- You will be able to **explain what every running container on your machine is doing.**
- You will understand how containers fit into developer and DevOps work: building, testing, shipping.

### Honest scope: what this course does *not* promise

- It does **not** make you a Kubernetes expert. U32 is a short survey that shows where Kubernetes fits, nothing more.
- It does **not** teach you to program. It assumes you can read a little code, not write a large app.
- It does **not** require a cloud account or anything paid. Everything runs on your own computer.
- It does **not** cover advanced production infrastructure (multi-region clusters, service meshes). Those are later, separate skills.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Container | A running program bundled with everything it needs, isolated but sharing the host's operating-system core | Not the same as a virtual machine (see U05) |
| Image | The saved blueprint that containers are started from | People say "run the image" as if the image *is* the running thing |
| Dockerfile | A text recipe listing how to build an image | Not a script you run directly; Docker reads it |
| Docker Compose | A tool to define and run several containers together from one file | Not the same as a single `run` command |
| Registry | An online library where images are stored and shared | Not the same as a running container |
| CI (continuous integration) | An automated service that builds and tests your code when it changes | Not a Docker feature; Docker is used *inside* CI |
| Deployment | Putting your app somewhere it can serve real users | Not the same as "it runs on my laptop" |
| Orchestration | Software that manages many containers across many machines | Kubernetes is one example; not required in this course |
| Host | The computer the containers run on | Distinct from a "guest," which is the container's own view |

## Worked example

You do not type anything here. Read the journey and notice how each stop maps to a later unit.

**Scenario:** Priya has a small web app — a to-do list. It runs on her laptop (a Mac). A teammate, Sam, is on Windows, and Sam cannot make it run.

```text
Priya's laptop                          Sam's laptop
-------------                           -------------
Node.js version 20                      Node.js version 18
PostgreSQL installed locally            No PostgreSQL
Database password stored in a file      No such file
App listens on port 3000                Port 3000 already used by another tool
App runs fine                           App crashes with confusing errors
```

The journey this course builds:

```text
Step 1  Understand why the two laptops differ            (this course: U02, U04)
Step 2  Learn to drive the terminal where Docker lives   (U03)
Step 3  Understand what a container is, vs a VM          (U05)
Step 4  Install Docker and run your first container      (U06, U07)
Step 5  Write an image recipe (a Dockerfile)             (U11–U16)
Step 6  Run app + database together with Compose         (U21–U25)
Step 7  Share the image through a registry               (U26–U27)
Step 8  Let CI build it and deploy it                    (U28–U31)
Step 9  Do it yourself, end to end, in the capstone      (U35)
```

By step 9, Priya and Sam both run **the same image**, so the app behaves the same for both. That is the whole point.

## Common errors

### Error: trying to memorize Docker commands now

**What happens:** You scroll ahead, feel overwhelmed by unfamiliar words, and conclude you are "bad at this."

**Fix:** A map is for orientation, not memorization. You are expected to *recognize* these words after this unit, not explain them. Each word gets a full, patient unit later.

### Error: assuming Docker is only for large companies

**What happens:** You decide containers are "not for someone like me" and disengage.

**Fix:** Containers help one person on one laptop just as much as a team of hundreds. The same two commands that run a big service also run a small personal project.

### Error: expecting Kubernetes mastery from this course

**What happens:** You sign up expecting orchestrators, clusters, and YAML everywhere, then feel cheated by U32 being a survey.

**Fix:** Re-read the honest scope above. This course is about containers, and it is honest about stopping short of orchestration.

## Checkpoints

Answer in your own words before the assignment:

1. What is the difference between an image and a container, in one sentence each?
2. Name two things this course will make you able to do, and two things it will *not*.
3. Which stop on the journey deals with "an app needs an environment," and which deals with sharing images?

If you can answer these, you are ready.

## Practice exercises

Ungraded. Do these before the assignment.

### P1 — Draw the journey

On paper or in a text file, draw a simple line with the nine steps above. Next to each step, write one sentence explaining what problem it solves.

### P2 — Match idea to problem

Write each idea below beside the human problem it solves: *image, container, Dockerfile, Compose, registry, CI, deploy.*

- "Our app needs a database running next to it."
- "My teammate cannot rebuild my app."
- "We keep rebuilding images by hand every release."
- "It works for me but crashes for the tester."
- "The running copy of the app is doing something strange."

### P3 — Your own target

Think of a small app you have written or used. Write three sentences describing what it needs to run (language, database, settings). You will test this thinking again in U04.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No installing Docker.
- No commands typed anywhere.
- No Dockerfile, Compose file, or registry work.
- No deep dive into Kubernetes or production infrastructure.

## Next unit

**U02 — The works-on-my-machine problem** (the human pain that containers exist to solve).
