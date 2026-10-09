# U31 — Production builds explained

**Phase 6 — Shipping and craft**

## Where you are

Every unit so far has run your app with the **development server** — the live, editable version you see at `http://localhost:5173`. That version is built for *you*, the person making it. It carries extra tools, extra files, and extra warnings so you can change things quickly.

This unit explains the **production build**: the version we hand to the world. You already ran `npm run dev` in U09. Now you will run its sibling, `npm run build`, understand what it creates, and preview the result the same way a visitor would experience it.

Nothing here changes your React code. You are not learning a new component idea. You are learning what happens to code you already wrote when it leaves the workshop.

## What you will be able to do

- Explain, in plain words, the difference between a **development server** and a **production build**.
- Run `npm run build` and read the output it prints.
- Find and describe the files inside the generated `dist/` folder.
- Define **bundling**, **minification**, and **content hashing** without hand-waving.
- Run `npm run preview` to view the built page locally.
- Decode at least one real build error and say what it means.

## What you need already

- **U08** — Node.js installed and verified.
- **U09** — npm, the dev server, and a Vite project.
- **U10** — the project folder tour (`src/`, `public/`, `package.json`).
- **U30** — a small finished page to build. Any working project is fine.

## Time and energy

About **60–90 minutes**. The commands are quick; the reading is the real work. If the word "bundle" makes your shoulders rise, that is a normal reaction — we will slow down on exactly that. Take a break between the build and the preview.

## Why this exists

In a design tool you keep a **working file** (the `.fig`, `.psd`, or `.ai`) that holds every layer, every hidden guide, every unused swatch. You never hand that to a client or a printer. You **export**: flattened, sized, compressed, and delivered as PNG, SVG, or PDF. The working file is for building; the export is for delivery.

A React app has the same split, and the same reason. The development server is your working file: helpful, heavy, full of notes meant for you. The production build is the export: lean, compressed, and ready to be served to strangers. If you skip this step and try to host the working version, your page will be slow, and some of it will not work at all. This unit is the export step.

## Plain-language teaching

### The same app, two modes

Your app in U30 has two ways of being turned into something a browser can display.

| Mode | Command | Who it is for | What it includes |
|------|---------|---------------|------------------|
| Development | `npm run dev` | You, while building | Hot reload, readable error overlays, source maps, no compression |
| Production | `npm run build` | Visitors | Small, compressed, squashed-together files, no dev tools |

Think of the development server as a light table where every layer is visible. The production build is what leaves the studio.

**What it is *not*:** the production build is not a different app. Same components, same CSS, same design. Only the wrapping changes.

### What "build" means

**Build** here is a verb meaning: *take all the separate files you wrote and turn them into the fewest, smallest files a browser can download quickly.*

Your project might have fifty files:

```text
src/
  App.jsx
  main.jsx
  components/Button.jsx
  components/Card.jsx
  components/Card.css
  ...and more
```

The browser does not want to make fifty separate requests. The build steps combine them. The combined, finished result is written into a new folder called **`dist/`** (short for "distribution" — the things you distribute).

**What it is *not*:** `dist/` is generated. You do not edit files inside it by hand. If you change your `src/`, you build again and it is regenerated.

### Bundling, minification, and hashing

Three words get thrown around at this step. Here they are in order of what happens.

- **Bundling:** combining many files into a small number of files. Your fifty files become roughly two or three: one JavaScript bundle, one CSS file, and `index.html`. Fewer downloads, faster page.
- **Minification:** removing everything a human does not need but a machine does not either — extra spaces, line breaks, comments, and long variable names shrunk to short ones. The code still means the same thing; it is just packed tight. This is why built files look like gibberish if you open them.
- **Content hashing:** renaming each built file to include a short fingerprint of its contents, like `index-5b6e9a0f.js`. If you change that file, the fingerprint changes. This lets a browser safely keep the *old* file cached until the content actually changes. You do not manage this; Vite does.

