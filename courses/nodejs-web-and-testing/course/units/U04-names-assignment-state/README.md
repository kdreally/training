# U04 — Names, assignment, and state

**Phase 1**

## Where you are

Values exist. Now programs **remember** values using **names**. That memory over time is **state**.

## What you will be able to do

- Explain variable as a named place for a value.
- Trace assignments that change state.
- Use `let` and `const` at a beginner level (on paper / reading).
- Avoid confusing `=` with `===`.

## What you need already

- **U03**

## Time and energy

**60–90 minutes.**

## Why this exists

Without names, every value must be rewritten. With names, programs build step by step. Bugs often come from **state you forgot changed**.

## Plain-language teaching

### Names hold values

A **variable** is a **name** bound to a **value**.

Think of a labeled box:

- Label: `age`
- Contents: `30`

In JavaScript:

```javascript
let age = 30;
```

- `let` declares a name you may reassign later.
- `age` is the name.
- `=` **assigns** (stores) the value.
- `30` is the value expression.

### Assignment is not equality

| Code | Meaning |
|------|---------|
| `age = 30` | Store `30` in `age` |
| `age === 30` | Ask: is the value in `age` strictly equal to `30`? |

Reading `=` as “equals” (math) causes lasting pain. Read it as **“gets”** or **“becomes”**: `age` gets `30`.

### State over time

**State** is the set of values the program currently remembers.

```javascript
let score = 0;
score = score + 10;
score = score + 5;
```

Trace:

| Step | score |
|------|-------|
| after first line | 0 |
| after second | 10 |
| after third | 15 |

The **same name** can refer to **different values** at different times (when using `let`).

### Reading a name is an expression

```javascript
let x = 3;
let y = x + 2;
```

`x` evaluates to the current value of `x` (`3`). Then `x + 2` is `5`, stored in `y`.

### `const` — name that must not be reassigned

```javascript
const PI = 3.14;
```

- You must assign when you create it (for normal `const` bindings).
- You may not do `PI = 3` later.

Use `const` when the binding should not change. Use `let` when reassignment is intentional.  
(This course avoids `var` — older, easier to misuse.)

### Declaration vs assignment

```javascript
let n;        // declared; value is undefined until assigned
n = 4;        // assigned
let m = 5;    // declared and assigned together
```

### Multiple names, one idea

```javascript
let price = 50;
let tax = 5;
let total = price + tax;
```

Each name holds one value; expressions combine them.

### Names have rules

Valid-ish examples: `total`, `userName`, `count2`.  
Invalid: starting with a digit (`2count`), spaces, most punctuation.

This course uses **camelCase** for multi-word names: `itemCount`.

Names should mean something: `t` is worse than `total` for humans.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Variable | Named binding to a value | Not “math variable” only |
| Declare | Introduce a name | Not the same as assign |
| Assign | Store a value in a name | Not equality test |
| State | Current remembered values | Not “USA” |
| Reassign | Store a new value in an existing `let` name | Impossible with normal `const` rebinding |
| camelCase | `likeThis` naming style | Not required by JS, required by this course’s style |

## Worked example

```javascript
let cups = 2;
cups = cups + 1;
const label = "tea";
let message = label + " x" + cups;
// message is "tea x3"
```

Trace:

| After | cups | label | message |
|-------|------|-------|---------|
| L1 | 2 | — | — |
| L2 | 3 | — | — |
| L3 | 3 | tea | — |
| L4 | 3 | tea | tea x3 |

Note: `+` between string and number concatenates after converting the number to text. Result is a string.

## Common errors

### Error: Using a name before it exists

Mentally: `console.log(score); let score = 1;` — invalid order for `let` in normal scripts (temporal dead zone — details later). **Declare first.**

### Error: `const` then reassign

```javascript
const n = 1;
n = 2; // error when run
```

### Error: Thinking `let a = b` copies forever

If `b` later changes, `a` does not auto-update. Assignment copies the **value at that moment** (for numbers/strings/bools).

## Checkpoints

1. In `let x = 4`, what are declare, name, assign, value?
2. Why is `=` not equality?
3. What is state in one sentence?
4. When prefer `const` over `let`?

## Practice

### P1 — Trace

```javascript
let a = 1;
let b = 2;
a = a + b;
b = a + b;
```

Final `a` and `b`?

### P2 — Read as “gets”

Rewrite in English: `let lives = 3; lives = lives - 1;`

### P3 — Spot the mistake

```javascript
const max = 100;
max = 200;
```

What goes wrong?

### P4 — Choose names

For “number of students,” pick a good variable name and write a `let` line with value `24`.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Loops changing state repeatedly (U06)
- Functions (U07)
- Running in Node (Phase 2)

## Next unit

**U05 — Decisions (branching)**
