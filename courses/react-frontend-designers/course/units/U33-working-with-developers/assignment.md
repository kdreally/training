# U33 Assignment — Spec it, hand it off, review it

Submit the following to your trainer in **one folder or zip** named:

`U33-YourName`

## Files to submit

### 1. `component-spec.md`

Write a one-page component spec using the template from the unit. You may reuse a component you built earlier in the course, or design a new small one. It must be plausible enough that an engineer could build it without asking you questions.

Required sections:
- Purpose
- Anatomy
- Props table (name, type, required?, default, notes)
- Tokens used (name the decisions and the token names, e.g. `--space-2`)
- States (at least default plus three others)
- Responsive behavior
- Accessibility notes
- Do not (at least one)

### 2. `handoff-notes.md`

Answer these prompts in your own words:

1. **Handoff artifacts.** In 4–6 lines, explain what a modern handoff includes and why a Figma file alone is not enough.
2. **Tokens.** In your own words, what does a tokens file give an engineer? Give one concrete example of a change that becomes easy because of tokens.
3. **Spec reasoning.** Pick one required section from your spec and explain what would go wrong if you omitted it.
4. **Accessibility notes.** Why is accessibility cheapest when it is in the handoff rather than reported later? Reference at least two items from the unit's accessibility list.
5. **Explain in your own words.** Rewrite this weak review comment as a strong, actionable one: *"The layout looks weird on my laptop."* Use the observation + reference + request pattern.

### 3. `review-practice.md`

Imagine an engineer opened a PR adding your component. Write **three** review comments for it:

- One **blocking** comment (a real usability or accessibility problem).
- One **non-blocking** comment (a preference or small polish).
- One **question** comment (something to confirm, not assume).

Each must use observation + reference + request, and each must name a token, a state, a breakpoint, or an accessibility rule. Label each as Blocking, Non-blocking, or Question.

Then decode this bot comment in 2–4 lines and say how you would turn it into a review comment:

```text
[contrast-checker] Element .badge has contrast ratio 3.1:1 (required 4.5:1 for normal text).
```

### 4. `checklist.md`

Copy and mark each item `[x]` when true:

```markdown
- [ ] My spec lists at least four states (not only the default).
- [ ] My spec uses token names, not raw pixel or hex values.
- [ ] My spec has an accessibility section with specifics.
- [ ] Each of my three review comments contains observation + reference + request.
- [ ] One comment is explicitly blocking and one is explicitly non-blocking.
- [ ] I typed the bot comment's ratio and required value correctly when decoding it.
```

## Definition of done

- All four files present with the names above.
- The spec could be built by a competent engineer without follow-up questions.
- Review comments are specific and reference evidence, not taste.
- The bot comment is decoded in your own words.

## If you have never received a real PR

That is completely fine. This unit's review practice is simulated. Use your own component and write the comments as if the PR existed. The skill being graded is the phrasing and the criteria, not access to a live repo.
