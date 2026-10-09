# U09 — npm, a dev server, and a Vite project

**Phase 2 — Running React**

## Where you are

In U08 you installed Node.js and confirmed `node --version` and `npm --version` worked. You also met the terminal and learned `cd` and how to list files.

Now you will use the second program that came with Node — **npm** — to create a real React project on your computer and run it in a browser. This is the moment the course stops being abstract. By the end of this unit there will be a working React app on your machine, and you will have opened it from a **dev server**.

You will not write React code yet. This unit is about getting a clean, running project and understanding each command you typed.

## What you will be able to do

- Explain what npm is and the two jobs it does for you.
- Explain what a dev server is and why the page updates by itself.
- Create a project with `npm create vite@latest`.
- Choose React and JavaScript during the scaffold prompts, and say what that choice means.
- Install a project's dependencies with `npm install`.
- Start the project with `npm run dev` and open it at a `localhost` URL.
- Stop a running dev server safely.
- Read one common failure (`command not found` / `EADDRINUSE` style) and name the fix.

## What you need already

- **U08** — Node.js and npm installed and verified (`node --version`, `npm --version`), and you can use `cd` and list files in the terminal.
- **U00** — the stuck protocol.
- **U07** — you have seen what an "import" does at a high level; this unit uses the word but does not ask you to write one.

You do **not** need to understand React yet. U11 is where you first write a component.

## Time and energy

About **60–90 minutes**. Downloading packages depends on your internet; the first `npm install` can take a few minutes and may look "stuck." It usually is not. Plan a break after the project starts.

## Why this exists

Imagine you had to prepare a design for print by hand: every image colour-converted, every font converted to outlines, every page exported, one at a time. You would not do that by hand each time you moved a rectangle. You would use a tool that watches your file and re-exports automatically.

Running a React project has the same shape. Your React source files are not what the browser runs. Something must translate them and serve the result. **npm** fetches that something, and the **dev server** runs it — watching your files and refreshing the page when you save. U09 is where you set up that workshop.

## Plain-language teaching

### What npm is

**npm** stands for **Node Package Manager**. It arrived with Node.js in U08. It does two jobs:

1. **Downloads packages.** A **package** is a folder of code someone else wrote, ready to reuse. React itself is a package. The Vite tool is a package. Your project will need several dozen packages, which all come from npm.
2. **Runs scripts.** A **script** is a shortcut command stored in your project. Instead of remembering a long command, you type a short name like `npm run dev`, and npm looks up what that name should do.

**Think of it as:** npm is a combination of a *supply store* (it fetches parts) and a *button panel* (named shortcuts that run things).

**What it is not:** npm is not React, not a browser, and not the thing that makes your page look good. It is plumbing.

### What a dev server is

A **server** is a program that waits for requests and answers them. Your computer can already serve files to your own browser; that is what a **local** dev server does. "Local" means it lives on your machine and is reachable only from your machine.

The dev server does two things you care about:

1. **It serves your page** at an address like `http://localhost:5173`, so you can view it in a browser.
2. **It watches your files.** When you save a change, the dev server notices, rebuilds the part that changed, and tells the browser to update. The page "reloads" without you pressing refresh.

**Think of it as:** the dev server is a live prototype link in a design tool. Instead of "update design → wait → share new link → refresh," you get "save file → the open page changes." The **hot reload** (some tools call it *HMR*, Hot Module Replacement) is that automatic refresh.

**Why we need it at all:** because React code must be translated before the browser can run it. A plain double-click of your files would not work. The dev server does the translation continuously.

### What `localhost` means

`localhost` is the name your computer uses for itself. `http://localhost:5173` means "port 5173 on this very machine." A **port** is a numbered door on a computer; different programs listen at different doors so requests do not collide. Vite usually picks port `5173`, but if that door is busy it will use the next free one (`5174`, etc.). Always read the exact URL the terminal prints.

### What "scaffolding" means

To **scaffold** a project is to generate the starting folder structure from a template. `create-vite` is a scaffolding tool. It asks a few questions, then writes a small, working project for you. You are not expected to build this structure by hand.

### What `package.json` and `node_modules` are (preview)

You will tour these fully in U10. For now, know two names you will see flash by:

- **`package.json`** — the project's "recipe card": its name, its scripts, and the list of packages it depends on. A plain text file you can read.
- **`node_modules`** — the folder where all downloaded packages actually live. It is huge and you should never edit it by hand.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| npm | Node Package Manager; fetches packages and runs scripts | Not Node itself; a separate command |
| Package | A reusable folder of code, downloaded by npm | Not the same as your project |
| Dependency | A package your project needs to run | "Dependencies" is the umbrella word |
| Script | A named shortcut command in `package.json` | Not a `.js` file necessarily |
| Dev server | Local program that serves your app and auto-reloads | Not the internet; only your machine |
| Hot reload / HMR | Automatic page update when you save | Not the same as pressing refresh |
| Scaffold | Generate a starter project from a template | Not "install by hand" |
| localhost | Your own computer as a network address | Not a website on the internet |
| Port | A numbered "door" a program listens on | Vite's default is 5173 |
| Vite | The build tool/scaffolder this course uses | Pronounced "veet" (French for "fast") |
| `npm create vite@latest` | Command that scaffolds a new Vite project | Not the same as `npm install` |
| `npm install` | Downloads all packages the project needs | Run inside the project folder |
| `npm run dev` | Starts the dev server | Must be run inside the project folder |

## Worked example

We will create a project called `my-first-react-app` on the Desktop. Use only the shell for your operating system; the prompts are identical.

### Step 1 — Go to the place you want the project

**Why:** `create-vite` makes a **new folder** in your current location. Choose where that folder should live before you run it.

Windows (PowerShell):

```text
cd $HOME
cd Desktop
```

macOS / Linux (bash):

```text
cd ~
cd Desktop
```

*What it does:* `cd $HOME` (Windows) or `cd ~` (macOS/Linux) moves to your home folder; `cd Desktop` enters the Desktop. If you do not have a Desktop folder, `cd $HOME` / `cd ~` is fine and the project will sit in your home folder.

*What success looks like:* the prompt changes to name the Desktop; no error text.

*One decoded failure:* `cd : Cannot find path ... Desktop because it does not exist.` Your Desktop may be named differently or missing (common on some Linux desktops). Fix: run your listing command (`Get-ChildItem` or `ls`) to see the real folder names, and pick one that exists.

### Step 2 — Scaffold the project

Type this exactly:

```text
npm create vite@latest my-first-react-app
```

*What it does:* downloads and runs `create-vite`, the official scaffolding tool, and creates a folder named `my-first-react-app` containing a starter project. The `@latest` part means "use the newest published version."

*What success looks like:* you are asked a few questions, in this order:

```text
✔ Select a framework: › React
✔ Select a variant: › JavaScript
```

Choose **React** with the arrow keys and Enter. Then choose **JavaScript** (not TypeScript) with the arrow keys and Enter. This course uses plain JavaScript on purpose; TypeScript adds a second language to learn and is not needed here.

You may also be asked to confirm the package name; pressing Enter accepts the default.

After it finishes you will see text like:

```text
Scaffolding project in C:\Users\designer\Desktop\my-first-react-app...

Done. Now run:

  cd my-first-react-app
  npm install
  npm run dev
```

*One decoded failure:* `npm : The term 'npm' is not recognized ...`. This means npm is not found — usually because your terminal was opened before Node was installed, or Node itself is missing. Fix from U08: close the terminal, open a fresh one, confirm `npm --version` works. Do not continue until it does.

**A second common failure:** you accidentally picked **TypeScript** at the variant prompt. Nothing is broken, but your project files will end in `.tsx` and oddly-typed code. Fix: delete the new folder and run the create command again to pick **JavaScript**, or ask your trainer — do not try to convert by hand while learning.

### Step 3 — Move into the project

```text
cd my-first-react-app
```

*What it does:* enters the folder that was just created, so the next commands act on it.

*What success looks like:* the prompt now includes `my-first-react-app`; no error text.

*One decoded failure:* `cd : Cannot find path ... my-first-react-app because it does not exist.` Usually a typo, or you are not in the folder where you scaffolded it. Fix: list files (`Get-ChildItem` / `ls`) and look for the exact folder name.

### Step 4 — Install the dependencies

```text
npm install
```

*What it does:* reads the project's recipe card (`package.json`), downloads every package the project needs, and stores them in `node_modules`. This is where React and Vite actually get fetched.

*What success looks like:* a progress display and a line at the end like:

```text
added 154 packages, and audited 155 packages in 12s
```

Your count and time will differ. Warnings in yellow about "vulnerabilities" are common and are **not** a reason to panic or run the suggested fixes — the suggested fixes can break the project. Note them and move on.

*One decoded failure:* if you see a long list of `npm error code ETIMEDOUT` or `network` lines, your internet or a proxy/firewall blocked the download. Fix: check your connection and try `npm install` again; if you are on a work network, a proxy may need configuring, which is a good question to bring to your trainer.

**A second common failure:** running `npm install` in the wrong folder gives `npm error ... ENOENT: no such file or directory, open '...\package.json'`. That means there is no `package.json` here — you are not inside the project folder. Fix: `cd my-first-react-app` first.

### Step 5 — Start the dev server

```text
npm run dev
```

