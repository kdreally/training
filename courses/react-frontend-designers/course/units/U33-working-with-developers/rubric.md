# U33 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Component spec is complete (all required sections present) | 4 | Yes | `component-spec.md` |
| Spec uses tokens/variables, not raw one-off values | 3 | Yes | `component-spec.md` |
| Spec states cover at least four meaningful states | 3 | Yes | `component-spec.md` |
| Spec accessibility notes are specific and implementable | 3 | Yes | `component-spec.md` |
| Handoff artifacts explained (spec + tokens + preview + review) | 3 | Yes | `handoff-notes.md` Q1 |
| Tokens explained with a concrete example | 2 | Yes | `handoff-notes.md` Q2 |
| Weak comment rewritten with observation + reference + request | 3 | Yes | `handoff-notes.md` Q5 |
| Three review comments use the pattern and correct labels | 3 | Yes | `review-practice.md` |
| Bot comment decoded accurately (failure + fix phrasing) | 2 | No | `review-practice.md` |
| Checklist present and honest | 1 | No | `checklist.md` |

### Partial credit notes (assessors)

- Spec completeness: award 3/4 if one minor section is thin; 1–2 if states or accessibility are missing entirely.
- Token usage: award 0 if the spec is all hex/pixel literals; award partial if a few tokens are named but most values are raw.
- Q5 (rewrite): full only if the rewritten comment names a specific element and a reference (breakpoint, token, or state).
- Review practice: each of the three comments is worth 1 point; label must match content (a "blocking" comment about a 1px preference loses its point).
- Bot decode: must map 3.1:1 < 4.5:1 to a contrast failure and phrase a fix; "it failed accessibility" alone gets 1/2.
- Do not penalize imperfect English or unknown exact token names. Penalize taste-only feedback and hand-waving.

### Common weak submissions

- Spec is really a mockup description: no props table, no states.
- States listed as "normal, normal-hover" with no loading/error/empty/disabled.
- Review comments like "looks good" or "make it pop."
- Labels used carelessly: everything marked blocking.
- Bot comment decoded as "the badge is fine."
- Accessibility section says only "make it accessible."
