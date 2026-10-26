# U09 Assignment — Write rules a diff can answer

Submit `U09-YourName`.

## Files

### 1. `constraints.md`

Write shelf constraints, in your own sentences, covering all ten categories from the README (identity, file scope, dependencies, data and network, secrets, style, tests, changelog, commands, honesty). One short bullet or short paragraph each. Each must be checkable. You may combine two categories in one bullet only if both are still clearly present.

### 2. `answers.md`

1. Take this bad rule list and rewrite each line or mark it `drop`. Justify each decision in one sentence.

```text
Make it production-ready.
Log every tool call to CHANGELOG.md.
You may add small libraries if they help.
Improve nearby code while you are there.
Do not connect to the database unless the feature needs persistence.
```

2. **Predict the review.** A teammate's agent produces this diff for "add a count function," with no other spec:

```javascript
import { groupBy } from "lodash-es";
```

plus a new `dependencies` entry, and this changelog line: `- read three files and ran tests twice`.

Predict your pass/fail for **dependencies** and for **changelog**. Then state the restore-or-keep decision. You do not run an agent.

3. Explain why a human, not the agent, should be the one to edit `package.json` when a dependency is truly wanted. 3–5 sentences.

### 3. `checklist.md`

```markdown
- [ ] I read the U09 README, including the catalog.
- [ ] Every bullet in constraints.md can be judged on a diff or a test run.
- [ ] I read the rubric.
```

## Definition of done

All ten categories appear. Q1 does not preserve "small libraries if they help" as written.

## Submission format

```text
U09-YourName/
  constraints.md
  answers.md
  checklist.md
```
