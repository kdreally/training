# U14 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Reference anatomy correct; default tag identified as `latest` | 3 | Yes | `answers.md` Q1 |
| Three concrete problems with `latest`, each with an example | 4 | Yes | `answers.md` Q2 |
| Tag specificity explained; a pinning recommendation made | 3 | Yes | `answers.md` Q3 |
| Three valid naming rules/conventions | 2 | No | `answers.md` Q4 |
| `docker build -t` vs `docker tag` distinguished | 2 | No | `answers.md` Q5 |
| Tag-removal behaviour described correctly | 2 | Yes | `answers.md` Q6 |
| Evidence: multi-tag image, shared IMAGE ID, conflict error + fix | 4 | Yes | `evidence.md` |

### Partial credit notes (assessors)

- Q2: award 2/4 for two solid reasons; 1/4 for one; 0/4 for "it is bad practice" with no reason. The moving-target point is the essential one.
- Q3: award 1/3 if they can list specificity but dodges the deploy recommendation.
- Q5: the key distinction is that `docker tag` adds a name to an existing image (no copy, no build). Award 1/2 if they describe it as copying.
- Q6: award 1/2 if they know the last-tag removal deletes the image but cannot say why a tag in use is blocked.
- Evidence: the "image in use" conflict is the graded observation. If they never triggered it, ask them to do so; award 2/4 for the rest of the evidence.

### Must-have vs nice-to-have

- The conflict-error evidence is must-have because it teaches the safety behaviour. If absent, mark as "revise" for that row.
- Q4 and Q5 are nice-to-have; they refine understanding but do not gate progress.
- Do not penalize imperfect English. Penalize empty answers or pasted lesson text.
