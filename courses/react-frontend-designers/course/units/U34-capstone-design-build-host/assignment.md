# U34 Assignment — Capstone: design, build, and host

This is the full capstone deliverable. It combines everything from **U00–U33**.

Submit the following to your trainer in **one folder or zip** named:

`U34-YourName`

## 1. The build (source code)

Include your entire React project **except** `node_modules/`. A zip, or a link to a public GitHub repo, both work. Do not include `node_modules` — it is huge and can be regenerated with `npm install`.

Your project must contain:
- 3–6 components, each with a single clear job.
- At least one component driven by props.
- At least one stateful interaction using `useState`.
- A tokens file (for example `src/tokens.css`) used across components.
- A responsive layout with at least one breakpoint.
- A `vite.config.js` with the correct `base` for your hosting setup.

## 2. The live page (hosted URL)

Deploy the production build to GitHub Pages, exactly as taught in **U32**. Provide the public URL in `submission.md`.

If hosting genuinely fails after honest attempts, follow the stuck protocol and submit the exact error and failing URL. Do not invent a URL.

## 3. `design-reference` (your starting point)

A sketch, a Figma screenshot, or an exported image of the page you intended to build. A photo of a paper sketch is acceptable. Name it `design-reference.png` (or `.jpg`/`.pdf`).

## 4. `reflection.md` (explain in your own words)

Answer these prompts honestly. Short paragraphs are fine. This is graded; it is not optional.

1. **Plan.** Name your components and, for each, say whether it is static, uses props, or uses state. Explain why you split the page that way.
2. **Props.** Pick your props-driven component. Which values are props, and why does that make it reusable?
3. **State.** Pick your stateful interaction. What triggers the change, and what does the user see before and after?
4. **Tokens.** Name three tokens you used and where. What would happen if you changed one of them?
5. **Responsive.** Describe your layout at ≈375px and at ≈1024px. What changed at the breakpoint?
6. **Accessibility.** Which two checklist items were hardest to satisfy, and what did you do?
7. **Build and host.** In your own words, what did `npm run build` produce, and what did you have to set so the hosted page worked (the `base` path)?
8. **Hard part.** What was the most confusing moment, and how did you get unstuck? (Use the U00 stuck protocol vocabulary.)
9. **What you would change.** If you had another hour, what would you improve, and why?

## 5. `self-review.md` (check your own work)

Copy this checklist and mark each item `[x]` when true. Be honest — the trainer will verify it against the deployed site.

```markdown
## Structure
- [ ] I have 3–6 components, each with one clear responsibility.
- [ ] At least one component is driven by props.
- [ ] At least one interaction uses useState.

## Styling
- [ ] Color, spacing, and radius come from a tokens file.
- [ ] Changing one token changes the page consistently.
- [ ] No obvious one-off hex or pixel values remain in components.

## Responsive
- [ ] The page works at ≈375px wide.
- [ ] The page works at ≈1024px wide.

## Accessibility
- [ ] Exactly one <h1>; headings descend in order.
- [ ] Meaningful images have alt text; decorative ones use alt="".
- [ ] Every control has a visible or screen-reader label.
- [ ] Focus is visible when tabbing.
- [ ] Contrast is at least 4.5:1 for body text.
- [ ] Interactive elements are real buttons/links.
- [ ] The page works with the keyboard alone.

## Build and host
- [ ] `npm run build` succeeds.
- [ ] `npm run preview` shows the correct page.
- [ ] The hosted URL loads the styled page in a fresh tab.
- [ ] The browser console shows no 404 errors on the live site.
```

## 6. `submission.md`

```markdown
# Capstone submission — <your name>

- Brief chosen: <A / B / C — short description>
- Live URL: <https://...>
- Repo (if used): <https://github.com/...>
- Components: <comma-separated list>
- Props component: <name>
- Stateful component: <name>
- Breakpoint used: <e.g. 700px>

## One-sentence summary
<What your page does, in one sentence.>
```

## Definition of done

- All six parts present (`design-reference`, project source, `reflection.md`, `self-review.md`, `submission.md`, live URL).
- The hosted URL loads the styled page.
- The reflection is in your own words and references real decisions from your build.
- The self-review checklist is completed honestly.
- No `node_modules/` in the submission.

## If something is broken at submission time

Do not hide it and do not fake anything. Submit what works, describe what does not in `submission.md`, and include the exact error or failing URL. A partly working, honestly explained capstone is graded far more fairly than a polished description of code you did not actually run.
