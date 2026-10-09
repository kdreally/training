# U07 Assignment — Arrow functions, destructuring, and imports

Submit everything to your trainer in **one folder or zip** named:

`U07-YourName`

## Files to submit

### 1. `tokens.html`

Create this file from scratch. Do not copy the worked example; invent your own data (for example: a colour palette and a screen object). It must run in a browser and print to the console.

Requirements:

- One array destructuring (at least two names, using `[ ]`).
- One object destructuring (at least two keys, using `{ }`).
- One arrow function with an **implicit return** (no braces).
- One arrow function with a **block body** that uses an explicit `return`.
- At least three `console.log` lines showing the destructured values and both arrow functions working.

### 2. `console-output.txt`

Open `tokens.html`, open the console, and copy the exact output into this plain text file. Copy, do not retype.

### 3. `modules-answers.md`

Imports cannot run by double-clicking, so this part is read-and-predict. Answer in your own words.

1. **Read the module.** Given:
   ```js
   // sizes.js
   export const base = 16;
   export const ratio = 1.5;
   ```
   ```js
   // layout.js
   import { base, ratio } from "./sizes.js";
   console.log(base);
   console.log(base * ratio);
   ```
   Write what `layout.js` prints. Then explain, in one or two sentences, what the braces around `base, ratio` mean on the import line.

2. **Named vs default.** A file has `export default function Button() {}`. Write the `import` line that brings it in as `Button`, and say how that differs from a named import.

3. **Why modules.** In 3–5 lines, explain why a team would split code into `tokens.js`, `Button.js`, and `page.js` instead of writing one large file. Use a design-library comparison if it helps.

4. **Why it will not run yet.** In two or three sentences, explain why opening a `type="module"` page by double-clicking can produce a "Failed to load module script" or CORS error, and what in U09 will fix it.

### 4. `answers.md`

Answer in your own words.

1. **Explain it back.** In 4–6 lines, explain to another designer what an arrow function is and how it differs from the `function` form, including the braces rule.
2. **Destructuring.** Explain the difference between `const { title } = obj;` and `const [first] = arr;` in your own words. Why does order matter for one and not the other?
3. **Predict then run.** Write what this prints, then run it and write the real output. Explain any difference.
   ```js
   const [ink] = ["#111111", "#F5F5F5"];
   const { name, copies } = { name: "Zine", copies: 3, size: "A5" };
   const shout = (text) => text + "!";
   const total = (n) => {
     const bumped = n + copies;
     return bumped;
   };
   console.log(ink);
   console.log(name);
   console.log(shout(name));
   console.log(total(1));
   ```
4. **Debug this broken snippet.** This should log `16` but logs `undefined`. Write the fixed version and name the mistake.
   ```js
   const area = (w) => { w * 4; };
   console.log(area(4));
   ```
5. **Read an error.** You paste an `import` into a page opened by double-clicking and see:
   ```
   Uncaught SyntaxError: Cannot use import statement outside a module
   ```
   In two or three sentences, explain what the message means and name one thing to change.

### 5. `checklist.md`

Copy this and mark each item `[x]` when true:

```markdown
- [ ] `tokens.html` opens and the console shows my output.
- [ ] I destructured an array with `[ ]`.
- [ ] I destructured an object with `{ }`.
- [ ] I wrote an arrow function with an implicit return (no braces).
- [ ] I wrote an arrow function with a block body and an explicit `return`.
- [ ] `console-output.txt` is the real copied output.
- [ ] `modules-answers.md` answers all four prompts.
- [ ] I read the U07 rubric before writing answers.md.
- [ ] My answers are in my own words.
```

## Definition of done

- All five files present with the exact names above.
- `tokens.html` runs and prints the required lines.
- The block-body arrow uses `return`; the implicit-return arrow does not use braces.
- `console-output.txt` matches a real run.
- Both answer files cover every prompt in your own words.
- Checklist completed honestly.
