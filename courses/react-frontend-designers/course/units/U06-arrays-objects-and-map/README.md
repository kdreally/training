# U06 — JavaScript: arrays, objects, and `map`

**Phase 1 — Foundations**

## Where you are

In U05 you stored single values — one string, one number, one boolean — in variables. Real interfaces rarely deal with one of anything. A project gallery has many projects; a card has several named properties. This unit gives you two containers for that: **arrays** (an ordered list of values) and **objects** (a set of named values). Then it teaches `.map`, which transforms every item in an array and gives you back a new array.

`.map` is the single most important JavaScript idea for React before React itself. Every list of cards, menu items, or comments you ever render in React will rest on this idea. We introduce it here in plain JavaScript, so that when it reappears in U15 it is old news.

The design bridge is exact: an array is a stack of layers; an object is a frame with named properties; `.map` is "duplicate this element for every item and swap in that item's content."

## What you will be able to do

- Create an array and read items from it using an index, remembering that the first index is `0`.
- Use `.length` to count how many items an array holds.
- Create an object and read its named values with dot and bracket notation.
- Nest objects inside arrays, and read a value out of that structure.
- Use `.map` to transform every item and explain why the original array is unchanged.
- Read an error about `undefined` or "not a function" and connect it to a shape mistake.

## What you need already

- **U05 — JavaScript: values, variables, and functions.** You can declare `const`/`let`, use types, and write a function that returns output. `.map` uses functions, so this matters.

## Time and energy

Plan **90–120 minutes**. `.map` is one short line with a lot behind it. When it feels like it "clicked and then slipped away," that is normal — re-run the worked example once more. Take a break before the assignment.

## Why this exists

Draw a card once, duplicate it across a screen, and change the text in each. That is how you work in a design tool. Code needs a way to say "here are many items; do the same thing to each." Without that, you would copy one line per item, and adding a tenth project would mean rewriting code by hand.

Arrays and objects describe *the data*. `.map` describes *what to do with each item*. Together they are the machine that turns a list into a repeated piece of interface.

## Plain-language teaching

### 1. Arrays — an ordered list

An **array** is an ordered list of values, written inside square brackets and separated by commas:

```js
const palette = ["#111111", "#F5F5F5", "#0A84FF"];
```

Read it as: "a list with three items, in this order." Arrays can hold any values, including mixed kinds and other arrays, but a list of same-kind values is the clearest.

Each item has an **index** — its position number. The first position is `0`, not `1`. This trips up nearly everyone once, so we will cause it on purpose shortly.

- `palette[0]` is `"#111111"` (the first item).
- `palette[2]` is `"#0A84FF"` (the third item).

The square brackets here mean "get the item at this position." We call this **bracket notation**.

An array's **length** is how many items it holds:

```js
console.log(palette.length); // 3
```

Note `.length` has no parentheses; it is a property, not a function you call.

Reading a position that does not exist gives `undefined` — not an error:

```js
console.log(palette[3]); // undefined
```

That silence is dangerous: nothing crashes, but you get `undefined` and later code may fail confusingly. Keep the valid range in mind: a length-3 array has positions `0`, `1`, and `2`.

### 2. Objects — named values

An **object** is a set of **key–value pairs**, written inside curly braces. A key is a name; a value is whatever that name holds:

```js
const artboard = {
  title: "Homepage",
  width: 1440,
  isDark: false,
};
```

Read it as: "an object with a `title` of `Homepage`, a `width` of `1440`, and an `isDark` of `false`." This should feel like a layer or frame in your design tool: one thing with several named properties.

You read a value in two ways:

- **Dot notation:** `artboard.title` → `"Homepage"`.
- **Bracket notation:** `artboard["width"]` → `1440`.

Use dot notation when you know the key name in advance. Use bracket notation when the key is stored in a variable, or when it contains spaces or unusual characters. Keys are case-sensitive.

If you ask for a key that does not exist, you get `undefined`:

```js
console.log(artboard.height); // undefined
```

Again, no crash — just a silent `undefined`. Typo in a key name is the most common cause.

### 3. Nesting — objects inside arrays

This is the shape you will meet constantly in React: an array of objects, each object describing one item.

```js
const projects = [
  { title: "Homepage redesign", likes: 12 },
  { title: "Icon set", likes: 7 },
  { title: "Onboarding flow", likes: 19 },
];
```

Read it as: "a list of three projects; each project has a `title` and a `likes` count." To read one value, go in two steps:

```js
console.log(projects[0].title); // "Homepage redesign"
```

Decode the chain left to right: `projects` is the list → `[0]` takes the first item (an object) → `.title` reads its `title` key. This left-to-right reading order is exactly how you should decode any chain of dots and brackets.

A common trap: `projects.title` (missing the index) is `undefined`, because the *list* has no key called `title`; only the objects inside it do.

### 4. `.map` — do something to every item

`.map` takes an array, runs a function on every item, and gives back a **new array** of the results. Same number of items in, same number out, each one transformed.

