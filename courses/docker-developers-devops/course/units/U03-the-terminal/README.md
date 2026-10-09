# U03 — The terminal, deliberately

**Phase 1 — Why containers exist**

## Where you are

Docker does not have a graphical window you click. You drive it by typing **commands** into a **terminal**. Before we install or run anything, this unit makes sure the terminal is a place you understand, not a place you fear. We go slowly and name every part.

## What you will be able to do

- Explain what a terminal and a shell are, and why programmers use them.
- Find out where you are (`pwd`), list what is there (`ls` or `dir`), and move between folders (`cd`).
- Run a simple command and read its output.
- Read the two most common terminal errors and decode them.
- Tell which commands differ on Windows, macOS, and Linux.

## What you need already

- **U00 — How this course works.** The stuck protocol matters here.
- **U01 — What we are building toward.**
- **U02 — The works-on-my-machine problem.** You only need the idea that machines have environments.

You do **not** need Docker installed for this unit. If you do have it installed already, that is fine; we still do not use it here.

## Time and energy

About **60–90 minutes**, most of it hands-on at your own keyboard. If a command confuses you, that is normal and expected. Slow is correct. Reading terminal output fluently takes a few sessions, not one.

## Why this exists

The terminal looks hostile to newcomers: black screen, blinking cursor, no buttons. But it is only a place to type commands as text. Programmers use it because it is precise, scriptable, and available on every server — including the servers that will run your containers. Learning three commands now saves you from guessing later.

## Plain-language teaching

### What a terminal and a shell are

A **terminal** is the window or app where you type text commands. Inside it runs a **shell**: the program that actually reads what you type, runs it, and shows you the result.

- On Windows, the common shells are **PowerShell** and the older **Command Prompt** (`cmd.exe`).
- On macOS and Linux, the common shell is **bash** (or a close relative such as `zsh`). We will say "bash" to mean all of them.

The terminal is the window; the shell is the brain inside it. For learning purposes you can use the words interchangeably, and many people do. We will use **terminal** for the window and **shell** when the difference matters.

### The prompt

When the shell is ready for you to type, it shows a **prompt**: a short line of text ending in a symbol such as `>` (PowerShell), `$` (bash), or `C:\>` (cmd). The prompt is the shell saying "I am listening."

```text
PS C:\Users\yourname>        <- a PowerShell prompt
$                            <- a bash prompt
C:\Users\yourname>           <- a cmd.exe prompt
```

The prompt is **not** something you type. It is shown to you.

### Your working directory

At any moment the shell is "standing" inside one folder. That folder is your **working directory** — the place all your commands act on by default. When you open a new terminal, you usually start in your **home** folder.

A **directory** is the proper name for a folder. Both words mean the same thing.

### Finding where you are: `pwd`

`pwd` stands for "print working directory." It prints the full path of the folder you are currently in.

```text
$ pwd
/home/yourname
```

- **What it does:** reports your current folder as a full path.
- **What "worked" looks like:** you see a path. On Windows it looks like `C:\Users\yourname`; on macOS/Linux like `/home/yourname`.
- **Typical failure decoded:** `pwd : The term 'pwd' is not recognized`. This means you are in the old Windows **Command Prompt**, which does not have `pwd`. Use `cd` with no argument instead (it prints the current folder), or open PowerShell.

### Listing what is here: `ls` (and `dir`)

`ls` stands for "list." It shows the files and folders in your working directory.

```text
$ ls
Desktop    Documents    Downloads    notes.txt
```

- **What it does:** lists the contents of the current folder.
- **What "worked" looks like:** you see names of files and folders. **Your list will differ from the example.** That is expected — it reflects your machine.
- **Platform difference:** in **PowerShell** on Windows, `ls` works (it is a shortcut to the same idea). In the old **Command Prompt**, `ls` is not available; type `dir` instead. In **bash**, `ls` is the standard command.
- **Typical failure decoded:** `ls : The term 'ls' is not recognized as the name of a cmdlet...`. This means you are in `cmd.exe`, not PowerShell. Either open PowerShell or use `dir`.

### Moving between folders: `cd`

`cd` stands for "change directory." It moves your working directory to another folder.

```text
$ cd Desktop
$ pwd
/home/yourname/Desktop
```

