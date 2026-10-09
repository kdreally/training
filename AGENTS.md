# AGENTS.md — Shared Teaching Doctrine for all training courses

This file is **for the AI author** (and any future author) who generates course units for any course in this repository.

It is **not** what the learner reads end-to-end. The learner receives **static unit materials** generated from this doctrine plus the course-specific `AGENTS.md` in each course folder. They study alone, do the work, and submit assignments to a **human trainer/assessor**. Every unit must stand on its own without a live coach.

---

## 1. Mission

Every course in this repository must:

- Take a learner from **first principles** to real, honest working skill.
- Explain *why* each step exists, not just *what* to type.
- Leave the learner slightly more confident than it found them.
- Let a human assessor judge any submission fairly from the unit's own rubric.

Success is not "they finished the modules." Success is: they can explain why each step exists, do the next step without guessing what a word means, and survive being stuck.

---

## 2. Who the learner is

### 2.1 Profile (shared assumptions)

- Has some prior contact with the subject (tutorials, unfinished courses, or related experience).
- Is **not** a confident practitioner. Prior teaching was often rushed, jargon-heavy, or discouraging.
- Default emotional state around new technical material: **confusion + fear of looking stupid**.
- Can follow numbered steps **if every term is defined first**.
- Can usually install software with a guide and use a terminal enough to follow directions.

### 2.2 What you must never assume

Never assume they already know (or remember) things specific to the course subject. Each course's own `AGENTS.md` lists the course-specific terms that must never be assumed. In general:

- Never assume prior tooling is installed or configured.
- Never assume they know what a particular command/file/setting *does* merely because they once typed it.
- Never assume they can read an error message without help.

### 2.3 Confidence is a learning objective

- Name confusion as normal.
- Separate **the learner** from **their work** ("the build failed" ≠ "you failed").
- Prefer slow clarity over impressive density.
- Never ask for a leap of faith when a short explanation would do.

---

## 3. Core pedagogical law

> **Never ask the learner to do a thing you have not first explained the hell out of.**

Corollaries:

1. **Explain before instruct.** Motivation → concept → vocabulary → tiny example → then a task.
2. **Why before what before how.**
3. **One new idea at a time.** A unit may *use* prior ideas; it may introduce only a small number of new ones.
4. **No ritual commands.** Every command appears only after the learner knows what it does, what success looks like, and what common failure looks like.
5. **Errors are curriculum.** Show common failures *before* or immediately after the first attempt, and decode them.
6. **Static materials must be self-sufficient.** No "ask your AI," no "google it," no "you'll see later" for something they need *now*.
7. **Define every term at first use** in that unit (or link back to the unit that defined it, with a brief restatement).

### 3.1 The "explain the hell out of it" checklist

Before any hands-on step that introduces a new tool or idea, the unit must answer:

1. What problem does this solve for a human?
2. What would we do without it (even if painful)?
3. What is the smallest honest definition in plain language?
4. What is it *not*?
5. What does the learner look at / type / run?
6. What does "it worked" look like?
7. What does a typical failure look like, and what do we do?

### 3.2 Forbidden teaching moves

- "Simply run…" / "Just install…" / "Obviously…" / "As you know…"
- Dumping a wall of new vocabulary in one paragraph.
- Showing a complete thing and only then explaining pieces (unless the unit is explicitly a guided tour after concepts exist).
- Using metaphors that require the thing being taught.
- Asking them to configure tooling they do not yet understand.
- Treating the assessor's rubric as secret. Rubrics are part of the learning materials.

### 3.3 Allowed, and preferred, teaching moves

- Plain language first, then the industry term.
- Tiny examples (5–20 lines) before larger ones.
- "Wrong on purpose" examples that show *why* a rule exists.
- Side-by-side: confusing error → decoded meaning → fix.
- Checkpoints: "If you can answer these three questions, you are ready for the exercise."
- Explicit "you are not expected to invent this yet" when showing a pattern they will only copy once.

---

## 4. Course shape

Each course defines its own curriculum map in its own `AGENTS.md`, but every course:

- Starts with an **Orientation phase** (how the course works, trust, honest scope).
- Builds a **concept dependency chain** and never inverts it.
- Returns to ideas with more precision later (spiral, not dump).
- Ends with at least one **capstone** unit where the learner combines skills on a small, real artifact.

Unit IDs are stable (`U00`, `U01`, …). Split a unit if it gets heavy; do not merge across phase boundaries without updating the course's map.

---

## 5. How a single unit must be written

### 5.1 Unit folder convention

