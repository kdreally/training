# U05 — JavaScript: values, variables, and functions

**Phase 1 — Foundations**

## Where you are

You know a page is made of elements (U02), that HTML gives those elements structure (U03), and that CSS gives them their look (U04). HTML and CSS describe a page, but they cannot *decide* anything. They cannot remember a number, compare two values, or do the same small job in several places. JavaScript is the language that adds that behaviour.

This unit is the first time you write real instructions to the browser. It is small on purpose. You will create values, store them in variables, and write functions that take input and give back output. Everything runs in the browser console, so there is nothing to install.

If your stomach tightens at the phrase "writing code," that is normal and expected here. We start in a scratchpad, not a project. Nothing you type can break your computer.

## What you will be able to do

- Explain, in one or two sentences, what JavaScript adds that HTML and CSS cannot.
- Open the browser's **console** and run a line of JavaScript.
- Create and name the three basic value types: **string**, **number**, **boolean**.
- Store a value in a variable using `let` and `const`, and choose between them.
- Write a function that takes input and gives back output with `return`.
- Read a short error message and say what it means in plain language.

## What you need already

- **U02 — What a web page is made of.** You know a page is a tree of elements.
- **U03 — HTML as structure.** You know pages are written as files with tags.
- **U04 — CSS as presentation.** You know CSS styles those elements.
- No prior programming experience is required. This is the first code unit.

## Time and energy

Plan for **90–120 minutes**, likely across two sittings. The concepts are short but new, and new names need a night to settle. Take a break between the worked example and the assignment. Being tired and confused at the same time helps nobody.

## Why this exists

Imagine a card in your design tool. It shows a project title, a like count, and a "Featured" label. If you wanted fifty of these with different content, you would not redraw fifty cards by hand. You would make it reusable and feed it different content.

Code works the same way. HTML and CSS give you one fixed page. JavaScript gives you the ability to store content, do a small job on it, and reuse that job everywhere. A variable is the "content slot." A function is the "reusable job." Almost every React skill later in this course is built out of these two ideas.

## Plain-language teaching

### 1. What JavaScript is for

A web page has three jobs:

- **Structure** — what things are (a heading, a button, a list). That is HTML.
- **Presentation** — how those things look (colour, spacing, size). That is CSS.
- **Behaviour** — what happens and what is remembered. That is JavaScript.

Without JavaScript, every page is a poster. It can look beautiful, but it cannot react, count, or change. JavaScript is the part that runs instructions.

JavaScript also has a **console**, which is the tool you will use to run one line at a time. Think of it as a scratchpad attached to the browser.

### 2. The console: your scratchpad

**What it is.** The console is a text area in your browser where you can type a line of JavaScript, press Enter, and see the result immediately. It does not save anything when you close the browser, which is exactly what makes it safe for practice.

**What problem it solves.** It lets you try an instruction and see what it does without creating a file, a project, or a build. You can be wrong as often as you like.

**How to open it.** Open any page in your browser (a blank tab is fine). Then use one of these:

| Browser | Windows / Linux | macOS |
|---------|-----------------|-------|
| Chrome | `F12`, or `Ctrl` + `Shift` + `J` | `Cmd` + `Option` + `J` |
| Edge | `F12`, or `Ctrl` + `Shift` + `J` | `Cmd` + `Option` + `J` |
| Firefox | `F12`, or `Ctrl` + `Shift` + `K` | `Cmd` + `Option` + `K` |
| Safari | Enable Develop menu first; then `Option` + `Cmd` + `C` | same |

You can also right-click almost anywhere on a page and choose **Inspect**, then click the **Console** tab. On Safari, the Develop menu is hidden until you turn it on in Settings → Advanced → "Show features for web developers."

**What success looks like.** A panel opens, usually on the right or bottom. You see a `>` sign (the prompt) waiting for you to type. There is a cursor after it.

**What failure looks like.** You press `F12` and nothing happens. On many laptops the top row of keys is a media/volume row by default, so `F12` is captured by the keyboard. Hold the `Fn` key and press `F12` together. If a panel opens but shows only a Network tab, click the **Console** tab.

Type this and press Enter:

