# U07 — JavaScript: arrow functions, destructuring, and imports

**Phase 1 — Foundations**

## Where you are

This is the last JavaScript unit before you install tooling in Phase 2. It adds three pieces of everyday syntax that React code is written in almost everywhere: **arrow functions** (a shorter way to write a function), **destructuring** (pulling named values out of an object or array in one line), and **`export`/`import`** (how one file shares code with another). None of these is a new concept so much as a faster spelling of ideas you already have from U05 and U06.

We keep the runnable examples to arrow functions and destructuring. Imports need a small setup to run in a browser, so in this unit you read and predict them, and you will actually run them once the dev server exists in U09. Knowing why that is, instead of being surprised by an error, is part of the lesson.

## What you will be able to do

- Rewrite a `function` as an arrow function, and say when the braces need an explicit `return`.
- Pull values out of an object with `{ }` destructuring and out of an array with `[ ]` destructuring.
- Explain what a module is and why code is split across files.
- Write and read a simple `export` and `import`.
- Recognise the classic "arrow with braces but no return" mistake and the "import outside a module" error.

## What you need already

- **U05 — values, variables, and functions.** You can define a function, use parameters, and `return` output.
- **U06 — arrays, objects, and `map`.** You can build arrays of objects and transform them with `.map`. Arrows are used heavily as `.map` callbacks, so this unit builds directly on that.

## Time and energy

Plan **90–120 minutes**. The syntax is short; the `{` vs `(` trap in arrow functions deserves real attention. Do not rush the "predict then run" work in this unit; the reward is that React code stops looking cryptic.

## Why this exists

Design tools have shorthands: a style you can apply in one click, a variant that changes only what differs, a library you drop into any file. JavaScript has the same pressures. Arrow functions remove ceremony from the small functions you write constantly. Destructuring removes repetitive `obj.this` and `obj.that`. Modules let a team keep one component or one set of tokens per file instead of one enormous document.

When you open your first real React file in U11, it will start with `import` lines and contain arrow functions and destructuring. This unit is what makes that file readable instead of intimidating.

## Plain-language teaching

### 1. Arrow functions — a shorter function

In U05 you wrote functions like this:

```js
function double(n) {
  return n * 2;
}
```

An **arrow function** expresses the same thing with `=>`:

```js
const double = (n) => n * 2;
```

Read it in order:

- `const double =` — store the function in a variable named `double`. You now call it the same way: `double(4)`.
- `(n)` — the parameters, exactly as before.
- `=>` — "this function produces…". The arrow is pronounced "goes to."
- `n * 2` — the **return value**, written directly with no `return` keyword.

When the body is a single expression, the arrow returns it automatically. This is called an **implicit return**. It is concise and common for small transformations, such as the callback you pass to `.map`.

When a function needs more than one line, wrap the body in braces — and then you must write `return` yourself:

```js
const greeting = (name) => {
  const message = "Hello, " + name + "!";
  return message;
};
```

This is called a **block body**. With braces, there is no implicit return. Forgetting that is the single most common arrow-function bug, and we cause it on purpose below.

You may write a single parameter without parentheses (`n => n * 2`). Many teams include the parentheses anyway for consistency, and this course does the same: **always write `(n) =>`**. Consistency beats saving one character.

### 2. Destructuring — unpacking named values

**Destructuring** means pulling values out of an object or array and giving them names, in one line. It is not a new kind of data; it is a shortcut for reading.

**Object destructuring** pulls out values by key:

```js
const project = { title: "Homepage redesign", likes: 12 };

const { title, likes } = project;

console.log(title); // Homepage redesign
console.log(likes); // 12
```

Read the middle line as: "from `project`, take the values whose keys are `title` and `likes`, and create variables with those same names." Order does not matter, because keys are matched by name, not position.

If you asked for a key that does not exist, you get `undefined`, exactly as with dot notation:

```js
const { height } = project; // undefined
```

**Array destructuring** pulls out values by position:

```js
const palette = ["#111111", "#F5F5F5", "#0A84FF"];

const [ink, paper] = palette;

console.log(ink);   // #111111
console.log(paper); // #F5F5F5
```

Here the names are yours to choose; what matters is position. The first name takes index `0`, the second takes index `1`, and the rest are ignored unless you name more.

Design bridge: destructuring is asking for named properties off a layer — "give me the fill and the corner radius" — instead of reaching in every time you mention them. It keeps the following lines short and readable.

### 3. Modules — files that share code

A **module** is a file that can share some of its contents with other files and can use theirs. Two keywords do the sharing:

- `export` marks something in a file as available to other files.
- `import` brings those marked things into the current file.

Before modules, everything lived in one giant script. Modules let you keep one job per file: `tokens.js` holds design values, `Button.js` holds a button, and a page imports both. If that sounds like a design-system library where you publish components and pull them into a screen, it is the same idea.

