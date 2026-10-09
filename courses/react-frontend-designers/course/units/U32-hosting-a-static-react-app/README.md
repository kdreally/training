# U32 — Hosting a static React app

**Phase 6 — Shipping and craft**

## Where you are

In **U31** you built your page into a `dist/` folder. It lives on your computer, and only you can see it. This unit gives it a **public web address** so anyone with the link can open it.

We will use **GitHub Pages** because it is free, needs no credit card, and works for a designer with no server experience. You will not write any React in this unit. You will learn a new set of words — *static site*, *deploy*, *base path* — and one very common trap that catches almost everyone the first time.

If hosting sounds like "server stuff" that is over your head: it is genuinely not. A static React app is just files, and this unit is about putting files somewhere the web can read them.

## What you will be able to do

- Explain what **static hosting** is and why a built React app qualifies as static.
- Name three free hosts (GitHub Pages, Netlify, Vercel) and say one thing each is good at.
- Create a GitHub repository and publish a `dist/` build to GitHub Pages.
- Set the **`base` path** correctly for a project site so assets load.
- Recognize and fix the classic **404-after-deploy** failure.
- Tell the difference between a **project site** and a **user site**.

## What you need already

- **U08–U10** — Node, npm, and the project folder.
- **U31** — a successful `npm run build` and a healthy `dist/` folder.
- A free GitHub account (creating one is covered below).
- An internet connection.

## Time and energy

About **60–90 minutes**, most of it clicking through GitHub's website and waiting for the page to appear. Hosting can feel slow because after you change settings, GitHub takes a short while to publish. That wait is normal. Take it as an invitation to read the next section instead of refreshing.

## Why this exists

Designers are used to sharing work through a link: a Figma prototype link, a PDF, a Dribbble post. A running website is no different in spirit — but the file you share has to live somewhere that is always on and reachable. That "somewhere" is a **host**.

Without hosting, your work stops at your own laptop. With it, you can send your trainer, a client, or a friend a URL and they see the real thing, on their own device, without installing anything. This is also the last step of the capstone in **U34**, so getting it right here pays off directly.

## Plain-language teaching

### Static sites and static hosting

**Static** means: the files do not change based on who is asking. `dist/index.html` is the same file for every visitor. There is no database being queried to build the page on the fly.

**Static hosting** is a service that stores those fixed files and serves them over the web. When a visitor opens your address, the host hands them `index.html`, which then asks for the `.js` and `.css` files, and the browser paints your design.

**What it is *not*:** a static host is not running React for the visitor. React runs *in the browser* after the files arrive. The host only delivers files. That is why a built React app fits static hosting perfectly, and why the `dist/` folder from U31 is exactly what we upload.

**Design bridge:** a static host is like a public read-only share of your exported files. You picked the export; the host makes the export reachable to everyone.

### Three free hosts (and why we pick one)

| Host | Free? | Best at | Course default? |
|------|-------|---------|-----------------|
| **GitHub Pages** | Yes, public repos | Living with your code on GitHub | **Yes** |
| **Netlify** | Yes, generous free tier | Drag-and-drop deploys; form handling | Optional |
| **Vercel** | Yes, hobby tier | Framework projects; preview links | Optional |

All three are free for a project like this and none asks for payment. We walk through **GitHub Pages** because it keeps your code and your live page in one place and teaches the one gotcha (the `base` path) that every host has in some form.

You are not expected to learn all three. Pick GitHub Pages for this course. Read the others only as a "this also exists" awareness.

### The words you will meet on GitHub

A few GitHub terms, defined before you use them:

- **Repository (repo):** a project folder hosted on GitHub. It has a name and contains files. Free and public for everyone.
- **Public:** anyone can view it. GitHub Pages on the free plan requires a public repo.
- **Deploy:** putting your files on the host so the world can load them. (Everyday meaning: "publish.")
- **GitHub Pages:** GitHub's free static hosting feature. It reads files from your repo and serves them at a web address.
- **Project site:** a Pages site served under a sub-path, at `https://<username>.github.io/<repo-name>/`. This is what you get for an ordinary repo.
- **User site:** the special Pages site at `https://<username>.github.io/` (no sub-path). It only works if the repo is literally named `<username>.github.io`.
- **`base` path:** the sub-path prefix your built files live under. This is the heart of this unit.

