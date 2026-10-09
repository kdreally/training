# U10 Assignment — Know the map

Submit the following to your trainer in **one folder or zip** named:

`U10-YourName`

## Files to submit

### 1. `answers.md`

Answer in your own words.

1. **Two categories.** In your own words, what is the difference between source files and generated/managed files? Give one example of each.
2. **The chain.** Trace the path from the browser loading `index.html` to your `App` component appearing on the page. Name each file in order and what it passes along.
3. **`package.json` vs `package-lock.json`.** Explain the difference in one or two sentences, and why you should not hand-edit the lock file.
4. **`public/` vs `src/assets/`.** What is the difference? Give a situation where you would use each.
5. **Edit vs leave alone.** List **four** files/folders you should not edit during this course and give a one-line reason for each.
6. **Mount point.** What is the "mount point," and where is it in this project?
7. **Error-reading practice.** Paste the error text you saw in Practice P6 (the deliberately broken `import App from './Wrong.jsx'`). Explain what the message was telling you.

### 2. `file-map.md`

A table with one row for **every** entry in your project's top-level folder (use your own project, not the lesson's). Columns:

| Name | File or folder? | My job with it (edit / add-only / leave alone) | One-line purpose |
|------|-----------------|------------------------------------------------|------------------|

How to get the list: in the project folder, run your listing command (`Get-ChildItem` on Windows, `ls` on macOS/Linux) and include what it shows, plus entries inside `src/` separately.

### 3. `screenshot.png` (or `.jpg`)

One screenshot of your browser showing your running app **with the changed page title visible in the browser tab**. The title change is the proof you completed the worked example.

## Definition of done

- Folder named `U10-YourName` with all three files present.
- `file-map.md` covers every top-level entry in *your* project, including `src/` contents.
- The screenshot shows the changed tab title and the app running.
- If something did not work, `answers.md` includes the exact error text and what you tried.

## Note on stuck submissions

A submission that documents the block, with the real error text, is worth full effort marks. Never submit nothing.
