# U31 Assignment — Build it, look inside, preview it

Submit the following to your trainer in **one folder or zip** named:

`U31-YourName`

## Files to submit

### 1. `answers.md`

Answer these prompts in your own words. Short paragraphs or bullet lists are both fine. Do not paste this file back unchanged.

1. **Two modes.** In 4–6 lines, explain the difference between the development server (`npm run dev`) and the production build (`npm run build`). Include *who each one is for*.
2. **The export folder.** What is `dist/`, what does it contain, and why must you not edit it by hand?
3. **Three words.** Define **bundling**, **minification**, and **content hashing** in one sentence each. Then explain why the content hash is useful.
4. **Build output.** Paste the real output of your `npm run build` (the lines from `vite ...` to `✓ built in ...`). Then answer: how many modules were transformed, and what was the gzipped size of your JavaScript file?
5. **Preview.** Paste the line your terminal printed when you ran `npm run preview`, including the local address and port. Confirm in one sentence that the page looked correct.
6. **Decode a failure.** Copy this message and explain what it means and one likely fix:

   ```text
   Could not resolve "./components/Card" from "src/App.jsx"
   ```
7. **Explain in your own words.** A friend says: "I'll just show my client the link to my `npm run dev` page." Give two honest reasons why that is a bad plan.

### 2. `build-report.md`

Include this short report with your submission, built from your own project:

```markdown
# Build report — <your page name>

- Dev command used: npm run dev
- Build command used: npm run build
- Preview command used: npm run preview
- Preview port: <e.g. 4173>

## Files produced in dist/
<list the files and folders you saw, e.g. index.html, assets/...>

## Module count and sizes
- Modules transformed: <number>
- JS size: <kB> (gzip: <kB>)
- CSS size: <kB> (gzip: <kB>)

## One change I made and re-built
- I changed: <what>
- The file name in dist/assets changed like this: <before> -> <after>
- Why the name changed: <one sentence about hashing>
```

### 3. `checklist.md`

Copy and mark each item `[x]` when true:

```markdown
- [ ] I ran `npm run build` and saw `✓ built in` with no red error.
- [ ] I located the generated `dist/` folder on my computer.
- [ ] I found both a `.js` and a `.css` file inside `dist/assets/`.
- [ ] I ran `npm run preview` and saw my page at localhost:4173.
- [ ] I stopped the preview server with Ctrl+C when finished.
- [ ] I re-built once after a small change and noticed the hash.
```

## Definition of done

- All three files present with the names above.
- `answers.md` and `build-report.md` use your own project's real output, not the lesson's example numbers.
- The error in Q6 is explained, not merely copied.
- Checklist completed honestly.

## A note on honest reporting

If your build failed, do **not** hide it and do not give up. Run the stuck protocol from U00, paste the exact error into `answers.md` under Q4, write what you tried, and submit anyway. A decoded failure is worth more to your trainer than a copied success.