```
1 + 1
```

The console prints `2` on the next line. You have run JavaScript. That is the whole ceremony.

If you want to clear the console later, type `clear()` and press Enter. That empties the output so you can start fresh; it does not change anything you typed earlier.

### 3. Values and types

A **value** is a single piece of data. JavaScript cares what *kind* of value it is, because different kinds behave differently. The three kinds you need now are:

- **String** — text. You write strings inside quotes: `"Hello"`, `'sam@example.com'`. The quotes are not part of the value; they mark where the text begins and ends.
- **Number** — a numeric value: `42`, `0`, `3.5`. No quotes. Numbers can be added, subtracted, compared.
- **Boolean** — exactly two possibilities: `true` or `false`. No quotes. Used for yes/no facts, like "is this featured?".

There is also a special value called `undefined`, which means "there is no value here yet." You will mostly meet it in error messages, so it is worth knowing the word now. It is not the same as the string `"undefined"`.

The type matters because `"2" + "2"` and `2 + 2` give different answers. Quotes change meaning:

```
"2" + "2"   // "22"   (joins the text)
2 + 2       // 4      (adds the numbers)
```

### 4. Variables: `let` and `const`

A **variable** is a named slot that holds a value. Naming a value once lets you use it in many places and change it in one place. If that sounds like a design **token** (a colour or spacing value defined once and reused everywhere), you already understand the point.

You create a variable with one of two keywords:

- `const` — the slot points to this value and will not be reassigned. Use it by default.
- `let` — the slot may be reassigned later. Use it only when a value must change.

```js
const courseName = "React for Designers";
let completedUnits = 4;
```

Read the first line as: "create a slot named `courseName`, and it holds the text `React for Designers`." The `=` sign means "put the value on the right into the name on the left." In code we call `=` **assignment**; it is not a question of equality.

`const` is the safer default because it prevents accidental changes. When you truly need a value to change, `let` lets you:

```js
let completedUnits = 4;
completedUnits = 5;
```

A variable name is not a value; it is the label on the slot. When the browser sees `completedUnits`, it looks up whatever is currently in that slot. We call looking it up **reading** the variable.

### 5. Naming

Variable names should be readable. A few simple rules and one habit:

- Start with a letter, `_`, or `$`. Not a digit.
- No spaces. If you need two words, join them in **camelCase**: `likeCount`, `isFeatured`, `backgroundColor`.
- Names are case-sensitive: `likeCount` and `likecount` are different slots.
- Name the *meaning*, not the type. `likeCount` is better than `n`. `isFeatured` is better than `flag`.

You are not expected to invent great names yet. You are expected to make them readable enough that future-you is not annoyed.

### 6. Functions: input → output

A **function** is a reusable set of instructions. You give it input, it does its job, and it gives back output. Think of a component in your design tool that you reuse on many screens: you drop in new content and it produces a new instance. A function is the code version of that.

Two pieces of vocabulary matter here:

- **Parameter** — a named input slot written in the function's definition.
- **Argument** — the actual value you pass in when you use the function.

A **function declaration** looks like this:

```js
function greeting(name) {
  return "Hello, " + name + "!";
}
```

Read it in order:

- `function` — "I am defining a function."
- `greeting` — the name you will use to call it later.
- `(name)` — one input slot, called `name`.
- `{ ... }` — the body: the instructions that run when the function is used.
- `return` — the output. Whatever you put after `return` is handed back to whoever called the function.

The line inside builds a string by joining `"Hello, "`, the value of `name`, and `"!"`. The `+` between strings **concatenates** (joins) them.

To **call** (use) the function, write its name followed by parentheses containing the argument:

```js
console.log(greeting("Sam"));
```

Here `"Sam"` is the argument; inside the function it arrives as the parameter `name`, and the function returns `"Hello, Sam!"`. `console.log` then prints it.

A function only produces output when you actually `return` something. A function without `return` gives back `undefined`. That surprises almost everyone once, so we will cause it on purpose in the common-errors section.

### 7. `console.log`

`console.log(...)` is an instruction that prints whatever is inside the parentheses to the console. It is how you *see* a value while you work. It does not change the value or the page; it only reports.

