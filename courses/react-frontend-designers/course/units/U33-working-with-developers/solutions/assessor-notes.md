# U33 Assessor notes (solutions — do not link from learner README)

## Model answer sketch

**Handoff Q1:** A modern handoff includes a component spec, a tokens file (or token references), a preview link to the running result, and review notes/acceptance criteria. A Figma file alone gives only the default appearance; it omits states, tokens, responsive rules, and accessibility, so the engineer must guess.

**Handoff Q2:** A tokens file is one source of truth mapping named decisions to values. Example: changing `--color-brand` once restyles every button/link/badge, instead of an engineer hunting for hex literals across files.

**Handoff Q3:** Any section works if justified. Example: omitting the Props table forces the engineer to invent the component's API, producing props that do not match the design's variations.

**Handoff Q4:** Accessibility in handoff is cheaper because it is a build instruction, not a later redesign. Two items: contrast ratios specified up front; labels/alt text supplied; focus order described; heading order specified; keyboard behavior listed. Any two, explained.

**Handoff Q5 (rewrite):** e.g. "At the 1024px breakpoint the sidebar overlaps the main card (see preview at ~1024px). The spec places them in a single column below 1100px. Can we stack them?"

**Review practice (examples):**
- Blocking: "At 375px the badge text wraps to two lines and overlaps the card border. Spec says single line, truncated. Please clamp to one line." (usability)
- Non-blocking: "Badge radius is `--radius-sm`; the mockup looks like `--radius-md`. Minor; your call."
- Question: "Is disabled state specified? I do not see it in the preview. Spec lists disabled." 
- Labels must match: blocking = breaks usability/a11y/intent.

**Bot decode:** The `.badge` element has a contrast ratio of 3.1:1; normal text requires 4.5:1. This is a contrast failure (per U24). Review comment: "Badge text contrast measures 3.1:1; spec requires 4.5:1 for normal text. Please darken `--color-sale-text` or lighten `--color-sale-bg` to meet 4.5:1."

## Expected artifacts

- A spec with purpose/anatomy/props/tokens/states/responsive/accessibility/do-not.
- Three review comments each containing observation + reference + request and a correct label.
- A rewritten weak comment naming a specific element and reference.

## Common wrong-but-thoughtful answers (award partial credit)

- Marks everything "blocking" to be safe. Explain the cost of blocking fatigue; award review points only for correctly-scoped items.
- Uses raw hex/px but explains the decision well ("brand purple #6B4EFF"). Award most spec points, lose the token-usage point, and note the fix.
- Believes the preview deploy *is* production. Briefly clarify; do not deduct if the review itself is sound.
- Decodes the contrast bot but misreads the numbers (says "4.5:1 is the actual"). Correct the ratio; award fix-phrasing if present.

## Grading in 3 minutes

1. Confirm the spec's eight sections exist; skim states + accessibility.
2. Check review comments for the three-part pattern and correct labels.
3. Read Handoff Q5 rewrite for specificity.
4. Read the bot decode for contrast + a concrete fix.
5. Confirm checklist present and honest.
