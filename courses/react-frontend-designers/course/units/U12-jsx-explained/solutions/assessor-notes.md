# U12 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** JSX is JavaScript XML — an HTML-looking syntax written inside JavaScript. It is **not** HTML (stricter rules), **not** a string/template literal, and **not** understood by the browser directly.

**Q2:** It becomes JavaScript function calls, roughly `React.createElement('h1', null, 'text')`. This matters because JSX is code: it can hold expressions in `{}` and must obey one-root/closed-tag rules.

**Q3:** A `return` yields exactly one value; two siblings are two values. Fix A: wrap in `<div>...</div>`. Fix B: wrap in a fragment `<>...</>`.

**Q4:** `{}` embeds an expression (value, math, function call result), e.g. `{name}` or `{2 + 3}`. Statements such as `if`/`for` cannot go inside; move them above the `return` or use conditional/loop patterns (U15/U16).

**Q5:** `class` is reserved in JavaScript; JSX uses `className`. Wrong: `<p class="intro">`. Right: `<p className="intro">`. CSS is unchanged.

**Q6:** JSX: `{/* comment */}` between elements. JavaScript: `// ...` or `/* ... */` in the function body, outside the returned markup.

**Q7:** Error one: `Adjacent JSX elements must be wrapped in an enclosing tag.` Fix: add a wrapper/fragment. Error two: `Expected corresponding JSX closing tag` / `Unterminated JSX contents`. Fix: close the tag or add `/>`.

**Q8:** With `class=`, React warns approximately: `Warning: Invalid DOM property 'class'. Did you mean 'className'?` Fix: use `className`.

## Field notes

- Vite/React error text varies by version. Accept accurate paraphrases if the diagnosis and fix are right.
- A learner may use a fragment (`<>...</>`) as the root from the start — that is excellent, award full.
- Some learners will attempt `{}` with an `if` and hit `Unexpected token`. That is a productive failure; give credit for the diagnosis in Q4.
- If the learner's editor auto-fixes tags, they may not reproduce the unclosed-tag error. Accept a described attempt with the error text from the editor/lint instead.

## Common weak submissions

- Copies the worked example without personal variables or wording.
- Leaves two roots and claims success.
- `{}` used with `if`/`const` inside markup and the error not recognized.
- `errors.md`/Q7 contains no real error text.
- Console screenshot shows unrelated warnings and no explanation.
