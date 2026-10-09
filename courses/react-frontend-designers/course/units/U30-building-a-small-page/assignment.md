# U30 Assignment — Build a small page, end to end

Submit the following to your trainer in **one folder or zip** named:

`U30-YourName` (use your real name or student id as they prefer)

## What you are building

A small page that combines the skills from Phase 5 (and the units before it). You may build the **Studio Shop product grid** from the lesson, or your own equivalent small page.

Requirements:

- **3–6 components** composed into one page.
- **One stateful interaction** driven by a control (a filter, a search, a toggle, or a select). The lesson's product filter is the model.
- A **list** rendered with `map` and stable `key`s.
- At least one **conditional render** (for example, an empty state).
- **Design tokens** in one token file, referenced throughout (U22).
- A **responsive layout** that reflows from multiple columns to one (U23).
- **Accessible markup**: a labeled input, heading structure, meaningful `alt` text, and visible focus (U24).
- One **CSS transition** on an interactive element, respecting `prefers-reduced-motion` (U29).
- State lifted to the correct parent (U26).

Keep it small. A single evening should be enough if you build in stages.

## Files to submit

### 1. Your project files

Include:

- All component files you wrote.
- Your data file (local, no server).
- Your CSS files and token file.
- `App.jsx` and `main.jsx` if you changed them.

If your project has many files, include only the ones you touched and say so in `answers.md`.

### 2. `answers.md`

Answer these prompts in your own words. Do not paste lesson text back unchanged.

1. **Page plan.** Before building, you should have made a plan. Reproduce it here: list your components and mark where the shared state lives. If you wrote the plan after starting, say so honestly and give the plan for the finished page.
2. **Build order.** Describe the order in which you built the page and one thing that went wrong (or almost did) because of ordering. If nothing went wrong, describe how a checkpoint caught a problem.
3. **Data flow.** Trace one value from its source to where it is displayed. Name the component that owns it and each component it passes through.
4. **Derived data.** Is your filtered/derived list stored in `useState`? Explain in two or three sentences why or why not, using the phrase "single source of truth."
5. **Tokens.** Name three tokens you used and where. Explain one benefit of tokens over typing values directly.
6. **Responsive.** Describe what your layout does at a narrow width. Name the technique that makes it reflow.
7. **Accessibility.** Name two accessibility choices and what each gives a user. Include how focus stays visible.
8. **Predict then run.** Before running, predict which products or items appear when the control is set to a specific value. Then run it and record what appeared. If they differ, explain why.
9. **Error reading.** Copy one real error or console warning that appeared while combining your parts (a `key` warning, a 404, an `undefined` read). Decode it: what caused it, and how did you fix it?
10. **Design bridge.** In two or three sentences, connect building the page in stages to presenting a design in review: how does showing a working draft at each stage compare to presenting only the finished comp?

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] My page has 3–6 components, each with one clear job.
- [ ] One control changes what is displayed.
- [ ] The shared value lives in one parent (not duplicated in children).
- [ ] The list uses a stable, unique `key`.
- [ ] There is an empty or conditional state.
- [ ] Colors/spacing come from a token file, not scattered values.
- [ ] The layout reflows to one column on a narrow screen.
- [ ] The main input has a `<label>`; images have appropriate `alt`; focus is visible.
- [ ] There is a CSS transition with a `prefers-reduced-motion` rule.
- [ ] I read the U30 rubric before writing answers.md.
```

## Definition of done

- A single page that works from top to bottom, built in stages.
- All eight requirements above are observable in the running page.
- `answers.md` present and in your own words.
- `checklist.md` completed honestly.
- No errors or warnings in the browser console while the page is open.

## Submission format

Put everything inside one folder named `U30-YourName`. Compress it only if your trainer asks. If your file names differ from the suggestions, list them at the top of `answers.md`.