Since U11's React preview, here is the shape you will see:

```js
// tokens.js
export const spacing = 8;
```

```js
// card.js
import { spacing } from "./tokens.js";

console.log(spacing); // 8
```

Line by line:

- `export const spacing = 8;` declares a value and marks it for sharing. This is a **named export**: the name `spacing` travels with it.
- `import { spacing } from "./tokens.js";` reads that named export into the current file. The braces mean "a named import." The `./` means "in the same folder"; `tokens.js` is the file name, including the extension.
- After importing, `spacing` behaves like any variable.

There is also a **default export**, for the single main thing a file provides. A file can have at most one default export:

```js
// Button.js
export default function Button() {
  return "a button, one day";
}
```

```js
// page.js
import Button from "./Button.js";
```

Notice the differences: the default export has no braces on import, and you may rename it. Named exports use braces and keep their names. React components are very often default exports.

### 4. Why imports cannot always run in this unit

To use `import` and `export`, the browser must treat your script as a module. In HTML, that means the script tag says `type="module"`:

```html
<script type="module">
  import { spacing } from "./tokens.js";
</script>
```

Even then, browsers block module imports that start from a plain `file://` address, for security reasons. You would see an error like "Failed to load module script" or a CORS message. The honest fix is to serve the files over a tiny local web address, which is exactly what the dev server in U09 sets up.

So in this unit: run arrow functions and destructuring directly (they need no modules), and treat the import examples as read-and-predict. When U09 starts a dev server, the same import lines run.

### 5. How this prepares you for React files

Open any React file and you will see all three ideas at once:

```js
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return count;
};
```

You are not expected to understand every word yet. You are expected to recognise the parts: an `import`, a component written as an arrow function, and a line that looks like array destructuring (`const [count, setCount] = ...`). Those are U07 ideas in their native habitat. This preview is here only to show that the syntax you just learned is the same syntax React is built from.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Arrow function | A function written with `=>` | Braces around the body disable the implicit return |
| Implicit return | A one-expression arrow returns automatically | Only without braces |
| Block body | A function body wrapped in `{ }` | Requires an explicit `return` |
| Destructuring | Pulling values out of an object or array by name or position | Object uses keys; array uses position |
| Module | A file that can share code | Needs `type="module"` to run in a browser |
| `export` | Mark something for other files to use | Named vs default are different |
| `import` | Bring exported values into this file | Named imports need braces |
| Named export/import | Shared by name; braces on import | Name must match on both sides |
| Default export/import | A file's single main export; no braces | Only one per file; may be renamed |
| Relative path | `./tokens.js` means same folder | The extension is required in the browser |
| `useState` | A React feature; preview only here | Not taught in this unit |

## Worked example

### Part A — arrow functions and destructuring (runnable)

Create `tokens.html` in your unit folder with this content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>U07 tokens</title>
  </head>
  <body>
    <h1>Open the console to see the output</h1>
    <script>
      const palette = ["#111111", "#F5F5F5", "#0A84FF"];
      const project = { title: "Homepage redesign", likes: 12, isPublic: true };

      const [ink, paper] = palette;
      const { title, likes } = project;

      const double = (n) => n * 2;
      const describe = (name, count) => {
        const line = name + " has " + count + " likes";
        return line;
      };

      console.log(ink);
      console.log(paper);
      console.log(title);
      console.log(double(likes));
      console.log(describe(title, likes));
    </script>
  </body>
</html>
```

Line by line:

- `const palette = [...]` and `const project = {...}` set up the data, as in U06.
- `const [ink, paper] = palette;` destructures the array by position: `ink` is index `0`, `paper` is index `1`.
- `const { title, likes } = project;` destructures the object by key, creating `title` and `likes`.
- `const double = (n) => n * 2;` is an arrow function with an implicit return.
- `const describe = (name, count) => { ... };` is an arrow with a block body, so it uses an explicit `return`.
- The five `console.log` calls demonstrate each.

How to run it: save the file, double-click it (on macOS, Control-click → "Open With" → your browser), open the console.

Expected output:

```
#111111
#F5F5F5
Homepage redesign
24
Homepage redesign has 12 likes
```

### Part B — an import you will recognise later (read-only)

These two files cannot run from a double-clicked `file://` page; they run once the dev server exists in U09. Read them now and predict the output.

`tokens.js`:

```js
export const spacing = 8;
export const radius = 4;
```

`card.js`:

```js
import { spacing, radius } from "./tokens.js";

const cardWidth = 320;
const cardHeight = spacing * 30;

console.log(spacing);
console.log(radius);
console.log(cardWidth - spacing);
console.log(cardHeight);
```