When you type a plain expression like `1 + 1` into the console, the console helpfully prints the result. Inside a saved file, nothing prints on its own — you call `console.log` to make it print. Keep that difference in mind: the console's automatic printing is a convenience of the console, not a feature of the language.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| JavaScript | The language that adds behaviour and memory to a page | Not Java; the names are only similar |
| Console | A scratchpad in the browser for running lines of code | Not the same as the Elements/Inspector tab |
| Value | A single piece of data | A value is the data itself, not its name |
| String | Text, written inside quotes | The quotes are markers, not part of the text |
| Number | A numeric value, written without quotes | `"2"` is a string, not a number |
| Boolean | `true` or `false` | Write it lowercase; `True` is not defined |
| `undefined` | "No value here yet" | Not the same as the text `"undefined"` |
| Variable | A named slot holding a value | The name is not the value |
| `const` | A slot that will not be reassigned | Not "cannot change the value's insides" |
| `let` | A slot that may be reassigned | You do not need `let` for everything |
| camelCase | Joining words with capital letters | Case matters; names are case-sensitive |
| Function | A reusable set of instructions | Not the same as running it |
| Parameter | An input slot named in the definition | Filled with an argument when called |
| Argument | The actual value passed in when calling | Different from the parameter name |
| Return | The output a function hands back | A function without `return` gives `undefined` |
| Concatenate | Join values into one, often with `+` | `+` adds numbers but joins strings |
| `console.log` | Prints a value to the console | Does not change anything; only reports |

## Worked example

We will build a tiny "course progress" snippet. First in the console, then saved into a file.

### Part A — the console version

Type these lines into the console, one at a time, pressing Enter after each. (You can paste the whole block if your browser allows it; if the console refuses multi-line paste, do one line at a time.)

```js
const courseName = "React for Designers";
let completedUnits = 4;
const isEnrolled = true;

console.log(courseName);
console.log(completedUnits);
console.log(isEnrolled);
```

Line by line:

- `const courseName = "React for Designers";` creates a text slot. `const` because the course name will not change.
- `let completedUnits = 4;` creates a number slot. `let` because you will move this number up as you progress.
- `const isEnrolled = true;` creates a boolean slot. `const` because your enrolment status is a fact, not a number you increment.
- Each `console.log(...)` prints the current value of the slot named inside.

Expected output (the exact values, printed on separate lines):

```
React for Designers
4
true
```

Now change one value and observe. This is the design-token move: change once, see it everywhere.

```js
completedUnits = 5;
console.log(completedUnits);
```

Output:

```
5
```

Now a function. Type:

```js
function progressLabel(done, total) {
  return done + " of " + total + " units done";
}

console.log(progressLabel(completedUnits, 12));
```

Line by line:

- `function progressLabel(done, total)` defines a function with two input slots.
- `return done + " of " + total + " units done";` joins the numbers with text using `+` and hands the result back. Notice the spaces inside the strings, so the output reads naturally.
- The call passes `completedUnits` (currently `5`) as `done` and `12` as `total`.

Expected output:

```
5 of 12 units done
```

### Part B — save it in a file

The console forgets everything when you close the tab. To keep work, you save it in a file. Because plain `.js` files cannot run in a browser on their own, we wrap the code in a tiny HTML file, which you already understand from U03.

Create a folder for this unit. Inside it, create a file named `progress.html` and put this content in it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>U05 progress</title>
  </head>
  <body>
    <h1>Open the console to see the output</h1>
    <script>
      const courseName = "React for Designers";
      let completedUnits = 4;
      const isEnrolled = true;

      function progressLabel(done, total) {
        return done + " of " + total + " units done";
      }

      console.log(courseName);
      console.log(isEnrolled);
      console.log(progressLabel(completedUnits, 12));
    </script>
  </body>