- **What it does:** changes which folder you are standing in.
- **What "worked" looks like:** your prompt often changes, and `pwd` now shows the new folder. Some systems show no obvious change — so verify with `pwd`.
- **Typical failure decoded:** `cd: no such file or directory: Desktp` (bash) or `Set-Location : Cannot find path '...' because it does not exist.` (PowerShell). The folder name was misspelled or the folder is not inside the current one. Check the spelling with `ls` first.

### Paths: absolute and relative

A **path** is the address of a file or folder.

- An **absolute path** starts from the very top of the filesystem. On Windows it looks like `C:\Users\yourname\Desktop`. On macOS/Linux it starts with `/`, like `/home/yourname/Desktop`.
- A **relative path** starts from where you are now. `cd Desktop` means "the Desktop folder inside my current folder."

Two special shortcuts:

- `..` means **the parent** — the folder one level up. `cd ..` moves you up one level.
- `~` means your **home** folder. `cd ~` goes straight home (bash; PowerShell also accepts `~`).

The **separator** differs by system: Windows traditionally uses a backslash `\`, macOS and Linux use a forward slash `/`. PowerShell accepts either in most cases.

### Running a command: `echo`

To practice *executing* something, use `echo`, which prints back whatever you give it. The text you give it is called an **argument** — extra information attached to a command.

```text
$ echo hello terminal
hello terminal
```

- **What it does:** prints its arguments back to you.
- **What "worked" looks like:** the words you typed appear again on the next line.
- **Typical failure decoded:** `echo: command not found` or `The term 'echo' is not recognized`. This almost always means a typo, such as `ecoh`. Re-read what you typed character by character.

### Creating a folder: `mkdir`

`mkdir` stands for "make directory." It creates a new, empty folder with the name you give it. You will need it for the assignment, so we meet it here.

```text
$ mkdir terminal-practice
$ ls
Desktop    Documents    Downloads    terminal-practice
```

- **What it does:** creates one new folder in your current directory.
- **What "worked" looks like:** the command prints nothing at all, and the new folder appears when you run `ls` (or `dir`). Silence is success here.
- **Typical failure decoded:** `mkdir: cannot create directory 'terminal-practice': File exists` (bash) or `An item with the specified name ... already exists.` (PowerShell). The folder is already there. That is harmless — move on and use the existing folder.

### Reading output

Every command produces **output**. There are two kinds you should start to notice:

- **Normal output:** the result you asked for (a path, a list, a printed word).
- **Error output:** a message explaining that something did not match expectations. Errors are written to a separate channel and often appear after the normal output.

An error is information, not an insult. It usually names the thing it could not find. Read it as: "I looked for X and did not find it."

### Windows / macOS / Linux cheat sheet

| Goal | PowerShell (Windows) | Command Prompt (Windows) | bash (macOS/Linux) |
|------|----------------------|--------------------------|--------------------|
| Where am I | `pwd` | `cd` (no argument) | `pwd` |
| List files | `ls` | `dir` | `ls` |
| Change folder | `cd Desktop` | `cd Desktop` | `cd Desktop` |
| Go up one | `cd ..` | `cd ..` | `cd ..` |
| Go home | `cd ~` | `cd %USERPROFILE%` | `cd ~` |
| Make a folder | `mkdir name` | `mkdir name` | `mkdir name` |
| Print text | `echo hello` | `echo hello` | `echo hello` |

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Terminal | The window/app where you type commands | Not the same as the shell program inside it |
| Shell | The program that reads and runs your commands | "Terminal" is often used to mean this too |
| Prompt | The text shown when the shell is ready for input | People try to type it; you do not |
| Command | A single instruction you type and run | Not a whole script |
| Argument | Extra info attached to a command (e.g. `Desktop` in `cd Desktop`) | Not the same as a flag |
| Flag / option | An argument starting with `-` or `--` that changes behaviour | Called "switches" on Windows sometimes |
| Working directory | The folder commands act on right now | Not the whole disk |
| Directory | Another word for folder | Same thing, no difference |
| Path | The address of a file or folder | Absolute vs relative confuses everyone at first |
| Absolute path | A path from the very top of the filesystem | Not "the correct path" |
| Relative path | A path from your current folder | Depends on where you are standing |
| Parent directory | The folder one level up (`..`) | Two dots, not one |
| Output | What a command produces | Errors are output too, on a separate channel |
| Alias | A second name for a command (e.g. `ls` for `Get-ChildItem`) | Aliases are why `ls` works in PowerShell |
| `mkdir` | The command that creates a new folder | Not the same as entering one; use `cd` for that |

## Worked example

Open your terminal. Below are two complete sessions, one for Windows PowerShell and one for macOS/Linux bash. Type the commands in your own terminal, but expect **your** filenames and paths to differ. That is normal.

### Windows (PowerShell)

```text
PS C:\Users\yourname> pwd