*What it does:* runs the script named `dev` from `package.json`, which starts the Vite dev server.

*What success looks like:*

```text
  VITE v5.4.0  ready in 320 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

The exact port may be `5173` or, if that door is busy, the next free one. Copy the **Local** URL.

**Important:** this command **does not finish and does not give your prompt back.** That is expected. The dev server keeps running and watching files. To keep using the terminal, open a **second** terminal window.

*One decoded failure:* `npm error Missing script: "dev"`. This means you are in a folder whose `package.json` has no `dev` script — usually the wrong folder (for example your home folder, not the project). Fix: `cd my-first-react-app` and run again. It can also mean the scaffold did not use Vite; re-scaffold if so.

**A second common failure:** `Error: listen EADDRINUSE: address already in use :::5173`. Port 5173 is already taken (often by a dev server you left running). Fix: either stop the other server (go to its terminal and press **Ctrl + C**), or let Vite choose another port — press **q** then Enter to quit, or restart and accept the next port.

### Step 6 — Open the page

In your web browser, type or paste the **Local** URL from the terminal (for example `http://localhost:5173`) and press Enter.

*What success looks like:* the default Vite + React starter page appears, usually with a logo, a "Vite + React" heading, and a button that counts clicks. That page is proof the whole workshop is running.

*One decoded failure:* the browser says **"This site can't be reached" / "Unable to connect."** The dev server is not running. Fix: check that `npm run dev` is still active in its terminal window. If that terminal was closed, the server stopped; run `npm run dev` again.

### Step 7 — Stop the server safely

Go to the terminal window running the dev server and press **Ctrl + C** (on macOS this may also be Control + C; if your Terminal uses Cmd for copy, Ctrl + C still interrupts the running command). The process stops and you get your prompt back.

*What success looks like:* the terminal prints `^C` and returns to a prompt.

*One decoded failure:* nothing seems to happen because you pressed it in a different (idle) terminal. Fix: make sure the *dev server* window is focused; the one showing the running output is the right one.

## Common errors

### Error: `npm : The term 'npm' is not recognized` (Windows) / `npm: command not found` (macOS/Linux)

**What it means:** the shell cannot find npm. Usually Node/npm was installed after this terminal opened, or Node is not installed.

**Fix:** open a **fresh** terminal and run `npm --version`. If it still fails, revisit U08.

### Error: `npm error Missing script: "dev"`

**What it means:** there is no `dev` script in the `package.json` of the folder you are in.

**Fix:** you are almost certainly in the wrong folder. `cd` into the project and try again.

### Error: `EADDRINUSE: address already in use`

**What it means:** the port the server wants is occupied by another running server.

**Fix:** stop the other dev server with **Ctrl + C**, or accept Vite's offer of a different port and use the new URL.

### Error: browser shows "can't be reached"

**What it means:** you opened the URL but no server is answering there.

**Fix:** confirm `npm run dev` is running and still shows the same port; then use the exact URL it printed.

### Error: yellow "vulnerabilities" warnings after install

**What it means:** npm's audit tool noticed packages with known issues. For a learning project this is normal noise.

**Fix:** ignore it. Do **not** follow the "run `npm audit fix --force`" suggestion during this course; it can change package versions and break the project.

## Checkpoints

Answer these in your own words before the assignment.

1. Name the two jobs npm does.
2. What is a dev server, and what does "hot reload" save you from doing?
3. What does `localhost` mean, and what is a port?
4. Which command scaffolds a project, and which command downloads its packages?
5. Why does `npm run dev` not return your prompt, and how do you stop it?

## Practice exercises

Ungraded. Do them at your own pace.

### P1 — Scaffold a second project

Create a second project named `practice-app` with `npm create vite@latest practice-app`, choosing React + JavaScript. Do not do anything else with it yet.

### P2 — Read before install

Open `practice-app/package.json` in any text editor. Find the `"scripts"` section. Write down the names of two scripts and what command each runs.

### P3 — Run and stop

Inside `practice-app`, run `npm install`, then `npm run dev`. Open the URL in your browser. Then stop the server with **Ctrl + C**.

### P4 — Deliberate error: wrong folder

From your home folder (not the project), run `npm run dev` and read the error. Write down the exact message. Then `cd` into the project and run it correctly.

### P5 — Port collision

With one dev server running, open a second terminal, go to the project, and run `npm run dev` again. Read what Vite does. Stop both servers when done.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No React code yet — no components, no JSX (U11 and U12).
- No editing of project files beyond reading `package.json`.
- No styling, props, or state.
- No production build (`npm run build` is U31).
- No deployment or hosting (U32).

## Next unit

**U10 — The project folder tour** (what every file and folder is, and which ones you may touch).
