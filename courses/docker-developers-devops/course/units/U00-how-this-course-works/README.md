# U00 — How this course works

**Phase 0 — Orientation**

## Where you are

This is unit zero on purpose. Before any Docker command, you learn **how the course is built**, **how to get stuck without quitting**, and **how a human will assess your work**. Many people fail courses not because they cannot learn, but because nobody explained the rules of the game.

## What you will be able to do

- Describe how a unit is structured and what each part is for.
- Use a stuck protocol instead of freezing or guessing wildly.
- Submit work in a form a trainer can mark fairly.
- Name the difference between practice and graded assignment.

## What you need already

- Ability to open files and folders on your computer.
- Ability to read English technical prose slowly.
- No Docker or programming required for this unit.

## Time and energy

About **45–75 minutes**. Take breaks. This unit is short on commands and long on calm.

## Why this exists

Bad courses throw you into tools with no map. Then you feel stupid for being lost. You are not stupid. You were under-briefed. This unit is the brief.

## Plain-language teaching

### What a "unit" is

A **unit** is one folder of materials about one cluster of ideas. You finish a unit when you can do what it claims — not when you have merely scrolled past it.

### The parts of a unit (and why each exists)

| Part | Purpose |
|------|---------|
| **Where you are** | Orients you so you know which mountain you are on. |
| **What you will be able to do** | Defines "done" in observable terms. |
| **What you need already** | Lists prior units — not vague "basics." |
| **Why this exists** | Motivation so steps are not empty ritual. |
| **Plain-language teaching** | Concepts **before** tasks. |
| **Vocabulary** | Words defined so jargon does not ambush you. |
| **Worked example** | A complete tiny sample, not a mystery fragment. |
| **Common errors** | Failures decoded on purpose. |
| **Checkpoints** | Self-check before graded work. |
| **Practice** | Safe reps; not usually the grade. |
| **Assignment** | What you submit to a human trainer. |
| **Rubric** | How you will be scored — no secret criteria. |
| **What is not in this unit** | Scope fence so you stop worrying about the whole internet. |

### Practice vs assignment

- **Practice** is for learning. Struggle is allowed. Wrong answers are information.
- **Assignment** is for evidence. A human trainer uses it (and the rubric) to see what you can do.

Copying practice solutions into an assignment without understanding usually fails the "explain in your own words" parts. Those parts exist to protect you from empty mimicry.

### How assessment works

1. You complete the assignment for a unit.
2. You submit exactly what the assignment asks for (files + short written answers).
3. A **human trainer/assessor** marks against the **rubric**.
4. Feedback should refer to criteria, not vibes.

If something is unclear in an assignment, write what you assumed and why. Trainers can work with honest assumptions. They cannot work with silence.

### The stuck protocol (use this forever)

When stuck, do **not** start random clicking. Do this:

1. **Name the last thing that made sense.** Write one sentence.
2. **Name the first thing that did not.** Quote the sentence, error, or instruction.
3. **Re-read the vocabulary table** for words in that stuck place.
4. **Re-run the worked example exactly** as written. Did it behave as promised?
5. **Change one thing only**, then observe.
6. **Write what you tried** (commands, files, what you saw).
7. **Ask your trainer** with steps 1–6 filled in.

Stuck + notes is professional. Stuck + silence is torture for everyone.

### Errors are not moral judgments

Docker will print red text. It often looks scarier than it is. That text means: "Something does not match what was expected." It does **not** mean: "You are bad at this." Reading container errors is a skill this course teaches, starting in U07.

### Pace and confidence

- Slow and clear beats fast and fake.
- You may re-read a unit. Re-reading is not failure.
- Comparing your speed to strangers on the internet is optional self-harm. Skip it.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Unit | One lesson package with a clear outcome | Not a "unit test" (not part of this course) |
| Practice | Work for learning | Not always graded |
| Assignment | Work you submit for assessment | Not the same as "homework busywork" if the rubric is real |
| Rubric | Written scoring criteria | Not a secret; you should read it first |
| Trainer / assessor | Human who reviews your submission | Not an automated judge of your worth |
| Checkpoint | Self-check questions before the assignment | Not a trick exam |
| Prerequisite | A prior unit you must have done | Not "vibes" or "experience" |
| Stuck protocol | The 7-step method for getting unstuck | Not "just Google it" |

## Worked example

**Scenario:** You open unit U07 and the first `docker run` command fails with red text.

**Productive response (example notes you might write):**

```text
Last thing that made sense: Docker pulled the image successfully.
First thing that did not: "docker: Error response from daemon: port is already allocated."
I re-read Vocabulary: I understand "container" and "port" enough to see the clash.
I re-ran the exact worked example; the same error appeared.
I changed one thing only: I stopped the container I had left running from practice P2.
The command then succeeded.
Question for trainer: none today.
```

That note is excellent. It is specific and shows a method.

**Unproductive response:** closing the laptop and deciding "I am not a tech person." That decision is usually about teaching quality and pacing, not identity. Stay with the protocol.

## Common errors

### Error: Skipping "Why this exists" and jumping to the assignment

**What happens:** You complete steps you cannot explain. The written part of the assignment collapses.

**Fix:** Read why → teaching → example → checkpoints → practice → assignment.

### Error: Submitting a pile of files with no structure

**What happens:** The trainer cannot find your answers. Marking becomes unfairly harsh or delayed.

**Fix:** Follow the assignment's exact folder/file names. If unsure, include a one-line `SUBMIT.txt` listing what each file is.

## Checkpoints

Answer in your own words (not for submission unless your trainer says so):

1. What is the difference between practice and assignment in this course?
2. What are the first three steps of the stuck protocol?
3. Why is the rubric visible to you before you submit?

## Practice exercises

### P1 — Map a unit

Open this unit's folder. List every file you see. For each file, write one sentence: "This file is for …"

### P2 — Stuck protocol drill

Pick any technical sentence from this README you found slightly unclear. Run the stuck protocol on paper for that sentence (even if you later resolve it).

### P3 — Submission fantasy

Imagine you must submit a text answer and one screenshot of your terminal. Write the exact filenames you would use, e.g. `answers.md`, `terminal-01.png`. Consistency is the skill.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No installing Docker yet (that is U06).
- No commands or Dockerfiles.
- No packages, networks, or Compose.
- No "mindset hacks" beyond practical stuck behavior.

## Next unit

**U01 — What we are building toward** (the destination, explained honestly).
