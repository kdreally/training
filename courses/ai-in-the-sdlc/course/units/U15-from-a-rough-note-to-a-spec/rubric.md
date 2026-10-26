# U15 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Dangerous readings (database, wholesale "modern" API, extra library) are non-goals | 6 | Yes | spec |
| Empty-loan case is an explicit default with an example | 4 | Yes | spec |
| At least one neighbor example (another borrower's loan survives) | 3 | Yes | spec |
| Open questions and defaults are visible; ready-or-blocked is stated | 4 | Yes | spec + `answers.md` |
| Files stay on the shelf map (`src/loans.js`, tests, changelog) unless an HTTP change is explicitly scoped to one route | 3 | Yes | spec |

### Partial credit

- If they add a single HTTP route, award files points only when the route, method, body, and status are fully exampled **and** express is still forbidden. A vague "make it RESTful" scores 0 on that row.
- Neighbor example missing: they can still pass the unit if everything else is strong, but that row is 0. Must-have miss caps at 15/20.

### Must-have vs nice-to-have

All rows are must-have.
