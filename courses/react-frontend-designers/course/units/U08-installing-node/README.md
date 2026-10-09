# U08 — Installing Node.js safely

**Phase 2 — Running React**

## Where you are

Welcome to Phase 2. In Phase 1 you learned what a web page is made of, how HTML gives it structure (U02, U03), how CSS gives it look (U04), and how JavaScript can change it (U05, U06, U07). You have even run small JavaScript lines in the browser console.

Now we leave the browser to install two real tools on **your own computer**. This unit is mostly about Node.js, and it also introduces the **terminal** — the text window where you will type the commands that run everything from here on.

This unit is deliberately slow. Installing takes 10 minutes; understanding what you installed takes longer. That is the point.

## What you will be able to do

- Explain in plain words what Node.js is and why a *front-end* course needs it.
- Open a terminal on your operating system.
- Move between folders with `cd` and list what is in them.
- Run a program by typing its name.
- Install Node.js and confirm it worked with `node --version` and `npm --version`.
- Read a failed install message and name the likely cause.

## What you need already

- **U02–U04** — you know a web page is built from HTML structure and CSS styling.
- **U05–U07** — you have met JavaScript values, functions, arrays, and `map`.
- **U00** — you know the stuck protocol and that errors are curriculum, not verdicts.
- Ability to install an app on your computer (you have done this with design tools).

You do **not** need any prior terminal experience. This unit is where it starts.

## Time and energy

About **90–120 minutes**, and most of that is downloading and reading errors calmly. The install itself may take 5–15 minutes depending on your internet speed. Take a break after the install finishes and before you verify it.

## Why this exists

You may be asking a fair question: *"I am building the visual part of a website. Why am I installing a server-side JavaScript engine?"*

Here is the honest answer. React is not a document the browser understands by itself. React is written by you in a language the browser does **not** run directly. Before the browser can show your interface, something on your computer must:

1. Read your React files.
2. Translate them into ordinary HTML, CSS, and JavaScript.
3. Hand the result to the browser.

That "something" is a **build tool**, and modern build tools are written in JavaScript and are run by **Node.js**. So Node.js is the engine your tooling runs on. It never appears on the finished web page. It is the workshop, not the product.

Without Node.js, the build tool cannot start, and without the build tool, your React files never become a page. That is the whole reason it is here.

## Plain-language teaching

### The terminal, introduced gently

A **terminal** (also called a console, command prompt, or shell) is a text window where you type an instruction and press Enter. That is all it is. You have already used a text field to rename a file; a terminal is the same idea without the mouse.

Why does code work happen in text? Because a build tool needs to be told exactly what to do, in a way that can be repeated and automated. Text commands are precise. A designer uses a mouse to move a layer; a developer types a command to run a program. Same intention, different input device.

**Think of it as:** the mouse moves one layer at a time. The terminal can say *"run this whole process the exact same way, every time."*

#### How to open a terminal

- **Windows:** press the **Start** button, type `PowerShell`, and open **Windows PowerShell**. (There is also a program called *Command Prompt*; we use PowerShell in this course because its commands match what we teach.)
- **macOS:** press **Cmd + Space**, type `Terminal`, and press Enter.
- **Linux:** open your applications menu and search for **Terminal**.

When it opens you will see a line of text ending in `>` on Windows, or `$` on macOS and Linux. That marker is called the **prompt**. It means: "I am waiting for your command." You type after it and press Enter.

You will see two kinds of commands in this course:

- **PowerShell (Windows)** commands, which often look like `Get-ChildItem`.
- **bash (macOS / Linux)** commands, which usually look like `ls`.

We will show both when they differ, and say clearly which is which. The shell you use depends only on your operating system.

#### The three commands you need today

These three are the foundation of every terminal session, on every system.

**1. List what is in the current folder.**

- Windows PowerShell: `Get-ChildItem`
- macOS / Linux bash: `ls`

*What it does:* prints the names of the files and folders in the folder you are currently "standing in."

*What success looks like:* a list of names. For example on macOS:

```text
Desktop   Documents   Downloads   Music   Pictures
```

