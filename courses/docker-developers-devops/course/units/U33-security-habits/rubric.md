# U33 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Checklist applied item by item with evidence for failures | 4 | Yes | `audit.md` |
| Finds the two secrets and names the base-tag problem | 3 | Yes | `audit.md` |
| Finds the root-user problem and the leftover build tools | 2 | Yes | `audit.md` |
| Notes the `COPY . .` / `.dockerignore` risk | 1 | No | `audit.md` |
| `Dockerfile.fixed` uses a pinned, minimal base | 2 | Yes | `Dockerfile.fixed` |
| `Dockerfile.fixed` contains no secrets | 2 | Yes | `Dockerfile.fixed` |
| `Dockerfile.fixed` runs as non-root | 2 | Yes | `Dockerfile.fixed` |
| `Dockerfile.fixed` is multi-stage with tools kept out | 2 | Yes | `Dockerfile.fixed` |
| Explains layers, non-root, base trade-off, tag vs digest clearly | 2 | Yes | `explain.md` |
| Summary is accurate and uses no banned filler words | 0–1 | No | `explain.md` |

### Partial credit notes (assessors)

- Audit: 0.5 per checklist item correctly assessed with evidence; cap 4.
- Secrets: 1.5 each. Full credit requires understanding that the value appears in layer metadata/history.
- Multi-stage: full credit requires the final stage to copy only the runtime artifacts, not reinstall build tools.
- Non-root: `USER appuser` (or equivalent) any time before the final `CMD` earns full credit. If they create the user but never switch, award 1/2.
- Explain Q1: the essential phrase is that layers are permanent/stacked, so a delete in a later layer does not remove the earlier bytes.
- Deduct the 1-point summary point if banned words ("simply," "just," "obviously," "as you know") appear, but do not penalise elsewhere.