### The `base` path trap (read this twice)

By default, a Vite build writes its asset references as if the site lives at the **domain root**, like `https://example.com/assets/index.js`.

But a project site does not live at the root. It lives at `https://<username>.github.io/<repo-name>/`. So the browser asks for:

```text
https://<username>.github.io/assets/index-5b6e9a0f.js     ← WRONG (missing repo name)
```

The file is actually at:

```text
https://<username>.github.io/<repo-name>/assets/index-5b6e9a0f.js
```

The fix is to tell Vite the sub-path, so it writes the correct reference. Open `vite.config.js` at the root of your project and set `base`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-page/',   // <-- the repo name, wrapped in slashes
})
```

Line by line:

- `import { defineConfig } from 'vite'` — pulls in Vite's config helper (this is already in your project).
- `import react from '@vitejs/plugin-react'` — the plugin that understands JSX (already there).
- `plugins: [react()]` — keeps React working (already there).
- `base: '/my-page/'` — the new line. Replace `my-page` with your **exact repo name**, keep the leading and trailing slashes.

After editing, **run `npm run build` again** so `dist/` is regenerated with the corrected paths. Then upload.

**Special case:** if your repo is named `<username>.github.io` (the user site), the site lives at the root, so `base` stays the default `'/'`. If you used a normal repo name, you need the `base` line.

### Publishing: the walkthrough

This path uses only your browser. No extra software, no command line.

**Step 1 — Create the repository.**
1. Sign in at `https://github.com` (create a free account if needed).
2. Click the **+** in the top right, then **New repository**.
3. Name it, for example, `my-page`. Keep it **Public**.
4. Do **not** add a README. Click **Create repository**.

**Step 2 — Upload the built files.**
1. On the empty repo page, click **uploading an existing file**.
2. Open your project's `dist/` folder on your computer.
3. Drag the **contents** of `dist/` (the `index.html` file and the `assets` folder) into the upload area. Do not drag the `dist` folder itself — you want `index.html` at the repo root.
4. Scroll down, click **Commit changes**.

Result: your repo root now has `index.html` and `assets/`.

**Step 3 — Turn on Pages.**
1. In the repo, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` and folder `/ (root)`. Click **Save**.
5. Wait one to three minutes. A banner will show your live URL: `https://<username>.github.io/my-page/`.

**Success looks like this:** that URL opens your page in any browser, on any device, with no terminal running.

### A quick word on the alternatives

If you ever want a second host: **Netlify** has a "drop" page where you drag your `dist/` folder and get a URL instantly (handy, no GitHub needed). **Vercel** links to a GitHub repo and rebuilds automatically on every change. Both are free for this scale. They are mentioned so the vocabulary is not strange, not because you need them now.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Static site | Fixed files served the same to everyone | Not a page generated live by a database |
| Static hosting | A service that serves fixed files over the web | Not running React on the server |
| Deploy | Publish your built files to a host | Not the same as saving your source |
| Repository (repo) | A project folder hosted on GitHub | Not a branch; it contains branches |
| GitHub Pages | GitHub's free static hosting | Not paid, but needs a public repo on the free plan |
| Project site | Pages under `/<repo-name>/` | Not at the domain root |
| User site | Pages at `https://<username>.github.io/` | Only for a repo named `<username>.github.io` |
| `base` path | The sub-path prefix for your built assets | Not the folder name on your computer |
| 404 | The server has nothing at that address | Not "you broke the internet"; it names a wrong path |
| Hard refresh | Reload ignoring the browser cache | `Ctrl+Shift+R` (Windows/Linux), `Cmd+Shift+R` (macOS) |

## Worked example

**Scenario:** publish the U31 build as a project site named `my-page`, hitting the `base` trap, then fixing it.

**Step 1 — First, do it wrong (on purpose).** Build without setting `base`:

```bash
npm run build
```

Upload the `dist/` contents to a repo named `my-page`, enable Pages. Open `https://<username>.github.io/my-page/`.

**Expected wrong result:** blank page, console 404 on `https://<username>.github.io/assets/...`. You now *recognize* the failure instead of fearing it.

