# U10 — The project folder tour

**Phase 2 — Running React**

## Where you are

In U09 you scaffolded a Vite + React project and got it running at a `localhost` URL. You have not looked inside the folder yet.

This unit is a guided tour. We will open every file and folder that matters, say plainly what it is for, and mark clearly which ones you will edit in this course and which you should leave alone. You will not write React code yet — you will learn the geography so that U11 feels like walking into a room whose layout you already know.

## What you will be able to do

- Name every top-level file and folder in a Vite React project and say what it does.
- Distinguish files you edit from files you leave alone, and explain why.
- Read `package.json` and find the `scripts` and `dependencies` sections.
- Trace how the browser gets from `index.html` to your app's JavaScript.
- Recognize the `public/` versus `src/` distinction (served as-is vs bundled).
- Read a `README.md` and use it as a starting map.

## What you need already

- **U09** — a working Vite + React project on your machine, and the ability to start it with `npm run dev`.
- **U08** — `cd` and listing files.
- **U02–U04** — a web page is HTML structure styled by CSS.
- **U07** — you have seen an `import` line even if you have not written one from scratch.

## Time and energy

About **60–90 minutes**. Most of it is reading files and cross-checking. Keep your project open in a text editor as you go.

## Why this exists

Opening a generated project for the first time is disorienting. There are `node_modules`, a `vite.config.js`, files with `.jsx` endings you have not seen before, and a `public` folder that seems to duplicate `src`. Without a map, people either freeze, or worse, start deleting things to see what happens.

The map matters because **most of these files are not yours to edit**. Knowing which few files are yours is the difference between confident editing and accidental breakage.

**Design bridge:** a generated project is like a design file template you downloaded — it comes with a page structure, a styles layer, and some locked shared assets. You edit the artboards; you leave the system styles and linked components alone until you know why. This unit tells you which is which.

## Plain-language teaching

### The two big ideas: source versus generated

Inside a React project there are two categories of files:

1. **Source files** — written by a human (you), meaningful and editable. These live mostly in `src/`.
2. **Generated or managed files** — created by tools, enormous or fragile, and managed for you. The clearest example is `node_modules/`.

If you remember nothing else: **you edit `src/`. You do not edit `node_modules/`.** The rest of this tour fills in the details.

### The file tree we are touring

A freshly scaffolded Vite + React + JavaScript project looks like this (the order is alphabetical for clarity):

```text
my-first-react-app/
├── node_modules/          (generated — do not touch)
├── public/                (assets served as-is)
│   └── vite.svg
├── src/                   (your source — this is yours)
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore             (which files version control ignores)
├── eslint.config.js       (code-quality rules)
├── index.html             (the page entry in the browser)
├── package.json           (recipe card: scripts + dependencies)
├── package-lock.json      (exact installed versions — do not edit)
├── README.md              (project notes)
└── vite.config.js         (build tool settings)
```

Your tree may differ slightly by Vite version. The ideas below still apply.

### The files, one at a time

#### `package.json` — the recipe card

This is a small JSON text file. It is safe to read and it is the single most useful file to understand. It contains:

- **`name`** — the project's name.
- **`scripts`** — named shortcuts npm can run. This is where `dev` comes from in `npm run dev`.
- **`dependencies`** — packages your app needs to run (React lives here).
- **`devDependencies`** — packages needed only during development (Vite lives here).

*What editing it does:* adding a dependency line here and running `npm install` is how packages are declared. In this course you will rarely edit it by hand — npm does it for you when you install a package.

