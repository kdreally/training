# U34 Assessor notes (solutions — do not link from learner README)

## Model answer sketch

The model capstone is any one-page app that satisfies the requirement checklist. Brief A (Library Events) maps cleanly:

```text
src/
  main.jsx
  App.jsx            — holds events array + selected category (state)
  tokens.css         — color, space, radius tokens
  components/
    Header.jsx
    EventList.jsx    — maps events -> EventCard (props)
    EventCard.jsx    — props: title, date, category
    RsvpToggle.jsx   — useState: going / not going
    Footer.jsx
```

- **Props:** `EventCard` receives `title/date/category`.
- **State:** `RsvpToggle` uses `useState(false)`; `App` may hold the category filter.
- **Tokens:** components use `var(--color-card)`, `var(--space-4)`, `var(--radius-md)`.
- **Responsive:** one column below 700px; two-column grid at 700px+.
- **Accessibility:** one `<h1>`, real `<button>` for RSVP, visible `:focus-visible` ring, alt text on any images, 4.5:1 contrast.
- **Host:** `base: '/library-events/'` in `vite.config.js`, `npm run build`, upload `dist/` contents, Pages on `main` / root.

## Reflection key (what "specific" looks like)

- Q1–Q3: names actual components and the reason for the split; distinguishes props from state.
- Q4: names real tokens and predicts the ripple effect of changing one.
- Q5: describes the concrete layout change at the breakpoint.
- Q6: names two hard items and the fix attempted.
- Q7: explains the build output and the `base` setting in their own words.
- Q8: uses the U00 stuck-protocol vocabulary (last thing that made sense, first that did not, what they tried).
- Q9: a concrete improvement, not "make it prettier."

## Expected artifacts

- A live URL on the pattern `https://<username>.github.io/<repo>/` loading styled content.
- Source without `node_modules/`.
- `design-reference.*`, `reflection.md`, `self-review.md`, `submission.md`.

## Common wrong-but-thoughtful answers (award partial credit / clarify)

- Uses `<div onClick>` because they did not know better. Award accessibility group points for the ones met; note this specifically as a fix and point to U24.
- Filters/lists using a separate `events` file but says "props" for data fetched internally. Clarify the distinction; award props point if a genuine prop exists elsewhere.
- Believes the tokens file alone counts, while components hard-code values. Award partial token points and show the "change one token" test.
- Submits source as a repo that also contains `node_modules`. Do not penalize capability; note it as a clean-submission miss (nice-to-have).
- Hosted page blank with a documented `base` 404. Apply the honest-failure rule: cap live-page at 4/8 and check `npm run preview` locally.

## Grading in 3 minutes

1. Click the live URL; mark 8 or fall to honest-failure rule.
2. Open the source; count components, find `useState`, find a props parameter, find `var(--`.
3. Resize the live page to ≈375px and ≈1024px.
4. Tab through the live page; check one `<h1>`, alt text, contrast.
5. Run `npm install && npm run build && npm run preview`; open `vite.config.js`.
6. Skim `reflection.md` for specificity; confirm `design-reference` and `self-review.md`.

## Feedback style

Name one genuine strength and one highest-leverage fix. This is a portfolio piece; the goal of feedback is that the learner can show it proudly and explain it. Point to the exact prior unit for any weak area (U13 props, U17 state, U22 tokens, U23 responsive, U24 accessibility, U32 hosting).
