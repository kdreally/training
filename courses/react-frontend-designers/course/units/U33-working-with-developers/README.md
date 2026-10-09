# U33 — Working with developers

**Phase 6 — Shipping and craft**

## Where you are

You can now design a page, build it in React, and put it online. Most real work is not solo, though. You will hand designs to engineers, and engineers will hand code back to you for review. That exchange has its own vocabulary, and getting the words right is the difference between a smooth build and a week of "that is not what I meant."

This unit is about the handoff loop: **design → code → review → fix**. You will learn what to give an engineer so they build the thing you designed, and how to review their work like a designer without reading every line of code.

## What you will be able to do

- Explain what a **design system** and a **tokens file** give an engineering team.
- Write a **component spec** an engineer can build from without guessing.
- Do a **visual QA pass** on a pull request: compare the deployed preview to the design, across states and screen sizes.
- Phrase review feedback so it is specific, evidence-based, and easy to act on.
- Include **accessibility notes** in a handoff instead of leaving them implicit.

## What you need already

- **U22** — design tokens (color, spacing, radius) as CSS variables.
- **U23** — responsive layouts and breakpoints.
- **U24** — accessibility basics: semantics, labels, contrast, focus.
- **U13** and **U17** — props and state, so specs and review comments use the same words the code does.
- **U31** and **U32** — builds and hosting, so you can read a preview link.

## Time and energy

About **60–90 minutes**. There is no terminal work in this unit, which may feel strange this late in the course. The effort here is writing and judgment. Keep a real or imagined component in mind as you read so the templates have something to attach to.

## Why this exists

Handoff is where good design quietly dies. A beautiful mockup with no states, no spacing rules, and no accessibility notes becomes a broken build six weeks later. Engineers are not mind-readers, and they are usually not designers. When the design is ambiguous, they make reasonable guesses — and those guesses are what ship.

The flip side is review. If your only feedback is "make it feel cleaner," nobody can act on it, and you will be re-reviewing the same thing forever. Designers who learn to hand off precisely and review kindly-but-clearly are trusted with more of the product. This unit is that skill, made explicit.

## Plain-language teaching

### What "handoff" means

**Handoff** is the moment design work moves to whoever builds it. In the old model, a designer exported screens and threw them over a wall. In the modern model, design and engineering work in a loop: design, build, review, adjust, repeat.

Handoff is not a single event. It is a **conversation carried by artifacts**: a spec, a tokens file, a preview link, and review notes on the code. Each artifact answers a question the engineer would otherwise have to guess.

**What it is *not*:** handoff is not "here are the pixels, good luck." A Figma file alone is not a handoff; it is raw material.

### What a design system and a tokens file give engineers

A **design system** is your team's shared library of visual decisions: colors, type scale, spacing, radii, shadows, and the rules for using them, plus the components built from them.

The machine-readable heart of a design system is the **tokens file**. **Design tokens** are named values for those decisions — `--color-brand`, `--space-3`, `--radius-md` — defined once and reused everywhere. In **U22** you wrote these as CSS custom properties. That same file is gold to an engineer.

Why engineers love a tokens file:

- **One source of truth.** Changing `--color-brand` updates every button, link, and badge at once, exactly like editing a color *style* in a design tool.
- **No guessing.** They write `var(--space-3)`, not `padding: 11px`, so the spacing matches your scale.
- **Reviewable.** A missing token or a hard-coded hex is obvious in review.

**Design bridge:** tokens are to code what shared styles and variables are to a design tool. You already do this instinctually; a tokens file just exports the habit for machines.

### Writing a component spec

A **component spec** is a short document describing one component precisely enough to build. It is the modern, precise version of the old "redline." Keep it to one page. A useful template:

```markdown
# Component: PriceTag

## Purpose
Shows the current price, with an optional strikethrough original price.

## Anatomy
- Label (optional, e.g. "Sale")
- Current price (required)
- Original price (optional, shown struck through)

## Props
| Prop | Type | Required? | Default | Notes |
|------|------|-----------|---------|-------|
| currentPrice | number | Yes | — | Rendered with currency symbol |
| originalPrice | number | No | none | If present, shown struck through |
| label | string | No | none | Small uppercase badge |

## Tokens used
- Text: --color-text, --color-text-muted
- Badge: --color-sale-bg, --color-sale-text
- Spacing: --space-1, --space-2
- Radius: --radius-sm

## States
- Default
- With original price
- Loading (skeleton)
- Truncation: long prices must not overflow the container

## Responsive
- Same at all breakpoints; text wraps rather than clips.

## Accessibility
- The struck-through original price includes a screen-reader label "was" so it is not read as the current price.
- Contrast of badge text on badge background meets 4.5:1.
- Price is text, not an image.

## Do not
- Do not hard-code hex colors; use tokens.
- Do not make the whole tag a link; the product title links, not the price.
```