```json
{
  "name": "my-first-react-app",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

The `^` before a version means "this version or a compatible newer one." You do not need to change these today.

#### `package-lock.json` — the exact-versions receipt

This records the precise version of every package that was actually installed. It exists so the same install can be reproduced on another machine.

- **Do not edit this by hand. Ever.**
- It is managed entirely by npm. If it and `package.json` disagree, npm fixes it during `npm install`.

*Why it is separate from `package.json`:* `package.json` says "I want React around 18." The lock file says "I got exactly 18.3.1, and here is the exact version of every helper it pulled in too."

#### `node_modules/` — the downloaded packages

This is where npm unpacked every package. It can contain **tens of thousands of files**.

- **Never edit anything in here.**
- **Never commit it to version control** (the `.gitignore` file handles this).
- If it gets corrupted, the fix is to delete the whole folder and run `npm install` again — it is fully regenerated.

*Why it is so big:* every package can depend on other packages, which depend on others. npm fetches the whole family tree.

#### `index.html` — the actual page the browser loads

This is a real HTML file, like the ones from U03. It is the **entry point** the browser requests. Inside it you will find a line like:

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

Two important things:

- The empty `<div id="root"></div>` is the **mount point**. React will insert your entire interface inside this div.
- The `<script>` line loads `src/main.jsx`, which is where the React app begins.

*Do you edit it?* Rarely in this course. You may one day change the page `<title>` here. For now, read it to understand how everything connects.

#### `src/` — your working folder

Everything you author lives here. Inside you will find:

- **`main.jsx`** — the JavaScript **entry file**. It imports React, imports your top-level `App` component, and tells React to render `App` into the `root` div from `index.html`.
- **`App.jsx`** — your **top-level component**. This is the file you will edit first in U11.
- **`App.css`** — styles used by `App`.
- **`index.css`** — global styles for the whole app.
- **`assets/`** — images and other files that get bundled with your code (Vite processes and optimizes them).

*Rule of thumb:* if it is in `src/`, you may edit it. That does not mean edit it carelessly — but it is yours.

#### `main.jsx` — a first careful read

You are not expected to write this yet. Read it to see the shape:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Notice three things, in plain words:

1. `import` lines bring in outside code (from U07).
2. `document.getElementById('root')` finds the `<div id="root">` from `index.html`.
3. `<App />` is your top-level component, and `.render(...)` puts it on the page.

`StrictMode` is a React helper that double-checks your code during development. It is normal and you can ignore it for now.

#### `App.jsx` — the file you will live in

The scaffold creates a starter component with a logo, a heading, and a counter button. Reproduced without styling here:

```jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
```

Do you need to understand all of this now? No. Two lines matter for orientation:

- `function App() { ... }` defines the component.
- `export default App` makes it available to `main.jsx` through the `import App from './App.jsx'` line.

In U11 you will replace this content with your own. In U12 you will understand the markup-looking part.

#### `public/` — files served exactly as they are

Anything in `public/` is copied to the finished site **without processing**. A file `public/logo.png` is reachable at the URL `/logo.png`.

- Put here: favicons, robots files, images you want to reference by a plain URL.
- Do not put here: your React code or anything that needs bundling.

*The key difference:* `src/assets/` files are **processed** by the build tool (renamed, optimized, and imported in code). `public/` files are **served as-is**. A common beginner confusion is putting an image in the wrong one and wondering why the import fails. If in doubt: import it from `src/assets/` when your code refers to it; use `public/` when you just need a stable URL.

#### `vite.config.js` — the build tool's settings

This configures Vite: which plugin compiles React, the dev-server settings, and so on. It looks like:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

*Do you edit it?* Not in Phase 2. Later units may touch it. It is here so you recognize it and know it is configuration, not app code.

#### `eslint.config.js` — the code-quality rules

**ESLint** checks your JavaScript for likely mistakes and style issues. This file defines the rules. Your editor may underline problems based on it.

*Do you edit it?* No, not in this course. Know that it exists and that its warnings are guidance, not a broken app.

#### `.gitignore` — what version control ignores

A list of files and folders that version control should **not** track. It almost always contains `node_modules` and build output.

*Why it matters:* it is the reason you never commit the huge `node_modules` folder. If you later use Git, this file protects you from that mistake.

*Do you edit it?* Rarely. Possibly if you add a secrets file that must never be committed — an advanced topic for much later.

#### `README.md` — the project's own notes

The scaffold writes a short README. It usually explains how to run the project. Reading a project's README is always the first move when you open an unfamiliar project.

*Do you edit it?* Yes, freely. It is your project's notes to future-you.

### What to edit vs what to leave alone

| Path | Edit it? | Why |
|------|----------|-----|
| `src/App.jsx` | **Yes** — often | Your top-level component (U11) |
| `src/App.css`, `src/index.css` | **Yes** — later | Your styles |
| `src/main.jsx` | Read; edit rarely | The entry point; usually stable |
| `src/assets/` | Yes — add files | Bundled images/assets |
| `public/` | Yes — add files | Served-as-is assets |
| `index.html` | Rarely (e.g. title) | The page shell |
| `README.md` | Yes | Project notes |
| `package.json` | Rarely by hand | npm manages it |
| `vite.config.js` | No (Phase 2) | Build settings |
| `eslint.config.js` | No | Lint rules |
| `.gitignore` | Rarely | Version-control ignores |
| `package-lock.json` | **No** | Generated receipt |
| `node_modules/` | **No** | Generated packages |

### How the page is assembled (the whole chain)

```text
browser requests index.html
  → index.html loads src/main.jsx (a <script> tag)
    → main.jsx imports App from App.jsx
      → React renders <App /> into <div id="root">
        → the dev server keeps watching; saving a file updates the page
