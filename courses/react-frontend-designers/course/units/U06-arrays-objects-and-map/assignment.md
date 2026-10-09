# U06 Assignment — Arrays, objects, and `map`

Submit everything to your trainer in **one folder or zip** named:

`U06-YourName`

## Files to submit

### 1. `gallery.html`

Create this file from scratch. Do not reuse the worked example's project titles; invent your own list (for example: playlists, recipes, travel stops, fonts, or archive items). It must run in a browser and print to the console.

Requirements:

- An array of **at least three objects**. Each object has at least a text property and a number property.
- One `console.log` that prints the array's `.length` with a readable label.
- One `.map` that transforms every item, using `function (item) { ... }` syntax (not arrows), with a `return`.
- One `console.log` of the array returned by `.map`.
- At least one direct read that uses an index, such as `items[0].someKey`, logged with a label.

### 2. `console-output.txt`

Open `gallery.html`, open the console, and copy the exact output into this plain text file. Copy, do not retype.

### 3. `answers.md`

Answer in your own words.

1. **Explain it back.** In 4–6 lines, explain the difference between an array and an object, using a design example for each.
2. **Indexes.** Why does `array[0]` give the first item, and what does `array[array.length]` give? Explain in two or three sentences.
3. **Dot vs bracket.** Give one reason to use `obj["key"]` (bracket notation) instead of `obj.key` (dot notation).
4. **Read the code.** Given:
   ```js
   const stops = [
     { city: "Lagos", days: 3 },
     { city: "Lisbon", days: 5 },
   ];
   console.log(stops[1].city);
   ```
   Write down what prints, then explain the chain `stops[1].city` left to right.
5. **Predict then run.** Write what this prints, then run it and write the real output. Explain any difference.
   ```js
   const scores = [10, 20, 30];
   const higher = scores.map(function (score) {
     return score + 5;
   });
   console.log(scores);
   console.log(higher);
   console.log(scores.length);
   ```
6. **Debug this broken snippet.** It should log `["A4", "A3"]` but does not. Write the fixed version and name each fault.
   ```js
   const papers = [
     { size: "A4", }
     { size: "A3" }
   ]

   const sizes = papers.map(function (paper) {
     paper.size
   });

   console.log(sizes);
   ```
7. **Read an error.** You run a line and see:
   ```
   Uncaught TypeError: papers.map is not a function
   ```
   In two or three sentences, what does this tell you about `papers`, and what would you check?

### 4. `checklist.md`

Copy this and mark each item `[x]` when true:

```markdown
- [ ] `gallery.html` opens and the console shows my output.
- [ ] My array has three or more objects.
- [ ] Each object has a text property and a number property.
- [ ] I logged `.length` with a label.
- [ ] My `.map` uses `function (item) { ... }` and has a `return`.
- [ ] I logged the result of `.map`.
- [ ] I read a value with an index, like `items[0].title`.
- [ ] `console-output.txt` is the real copied output.
- [ ] I read the U06 rubric before writing answers.md.
- [ ] My answers are in my own words.
```

## Definition of done

- All four files present with the exact names above.
- `gallery.html` runs and prints the required lines.
- The `.map` callback returns a value (not just prints).
- `console-output.txt` matches a real run.
- `answers.md` covers all seven prompts in your own words.
- Checklist completed honestly.