**Step 2 — Add the `base` line.** Edit `vite.config.js` so it reads:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-page/',
})
```

**Step 3 — Rebuild and re-upload.**

```bash
npm run build
```

Upload the contents of `dist/` again (GitHub overwrites matching files and adds the new hashed ones).

**Step 4 — Hard refresh** the live URL: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (macOS).

**Expected result:** the real page, fully styled. Copy the URL — that is the address you submit in U34.

## Common errors

### Error 1 — Blank page with a 404 for a `.js` file (the base path)

**What you see:** the live URL loads, but the page is blank (or shows a broken default). Press `F12` to open the browser's developer tools, click the **Console** or **Network** tab, and you find a red line like:

```text
GET https://<username>.github.io/assets/index-5b6e9a0f.js 404 (Not Found)
```

**Decoded:** The `index.html` loaded, but the browser looked for your JavaScript at the domain root instead of under `/<repo-name>/`. The file was never there. This is the missing `base` path.

**Fix:** set `base: '/<repo-name>/'` in `vite.config.js`, run `npm run build` again, re-upload the contents of `dist/` (overwrite the old files), and wait for Pages to refresh. Reload with a hard refresh (`Ctrl+Shift+R`, or `Cmd+Shift+R` on macOS) to bypass the cached `index.html`.

### Error 2 — "404 File not found" at the site URL

**What you see:** the Pages URL itself shows GitHub's 404 page.

**Decoded and fixed by cause:**
- **Pages not enabled yet:** check Settings → Pages shows your branch and root. Save if needed.
- **Uploaded the `dist` folder instead of its contents:** the repo root has a folder named `dist`, so `index.html` is not at the root. Move `index.html` and `assets` up to the root.
- **Wrong branch/folder:** confirm `main` and `/ (root)`.
- **Repo is private:** on the free plan, Pages needs a **public** repo. Change visibility in Settings.
- **Still publishing:** give it a few minutes. Newly enabled Pages is slow on the first publish.

### Error 3 — The page loads but the CSS is missing (unstyled)

**What you see:** content appears, but it looks like plain black text on white — no layout, colors, or fonts.

**Decoded:** almost always the same `base` problem, but only the `.css` file failed to load while the `.js` succeeded (often a caching quirk). Same fix: correct `base`, rebuild, re-upload.

### Error 4 — It worked yesterday, now it is broken

**Decoded:** either you re-uploaded without rebuilding (so old and new files mix), or the browser is showing a cached copy. Rebuild, re-upload the **whole** `dist/` contents, then hard refresh. If it persists, open the browser console and read the exact failing URL — the error names the file, just like in U31.

## Checkpoints

Answer in your own words:

1. Why does a built React app count as a *static* site?
2. What is the difference between a project site and a user site?
3. In one sentence, what does the `base` path tell the build to do?
4. A live page is blank and the console shows a 404 for a `.js` file. What is your first fix?

## Practice exercises

### P1 — Read and predict

Before uploading, open your built `dist/index.html` in a text editor and find the line that references the `.js` file. Write down the path it uses. Now: will that path work at `https://<username>.github.io/my-page/`? Explain why or why not.

### P2 — Change one value; observe

Deliberately change `base` to a wrong value (for example `'/wrong-name/'`), rebuild, and preview locally with `npm run preview`. What breaks? This proves `base` affects the asset URLs. Change it back to the correct value.

### P3 — Fill in the blank

Complete: "The `base` path must match the ____ part of my live URL, wrapped in ____."

### P4 — Fix this broken config

A classmate's `vite.config.js` looks like this and their project site at `.../portfolio/` is blank:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'portfolio',
})
```

Name **two** problems with the `base` value and give the corrected line.

### P5 — Decode a 404

Paste this into your notes and explain it in your own words, naming which file failed and where the browser looked:

```text
GET https://samdesign.github.io/assets/index-5b6e9a0f.js 404 (Not Found)
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). Read it before you start.

## What is *not* in this unit

- No custom domain names (that is a later, optional topic beyond this course).
- No continuous deployment, GitHub Actions, or CI.
- No backend, APIs, or databases — the app stays static.
- No server administration or paid hosting.
- No changes to React components or styling beyond the `base` setting.

## Next unit

**U33 — Working with developers** (how to hand your design and your live page to an engineering team, and how to review their code as a designer).