```

Six lines, but they explain every file you just met. If the page is blank, this chain is the first thing to re-read: a break at any link stops the rest.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| `package.json` | Recipe card: scripts + dependencies | Not the list of installed files (`package-lock.json` is) |
| `package-lock.json` | Exact versions actually installed | Not meant for hand-editing |
| `node_modules/` | Where packages are unpacked | Not your code; never edit or commit |
| `index.html` | The page the browser loads | Not your React source |
| `main.jsx` | The JavaScript entry file | Not your top-level UI component |
| `App.jsx` | Your top-level component | Not the whole app by itself |
| `src/` | Your source folder | The only place you author most code |
| `public/` | Assets served exactly as-is | Not the same as `src/assets/` |
| `src/assets/` | Assets the bundler processes | Import them in code |
| `vite.config.js` | Build tool settings | Not app code |
| Entry point | The first file that runs | Here, `index.html` → `main.jsx` |
| Mount point | The DOM element React fills | Here, `<div id="root">` |
| Bundle | Processed output ready for a browser | Not the same as your source |
| HMR | Hot Module Replacement; auto-update on save | The U09 "hot reload" |

## Worked example

**Scenario:** You want to prove you understand the chain. You will change one safe thing — the page `<title>` — and confirm it flows to the browser.

**Step 1 — Open the project in your editor.** In VS Code: File → Open Folder → choose `my-first-react-app`.

**Step 2 — Open `index.html`.** Find the `<title>` line:

```html
<title>Vite + React</title>
```

**Step 3 — Change it.** Replace the text between the tags with your own, for example:

```html
<title>My Design Portfolio — Practice</title>
```

**Step 4 — Save** (Ctrl + S, or Cmd + S on macOS).

**Step 5 — Look at the browser tab.** If `npm run dev` is running, the tab title changes. You just changed the page shell, not the React app — and saw it appear.

**What success looks like:** the browser tab shows your new title. The page body still shows the Vite starter content; that is expected, because you only edited the shell, not `App.jsx`.

**One decoded failure:** nothing changes in the tab. The most likely cause is that the dev server is not running (so nothing is being served) or you edited a *different copy* of the project than the one being served. Fix: confirm `npm run dev` is running in the correct folder and re-open the exact `localhost` URL it prints.

## Common errors

### Error: page goes blank after editing a file

**What it means:** almost always a broken `import`/`export` pair — the file that imports `App` names something the file does not export. This is U11's headline error; here, the fix is to undo your last edit and re-check the connection.

**Fix:** read the browser console (F12 → Console) or the dev-server terminal for the file name and line; restore the previous content.

### Error: you deleted `node_modules` and the app stopped

**What it means:** you removed the downloaded packages. The app cannot find React.

**Fix:** in the project folder, run `npm install`. It regenerates `node_modules` from `package.json` and `package-lock.json`. This is the correct, safe recovery — `node_modules` is disposable.

### Error: you edited `node_modules` and things broke

**What it means:** you changed a shipped package. Updates and reinstall can undo it, and your project now behaves inconsistently.

**Fix:** delete `node_modules` and run `npm install` to get a clean copy. Then move your intended change into `src/` where it belongs. Never edit `node_modules`.

### Error: an image import fails

**What it means:** the file is in `public/` but your code imports it as if it were in `src/`, or vice versa.

**Fix:** imports from code come from `src/assets/` (for example `import logo from './assets/logo.png'`). Files referenced by a plain URL come from `public/` (`/logo.png`). Put it in the right place.

## Checkpoints

Answer these before the assignment.

1. Which folder holds your source code, and which holds downloaded packages?
2. What is the difference between `package.json` and `package-lock.json`?
3. What is the difference between `public/` and `src/assets/`?
4. Trace the chain from `index.html` to your `App` component in one or two sentences.
5. Name three files you should *not* edit in this course and why.

## Practice exercises

Ungraded.

### P1 — Read a real file

Open `package.json` and list every script name you find and the command each runs.

### P2 — Trace the chain

Starting at `index.html`, follow the `<script>` line to `main.jsx`, then to `App.jsx`. Write the three file names in order and what each passes to the next.

### P3 — Change the title

Do the worked example: change the page `<title>`, save, and confirm it appears in the browser tab.

### P4 — Safe recovery drill

Close the dev server. Delete the `node_modules` folder. Start the server again (you will need `npm install` first). Confirm the app returns. This proves `node_modules` is disposable.

### P5 — Sort the files

Make two columns, "I edit" and "I leave alone," and place each of these: `App.jsx`, `node_modules/`, `main.jsx`, `package-lock.json`, `public/vite.svg`, `vite.config.js`, `README.md`, `eslint.config.js`.

### P6 — Deliberate break

In `main.jsx`, temporarily change `import App from './App.jsx'` to `import App from './Wrong.jsx'`. Save, read the error in the terminal and browser console, then undo it. Write down the error text.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No writing React components yet (U11).
- No JSX explanation yet (U12).
- No props, state, or events.
- No styling work (Phase 4).
- No Git/version control practice yet.
- No production build or hosting (Phase 6).

## Next unit

**U11 — Your first component** (you will edit `App.jsx` and see your own words on the page).
