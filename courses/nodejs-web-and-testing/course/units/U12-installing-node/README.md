# U12 — Installing Node.js safely and verifying

**Phase 2**

## Where you are

You know what Node is. Now you put it on your machine and **prove** it works.

## What you will be able to do

- Install Node.js LTS from a trusted source (or via a version manager if trainer prefers).
- Verify with `node -v` and `npm -v`.
- Explain what those commands mean (npm appears as a program name; deep npm comes in Phase 3).
- Capture proof for your trainer.

## What you need already

- **U11**
- Permission to install software on your computer.

## Time and energy

**45–90 minutes** (installers vary).

## Why this exists

Running files requires the runtime. Guessing you “probably installed it” causes ghost bugs. Verification is part of the craft.

## Plain-language teaching

### What you are installing

The **Node.js** installer (or package) gives you:

1. The `node` program — runs JS files / evaluates JS.
2. Often **npm** — a package manager program (we explain fully in Phase 3; for now it is just “something that comes along”).

### LTS means “more stable track”

**LTS** = Long Term Support. Prefer the **LTS** version on the official site unless your trainer specifies otherwise.

### Trusted source

Prefer:

- Official site: `https://nodejs.org`
- Or a trainer-approved version manager (nvm, fnm, etc.)

Avoid random “cracked tools” sites.

### Install (high level)

1. Download LTS for your OS (Windows / macOS / Linux).
2. Run the installer; accept defaults unless trainer says otherwise.
3. **Close and reopen** your terminal after install (so PATH updates).
4. Verify (below).

**PATH** is the list of folders your system searches for programs. If `node` is “not recognized,” the terminal cannot find it — often fixed by restarting the terminal or fixing PATH (ask trainer with screenshots).

### Verify

Open a **terminal** (Command Prompt, PowerShell, Terminal.app, etc.):

```bash
node -v
```

You should see a version like `v20.x.x` or similar (numbers vary).

```bash
npm -v
```

You should see a version number (npm ships with Node).

What these mean:

- `node` — the program name
- `-v` — “print version” (common convention)
- Success = version printed, no “not recognized” error

### Optional REPL peek

```bash
node
```

You may enter an interactive prompt. Type `1 + 1` then Enter. Type `.exit` to leave.  
Full REPL skills optional; running files is U14.

### Windows notes

- Prefer “Add to PATH” if the installer offers it.
- PowerShell and Command Prompt both work; stay consistent.
- If `node` fails, fully quit and reopen the terminal; reboot if needed.

### macOS / Linux notes

- Installers and package managers differ; official packages or trainer guidance.
- Same verification commands.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Installer | Program that installs software | |
| LTS | Stable support track | Not always “newest shiny” |
| PATH | Where OS looks for commands | |
| Terminal | Text window to run commands | Not the browser |
| Version | Release identifier | |
| npm | Package manager CLI (Phase 3) | Not required to understand fully yet |

## Worked example — success

```text
> node -v
v22.11.0

> npm -v
10.9.0
```

Numbers will differ. Shape matters: versions print cleanly.

## Common errors

### Error: `node` is not recognized / command not found

**Meaning:** Terminal cannot find the `node` program.  
**Try:** New terminal window; confirm install; PATH help from trainer with screenshot.

### Error: Very old Node from years ago

**Meaning:** Another install is first on PATH.  
**Try:** `where node` (Windows) or `which node` (mac/Linux); ask trainer.

### Error: Installing without admin rights

**Meaning:** Corporate machines block installs.  
**Try:** Trainer/IT path; portable options only if approved.

## Checkpoints

1. What does LTS mean for your choice?
2. What two commands verify install?
3. Why reopen the terminal after installing?
4. What does “command not found” mean?

## Practice

### P1 — Install + verify

Install LTS. Run both version commands.

### P2 — Notes

Write your OS name and the two version outputs in a text file (assignment will require this).

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Using npm to install packages (Phase 3)
- Project setup
- Writing server code

## Next unit

**U13 — The terminal as a tool**