```text
courses/<course-slug>/
  course/
    README.md                 # learner-facing course home
    units/
      INDEX.md                # full unit list
      U14-.../
        README.md             # the lesson (primary learner document)
        concepts.md           # optional deep dive
        exercises.md          # optional; may live in README for early units
        assignment.md         # graded work submitted to human assessor
        rubric.md             # how the assessor scores (visible to learner)
        solutions/            # assessors only — do not link from learner README
        fixtures/             # starter files if needed
        examples/             # complete tiny examples
```

### 5.2 Required sections in each unit `README.md`

1. **Where you are** — unit ID, title, phase; 2–4 sentences of orientation.
2. **What you will be able to do** — observable outcomes.
3. **What you need already** — prior unit IDs only.
4. **Time and energy** — honest estimate; permission to take breaks.
5. **Why this exists** — the human problem this unit solves.
6. **Plain-language teaching** — concepts with definitions before jargon.
7. **Vocabulary** — table: Term | Plain meaning | Common confusion.
8. **Worked example** — tiny, complete, copyable; every line justified.
9. **Common errors** — at least one realistic failure decoded.
10. **Checkpoints** — self-check questions before graded work.
11. **Practice exercises** — ungraded; increasing difficulty.
12. **Assignment** — pointer to `assignment.md` or inlined.
13. **How you will be assessed** — pointer to `rubric.md`; no surprises.
14. **What is *not* in this unit** — explicit scope fence.
15. **Next unit** — only the immediate next step.

### 5.3 Tone and voice

- Warm, adult, respectful. Not childish; not corporate.
- Second person ("you") for guidance; first person plural ("we") when exploring together.
- Short paragraphs. One idea per paragraph.
- When introducing a hard idea, **name the feeling**.
- Never shame. Never fake cheerfulness over real difficulty.

### 5.4 Code and commands in learner materials

- Always specify **filename** and **how to run it**.
- Show **expected output** exactly.
- Prefer complete files over fragments until they can mentally assemble fragments.
- Call out Windows/macOS/Linux differences when commands differ.

### 5.5 Assignments and assessment

- Tasks map 1:1 to the unit's outcomes.
- Provide exact submission format and a "definition of done" checklist.
- Include at least one **explain in your own words** prompt.
- Include at least one **predict then run** or **debug this broken snippet** task when appropriate.
- Never require tools not yet taught. Never require paid services.

**Rubric rules:** visible to the learner; observable criteria; separate must-have from nice-to-have; tell the assessor what evidence to look for.

**Assessor-only solutions** live under `solutions/`, are not linked from learner docs, and note partial credit and common wrong-but-thoughtful answers.

### 5.6 Difficulty ramps inside a unit

1. Read and predict.
2. Change one value; observe.
3. Fill in a blank.
4. Write a small piece from a specification.
5. Fix a broken example.
6. (Assignment) Combine skills under light novelty.

If a unit jumps from (1) to (6), rewrite it.

---

## 6. Language, accessibility, and inclusion

- Inclusive examples (names, contexts). No stereotypes.
- Portable scenarios (shopping lists, calendars, classroom rosters).
- No fast-internet or powerful-machine requirements beyond what the course itself teaches.
- Call out costs if any optional tool is not free.

---

## 7. Relationship between files

| File | Audience | Role |
|------|----------|------|
| `AGENTS.md` (this file) | AI / course authors | Shared teaching doctrine |
| `courses/<slug>/AGENTS.md` | AI / course authors | Course mission, audience, curriculum map, tech defaults |
| `README.md` (repo root) | Humans | What this repo is and where things live |
| `courses/<slug>/course/**` | Learners + assessors | Generated static units |
| `courses/<slug>/course/units/*/solutions/**` | Assessors only | Keys and grading notes |
| `docs/` (generated) | GitHub Pages | Static site built by `build.py` |

When doctrine and a generated unit conflict, fix the doctrine and fix the unit.

---

## 8. Revision rules

- Curriculum map changes are serious: update unit IDs, prerequisites, and any generated "What you need already" sections.
- Prefer additive clarification over silent renumbering.
- If a cohort struggles at the same cliff, add a bridge unit or split the unit; never say "try harder."

---

## 9. One-page reminder

1. Confused is the default — design for it.
2. Why → what → how → task.
3. Concepts before commands; context before installs.
4. Errors are curriculum.
5. Manual/understanding before automation/frameworks.
6. Every unit: teach, example, errors, checkpoint, practice, assignment, rubric.
7. Static materials stand alone for a human-assessed learner.
8. Confidence is part of the syllabus.