```text
    Directory: C:\Users\designer

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        10/09/2026  09:14 AM                Desktop
d-----        10/09/2026  09:14 AM                Documents
d-----        10/09/2026  09:14 AM                Downloads
```

*One decoded failure:* you type `ls` on Windows PowerShell and get:

```text
ls : The term 'ls' is not recognized as the name of a cmdlet, function, script file,
or operable program.
```

This does **not** mean your computer is broken. It means PowerShell does not know a command called `ls`. `ls` belongs to the bash shell. On Windows, use `Get-ChildItem`. (Modern PowerShell actually accepts `ls` as a shortcut, so you may *not* see this error — that is fine too. It is useful to know the full name exists.)

**2. Change which folder you are "standing in."**

- Both Windows PowerShell and macOS / Linux bash: `cd`

*What it does:* "cd" means **c**hange **d**irectory. A **directory** is just another word for folder. `cd` moves you into a folder so later commands act on it.

*Example:* to enter a folder called `Documents`:

```text
cd Documents
```

*What success looks like:* **nothing is printed.** The prompt line simply changes to include the folder name. On macOS it might go from `you@mac ~$` to `you@mac Documents$`. Silence after `cd` is success — this surprises most people the first time. A command that says nothing is often a command that worked.

*One decoded failure:* you type `cd Documents` and get:

```text
cd : Cannot find path 'C:\Users\designer\Documents2' because it does not exist.
```

Read it slowly. It names the exact path it tried and says *it does not exist*. The cause is a **typo** or being in the wrong starting folder. Fix: run your list command (`Get-ChildItem` or `ls`) to see the real folder names, then copy the name exactly. Folder names are **case-sensitive on macOS and Linux** but usually not on Windows — `documents` and `Documents` can behave differently across systems.

**3. Go up one folder.**

- Both shells: `cd ..`

*What it does:* the two dots `..` mean "the folder above me." This moves you out of the current folder.

*What success looks like:* again, no printed text, just a changed prompt.

*One decoded failure:* a single dot: `cd .` does nothing at all — it means "this same folder." If you expected to move but the prompt is unchanged, check that you typed **two** dots.

### What Node.js is

**Node.js** (people just say "Node") is a program that runs JavaScript outside a web browser.

In U05 you ran JavaScript in the browser console. The browser's JavaScript engine ran your code. Node.js bundles a similar engine (called V8, the same one Chrome uses) into a standalone program, so JavaScript can run on your computer directly — reading files, starting tools, and building projects.

- It is **not** a website.
- It is **not** a framework like React.
- It is **not** a replacement for the browser.
- It **is** the engine your build tools run on.

**Think of it as:** the browser runs JavaScript *for the page*; Node runs JavaScript *for your workshop*. Same language, different room.

### What npm is

When you install Node.js, you also get a second program called **npm**, the **N**ode **P**ackage **M**anager. It downloads ready-made JavaScript packages (including the React tooling and later React itself) and runs project scripts. U09 is entirely about npm, so today you only need to confirm it is present.

### What a "version" is, and why the check matters

Software changes over time. Each release gets a **version number** like `20.11.1`. When we check versions, we are confirming two things: the tool is installed, and it is new enough for modern React tooling.

- A **major version** is the first number (`20`). Big changes live here.
- A **minor version** is the second (`11`). New features.
- A **patch version** is the third (`1`). Bug fixes.

For this course, a **Node.js version of 18 or newer** is what we want. (Newer is fine.) If yours is older, the install instructions below will replace it.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Terminal | A text window where you type commands | Not a code editor and not a website |
| Shell | The program inside the terminal that interprets commands | "PowerShell" and "bash" are shells |
| Prompt | The marker (`>` or `$`) showing the terminal is ready | Not part of what you type |
| Command | A word you type and run with Enter | Not a sentence; just a program name plus options |
| Directory | Another word for folder | Same thing; no difference |
| `cd` | Change directory — move into a folder | Prints nothing on success |
| `..` | The folder above the current one | Two dots, not one |
| Node.js | Program that runs JavaScript outside the browser | Not React; not a website |
| npm | Package manager that arrives with Node | Not "Node" itself; a separate command |
| Version number | Number like `20.11.1` identifying a release | Bigger is usually newer |
| PATH | The list of folders your terminal searches for programs | A frequent cause of "not recognized" errors |

