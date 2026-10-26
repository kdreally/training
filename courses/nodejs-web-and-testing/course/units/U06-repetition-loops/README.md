# U06 — Repetition (loops)

**Phase 1**

## Where you are

You can decide. Now: do something **repeatedly** without copy-pasting lines.

## What you will be able to do

- Trace `while` and `for` loops by hand.
- Write simple counting loops.
- Avoid infinite loops conceptually.
- Accumulate a total in a loop.

## What you need already

- **U04**, **U05**

## Time and energy

**70–100 minutes.**

## Why this exists

Lists, retries, “for each item,” summing — all need controlled repetition. Computers excel at boring repetition; loops are how you ask for it.

## Plain-language teaching

### The idea

A **loop** repeats a block while a condition holds, or for a known range of counts.

### `while` — repeat while true

```javascript
let n = 1;
let text = "";
while (n <= 3) {
  text = text + n;
  n = n + 1;
}
// text is "123", n is 4
```

Trace:

| Check n<=3 | body runs? | text after | n after |
|------------|------------|------------|---------|
| n=1 yes | yes | "1" | 2 |
| n=2 yes | yes | "12" | 3 |
| n=3 yes | yes | "123" | 4 |
| n=4 no | stop | | |

### Infinite loops

If the condition never becomes false, the loop never ends:

```javascript
let n = 1;
while (n <= 3) {
  text = text + n;
  // forgot n = n + 1  → infinite
}
```

When you run programs later, infinite loops look like “nothing finishes.” Always ask: **what makes the condition false eventually?**

### `for` — compact counting

```javascript
let text = "";
for (let i = 1; i <= 3; i = i + 1) {
  text = text + i;
}
// text "123"
```

Parts of `for (init; condition; step)`:

1. **init** — run once before looping (`let i = 1`)
2. **condition** — check before each lap (`i <= 3`)
3. **body** — the block
4. **step** — run after each body (`i = i + 1`)

Same power as many `while` loops; different shape.

### Accumulation pattern

```javascript
let total = 0;
for (let i = 1; i <= 5; i = i + 1) {
  total = total + i;
}
// total is 15 (1+2+3+4+5)
```

Pattern: start container → loop → update container.

### Counting down

```javascript
for (let i = 3; i >= 1; i = i - 1) {
  // i is 3, then 2, then 1
}
```

### Loops + decisions

```javascript
let evens = 0;
for (let i = 1; i <= 10; i = i + 1) {
  if (i % 2 === 0) {
    evens = evens + 1;
  }
}
// evens is 5
```

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Loop | Controlled repetition | Not a road loop only |
| Iteration / lap | One pass through the body | |
| Infinite loop | Never stops | Often a missing update |
| Accumulator | Variable that gathers a result across laps | e.g. `total` |
| Index variable | Counter name like `i` | Just a name; can be `count` |

## Worked example

Sum even numbers from 2 through 10:

```javascript
let sum = 0;
for (let n = 2; n <= 10; n = n + 2) {
  sum = sum + n;
}
// sum = 30
```

## Common errors

### Error: Off-by-one

`i < 3` with start 0 runs for 0,1,2 (three times).  
`i <= 3` with start 1 runs 1,2,3. Draw a table when unsure.

### Error: Updating the wrong variable

Condition watches `n` but you update `m` → infinite or never.

### Error: Putting semicolon that empties the loop (preview)

`while (n <= 3);` — the semicolon can make an empty body. Avoid accidental `;` after `while (...)` / `for (...)`.

## Checkpoints

1. What three parts does a `for` header have?
2. What question prevents infinite loops?
3. What is an accumulator?
4. Trace `for (let i = 0; i < 3; i = i + 1)` — which `i` values enter the body?

## Practice

### P1 — Trace while

```javascript
let x = 0;
while (x < 5) {
  x = x + 2;
}
// final x?
```

### P2 — Write for

Build string of stars length 5: `"*****"` using a loop.

### P3 — Sum

Sum numbers 10 through 15 inclusive.

### P4 — Count

How many numbers from 1 to 20 are divisible by 3? (use loop + if)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- `break`/`continue` (later if needed)
- Looping arrays (U08)
- Recursion

## Next unit

**U07 — Functions**