Every section exists to remove a guess. Props match the vocabulary from **U13**; states match the interactive thinking from **U17**.

### Reviewing a pull request as a designer

A **pull request (PR)** is a proposed change to the code, stored on GitHub, that teammates can review before it is merged. When an engineer opens a PR, you can:

- Read the **description** (what they changed and why).
- Open the **preview deploy** — a temporary link, often auto-created by the host or a service, showing the change running.
- Add **comments** on specific lines or on the PR overall.
- Mark comments **blocking** (must fix before merge) or **non-blocking** (nice to have).

**Visual QA** is your job on a PR: you compare the running preview to the design, on purpose, across the cases that break.

Your visual QA checklist:

1. **Default state** matches the design.
2. **Interactive states**: hover, focus, active, disabled, loading, error, empty.
3. **Screen sizes**: at least one narrow (mobile) and one wide breakpoint, per **U23**.
4. **Content stress**: very long text, very short text, missing image, zero items.
5. **Tokens**: spacing, color, and radius match the scale (not one-off values).
6. **Accessibility**: keyboard focus visible, labels present, contrast passes, heading order sane, per **U24**.
7. **Regression**: things that worked before still work.

**What it is *not*:** visual QA is not reading the source code. Review the running result. If you spot a code detail (like a hard-coded color), point it out, but you do not need to understand every line to do your job well.

### Communication vocabulary (and how to phrase feedback)

Good review feedback has three parts: **observation** (what you see), **reference** (the design or token it should match), and a **question or request**.

**Weak:** "This button feels off." — Nobody can act on it.
**Strong:** "The primary button's padding looks like 12px, but the spec uses `--space-4` (16px). Is this intentional, or should it match the token?" — Observable, specific, actionable.

More phrasing patterns:

- "In the design, the card gap is `--space-3`; here it looks like `--space-2`. Which is right?"
- "On a 375px-wide screen the title overlaps the image. Can we wrap it?"
- "The focus ring is not visible when I Tab to the link. Blocking: keyboard users cannot see where they are."
- "Non-blocking: the badge is 1px wider than the mockup; fine to leave if it matches the token."

**Blocking** vs **non-blocking** matters. Reserve blocking for things that break usability, accessibility, or the design's intent. Everything else is a preference, and preferences noted kindly keep the relationship healthy.

### Accessibility notes in handoff

Accessibility is cheapest when it is a handoff artifact, not a bug report later. Put it in the spec, in words an engineer can implement:

- **Contrast:** state the required ratio (4.5:1 for body text, 3:1 for large text and UI borders).
- **Labels:** say which controls need a visible or screen-reader-only label; a placeholder is not a label.
- **Focus order:** describe the intended Tab order for interactive parts.
- **Alt text:** provide the actual alt text for meaningful images; mark decorative images as decorative.
- **Heading order:** specify which text is the h1, h2, and so on — one h1 per page.
- **Keyboard:** list any custom interaction that must work without a mouse.

These lines cost you two minutes and save an engineer a redesign.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Handoff | Moving design to whoever builds it, with artifacts | Not a single export moment |
| Design system | Shared library of tokens, rules, and components | Not just a UI kit file |
| Design token | A named value like `--space-3` for a design decision | Not a raw pixel value |
| Tokens file | The CSS/token file holding all tokens | Not the whole design system |
| Component spec | One-page precise description of a component | Not the same as a mockup |
| Pull request (PR) | A proposed code change open for review | Not a finished merge |
| Diff | The lines that changed in a PR | Not the whole file history |
| Preview deploy | A temporary live link showing a PR running | Not production |
| Review | Comments on a PR before merging | Not a rewrite of the code |
| Blocking comment | Must fix before merge | Not "I dislike it" |
| Non-blocking comment | Nice to have; can be ignored | Still worth writing down |
| Regression | Something that worked before but broke | Not a new bug from new code |
| Acceptance criteria | The stated conditions for "done" | Not the same as the design |
| Visual QA | Comparing the running preview to the design | Not reading source code |