Path
----
C:\Users\yourname

PS C:\Users\yourname> ls

    Directory: C:\Users\yourname

Mode                 LastWriteTime         Name
----                 -------------         ----
d-----         ...                          Desktop
d-----         ...                          Documents
d-----         ...                          Downloads

PS C:\Users\yourname> cd Desktop
PS C:\Users\yourname\Desktop> pwd

Path
----
C:\Users\yourname\Desktop

PS C:\Users\yourname\Desktop> cd ..
PS C:\Users\yourname> echo hello terminal
hello terminal
```

### macOS / Linux (bash)

```text
$ pwd
/home/yourname

$ ls
Desktop    Documents    Downloads

$ cd Desktop
$ pwd
/home/yourname/Desktop

$ cd ..
$ echo hello terminal
hello terminal
```

Every line is justified:

- `pwd` confirms the starting point before we change anything.
- `ls` shows what exists, so we know `Desktop` is really there.
- `cd Desktop` moves into it using a **relative** path.
- `pwd` proves the move worked (prompts are not always reliable proof).
- `cd ..` uses the parent shortcut to move back up.
- `echo hello terminal` demonstrates running a command with an argument.

## Common errors

### Error: `cd` cannot find the folder

```text
$ cd Desctop
cd: no such file or directory: Desctop
```

**What happened:** a typo. The shell looked for a folder literally named `Desctop` and found none.

**Fix:** run `ls` to see the real names, then retype carefully. Terminal commands are case-sensitive on macOS and Linux, so `Desktop` and `desktop` are different.

### Error: `ls` is not recognized (Windows)

```text
PS> ls : The term 'ls' is not recognized as the name of a cmdlet...
```

**Wait, it says PowerShell but fails?** The most common cause is that you are actually in the old **Command Prompt** window, which does not know `ls`. Look at the prompt: `C:\Users\yourname>` (no `PS` at the front) means Command Prompt.

**Fix:** either type `dir` (the Command Prompt equivalent) or open PowerShell, where `ls` works.

### Error: a path with spaces

```text
$ cd My Documents
cd: too many arguments
```

**What happened:** the shell treats a space as "here ends one argument." It saw two arguments: `My` and `Documents`.

**Fix:** wrap the path in quotes: `cd "My Documents"`. This works in every shell here.

## Checkpoints

Answer before the assignment:

1. What is the difference between the terminal and the shell?
2. What does `pwd` show, and why check it after `cd`?
3. Name the Command Prompt equivalent of `ls`, and one reason it differs.

If you can answer these while your terminal is open, you are ready.

## Practice exercises

Ungraded, increasing difficulty.

### P1 — Read and predict

**Without running anything**, predict the output of this short session:

```text
$ pwd
/home/sam
$ cd Projects
$ pwd
$ cd ..
$ pwd
```

Write your prediction, then run it in your own terminal (create a `Projects` folder first if needed) and compare.

### P2 — Change one value

Run `echo hello`. Now run `echo hello world`. Then run `echo "hello world"`. Write down how the output changed and why the quotes mattered.

### P3 — Fill in the blank

Complete a session that starts in the home folder, enters `Documents`, then returns home, using only the commands from this unit.

```text
$ pwd
____
$ ____ Documents
$ cd ____
$ pwd
____
```

### P4 — Write from a specification

Write the exact commands to: (a) show your current folder, (b) list the files, (c) move into a folder called `Downloads`, (d) confirm you moved, (e) move back up one level.

### P5 — Fix the broken commands

Each line below is wrong. Write the corrected version and a one-line reason.

```text
cd My Downloads
pwd Documents
ls / oops
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No Docker installed or used.
- No file editing or creating beyond what practice needs.
- No scripting, loops, pipes, or `sudo`/administrator commands.
- No package managers, networks, or servers.

## Next unit

**U04 — Apps and their environments** (what a program actually needs in order to run).
