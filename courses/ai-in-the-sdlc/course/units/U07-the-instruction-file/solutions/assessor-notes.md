# U07 Assessor notes

Assessor-only.

## Model answer sketch

**Q1:** Prose is Markdown rules for how to change this repo, in `AGENTS.md` beside `package.json`. Wiring is product permissions and model choice, in that product's settings. Both matter. This course standardizes prose only.

**Q2:** wiring, prose, wiring, task, prose, prose or wiring with a reason.

**Q3:** Entire file similar to:

```markdown
# Agent notes

Follow the standing instructions in AGENTS.md in this directory.
Do not copy them here.
```

**Q4:** `description` is a one-line blurb for humans and npm. Agents are not required to treat it as policy. It cannot hold a list of rules without abusing the field. Reviewers do not look there for behavioral policy.

**tool-notes:** Look up whether the chosen tool loads root `AGENTS.md`, and where command allow/deny is configured.

## Common weak submissions

- A 40-line second copy inside `CLAUDE.md`.
- A required JSON schema of their own invention presented as the course standard.
- Calling model choice "prose."
