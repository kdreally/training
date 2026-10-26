# U13 — The terminal as a tool

**Phase 2**

## Where you are

Node is installed. You need a reliable way to **navigate folders** and **run commands**. That tool is the **terminal**.

## What you will be able to do

- Explain what a terminal/shell is for.
- Print the current directory; list files; change directory.
- Use absolute vs relative paths at a basic level.
- Create a course practice folder and prove you are in it.

## What you need already

- **U12** (Node installed)
- Ability to open a terminal app

## Time and energy

**60–90 minutes.**

## Why this exists

Almost every Node workflow is: open terminal → go to project folder → run a command. If navigation is scary, every later unit is scary. We remove the scare carefully.

## Plain-language teaching

### What a terminal is

A **terminal** (terminal emulator) is a text window where you type **commands** for the operating system and tools.

A **shell** is the program that interprets those commands (PowerShell, cmd, bash, zsh…).

You type a line, press Enter, see text output.

### Why developers use it

- Precise control
- Same habits for servers and local machines
- Scripts and tools are often CLI-first (command-line interface)

### The prompt

You will see something like:

```text
C:\Users\You>
```

or

```text
you@computer:~$
```

That means: ready for a command. The important part is **which folder you are in**.

### Current working directory

The **current working directory (cwd)** is “where you are” in the folder tree. Commands often act relative to here.

### Commands to learn now

Windows **PowerShell** (adjust if you use cmd):

| Goal | PowerShell | macOS/Linux (bash/zsh) |
|------|------------|-------------------------|
| Where am I? | `pwd` or `Get-Location` | `pwd` |
| List files | `dir` or `ls` | `ls` |
| Change folder | `cd path` | `cd path` |
| Go up one folder | `cd ..` | `cd ..` |
| Make folder | `mkdir name` | `mkdir name` |

`cd` means **change directory**.

### Paths

A **path** is an address for a file or folder.

- **Absolute path** — full address from the root (`C:\Users\You\projects` or `/home/you/projects`)
- **Relative path** — from where you are now (`.\notes` or `../other`)

`..` means parent folder.  
`.` means current folder.

### Spaces in paths

Prefer folder names **without spaces** for this course: `atlrn-work` not `my work`.  
If you must use spaces, quote paths: `cd "my work"`.

### Create a playground

```powershell
cd ~
mkdir atlrn-work
cd atlrn-work
pwd
```

(`~` home directory works in PowerShell and bash.)

You should see a path ending in `atlrn-work`.

### Running programs

You already ran `node -v`. That works when `node` is on PATH (U12). Later: `node file.js` from the folder that contains the file (U14).

### Danger sense (gentle)

Do not run commands you do not understand from random websites. In this course, every command is explained first.

Avoid destructive commands you have not been taught (`rm -rf`, format, etc.). We will not ask for those.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Terminal | Text UI for commands | Not “the computer itself” |
| Shell | Command interpreter | |
| Command | Instruction you type | |
| cwd | Current folder | |
| Path | Location address | |
| `cd` | Change directory | |
| CLI | Command-line interface | Opposite of pure GUI |

## Worked example

```text
pwd
→ C:\Users\Sam

mkdir atlrn-work
cd atlrn-work
pwd
→ C:\Users\Sam\atlrn-work

mkdir u13
cd u13
cd ..
pwd
→ C:\Users\Sam\atlrn-work
```

## Common errors

### Error: Running commands in the wrong folder

`node app.js` fails with “cannot find module/file” because you are not where `app.js` is.  
**Fix:** `pwd` / `ls` / `cd` first.

### Error: Mixing path slash styles blindly

Windows accepts `\` and often `/`. Prefer what your shell shows. Copy paths carefully.

### Error: Typo in folder name

`cd atlern-work` fails. List directories and retype.

## Checkpoints

1. What is cwd?
2. What does `cd ..` do?
3. Absolute vs relative path?
4. Why avoid spaces in project folder names?

## Practice

### P1 — Navigate

Create `atlrn-work/u13-practice`. Move into it. List contents. Go up. Prove with `pwd`.

### P2 — Path story

Write the absolute path of your `atlrn-work` folder.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Shell scripting
- Git
- Permissions deep dive

## Next unit

**U14 — Running a JavaScript file with Node**
