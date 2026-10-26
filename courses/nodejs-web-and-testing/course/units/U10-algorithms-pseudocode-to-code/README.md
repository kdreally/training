# U10 — Algorithms: clear steps → code

**Phase 1**

## Where you are

You have the raw materials of programming. This unit trains the **bridge**: problem → clear steps → JavaScript.

## What you will be able to do

- Write pseudocode that is precise enough to implement.
- Translate pseudocode into JS functions.
- Check work with examples (manual tests).
- Decompose a problem into smaller functions.

## What you need already

- **U02–U09**

## Time and energy

**80–110 minutes.**

## Why this exists

Typing syntax without a plan produces thrashing. Planning without precision produces fog. Pseudocode is the middle path.

## Plain-language teaching

### Algorithm again

An **algorithm** is a finite, ordered, clear process that solves a problem.

Properties:

1. **Clear steps** — no “handle it.”
2. **Ordered** — sequence matters.
3. **Finite** — finishes (for now).
4. **Works for a class of inputs** — not only one lucky example.

### Pseudocode

**Pseudocode** is structured plain language (sometimes mixed with code-like words) for humans — not yet forced to full syntax.

Good pseudocode for “largest of three numbers a,b,c”:

```text
function largest(a, b, c):
  set best to a
  if b > best:
    set best to b
  if c > best:
    set best to c
  return best
```

Bad pseudocode:

```text
figure out the biggest somehow and return it
```

### Process: problem → code

1. **Restate the problem** in one sentence.
2. **Examples:** 2–3 inputs with expected outputs (including an edge).
3. **Pseudocode** steps.
4. **Implement** in JS.
5. **Trace** one example by hand.
6. **Check** all examples (manual test).

This is already a testing culture. Phase 5 automates step 6.

### Decomposition

Hard problem → several functions.

Example: average score of passing students only.

- `isPassing(score)` 
- `average(nums)`
- `passingAverage(scores)` uses both

### Manual test table

| Input | Expected | Actual | Pass? |
|-------|----------|--------|-------|
| [10,20] | 15 | | |
| [0] | 0 | | |

Fill Actual when you run (later) or when you trace.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Pseudocode | Human-oriented algorithm draft | Not runnable JS |
| Edge case | Unusual but valid input | Empty list, zero, ties |
| Decomposition | Split into smaller pieces | Not “delete features” |
| Manual test | Human checks expected vs actual | Not automated yet |

## Worked example

**Problem:** Count words in a sentence string separated by single spaces. No leading/trailing space. Empty string → 0.

**Examples:**

| Input | Expected |
|-------|----------|
| `""` | 0 |
| `"hi"` | 1 |
| `"hi there you"` | 3 |

**Pseudocode:**

```text
function countWords(text):
  if text is empty:
    return 0
  set count to 1
  for each character in text:
    if character is space:
      count = count + 1
  return count
```

**JS:**

```javascript
function countWords(text) {
  if (text === "") {
    return 0;
  }
  let count = 1;
  for (let i = 0; i < text.length; i = i + 1) {
    if (text[i] === " ") {
      count = count + 1;
    }
  }
  return count;
}
```

(Assumes single spaces only — stated in problem. Real word-counting is harder; honesty about assumptions is skill.)

## Common errors

### Error: Coding before examples

You don’t know what “correct” means.

### Error: Pseudocode that hides decisions

“Validate input” without saying *how* is incomplete.

### Error: One giant function

If you cannot name steps, split them.

## Checkpoints

1. Four properties of an algorithm?
2. Why write examples before code?
3. What is an edge case?
4. How does manual testing relate to later automated tests?

## Practice

### P1 — Pseudocode only

Fizz-style light: for n, if divisible by 15 return "both"; by 3 "three"; by 5 "five"; else the number as… (return string or number — pick and state).

### P2 — Implement

`function clamp(n, min, max)` via pseudocode first.

### P3 — Table

Manual test table for `max2(a,b)` with three rows including a tie.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Big-O complexity theory
- Formal proofs
- Running code in Node (next phase)

## Next unit

**U11 — What Node.js is**
