# U05 Assignment — Values, variables, and functions

Submit everything to your trainer in **one folder or zip** named:

`U05-YourName`

## Files to submit

### 1. `progress.html`

Create this file from scratch (do not copy the worked example word for word; change the values and content so it is yours). It must run in a browser and print to the console.

Requirements:

- A `<script>` block inside an HTML page.
- At least one string, one number, and one boolean stored in variables.
- At least one `const` and at least one `let`.
- At least one function that takes input and uses `return`.
- At least three `console.log(...)` lines that together show all of the above.

Suggested theme (you may choose your own): a design-sprint tracker that stores a sprint name, a number of finished tasks, and whether the sprint is active, then prints a label like `Sprint 1: 3 of 8 tasks done`, plus `true`/`false` for active.

### 2. `console-output.txt`

Open `progress.html` in your browser, open the console, and copy the exact output into a plain text file named `console-output.txt`. Do not retype it from memory; copy what the console actually shows.

### 3. `answers.md`

Answer these prompts in your own words. Short paragraphs or bullet lists are both fine. Do not paste the lesson back unchanged.

1. **Explain it back.** In 4–6 lines, explain the different jobs of HTML, CSS, and JavaScript on a page, as if to a designer who has never coded.
2. **`const` vs `let`.** Explain when you used each in your file, and why. What would go wrong if you made everything `let`?
3. **Parameter vs argument.** Use your own function from `progress.html` to point out which part is the parameter and which is the argument.
4. **Predict then run.** Before running anything, write down what this snippet prints, line by line. Then run it in the console and write what it actually printed. If they differ, say why.
   ```js
   const title = "Poster";
   let copies = 2;
   function multiply(a, b) {
     return a * b;
   }
   console.log(title);
   console.log(multiply(copies, 3));
   console.log(title + " x" + copies);
   ```
5. **Debug this broken snippet.** This should print `Hello, Ravi!` but it does not. Write the corrected snippet, and name each mistake you fixed.
   ```js
   function greeting(Name) {
     "Hello, " + Name + "!"
   }
   console.log(Greeting("Ravi")
   ```
6. **Read an error.** You run a line and the console shows:
   ```
   Uncaught ReferenceError: likeCount is not defined
   ```
   In two or three sentences, explain what the message means and list two likely causes.

### 4. `checklist.md`

Copy this and mark each item `[x]` when true:

```markdown
- [ ] My `progress.html` opens in a browser without a blank or broken page.
- [ ] The console shows three or more lines of output when I reload.
- [ ] I have at least one string, one number, and one boolean.
- [ ] I used both `const` and `let` on purpose, and can explain each choice.
- [ ] My function uses `return`.
- [ ] `console-output.txt` contains the real copied output, not a retype.
- [ ] I read the U05 rubric before writing answers.md.
- [ ] My answers are in my own words.
```

## Definition of done

- All four files present with the exact names above.
- `progress.html` runs in the browser and prints to the console.
- `console-output.txt` matches what the console really shows.
- `answers.md` is in your own words and covers all six prompts.
- Checklist completed honestly.