Predict before reading on: `spacing` is `8`, `radius` is `4`, `cardWidth - spacing` is `312`, and `cardHeight` is `240`. If you wrote those, you already read a module correctly.

## Common errors

### Error 1: Arrow with braces but no `return`

```js
const double = (n) => { n * 2; };
console.log(double(4));
```

Expected `8`; you get `undefined`.

**What happened.** The braces made this a block body, which has no implicit return, and you never wrote `return`. **Fix.** Either remove the braces (`(n) => n * 2`) or add `return` (`(n) => { return n * 2; }`).

### Error 2: `Uncaught ReferenceError: title is not defined`

**What happened.** You used `title` as if it were a variable, but you never created it. This usually means you forgot to destructure, or you destructured a different object.

```js
const project = { title: "Homepage redesign" };
console.log(title); // title was never created
```

**Fix.** Destructure first (`const { title } = project;`), or read it directly (`project.title`).

### Error 3: `Uncaught SyntaxError: Missing initializer in destructuring declaration`

**What happened.** You destructured without declaring the variables.

```js
{ title } = project; // no const/let → syntax error
```

**Fix.** Always begin a destructuring statement with `const` or `let`: `const { title } = project;`.

### Error 4: `Uncaught SyntaxError: Cannot use import statement outside a module`

**What happened.** You put an `import` in a script the browser is not treating as a module.

```html
<script>
  import { spacing } from "./tokens.js"; // error: not a module
</script>
```

**Fix.** Either add `type="module"` (`<script type="module">`) and serve the page properly, or run that code after U09. The error is telling you the script is the wrong kind, not that `import` is wrong in general.

### Error 5: `Failed to load module script` / a CORS message

**What happened.** Your script is `type="module"`, but you opened the page by double-clicking, so the address begins with `file://`. Browsers block cross-file module loads from `file://` for safety. **Fix.** Run it after U09's dev server, which serves the files over `http://localhost`. This is an environment limitation, not a mistake in your code.

### Reading an error — practice

```js
const { width } = { height: 200 };
console.log(width);
```

Output:

```
undefined
```

Decode it before reading on: there is no error text. The object has only a `height` key, so destructuring `width` produces `undefined`. **Decoded:** a missing key is silent, just like a typo with dot notation. **Fix:** destructure a key that exists (`const { height } = ...`) or accept `undefined` and handle it later. Reading `undefined` as a clue, rather than waiting for red text, is a habit that pays off in every future unit.

## Checkpoints

1. Rewrite `function half(n) { return n / 2; }` as an arrow function.
2. When does an arrow function return automatically, and when do you need `return`?
3. What is the difference between `const { title } = obj;` and `const [title] = arr;`?
4. What does `./` mean in `import { spacing } from "./tokens.js";`?
5. Why can a `type="module"` import fail when you open a file by double-clicking, and what will fix it in U09?

## Practice exercises

### P1 — Read and predict

Without running, write what this prints. Then run it in the console and compare.

```js
const box = { w: 100, h: 200 };
const { w, h } = box;
const triple = (n) => n * 3;

console.log(w);
console.log(h);
console.log(triple(w));
```

### P2 — Change one value

In `tokens.html`, change `likes` from `12` to `50` and reload. Which output lines change, and which stay the same? Explain why `double(likes)` changes but `ink` does not.

### P3 — Fill in the blank

Complete the destructuring and arrow so the three logs print `8`, `4`, and `16`.

```js
const tokens = { spacing: 8, radius: 4 };
const { spacing, radius } = ____;
const square = (n) => ____;

console.log(spacing);
console.log(radius);
console.log(square(radius));
```

### P4 — Write from a spec

Given `const person = { name: "Nia", role: "Designer" };`, write an arrow function `label` that takes a person and returns `"Nia (Designer)"` using destructuring inside the function. Log `label(person)`.

### P5 — Fix the broken snippet

This should log `8` but logs `undefined`. Find and fix the problem.

```js
const margin = (n) => { n + 4; };
console.log(margin(4));
```

### P6 — Read a module

Given:

```js
// theme.js
export const primary = "#0A84FF";
export const secondary = "#FF9F0A";
```

```js
// banner.js
import { primary } from "./theme.js";
console.log(primary);
```

Predict what `banner.js` logs, and write one sentence explaining what the braces around `primary` mean.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). Read it before you start.

## What is *not* in this unit

- No React, JSX, or components yet; the preview is recognition only.
- No `useState` or any hooks; not taught here.
- No running of `import`/`export` in a browser in this unit; that waits for U09's dev server.
- No advanced destructuring beyond named values and positions (no nested or default-value destructuring required).
- No installing anything; Node.js arrives in U08.

## Next unit

**U08 — Installing Node.js safely, and verifying the install.** You have finished the JavaScript essentials. Next you set up the tool that lets code run outside the browser, and you will verify the installation step by step before touching React.
