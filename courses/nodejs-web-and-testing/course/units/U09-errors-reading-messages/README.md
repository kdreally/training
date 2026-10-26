# U09 — Errors: mistakes, exceptions, reading messages

**Phase 1**

## Where you are

You write real structures now. Errors will appear. This unit teaches you to treat them as **information**.

## What you will be able to do

- Separate human mistakes, syntax errors, and runtime errors.
- Read a typical error message for useful parts.
- Use a simple debug process.
- Explain try/catch at a beginner level (light).

## What you need already

- **U02–U08**

## Time and energy

**60–90 minutes.**

## Why this exists

Many learners quit at the first red text. Professionals read red text for breakfast. You will join them — calmly.

## Plain-language teaching

### Three buckets

| Bucket | What it is | Example |
|--------|------------|---------|
| **Human mistake** | Logic wrong but code runs | Used `+` instead of `-` for discount |
| **Syntax error** | Text breaks language rules | Missing `)` or `}` |
| **Runtime error** | Rules ok, fails while running | Reading property of `undefined` |

All are normal. Only silence is useless.

### Anatomy of an error message (typical JS)

When you run code later, messages often include:

1. **Error type** — e.g. `SyntaxError`, `TypeError`, `ReferenceError`
2. **Message** — short description
3. **Location** — file and line number
4. **Stack** — chain of calls (useful later)

Example shape:

```text
TypeError: Cannot read properties of undefined (reading 'name')
    at greet (file.js:3:15)
    at main (file.js:8:3)
```

Decode:

- Something was `undefined`.
- Code tried to read `.name` on it.
- Look near line 3 in `greet`.

### Common error types (recognize, don’t memorize law)

| Type | Often means |
|------|-------------|
| `SyntaxError` | Typos/structure; fix before it can run |
| `ReferenceError` | Name used that does not exist in scope |
| `TypeError` | Value is wrong kind for the operation |

### Debug process (use with stuck protocol from U00)

1. **Read the whole message once** without fixing yet.
2. **Copy the error type + message** into notes.
3. **Go to the line** cited (or nearest).
4. **Trace values** leading there — what is `undefined`? what is the actual number?
5. **Change one thing**; re-run.
6. If logic error (no crash): write expected vs actual; add temporary displays later with `console.log`.

### Logic errors need expected vs actual

Crash-free wrong answer:

- Expected: `15`
- Actual: `25`
- Hypothesis: added tax twice

Tests (Phase 5) automate expected vs actual. For now, do it by hand.

### try/catch (preview, light)

```javascript
try {
  // risky work
} catch (err) {
  // runs if an error was thrown inside try
  // err.message is often useful
}
```

Use sparingly while learning. Do not wrap everything and ignore errors. Prefer fixing the cause.

### Throwing (concept)

Code can **throw** an error on purpose when something is invalid. APIs later return error responses instead of crashing the whole server — different layer, same idea: signal failure clearly.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Syntax error | Invalid code text | Not a wrong formula only |
| Runtime error | Failure during execution | |
| Stack trace | List of calls leading to error | Not “stack overflow” always |
| Debug | Systematic fault-finding | Not random rewriting |
| Throw | Signal an error on purpose | |
| Catch | Handle a thrown error | Not “catch a ball” only |

## Worked example — decode

Message:

```text
ReferenceError: total is not defined
    at file.js:12:5
```

Meaning: line 12 uses `total` but no binding exists. Maybe typo `totla` above, or forgot `let total = 0`.

## Common errors

### Error: Changing five things at once

You won’t know which change helped. One change at a time.

### Error: Ignoring the line number

The line is a gift. Start there (sometimes the real bug is just above).

### Error: Taking errors personally

The runtime does not know you. It only knows rules.

## Checkpoints

1. Syntax vs runtime vs logic error — one example each.
2. Name four useful parts of an error report.
3. First three steps when an error appears?
4. Why is “expected vs actual” useful for logic bugs?

## Practice

### P1 — Classify

- Missing `}`  
- `let x = 2 + 2` but you wanted multiply  
- Calling `null.toString()`  

### P2 — Decode (imaginary)

`TypeError: books is not iterable` at line of `for (... of books)` — what might `books` be?

### P3 — Process

Write your personal 6-step debug checklist (can adapt this unit).

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Every Error subclass
- Async error patterns
- Production logging stacks

## Next unit

**U10 — Algorithms: pseudocode to code**