## Worked example

**Scenario:** An engineer opens a PR adding the `PriceTag` component. You review it.

**The PR description** reads: "Adds PriceTag per spec. Preview: `https://preview.example.app/pr-142/`."

**Your visual QA, written as review comments:**

```text
Default state: matches spec. Good.

Blocking:
- At 375px wide, a long price like "$1,234,567.89" overflows the card.
  It should wrap or truncate. Test with the longest price in the spec.

Non-blocking:
- Badge text contrast looks under 4.5:1 (light orange on white).
  Spec calls for --color-sale-text on --color-sale-bg. Can we confirm the ratio?

Questions:
- The struck-through original price is read as the current price by my screen
  reader. Spec asked for a "was" label. Was that included?
```

That review is specific, uses design vocabulary, separates blocking from nice-to-have, and never says "this feels wrong." An engineer can work through it in minutes.

## Common errors

### Error 1 — Handing off only the default state

**What happens:** You provide one screen showing the normal state. The engineer builds exactly that. Later, hover, focus, disabled, loading, and error states are invented by the engineer — and they do not match your intent.

**Fix:** In every spec, list the states explicitly (default, hover, focus, disabled, loading, error, empty). Even "there is no hover state" is useful information.

### Error 2 — Feedback as taste instead of evidence

**What happens:** A comment like "the spacing feels cramped" leads to a guessing game and re-review.

**Fix:** Name the token, the breakpoint, and what you observed: "The gap is `--space-1`; the spec says `--space-3`. Which should ship?"

### Error 3 — Reviewing the code instead of the preview

**What happens:** You spend an hour reading JavaScript you are still learning, feel out of your depth, and miss an obvious visual bug visible in the preview.

**Fix:** Review the running result first. Compare it to the design across states and screen sizes. Read code only to confirm a specific suspicion (like a hard-coded color).

### Error 4 — Treating accessibility as someone else's job

**What happens:** Accessibility never appears in the design or the spec, so it never appears in the build. It becomes a costly fix later.

**Fix:** Add the accessibility checklist to your handoff template so it is never optional.

### Decoding a failure — a vague review comment

You receive this on your own PR and cannot tell what is wanted:

```text
This doesn't feel like the design.
```

**Decoded:** This is a taste statement with no observation, reference, or request. It is not actionable. Your move is not to guess-rebuild, but to ask one clarifying question: "Which element, and which token or screen should it match?" You can also model the good behavior yourself by turning a future comment of yours into observation + reference + request. Reading vague feedback is a skill too — it usually means "look at this area again," not "change everything."

## Checkpoints

Answer in your own words:

1. What three kinds of artifact make up a modern handoff?
2. What does a tokens file save an engineer from doing?
3. What are the three parts of actionable review feedback?
4. Name three items from the visual QA checklist.

## Practice exercises

### P1 — Read and predict

Take the `PriceTag` spec above. Before reading the "States" section, write down the states you think it should have. Then compare. What did you miss?

### P2 — Change one value; observe

Rewrite the weak comment "the badge color is weird" as a strong comment with observation, reference, and request.

### P3 — Fill in the blank

Complete: "A blocking comment is for issues that ____; a non-blocking comment is ____."

### P4 — Write a small spec

Pick one component you have built in this course (a button, a card, a header). Write a one-page spec using the template. You are not expected to get every token name right — name the *decisions* and where they come from.

### P5 — Decode a bot comment

An accessibility checker leaves this on a PR:

```text
[contrast-checker] Element .badge has contrast ratio 3.1:1 (required 4.5:1 for normal text).
```

Explain in your own words what failed, which vocabulary from this unit it maps to, and how you would phrase the fix as a review comment.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). Read it before you start.

## What is *not* in this unit

- No writing production code or fixing the PR yourself.
- No Git command line — PRs are handled through GitHub's website, as introduced in U32.
- No deep code review of logic, performance, or architecture.
- No tooling setup (no Storybook, no design-token pipelines).
- No negotiation skills beyond clear, kind phrasing.

## Next unit

**U34 — Capstone: design a page, build it in React, host it** (the full deliverable that combines everything from U00 to U33).
