# U05 — Decisions (branching)

**Phase 1**

## Where you are

Programs can remember values. Real programs also **choose** different paths: if this, do that.

## What you will be able to do

- Evaluate boolean conditions.
- Trace `if` / `else if` / `else`.
- Write small decision algorithms in JS form.
- Use `&&`, `||`, `!` carefully at a basic level.

## What you need already

- **U03**, **U04**

## Time and energy

**70–100 minutes.**

## Why this exists

Without branching, a program does the same path every time. Passwords, discounts, permissions, HTTP status choices — all need decisions.

## Plain-language teaching

### Conditions are boolean expressions

A **condition** is an expression whose value should be `true` or `false`.

```javascript
age >= 18
score === 100
name !== ""
```

### `if` chooses a path

```javascript
let age = 20;
let message;

if (age >= 18) {
  message = "adult";
} else {
  message = "minor";
}
// message is "adult"
```

Structure:

```javascript
if (condition) {
  // runs only when condition is true
} else {
  // runs only when condition is false
}
```

The `{ }` **block** groups statements controlled by the decision.

### `else if` chains

```javascript
let score = 75;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 70) {
  grade = "B";
} else {
  grade = "C";
}
```

Only **one** branch runs. First matching condition wins.

### Comparison operators (review)

| Op | Meaning |
|----|---------|
| `===` | equal (strict) |
| `!==` | not equal (strict) |
| `>` `<` `>=` `<=` | ordering |

### Combining conditions

| Op | Meaning | Example |
|----|---------|---------|
| `&&` | and (both true) | `age >= 13 && age <= 19` |
| `\|\|` | or (at least one true) | `role === "admin" \|\| role === "owner"` |
| `!` | not (flip boolean) | `!isBroken` |

**Precedence care:** when unsure, use parentheses:

```javascript
(age >= 13) && (age <= 19)
```

### Truth and accidental values (warning only)

JS can treat non-booleans as truthy/falsy inside `if (value)`.  
**This course prefers explicit conditions** early: `if (count === 0)` not clever tricks.

### Nested if

You *can* put `if` inside `if`. Prefer flat `else if` chains when possible — easier to trace.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Branch | A path the program might take | Not git branch (later/other) |
| Condition | Boolean question | Not the whole if-statement |
| Block | `{ ... }` group of statements | Not an array |
| Boolean operators | `&&` `\|\|` `!` | Not arithmetic |

## Worked example

```javascript
let temperature = 3;
let coat;

if (temperature < 5) {
  coat = "heavy";
} else if (temperature < 15) {
  coat = "light";
} else {
  coat = "none";
}
// coat is "heavy"
```

Change temperature to `10` → `"light"`. To `20` → `"none"`.

## Common errors

### Error: Using `=` inside condition

```javascript
if (age = 18) { // assigns! almost always wrong here
```

Use `===`.

### Error: Overlapping conditions in wrong order

If you check `score >= 70` before `score >= 90`, an A score might become B. **Order matters.**

### Error: Missing braces while learning

Always use `{ }` in this course, even for one line.

## Checkpoints

1. What type should a condition produce?
2. In an if/else if/else chain, how many branches run?
3. What is wrong with `if (x = 5)`?
4. English meaning of `a && b`?

## Practice

### P1 — Trace

```javascript
let n = 4;
let label;
if (n % 2 === 0) {
  label = "even";
} else {
  label = "odd";
}
```

### P2 — Write

JS-style: if `hours` is greater than 40, `pay` is `hours * 15`, else `hours * 10`. Assume `hours` already set.

### P3 — Combine

Condition for: age at least 18 **and** hasPass is true.

### P4 — Grade chain

Write if/else if/else for scores: A ≥90, B ≥80, C ≥70, else D.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- `switch` (optional later)
- Loops (U06)
- Ternary operator `? :` (optional later)

## Next unit

**U06 — Repetition (loops)**