```js
const titles = projects.map(function (project) {
  return project.title;
});

console.log(titles);
```

Output:

```
["Homepage redesign", "Icon set", "Onboarding flow"]
```

Read the `.map` line piece by piece:

- `projects.map(...)` — "go through every item in `projects`."
- `function (project) { ... }` — the job to do to each item. Here the parameter `project` is the current item; the function runs once per item.
- `return project.title;` — the transformed result for that item. Because the callback **returns**, `.map` collects the returns into a new array.

The function you pass to `.map` is called a **callback**: a function you hand to another function to use. It is not run by you directly; `.map` runs it, once per item.

Two facts to hold on to:

1. `.map` returns a **new** array. The original `projects` is unchanged. We call this being **non-destructive**; it is why `.map` is safe and predictable.
2. Your callback must `return` something. If it only prints, `.map` collects `undefined` for every item and you get an array full of `undefined`.

Design bridge: `.map` is "for each item in this list, produce a version of the thing with that item's content filled in." In U15 this becomes rendering one `<ProjectCard>` per project. The shape is identical; only the output changes from text to UI.

### 5. Why `.length` and indexes matter together

`.length` tells you how many items exist; indexes let you reach a specific one. The valid indexes run from `0` to `.length - 1`. For `projects`, `.length` is `3`, so valid indexes are `0`, `1`, `2`. Index `3` is out of range and yields `undefined`. Keep that arithmetic in your head; it prevents a large family of bugs.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Array | An ordered list of values | First position is `0`, not `1` |
| Index | An item's position number | Last valid index is `.length - 1` |
| Bracket notation | `list[0]` or `obj["key"]` | For arrays it is a position, not a name |
| `.length` | How many items an array holds | No parentheses; it is a property |
| Object | A set of named values (key–value pairs) | Curly braces, not square brackets |
| Key | The name in a key–value pair | Case-sensitive; typos give `undefined` |
| Value | What a key or position holds | Can itself be an array or object |
| Dot notation | `obj.title` | Fails silently to `undefined` on a bad key |
| Nesting | Putting objects inside arrays or vice versa | Read chains left to right |
| `.map` | Transform every item into a new array | The original array is not changed |
| Callback | A function you pass to another function | `.map` runs it once per item |
| Non-destructive | Does not alter the original data | Returning a new array, not editing in place |

## Worked example

We will store a small gallery of projects as an array of objects, read from it, count it, and transform it with `.map`. Type each part into the console, or save the whole thing in a file as shown in Part B.

### Part A — the console version

```js
const projects = [
  { title: "Homepage redesign", likes: 12 },
  { title: "Icon set", likes: 7 },
  { title: "Onboarding flow", likes: 19 },
];
```

Line by line:

- `const projects = [` opens a list named `projects`.
- Each line `{ title: "...", likes: ... },` is one object item: a title string and a likes number. The commas separate items.
- `];` closes the list.

Now read from it:

```js
console.log(projects.length);        // 3
console.log(projects[0].title);      // Homepage redesign
console.log(projects[2].likes);      // 19
```

Line by line:

- `.length` counts the items → `3`.
- `projects[0]` is the first object, `.title` reads its title → `Homepage redesign`.
- `projects[2]` is the third object, `.likes` reads its likes → `19`.

Now transform every item with `.map`:

```js
const summaries = projects.map(function (project) {
  return project.title + " (" + project.likes + " likes)";
});

console.log(summaries);
```

Line by line:

- `projects.map(...)` walks the list.
- `function (project)` runs once per item, with `project` as that item.
- `return project.title + " (" + project.likes + " likes)";` builds a joined string for that item and hands it back. The parentheses and spaces are literal characters inside the strings, so the output reads cleanly.
- `.map` gathers the three returns into a new array named `summaries`.

Expected output:

```
["Homepage redesign (12 likes)", "Icon set (7 likes)", "Onboarding flow (19 likes)"]
```

Check that `projects` is unchanged:

```js
console.log(projects.length); // still 3
console.log(projects[0].title); // still Homepage redesign
```

That is the point of non-destructive transformation: the source data survives, and the new array is a fresh result.

### Part B — save it in a file

Create `gallery.html` in your unit folder with this content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>U06 gallery</title>
  </head>
  <body>
    <h1>Open the console to see the gallery</h1>
    <script>
      const projects = [
        { title: "Homepage redesign", likes: 12 },
        { title: "Icon set", likes: 7 },
        { title: "Onboarding flow", likes: 19 },
      ];

      console.log("Total projects: " + projects.length);

      const summaries = projects.map(function (project) {
        return project.title + " (" + project.likes + " likes)";
      });

      console.log(summaries);
    </script>
  </body>
