# U02 Assignment — Reading the layers of a page

Submit the following to your trainer in **one folder or zip** named:

`U02-YourName` (use your real name or student id as they prefer)

You will need a browser. No coding, no terminal, no installation.

## Choose a page first

Pick **one** ordinary website you already use (a news page, a portfolio, an online shop, a hobby site). Do **not** pick a banking, government, or login screen — those often block right-clicking and can log you out. Write the site's name at the top of `answers.md` and use the same page for every task.

## Files to submit

### 1. `answers.md`

1. **Two layers.** In 3–5 lines, explain the difference between HTML and CSS using a metaphor from your own work (not the "skeleton and skin" one already in the lesson). Say what each layer decides.
2. **The DOM, plainly.** Define the DOM in your own words as if explaining it to a designer who has never coded. One to three sentences.
3. **Why a tree.** Explain why the DOM is shaped like a tree, and correctly use the words *parent*, *child*, and *sibling* in your explanation.
4. **Source vs DOM.** In your own words, what is the difference between **View Source** and the **Elements** panel? Give one reason they can differ.
5. **A CSS rule.** Describe, in plain language, what a CSS rule does. Use the pattern "pick a target → describe its look."
6. **Predict then inspect.** Pick one element on your chosen page (say, a container holding several items). Before inspecting, write a prediction: "This element is a parent of ___ children named ___." Then open DevTools → Elements and write what you actually found. If your prediction was wrong, that is fine — say what surprised you.
7. **Decode the failure.** A learner says: *"I right-clicked, chose 'Save as', got a file, and it doesn't look like HTML. View Source must be broken."* Explain what actually happened and what they should have chosen.

### 2. `tree.md`

Draw the DOM tree for **one small section** of your chosen page — a card, a list, a header, anything with a few nested parts. Use the text-tree format from the lesson, for example:

```text
main
 ├─ h1  →  heading text
 ├─ p   →  paragraph text
 └─ img →  (image; describe it)
```

Rules for your tree:

- It must show **at least one parent with three or more children**.
- It must include **at least one element that has children of its own** (a grandchild relationship).
- Under the tree, list the tag names you found and mark each as **"can hold content"** or **"stands alone."**
- Add one sentence: which relationship word (parent / child / sibling) describes your deepest pair of elements.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the U02 README fully (not only the assignment).
- [ ] I opened View Source on a real page.
- [ ] I opened DevTools → Elements on the same page.
- [ ] I used the words parent, child, and sibling correctly.
- [ ] My tree.md is drawn from a real inspected page, not invented.
- [ ] I read the U02 rubric before writing my answers.
```

## Definition of done

- All three files present with the exact names above.
- You used **one** real page throughout, named at the top of `answers.md`.
- `tree.md` shows a parent with three or more children **and** at least one grandchild relationship.
- The tag names in `tree.md` are real ones you actually saw (not imagined).
- The checklist is completed honestly.

If right-clicking is blocked on the page you picked, choose a different ordinary site rather than fighting it. If you get stuck, use the U00 stuck protocol and write down what you tried.
