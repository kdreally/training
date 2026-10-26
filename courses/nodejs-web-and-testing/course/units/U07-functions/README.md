# U07 — Functions: name a process

**Phase 1**

## Where you are

You can sequence, decide, and repeat. Functions let you **package** a process, **name** it, and **reuse** it with different inputs.

## What you will be able to do

- Explain parameter, argument, return value.
- Write simple functions that return values.
- Trace calls with a call stack intuition (light).
- Prefer return values over only printing (when computing).

## What you need already

- **U03–U06**

## Time and energy

**80–110 minutes.**

## Why this exists

Without functions, programs become long copy-paste noodles. With functions, you build **vocabulary of actions**: `sum`, `isEven`, `clamp`. Modules and tests later all hang on this idea.

## Plain-language teaching

### A function is a reusable recipe

A **function** is a named block of code that:

1. Optionally accepts **inputs** (parameters)
2. Does work
3. Optionally **returns** an output value

```javascript
function add(a, b) {
  return a + b;
}

let result = add(2, 3); // result is 5
```

### Parameters vs arguments

| Term | Meaning | In example |
|------|---------|------------|
| Parameter | Placeholder name in the definition | `a`, `b` |
| Argument | Actual value you pass when calling | `2`, `3` |

Call: `add(2, 3)` — arguments `2` and `3` fill parameters `a` and `b` for that call.

### `return` sends a value out

```javascript
function double(n) {
  return n * 2;
}
```

`return` **ends** the function and provides the value of the call expression `double(4)` → `8`.

Without `return`, a function returns `undefined` by default.

### Calling is an expression (when it returns)

```javascript
let x = double(5) + 1; // 11
```

### Why return beats only printing (for logic)

```javascript
function doubleBad(n) {
  console.log(n * 2); // displays, but gives undefined to callers
}
```

If another part of the program needs the number, **return** it. Display is separate. (`console.log` details deepen in Phase 2; treat it as “show on screen.”)

### Local names

```javascript
function area(width, height) {
  let product = width * height;
  return product;
}
```

`product` exists **inside** the function. Outer code does not see it. This is **scope** (light version): inner names stay local unless returned or outer.

### Multiple returns

```javascript
function max2(a, b) {
  if (a >= b) {
    return a;
  }
  return b;
}
```

First executed `return` wins; function stops.

### Pure-ish thinking (gentle)

Functions that only use inputs and return outputs (no hidden outside edits) are easier to test later. Prefer that shape when you can.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Function | Named reusable process | Not “mathematical function only” |
| Parameter | Input slot name | Not the value itself |
| Argument | Value passed in | Not “debate argument” |
| Return | Send value back to caller | Not “press Enter key” |
| Call / invoke | Run the function | |
| Scope | Where a name is visible | Deep rules later |

## Worked example

```javascript
function isEven(n) {
  return n % 2 === 0;
}

function labelNumber(n) {
  if (isEven(n)) {
    return "even";
  }
  return "odd";
}

let a = labelNumber(7); // "odd"
let b = labelNumber(8); // "even"
```

Functions call functions. Build small bricks.

## Common errors

### Error: Forgetting `return`

You compute inside but caller gets `undefined`.

### Error: Confusing defining with calling

```javascript
function greet(name) {
  return "Hi, " + name;
}
// Not run until:
greet("Ada");
```

### Error: Using parameters outside

`a` from `function add(a,b)` is not available below the function in outer code.

## Checkpoints

1. Parameter vs argument?
2. What does `return` do to function execution?
3. What is the value of a call if there is no `return`?
4. Why return computed values instead of only printing them?

## Practice

### P1 — Trace

```javascript
function triple(n) {
  return n * 3;
}
let x = triple(4);
let y = triple(x);
```

Values of `x` and `y`?

### P2 — Write

`function min2(a, b)` returning the smaller.

### P3 — Write

`function clamp(n, min, max)` — if n below min return min; if above max return max; else n.

### P4 — Compose

`function sumSquares(a, b)` returns `a*a + b*b` (can use a helper `square` if you want).

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Arrow functions (optional later; same idea)
- Closures deep dive
- `this`
- Methods vs functions deep OOP

## Next unit

**U08 — Arrays and objects**
