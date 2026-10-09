# U16 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `MessageList` implements all three states correctly | 4 | Yes | `MessageList.jsx` + running app |
| Early return used for the signed-out view | 2 | Yes | `MessageList.jsx` |
| Empty vs loaded chosen with an explicit `.length` check | 3 | Yes | `MessageList.jsx` |
| List uses `.map` with unique stable keys | 2 | Yes | `MessageList.jsx` |
| `App` shows all three states simultaneously | 2 | Yes | `App.jsx` + running app |
| State inventory is complete and accurate | 2 | Yes | `states.md` part 1 |
| Explains why empty states matter for real users | 2 | No | `states.md` part 2 |
| Correctly explains why `.length` beats the array itself | 2 | Yes | `states.md` part 3 |
| Tool choices justified by readability | 2 | No | `states.md` part 4 |
| Error-reading: explains the `0`, fixes it, states rule | 3 | Yes | `error-reading.md` |
| Files named and present correctly | 1 | Yes | submission structure |

### Partial credit notes (assessors)

- **All logic with nested ternaries, no early return:** award state points but only 1/2 for early return; part 4 must acknowledge why early return was avoided.
- **Empty state missing (only loaded state):** this is the exact failure the unit warns about — award 0/3 for the empty-vs-loaded line and note it prominently.
- **`items && ...` used instead of `.length`:** award 0/3 for the empty check even if the loaded case works; this is the core bug.
- **part 2:** Generic answers ("empty states are good UX") cap at 1/2. Full marks describe the concrete new-user experience.
- **part 3:** Must state that an empty array is truthy. Missing that caps at 1/2.
- **Error-reading:** With `items=[]`, `items.length` is `0`, so `0 && <b>…</b>` evaluates to `0`, and React renders the numeral `0`. The page reads "You have 0 in your cart." (or similar with a stray 0). Full marks require naming the `0` and fixing with `items.length > 0 ? ... : <b>0 items</b>` or equivalent. Blaming `.map` or keys is off-target (1/3).
- Do not penalize imperfect English. Penalize copied lesson text with no personalization.