All three happen automatically when you run the build. You are reading them so the output below makes sense.

### The `dist/` folder

After a successful build you get:

```text
dist/
  index.html
  assets/
    index-5b6e9a0f.js
    index-8f3a1c2d.css
```

`dist/` is the entire deliverable. It holds no `src/`, no `node_modules/`, no dev server. When we host the app in **U32**, `dist/` is the folder we send.

### Running the build

Open your terminal in your project folder (U09 showed how). Run:

```bash
npm run build
```

**What this does:** `npm` reads the `build` line inside your `package.json` scripts. In a Vite project it runs `vite build`, which performs the bundling, minification, and hashing described above.

**Success looks like this** (yours will differ — versions and file names change):

```text
vite v5.4.2 building for production...
✓ 34 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-8f3a1c2d.css    1.24 kB │ gzip:  0.65 kB
dist/assets/index-5b6e9a0f.js   142.51 kB │ gzip: 45.83 kB
✓ built in 1.21s
```

Read that output as a report, not noise:

- `✓ 34 modules transformed` — Vite found and processed 34 of your source files.
- `dist/...` — each file it wrote, with its real size (`kB`) and its compressed size after the server gzips it (`gzip:`). The gzip number is closer to what a visitor actually downloads.
- `✓ built in 1.21s` — it finished. The word "built" with a checkmark is your "it worked."

### Previewing the build

Here is a subtle trap. After building, `npm run dev` still shows the *development* version. To see the production files, run a different command:

```bash
npm run preview
```

**What this does:** `vite preview` starts a tiny local static server that serves the contents of `dist/` — the real build — over a local web address. It is for checking your export, not for editing.

**Success looks like this:**

```text
  ➜  Local:   http://localhost:4173/
  ➜  Network: use --host to expose
```

Open `http://localhost:4173/` in your browser. The page should look and behave like it did in the dev server. If it does, your export is healthy.

**A common mix-up:** `npm run dev` uses port **5173**; `npm run preview` uses port **4173**. If a page looks stale, check which port you are actually on.

### Read the errors, do not fear them

A failed build stops and prints a message, usually the file and line where it got confused. The screen turns red — that is the tool doing its job, not a verdict on you. We decode one below.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Development server | The live, editable running version of your app (`npm run dev`) | Not the version visitors see |
| Production build | The optimized export of your app (`npm run build`) | Not a different app; same design, packed differently |
| `dist/` | The generated folder holding the finished, shippable files | Not something you edit by hand; it is an output |
| Bundling | Combining many files into a few | Not deleting your source files; those stay in `src/` |
| Minification | Shrinking code by removing spaces, comments, and long names | Not breaking the code; it still runs identically |
| Content hash | A short fingerprint added to a built file name | Not random; it changes only when the file changes |
| `npm run preview` | Serves the built `dist/` locally to check it | Not the dev server; not for editing |
| Build error | A message saying the code could not be packed | Not a personal failure; it names a fixable file/line |

## Worked example

**Scenario:** Build and preview the small page you finished in U30.

**Step 1 — Confirm your scripts exist.** Open `package.json` at the top of your project. It should contain:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

Every line justified: `dev` starts the development server (U09); `build` creates the production export; `preview` serves that export locally. If `build` is missing, this project was not created the way U09 taught and you should say so to your trainer.

**Step 2 — Build.**

```bash
npm run build
```

Expected: the `dist/` report shown earlier, ending in `✓ built in`. **Do not** worry if the size numbers differ from the example; sizes depend on your page.

**Step 3 — Look inside `dist/`.**

```bash
# macOS / Linux
ls -R dist

# Windows PowerShell
Get-ChildItem -Recurse dist
```

Expected: an `index.html` and an `assets/` folder with a `.js` and usually a `.css` file, each with a hash in its name.

**Step 4 — Preview.**

```bash
npm run preview
```