</html>
```

How to run it: save the file, double-click it (on macOS, Control-click → "Open With" → your browser), open the console, and look for the two output lines.

Expected output:

```
Total projects: 3
["Homepage redesign (12 likes)", "Icon set (7 likes)", "Onboarding flow (19 likes)"]
```

## Common errors

### Error 1: `Uncaught TypeError: Cannot read properties of undefined (reading 'title')`

**What happened.** You asked for `.title` on something that is `undefined`. In an array of objects, this almost always means the index is out of range or the object you reached has no such key.

```js
console.log(projects[3].title); // projects[3] is undefined
```

**Fix.** Check the index against `.length`. For a length-3 array, the last valid index is `2`. If the index is right, check the key spelling.

### Error 2: `.title` on the list itself

```js
console.log(projects.title);
```

Expected output `undefined` (no crash). **What happened.** You forgot `[0]` (or another index). The *list* has no `title`; only the objects inside it do. **Fix.** Add the index: `projects[0].title`.

### Error 3: `Uncaught TypeError: projects.map is not a function`

**What happened.** `projects` is not an array. Often it is a single object, a string, or `undefined`.

```js
const projects = { title: "Homepage redesign" };
projects.map(function (p) { return p.title; });
```

**Fix.** Confirm your data is inside square brackets `[ ... ]`. An object `{ ... }` has no `.map`. This error names the exact thing that is not an array, which usually points straight to the mistake.

### Error 4: `.map` gives an array of `undefined`

```js
const titles = projects.map(function (project) {
  project.title; // no return
});
```

Output: `[undefined, undefined, undefined]`.

**What happened.** The callback calculated `project.title` but never returned it, so `.map` collected `undefined` for each item. This is the same `return` lesson from U05, showing up in a new place. **Fix.** Write `return project.title;`.

### Error 5: `Uncaught SyntaxError: Unexpected token` in the array

**What happened.** Usually a missing comma between items, or a trailing comma in an older browser, or a missing quote.

```js
const palette = ["#111111" "#F5F5F5"]; // missing comma
```

**Fix.** Put a comma between every pair of items. Read the error's line number — the browser often points at the item right after the missing comma.

### Reading an error — practice

```js
const palette = ["#111111", "#F5F5F5", "#0A84FF"];
console.log(palette[0]);
console.log(palette[3]);
```

```
#111111
undefined
```

Decode it before reading on: no error text appears at all. The first line works. The second prints `undefined` because `.length` is `3`, so the valid indexes are `0`, `1`, `2`. **Decoded:** `index 3` is out of range and yields `undefined` instead of throwing. **Fix:** use an index below `.length`. Learning that `undefined` output is itself a signal — not a crash, but a clue — is a key skill for the next units.

## Checkpoints

1. Why is `palette[0]` the first item and not the second?
2. If an array has 5 items, what is the last valid index? What does `array[5]` give?
3. What are the two ways to read a key from an object, and when do you prefer each?
4. In `projects[0].title`, what does each part do, reading left to right?
5. What does `.map` return, and does it change the original array?
6. Why does a `.map` callback that only prints give you an array of `undefined`?

## Practice exercises

### P1 — Read and predict

Without running, write what each line prints. Then run and compare.

```js
const ratings = [5, 4, 5, 3];
console.log(ratings.length);
console.log(ratings[0]);
console.log(ratings[4]);
```

### P2 — Change one value

In `gallery.html`, change the second project's `likes` from `7` to `21` and reload. Which output changes? Does the count change? Explain why.

### P3 — Fill in the blank

Complete the `.map` so `console.log(names)` prints `["Ink", "Paper"]`.

```js
const swatches = [
  { name: "Ink", hex: "#111111" },
  { name: "Paper", hex: "#F5F5F5" },
];

const names = swatches.map(function (swatch) {
  return ____;
});
```

### P4 — Write from a spec

Given:

```js
const tasks = [
  { label: "Wireframe", done: true },
  { label: "Hi-fi mockup", done: false },
];
```

Write code that creates a new array `labels` containing only the `label` values, then log it. Then write code that logs the number of tasks.

### P5 — Fix the broken snippet

This should log `"Poster (1)"` and `"Banner (2)"` but does not. Find and fix every problem.

```js
const assets = [
  { name: "Poster" likes: 1 },
  { name: "Banner", likes: 2 }
]

const labels = assets.map(function (asset) {
  asset.name + " (" + asset.likes + ")"
});

console.log(labels);
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). Read it before you start.

## What is *not* in this unit

- No arrow functions, destructuring, or imports — those come in U07. We use `function (item) { ... }` here on purpose so the shape is visible.
- No `.filter`, `.find`, `.forEach`, or `.reduce`; one array tool is enough for now.
- No rendering to the page yet. In this unit `.map` produces data; in U15 it produces UI.
- No installing anything; Node.js arrives in U08.
- No modifying arrays in place (`push`, `pop`, `splice`); we only read and transform.

## Next unit

**U07 — JavaScript: arrow functions, destructuring, and imports.** You will learn the shorter `=>` function syntax, how to pull named values out of an object in one line, and how files share code with `export` and `import` — the last JavaScript ideas before you install Node.
