# U34 — Capstone: design a page, build it in React, host it

**Phase 6 — Shipping and craft**

## Where you are

This is the last unit. Everything from U00 to U33 comes together here. You will choose one page (or use a brief below), design it, build it from **3–6 React components**, style it with tokens and a responsive layout, meet an accessibility checklist, produce a production build, and host it at a public URL.

There is no brand-new concept in this unit. That is deliberate. A capstone is not a harder lesson; it is proof that you can *combine* the pieces you already learned without being walked through each one. If you feel a flicker of "wait, can I actually do this alone?" — that is the normal feeling at the start of a capstone. The answer is yes, and the unit tells you exactly what "done" looks like so nothing is a mystery.

## What you will be able to do

- Plan a single page and break it into 3–6 components.
- Implement at least one component driven by **props** and at least one **stateful interaction** with `useState`.
- Apply a shared **tokens** file for color, spacing, and radius.
- Make the layout **responsive** across at least one breakpoint.
- Meet a short **accessibility checklist**.
- Run a **production build** and **host** the result at a live URL.
- Explain your decisions in your own words and review your own work against a checklist.

## What you need already

The whole course, in order: **U00–U33**. In particular:

- **U13–U17** — props, composition, lists, conditions, state.
- **U21–U25** — component CSS, tokens, responsive layout, accessibility, assets.
- **U31** — `npm run build` and `dist/`.
- **U32** — GitHub Pages hosting and the `base` path.

If any of those feel shaky, revisit the specific unit before starting. A capstone is the wrong place to learn props for the first time.

## Time and energy

Plan for **one focused evening, roughly 4–6 hours**, and you may split it across two sittings. Suggested split:

- Sitting 1 (60–90 min): choose the brief, sketch the page, list the components, decide props and state.
- Sitting 2 (2–4 hours): build, style, make it responsive, check accessibility.
- Sitting 3 (30–45 min): build for production, host it, write the reflection and self-review.

Breaks are part of the method, not a delay. Designers know that stepping away reveals mistakes fresh eyes would catch. Use that.

## Why this exists

You have practiced each skill in isolation. Real work never arrives isolated. A real page needs structure, data, interaction, styling, responsiveness, accessibility, and delivery at the same time. This unit is that real thing, at a size you can finish in an evening.

The second reason is evidence. A hosted URL plus source code plus a reflection is a **portfolio artifact**. You can show it to an employer, a client, or a collaborator, and you can explain every decision in it. That is what this course was for.

## Plain-language teaching

### What a capstone is

A **capstone** is a final piece of work that uses many earlier skills at once, on a small but genuine artifact. It is graded more holistically than a normal assignment: not "did you remember function X" but "does this hang together as a real page."

**What it is *not*:** a capstone is not a test designed to trick you, and it is not an excuse to build an entire app. Scope is your friend here. One page, done well, beats five pages half-finished.

### Scope fence: one page, 3–6 components

Keep the build to **one page** with **3–6 components**. The example below breaks a library events page into five:

```text
App
├── Header            (name + nav links)
├── EventList         (maps over events -> EventCard)
│   └── EventCard     (props: title, date, category)
├── RsvpToggle        (state: going / not going)
└── Footer
```

Every component has a single clear job. `EventCard` is configured by **props** (the same idea as layer properties, from U13). `RsvpToggle` holds **state** (useState, from U17) so the page responds to clicks.

### Choose a brief (or bring your own)

You may use one of these, or a page of your own that meets the same requirements.

**Brief A — Community Library Events.** A page listing upcoming library events. A header with the library name; a list of event cards (title, date, category); a "filter by category" control; an RSVP toggle button; a footer. Content: make up 4–6 events.

**Brief B — Plant Shop Product Page.** A page for one plant: a nav, a product image, product details (name, price, description), a quantity selector with increase/decrease, and care tips. Content: one plant, a few care facts.

**Brief C — Your own single page.** Anything small and real: a personal portfolio landing, a coffee shop menu, a classroom roster. It must meet every requirement below.

### The requirement checklist

Your page must include all of these. They map directly to the rubric.

1. **3–6 components**, each with a single clear responsibility.
2. At least one component driven by **props**.
3. At least one **stateful interaction** using `useState` (for example a toggle, a quantity, an open/closed panel).
4. A **tokens file** (like `tokens.css`) holding color, spacing, and radius values used across components. No scattered one-off hex values.
5. A **responsive layout** that works at both a narrow (≈375px) and a wide (≈1024px) width, using at least one breakpoint from U23.
6. The **accessibility checklist below**, satisfied.
7. A working **production build** (`npm run build`) that you have previewed with `npm run preview`.
8. A live **hosted URL** (GitHub Pages, per U32).

### The accessibility checklist

Keep this short and check every line:

- One `<h1>` on the page; headings descend in order (no skipping h2 → h4).
- Every meaningful image has descriptive `alt` text; decorative images use empty `alt=""`.
- Every form control (input, button) has a visible label or an `aria-label`.
- Focus is visible when you press `Tab` through interactive elements.
- Text contrast is at least **4.5:1** against its background; large text and UI borders at least **3:1**.
- Interactive elements are real `<button>` or `<a>` elements, not clickable `<div>`s.
- The page works with the keyboard alone.

### Design reference: show your starting point

A capstone is a *design-and-build* unit. Submit a **design reference** — a sketch, a Figma screenshot, or an exported image of the page you intended. It does not need to be polished. A photo of a paper sketch is fine. The point is to show the intention you then built, so your assessor can compare intent to result.

### How this is graded

The rubric is built so a trainer can score your work in a few minutes:

1. Open your hosted URL. See the page. (30 seconds)
2. Confirm the required elements are visibly present. (1–2 minutes)
3. Run your project: `npm install`, `npm run build`, `npm run preview`. (2–3 minutes)
4. Skim your source for components, props, state, and tokens. (1–2 minutes)
5. Read your reflection. (1–2 minutes)

To make that possible, submit clean, clearly named files. Confusing structure costs you points you actually earned.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Capstone | Final project combining many skills | Not a new lesson; it combines prior ones |
| Scope | How much you are building | Not "more is better" |
| Deliverable | A thing you submit for grading | Not your scratch files |
| Design reference | Your sketch or mockup of intent | Not judged on polish |
| Token file | Shared CSS values (color, spacing, radius) | Not per-component one-off values |
| Breakpoint | A screen width where layout changes | Not a device brand |
| Stateful interaction | Something that changes on user action | Not just a hover animation |
| Hosted URL | The public web address of your page | Not `localhost` |
| Reflection | Short written explanation of choices | Not a copy of the README |
| Self-review | Checking your own work against a checklist | Not the same as the trainer's rubric |

## Worked example

**Scenario:** You chose Brief A, the library events page. Here is a compact plan — not a full build, just the decisions you make *before* coding.

**Components:**

```text
Header      — library name + nav (static)
EventList   — maps events array to EventCard (U15)
EventCard   — props: title, date, category (U13)
RsvpToggle  — useState: going / not going (U17)
Footer      — small print (static)
```

**Tokens (`src/tokens.css`):**

```css
:root {
  --color-bg: #f7f5f0;
  --color-text: #1f2933;
  --color-brand: #4a5d23;
  --color-card: #ffffff;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --radius-md: 10px;
}
```

Every component uses these names. `EventCard` writes `background: var(--color-card)`, not `#ffffff`.

**State plan:** `RsvpToggle` holds `const [going, setGoing] = useState(false)` and flips between "RSVP" and "Going ✓". `EventList` filters events by a category held in `App`.

**Responsive plan:** the event list is one column below 700px and a two-column grid at 700px and above, using a media query from U23.

**Build and host plan:** set `base: '/library-events/'` in `vite.config.js` *before* building, so the hosted assets resolve (this is the U32 trap, planned for, not hit by accident).

**Then:** `npm run build`, `npm run preview` to check, upload `dist/` contents to the `library-events` repo, enable Pages, confirm the live URL.

A plan like this takes fifteen minutes and saves an evening of false starts. You are not expected to invent a better process — copy this shape.

## Common errors

### Error 1 — Scope creep

**What happens:** "While I am here, I will add a second page, a search bar, and dark mode." The evening ends with three half-built features.

**Fix:** Re-read the scope fence. One page, 3–6 components, one stateful interaction. Extra ideas go in a "later" list, not the build.

### Error 2 — Only the default state

**What happens:** The page looks right at first glance, but the RSVP toggle has no visible focus, the empty list shows a blank gap, and long titles overflow.

**Fix:** Test the interactive states and content stress (very long text, empty list) before you call it done. This is exactly the visual QA habit from U33, turned on your own work.

### Error 3 — Hard-coded values everywhere

**What happens:** Colors, spacing, and radii are typed directly into each component. The tokens file exists but is barely used.

**Fix:** If you change `--color-brand` once and the whole page follows, you did it right. If not, replace the literals with `var(--...)`.

### Error 4 — Hosted page is blank after deploy

**What happens:** The build uploaded, but the page is blank and the console shows a 404 for a `.js` file.

**Decoded:** The `base` path is wrong for your project site. This is the U32 failure. Set `base: '/<repo-name>/'`, rebuild, re-upload, hard refresh. Plan for it and it takes one minute; discover it at 1 a.m. and it takes thirty.

### Error 5 — "It works, but I cannot explain why"

**What happens:** You copied patterns you half-remember, and the reflection section collapses.

**Fix:** Before submitting, answer the reflection prompts out loud. If you cannot explain a decision, revisit the unit that taught it. The reflection is graded precisely because understanding is the point.

## Checkpoints

Before you submit, confirm all of these:

1. The hosted URL loads my styled page in a fresh tab.
2. I have 3–6 components, each with one clear job.
3. At least one component takes props; at least one uses `useState`.
4. A tokens file drives color, spacing, and radius across components.
5. The page works at ≈375px and ≈1024px.
6. I checked every line of the accessibility checklist.
7. `npm run build` and `npm run preview` both succeed.

## Practice exercises

These lead directly into the capstone; do them before or while planning.

### P1 — Read and predict

Read all three briefs. Write one sentence for each explaining what it would teach you. Pick one. Do not start building yet.

### P2 — Plan the components

On paper, draw your page as nested boxes and name each box a component. Does each have one job? Is it 3–6 of them?

### P3 — Decide props and state

For each component, write "static," "props," or "state." You must have at least one of each of props and state.

### P4 — Token draft

List the colors, spacing steps, and radii your page needs. Give each a token name. You now have your `tokens.css` plan.

### P5 — Accessibility dry run

Walk the accessibility checklist against your *plan*. Fix problems on paper, where they are free.

## Assignment

See [assignment.md](./assignment.md). This is the complete capstone deliverable.

## How you will be assessed

See [rubric.md](./rubric.md). It is designed to be scored in a few minutes; read it before you build so you know exactly what evidence to submit.

## What is *not* in this unit

- No new React concepts — this unit combines U00–U33.
- No multi-page apps, routers, or backends.
- No testing frameworks, TypeScript, or CI pipelines.
- No paid tools or hosts.
- No requirement for a polished visual design; the requirement is a working, accessible, well-structured page.

## Next unit

There is no next unit — this is the end of the course. After you submit, you will have a hosted page, its source, and the ability to explain every choice in it. That is a genuine portfolio piece, not a certificate. Well done for reaching the end.