Open `http://localhost:4173/`. Expected: your page, looking exactly as designed. Press `Ctrl+C` in the terminal to stop it.

**Step 5 — Compare.** Open the built JavaScript file in a text editor. It will look like one enormous line of scrambled names. That is minification working. You are not meant to read it.

## Common errors

### Error 1 — A file cannot be found (missing import)

```text
Could not resolve "./components/Card" from "src/App.jsx"
```

**Decoded:** Vite was reading `src/App.jsx` and found a line asking for `./components/Card`, but no file by that name exists at that path.

**Typical causes and fixes:**
- The file is named `card.jsx` but you imported `./Card`. Match the exact name.
- The file lives in `src/components/` but you wrote `./Card` (same folder). Fix the path to `./components/Card`.
- You renamed or deleted the file and forgot the import. Remove or correct the import.
- You forgot the extension on a CSS import: `import './Card.css'`.

### Error 2 — Works on your computer, fails later (case sensitivity)

```text
Could not resolve "./Button" from "src/App.jsx"
```

…yet the file `button.jsx` is right there.

**Decoded:** Windows and macOS file systems usually ignore capitalization; Linux build servers, including the ones used by many hosts, do not. `Button` and `button` are different names to a Linux machine. This is why a build that works on your laptop can fail the moment you deploy.

**Fix:** Rename imports to match files exactly — same letters, same capitals. Get in the habit now; it will save you a confusing afternoon in U32.

### Error 3 — A typo in JSX

```text
[plugin:vite:react-babel] Unexpected token, expected "</"
```

**Decoded:** You opened a tag and it was never closed, or a brace or bracket is unbalanced. The build cannot continue.

**Fix:** Go to the file and line named above the message. Look for a missing closing tag (`</div>`), a stray `}`, or a comment that swallowed later code. Fixing one character usually clears it.

### Error 4 — "Not an error" warning

```text
(!) Some chunks are larger than 500 kB after minification.
```

**Decoded:** This is yellow, not red — a hint, not a failure. It means one built file is big. For a small capstone page you can ignore it. It becomes relevant only with very large apps and heavy libraries.

## Checkpoints

Answer in your own words before moving to practice:

1. What is the practical difference between `npm run dev` and `npm run build`?
2. Where do the finished, shippable files go, and do you edit them by hand?
3. In one sentence each, what are bundling and minification?
4. Which command shows you the *built* page locally, and on what port?

If you can answer all four without re-reading, you are ready.

## Practice exercises

These are ungraded. Struggle is expected and useful.

### P1 — Read and predict

Before running anything, write your prediction: "After `npm run build`, I expect the `dist/` folder to contain ____." Then run the build and compare. Were you right? What surprised you?

### P2 — Change one value; observe

Edit the `<h1>` text in your U30 page to a new sentence. Build again. Look at the built JavaScript file name in `dist/assets/`. Did its **hash** change? Change the text back and build once more. What happened to the hash? Write one sentence explaining why.

### P3 — Fill in the blank

In your own notes, complete: "The development server is like a ____ in a design tool, and the production build is like an ____, because ____."

### P4 — Debug this broken project

A classmate's `App.jsx` starts like this, and their build fails with `Could not resolve "./components/Footer"`:

```jsx
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

export default App
```

They insist the file exists and is spelled `Footer.jsx`. List **three** things you would check, in order, and say what each would confirm.

### P5 — Decode a failure

Write out, in your own words, what Error 2 (case sensitivity) means and why it can appear only *after* you move your project to a server.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). Read it before you start; there are no hidden criteria.

## What is *not* in this unit

- No hosting yet. Putting `dist/` on the internet is **U32**.
- No Git, GitHub Actions, or continuous deployment.
- No performance tuning beyond noticing the file sizes.
- No changes to your React components or styling.
- No alternative build tools (Vite is the course default).

## Next unit

**U32 — Hosting a static React app** (taking the `dist/` folder you just built and giving it a public web address, using GitHub Pages).
