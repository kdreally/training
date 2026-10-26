# U03 — Values, expressions, and statements

**Phase 1 — First principles**

## Where you are

You know what a program is. Now: the smallest pieces of meaning inside a program — **values**, **expressions**, and **statements** — using **JavaScript** spelling.

## What you will be able to do

- Identify numbers, strings, booleans, and `undefined`/`null` at a beginner level.
- Evaluate simple expressions by hand.
- Tell expression vs statement apart in simple cases.
- Read JS literals without running a tool yet.

## What you need already

- **U02**

## Time and energy

**70–100 minutes.**

## Why this exists

Programs manipulate **values**. If “value” is foggy, everything later (functions, JSON, HTTP bodies) stays foggy. We pin it down now.

## Plain-language teaching

### Values are pieces of data

A **value** is a single piece of data the language understands.

JavaScript values you meet early:

| Kind | Plain idea | Examples (JS spelling) |
|------|------------|-------------------------|
| Number | Numeric quantity | `0`, `12`, `-3`, `2.5` |
| String | Text | `"hello"`, `'Amina'` |
| Boolean | Yes/no truth | `true`, `false` |
| null | Intentional empty | `null` |
| undefined | Missing / not set yet | `undefined` |

You will meet objects and arrays in **U08**. Not required yet.

### Literals

A **literal** is a value written directly in code: `42`, `"hi"`, `true`.

### Expressions produce values

An **expression** is code that **produces a value**.

Examples:

| Expression | Value when evaluated |
|------------|----------------------|
| `2 + 3` | `5` |
| `"Hi, " + "Sam"` | `"Hi, Sam"` |
| `10 > 3` | `true` |
| `7` | `7` |

**Evaluate** means: figure out the value.

### Operators

An **operator** combines or transforms values: `+`, `-`, `*`, `/`, `>`, `===`, etc.

For now:

- Arithmetic: `+ - * / %` (`%` is remainder)
- String join: `+` between strings concatenates
- Comparison: `>`, `<`, `>=`, `<=`, `===`, `!==`

**`===`** means “same value and same kind” (strict equality). Prefer it over `==` in this course. We will not rely on the weird corners of `==`.

### Statements do work

A **statement** is an instruction that **does something**. It may contain expressions.

In early JS, you will see statements like:

```javascript
let total = 2 + 3;
console.log(total);
```

- `2 + 3` is an **expression** (value `5`).
- `let total = 2 + 3;` is a **statement** (creates a name and stores a value) — names are **U04**.
- For this unit, focus on reading expressions even inside statements.

Rough test:

- If it makes sense to ask “what value is that?”, it is expression-like.
- If it is a full instruction line that *does* something, it is statement-like.

### Types (lightly)

The **type** of a value is what kind it is (number, string, …).

JavaScript is **dynamically typed**: you do not declare types on every line the way some languages force you to. Values still *have* types at runtime.

Mixing types can surprise you:

```javascript
"2" + 2    // "22"  (string join, not arithmetic)
```

We will prefer clarity: know whether you mean numbers or text.

### Strings are not “words only”

Strings can hold digits as **text**: `"42"` is not the number `42`.

### Booleans are not strings

`true` is not `"true"`. Different values.

### Parentheses

Parentheses control order:

```text
(2 + 3) * 4  →  20
2 + (3 * 4)  →  14
```

Same idea as school math.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Value | A piece of data | Not the same as “variable” (U04) |
| Literal | Value written directly | Not a metaphor |
| Expression | Code that produces a value | Not always a full line |
| Evaluate | Compute the value of an expression | Not “judge quality” |
| Operator | Symbol that combines values | Not the same as a function (yet) |
| Statement | Instruction that performs an action | Not always producing a value you use |
| Type | Kind of value | Not “typing on a keyboard” |
| String | Text value | Not only English words |
| Boolean | true/false | Not “yes”/“no” strings |

## Worked example — evaluate by hand

Expressions:

```javascript
3 * 4 + 2
```

Steps: `3 * 4` → `12`; `12 + 2` → `14`.

```javascript
"Node" + "js"
```

→ `"Nodejs"`

```javascript
10 % 3
```

→ `1` (3 fits into 10 three times; remainder 1)

```javascript
5 === 5
```

→ `true`

```javascript
5 === "5"
```

→ `false` (number vs string)

## Common errors

### Error: `"10" + 1` expected to be `11`

**Got:** `"101"`.  
**Why:** `+` with a string becomes concatenation.  
**Fix:** Convert deliberately later; for now, notice types.

### Error: Treating `=` as equality

**Reality:** `=` will mean assignment (U04). Equality is `===`.

### Error: Fear of `undefined` / `null`

**Reality:** They are ordinary values meaning “missing” / “empty.” You will use them carefully later.

## Checkpoints

1. What is a value? Give three examples of different kinds.
2. What does it mean to evaluate `2 * (3 + 1)`?
3. Is `2 + 2` an expression? Why?
4. Why is `5 === "5"` false?

## Practice

### P1 — Kind of value

Label each: number, string, boolean, or other:

`0`, `"0"`, `false`, `"false"`, `3.14`, `null`

### P2 — Evaluate

Find values:

1. `6 / 2`
2. `7 % 2`
3. `"a" + "b" + "c"`
4. `4 > 10`
5. `(1 + 2) * (3 + 4)`
6. `9 === 9`
7. `9 === "9"`

### P3 — Expression or statement (best guess)

- `2 + 2`
- `let x = 2 + 2;` (even if `let` is new: the whole line is a statement)
- `true`
- `console.log(1);` (statement that causes display — details later)

### P4 — Predict the trap

What is `"5" + 3`? What would you *want* if you meant arithmetic?

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Variables in depth (U04)
- Running code in Node (Phase 2)
- Objects/arrays (U08)

## Next unit

**U04 — Names, assignment, and state**
