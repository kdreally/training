# U05 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Comparison table complete, all six rows, in learner's own words | 5 | Yes | `comparison.md` table |
| Hypervisor, kernel, container engine, isolation defined correctly | 4 | Yes | Q1 |
| Shared-kernel difference explained and linked to size/speed | 4 | Yes | Q2 |
| Four scenario choices correct with justifications | 4 | Yes | Q3 |
| Claim about containers-as-small-VMs corrected (isolation + "always right") | 4 | Yes | Q4 |
| Two failure/risk situations for replacing VMs | 3 | No | Q5 |
| Files named correctly; checklist present and honest | 0 (gate) | Yes | folder / zip structure |

The last row is a **gate**, not points. Flag missing or misnamed files to the learner without reducing the total out of 24.

### Partial credit notes (assessors)

- Table: award 1 point per accurate row, up to 5. A table copied verbatim from the lesson earns at most 2 — the task asks for the learner's own phrasing.
- Q1: award 3/4 if three of four terms are right; 0 if copied from the vocabulary table.
- Q2: full marks only if they name **sharing the host kernel** as the cause, not merely "it is smaller." "Smaller" is a result, not the cause; award 2/4 for that.
- Q3: (a) container, (b) VM, (c) VM, (d) container. Award 1 point each for a correct choice **with** a sensible reason. A right label with no reason earns half.
- Q4: two distinct corrections are needed — (1) a container does not include its own OS / is not merely a small VM, and (2) "always more secure" and "always right" are false. Award 2/4 if only one is addressed.
- Q5: any two sensible risks (different-OS needs, strong isolation for untrusted code, whole-machine testing). Award 1/3 for one.
- Do not penalize imperfect English. Penalize pasted lesson text with no reasoning.

### A note on scenario (c)

Some learners will argue containers can run untrusted code too. That is defensible in modern practice. Accept it **only** if they acknowledge that the strongest traditional separation is a VM with its own kernel. Otherwise award VMs for (c) as the intended answer.