## Worked example

We will install Node.js on each operating system, then verify it. Follow only the section for your own computer.

### Windows (PowerShell)

**Step 1 — Download the installer.** In your browser, go to the official page `https://nodejs.org`. You want the **LTS** version. **LTS** means **Long-Term Support**: the stable, well-tested line recommended for most people. Click the LTS download for Windows (`.msi`).

**Why this page and not a random site?** `nodejs.org` is the official source operated by the Node.js project. Downloading installers from unofficial sites is a common way people get bundled junk.

**Step 2 — Run the installer.** Open the downloaded `.msi` file. Accept the defaults. When it asks about **"Automatically install the necessary tools"**, leaving the defaults is fine for this course. Finish the install.

**Step 3 — Open a *fresh* terminal.** Close any PowerShell window you had open, then open a new one. This matters: an already-open terminal does not know about programs installed after it started. A new window reads the updated PATH.

**Step 4 — Verify:**

```text
node --version
```

*What it does:* asks Node to print its version.

*What success looks like:*

```text
v20.11.1
```

(Your numbers may differ. As long as the first number is 18 or higher, you are fine.)

*One decoded failure:* you see:

```text
node : The term 'node' is not recognized as the name of a cmdlet, function, script file,
or operable program.
```

This almost always means the terminal was opened **before** you installed Node, or the installment did not update PATH. Fix: close the terminal completely, open a brand-new one, and try again. If it still fails, restart the computer so PATH is re-read, then retry. Only after that should you consider re-installing.

**Step 5 — Verify npm the same way:**

```text
npm --version
```

*What success looks like:*

```text
10.2.4
```

*One decoded failure:* if `node --version` worked but `npm --version` says *not recognized*, the install was partial. Re-run the official installer and choose the repair option, or reinstall.

### macOS

**Step 1 — Download the installer.** Go to `https://nodejs.org` and download the **LTS** `.pkg` for macOS.

**Step 2 — Run the `.pkg`.** Double-click, click through the prompts, and enter your password if asked. The installer places Node in a system location.

**Step 3 — Open a fresh Terminal** (Cmd + Space, type `Terminal`).

**Step 4 — Verify:**

```text
node --version
```

*What success looks like:* `v20.11.1` or similar.

*One decoded failure:* if you are on an Apple Silicon Mac (M-series chip) and used an old installer, you may be told the app *"cannot be opened because the developer cannot be verified."* That is macOS's security check for unverified downloads. Fix: use the current LTS installer from `nodejs.org` (they are signed), or right-click the file → Open, and confirm. Prefer re-downloading from the official page over bypassing warnings.

**Step 5 — Verify npm:**

```text
npm --version
```

*What success looks like:* `10.2.4` or similar.

*One decoded failure:* if you previously installed Node with Homebrew (a package manager for macOS) and commands point to an old version, your terminal may find the wrong Node. Run `which -a node` to list every `node` on your machine; if more than one appears, that is the clue. Fix: remove the stray install or reorder PATH so the intended one wins. If this sounds unfamiliar, that is normal — note it and ask your trainer with the output of `which -a node`.

### Linux

**Step 1 — Prefer your distribution's package manager or NodeSource.** On Ubuntu/Debian-based systems the software may be older than we want. The cleanest beginner path is the official instructions at `https://nodejs.org` under "Downloads → Package Manager." For Ubuntu/Debian the common route is adding the NodeSource repository, then installing.

**Step 2 — Install (Ubuntu/Debian example).** Run the two commands the official page gives you, which add the repository and then install Node. They look like:

```text
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

*What they do:* the first downloads and runs a setup script that tells your system where to find Node 20; the second installs it. `sudo` means "run as administrator," and it may ask for your password.

*What success looks like:* the second command ends with a line mentioning `Setting up nodejs` and no error text.

*One decoded failure:* `curl: command not found` means the `curl` download tool is not installed. Fix: `sudo apt-get install curl` first, then retry.

**Step 3 — Verify:**

```text
node --version
npm --version
```

*What success looks like:* `v20.11.1` and `10.2.4`-style lines.

*One decoded failure:* `E: Unable to locate package nodejs` means the repository step did not complete. Re-run the setup script line exactly as the official page shows, then retry. Do not hunt for random copies of the script elsewhere.

### A note on version managers (read, but do not install yet)

Experienced developers often install a **version manager** (like **nvm** for macOS/Linux or **nvm-windows**), a tool that lets you switch between Node versions per project. It is genuinely useful, but it adds a layer of complexity while you are meeting the terminal for the first time. **This course does not require it.** Get the plain install working first. You can add a version manager later, once commands feel boring.

## Common errors

### Error: `'node' is not recognized` / `command not found`

**What it means:** the terminal cannot find a program called `node` in its PATH.

**Most common cause:** the terminal was open *before* Node was installed. The terminal only learns about new programs when it starts.

**Fix:** close every terminal window, open a fresh one, and run `node --version` again. If needed, restart the computer.

### Error: `EACCES` or "permission denied" while installing

**What it means:** your normal user account tried to write to a protected system folder.

**Fix:** use the official installer, which handles permissions correctly. Do **not** fix this by running commands with `sudo` on macOS/Linux forever — that can scatter files you do not own. If you see `EACCES` from a *previous* global npm install, that is a sign an older setup used `sudo`; note it and ask your trainer before "fixing" it.

### Error: two versions of Node are fighting

**What it means:** you have more than one Node installed (for example one from a website installer and one from Homebrew/apt), and the terminal is finding the wrong one.

**Fix:** find them all — `which -a node` on macOS/Linux, or `where.exe node` on Windows — and remove the one you do not want, or ask your trainer to help reorder PATH. Removing software is worth doing slowly and with a backup of any work.

### Error: everything looks right but nothing happens

**What it means:** possibly you typed the command into a text editor, or into the browser address bar, instead of the terminal.

**Fix:** make sure the window shows a prompt (`>` or `$`), paste or type the command there, and press Enter.

## Checkpoints

Answer these in your own words before the assignment. If you can answer all five, you are ready.

1. What does Node.js do, and what does it *not* do?
2. What is the difference between a terminal and a shell? Give an example of each.
3. Where do you go after you type `cd Documents` **if there is no error** — and why is silence normal?
4. Why must you open a **fresh** terminal after installing something?
5. What is the difference between `get-command`-style listing on Windows and `ls` on macOS/Linux?

## Practice exercises

These are not graded. Do them slowly; they build the confidence the graded work assumes.

### P1 — Open and orient

Open a terminal for your operating system. Type the listing command (`Get-ChildItem` on Windows, `ls` elsewhere). Write down three folder names you see.

### P2 — Move and return

Use `cd` to step into one of those folders, run your listing command there, then return with `cd ..`. Watch the prompt change and note that success prints nothing.

### P3 — One deliberate error

Type the listing command wrong on purpose (for example `lss` or `Get-Childitemm`). Read the error out loud. Name which word the terminal did not recognize. Fix it. This trains the error-reading muscle on purpose, while it is safe.

### P4 — Verify and record

Run `node --version` and `npm --version`. Write down both exact outputs in your notes. Note whether the major Node version is 18 or higher.

### P5 — Explain it to a friend

In 3–4 sentences, explain to an imaginary designer friend why a front-end course installs a "server" program. Use the workshop-versus-product idea if it helps.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No React, no components, no JSX yet (those arrive in U11 and U12).
- No npm installs of packages yet — you only confirm npm exists (U09 uses it fully).
- No creating a project folder yet (U09 does that).
- No version managers installed (mentioned only).
- No editing code files yet.

## Next unit

**U09 — npm, a dev server, and a Vite project** (you will create your first React project and run it).