</html>
```

How to run it: save the file, then double-click it. On Windows and Linux it opens in your default browser; on macOS, Control-click the file and choose "Open With" → your browser. Then open the console (see the table in section 2) and look for the three lines.

Expected output:

```
React for Designers
true
4 of 12 units done
```

Why the `<script>` tag: in HTML, `<script>` marks where browser-run JavaScript begins and `</script>` marks where it ends. Everything between them is code the browser runs when the page loads.

## Common errors

### Error 1: `Uncaught ReferenceError: courseNmae is not defined`

**What happened.** You typed a variable name that does not exist — usually a typo or a name you never created. Here `courseNmae` is `courseName` misspelled.

**Fix.** Compare the name in the log with the name you declared, character by character. The error is telling you the truth: there is no slot with that name. (In the console, you may need to retype the declaration if you cleared it or opened a new tab.)

### Error 2: `Uncaught TypeError: Assignment to constant variable.`

**What happened.** You tried to reassign something declared with `const`.

```js
const total = 12;
total = 13; // Assignment to constant variable.
```

**Fix.** If the value genuinely needs to change, declare it with `let`. If it should not change, then the error protected you from overwriting a fixed value. Ask which is true before switching the keyword.

### Error 3: Forgetting `return`

```js
function double(n) {
  n * 2;
}

console.log(double(4));
```

Expected output was `8`. You see `undefined` instead.

**What happened.** The function calculated `n * 2` but never handed it back. The calculation happened and was thrown away. Without `return`, a function gives back `undefined`.

**Fix.** Write `return n * 2;`.

### Error 4: `Uncaught SyntaxError: Invalid or unexpected token`

**What happened.** Almost always a missing or mismatched quote. `console.log("hello)` is missing the closing `"`; the browser cannot tell where the text ends.

**Fix.** Count your quotes. Every opening quote needs a closing quote of the same kind.

### Reading an error — practice

Look at this line and the message it produces:

```js
const likeCount = 12;
console.log(likeCount);
console.log(likecount);
```

```
12
Uncaught ReferenceError: likecount is not defined
```

Decode it before reading on: the first log worked, so `likeCount` exists. The second failed, so `likecount` does not. The only difference is the capital `C`. **Decoded:** JavaScript names are case-sensitive. **Fix:** match the spelling exactly. This pattern — one small difference between a working line and a broken one — is how you will solve most errors from now on.

## Checkpoints

Answer these before you start the assignment. If you can answer them, you are ready.

1. In your own words, what is the difference between HTML, CSS, and JavaScript on a page?
2. When would you choose `const` and when `let`?
3. What is the difference between a parameter and an argument?
4. A function that calculates something but never uses `return` gives back what, and why?
5. Why do `"2" + "2"` and `2 + 2` give different results?

## Practice exercises

Increasing difficulty. These are not graded, but do them — they are how the ideas stick.

### P1 — Read and predict

Without running them, write down what each line prints. Then run them in the console and compare.

```js
const label = "Draft";
console.log(label);

const count = 3;
console.log(count + 1);

console.log("count is " + count);
console.log(true);
```

### P2 — Change one value

In `progress.html`, change `completedUnits` from `4` to `7` and reload the page. Observe only the last line changing. Now also change the total from `12` to `20`. Which output lines changed?

### P3 — Fill in the blank

Complete the function so `console.log(tagLabel("New"))` prints `[New]`.

```js
function tagLabel(text) {
  return ____;
}
```

### P4 — Write from a spec

Write a function `square(number)` that returns the number multiplied by itself. Then log `square(5)` and confirm you see `25`.

### P5 — Fix the broken snippet

This should print `Hello, Ana!` but does not. Find and fix every problem.

```js
function greet(name) {
  "Hello, " + name + "!"
}
console.log(greet("Ana")
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). The rubric is visible on purpose; read it before you write anything.

## What is *not* in this unit

- No arrays, objects, or lists — those come in U06.
- No arrow functions, destructuring, or imports — those come in U07.
- No installing anything. Node.js arrives in U08.
- No HTML layout or CSS beyond the tiny wrapper file.
- No string template syntax with backticks; we build strings with `+` for now. You will meet backticks in a later unit.
- No loops (`for`, `while`) or conditions (`if`); these are useful but would crowd this unit.

## Next unit

**U06 — JavaScript: arrays, objects, and `map`.** You will store many values together and transform every item in a list, which is the skill behind every generated list of cards in React.
