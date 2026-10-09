# U15 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Both Dockerfiles present and building | 3 | Yes | files + `evidence.md` |
| Layer concept explained accurately | 3 | Yes | `answers.md` Q1 |
| Cache key correctly described (parent + instruction + inputs) | 3 | Yes | `answers.md` Q2 |
| Ordering explained with reference to observation | 3 | Yes | `answers.md` Q3 |
| Invalidation of layers above a change explained | 2 | Yes | `answers.md` Q4 |
| Two sensible reasons to use `--no-cache` | 2 | No | `answers.md` Q5 |
| Writable-layer preview correct (data does not persist) | 2 | No | `answers.md` Q6 |
| Evidence contrasts `CACHED` and re-run install; `docker history` shown | 2 | No | `evidence.md` |

### Partial credit notes (assessors)

- Q1: award 2/3 if they know "each instruction makes a layer" but cannot say that layers are shared between images.
- Q2: award 1/3 if they think the cache is time-based rather than content-based (the single most common misconception). This is worth a note.
- Q3: award 2/3 if the explanation is right but the evidence does not show the `CACHED` install step.
- Q4: award 1/2 if they know later layers rebuild but not why (stack consistency).
- Evidence: a slow build that still shows `CACHED` indicates they did not actually trigger a source change; ask them to rerun with a real edit.

### Must-have vs nice-to-have

- Evidence that shows the cache working end to end is the core deliverable. If it is missing, the unit is "revise."
- Q5 and Q6 are nice-to-have; they extend the concept but do not gate progress.
- Do not penalize imperfect English. Penalize empty answers or pasted lesson text.

### Cross-unit note for assessors

- A learner who now naturally writes dependency-first Dockerfiles has internalised this unit. Watch for this in U16 and the capstone.
