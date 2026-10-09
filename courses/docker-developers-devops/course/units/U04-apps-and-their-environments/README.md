# U04 — Apps and their environments

**Phase 1 — Why containers exist**

## Where you are

In U02 you saw that two machines with "the same app" can behave differently. In U03 you learned to move around a terminal. Now we look closely at **what a program actually needs in order to run**. Understanding this list is essential: containers work by packaging exactly these things and carrying them along.

## What you will be able to do

- List everything a small app needs in order to run.
- Explain, in plain language, what a runtime, a library, a package manager, a configuration value, an environment variable, and a port are.
- Explain why two machines running "the same app" can still drift apart.
- Recognize a missing-module error and a port-already-in-use error, and say what each means.

## What you need already

- **U00 — How this course works.**
- **U01 — What we are building toward.**
- **U02 — The works-on-my-machine problem.** You need the idea of an environment and version drift. This unit is the precise follow-up to that one.
- **U03 — The terminal, deliberately.** You need to be comfortable reading command output.

You do **not** need Docker in this unit.

## Time and energy

About **60–80 minutes**. This unit is a little list-heavy. Take it one item at a time. The goal is that when someone says "runtime" or "environment variable" later, you have a concrete picture, not a vague feeling.

## Why this exists

Containers promise the same behaviour everywhere because they carry the environment with the app. That promise is meaningless until you know what "environment" contains. This unit turns the fuzzy word from U02 into a checklist you can actually reason about.

## Plain-language teaching

### An app is more than its code

When we say "the app," we often mean the folder of code. But the code is only the recipe. To actually run, three more kinds of things must be present, plus two ways of behaving. Let us name them one at a time.

### The runtime

A **runtime** is the engine that executes your code. Different languages use different runtimes:

- Python code runs on the **Python interpreter**.
- JavaScript (outside a browser) runs on **Node.js**.
- Java code runs on the **Java Virtual Machine** (JVM).
- C# runs on the **.NET runtime**.

Without the runtime, the code is just text. Crucially, the runtime has a **version** (for example, Python 3.11 vs 3.12), and code written for one version can break on another.

### Libraries, packages, and dependencies

A **library** is code someone else wrote that your app uses. A web framework, a date-parsing tool, a database driver — all libraries.

A **package** is a library (or tool) bundled up so it can be installed and shared. A **package manager** installs packages for you: `pip` for Python, `npm` for JavaScript, `apt` for Linux system packages, `brew` for macOS. You do not need to run any of these in this unit; you only need to know the term.

A **dependency** is the general word for anything the app depends on to run — the runtime, its libraries, or a system tool. Dependencies are usually declared in a **manifest** file: `requirements.txt` for Python, `package.json` for Node.js. A **lockfile** is a companion file that records the *exact* versions that were installed, so they can be reproduced later.

### Operating-system bits

Beyond the runtime and libraries, code sometimes relies on things the operating system provides:

- **System libraries**, shared by many programs on the machine.
- **File paths and separators**, which differ between Windows (`\`) and macOS/Linux (`/`).
- **File permissions**, which behave differently across systems.
- **Line endings**, which are invisible characters at the end of text lines and differ between Windows and Unix.

These OS bits are easy to forget and hard to see, which makes them a classic source of "works on my machine."

### Configuration and environment variables

**Configuration** is the set of settings a program reads from outside its code, so the same code can run in different places. A common form is the **environment variable**: a named value stored in the environment the program starts in, which the program can read.

You have likely seen environment variables without knowing the name:

```text
DATABASE_URL=postgres://localhost:5432/todo
PORT=5000
DEBUG=false
```

- `DATABASE_URL` tells the app where its database lives.
- `PORT` tells the app which network door to listen on.
- `DEBUG` turns friendly debug behaviour on or off.

If an environment variable is missing, the program may fall back to a default — or crash. That unpredictability is exactly what containers help remove.

### Ports: how apps listen

A **port** is a numbered door on a computer that network traffic can arrive at. When an app "listens" on a port, it is waiting for connections at that door. A single computer has many ports (numbered 0–65535), so several apps can listen at once, each on its own number.

When you visit a website, your browser connects to a **host** (a machine) at a **port** (a door on that machine). The default web port is 80 (or 443 for secure traffic). Small apps often use higher numbers such as 3000, 5000, or 8000 to avoid clashing with system services.

The word **port** will get a precise Docker unit later (U18). For now the picture is: *a numbered door an app listens at.*

### Why environments drift

Put it together. Two machines can differ in any of these ways:

```text
runtime version  ->  Python 3.11 vs 3.12
library versions ->  numpy 1.24 vs 1.26
OS bits          ->  different line endings, permissions
configuration    ->  DATABASE_URL set on one, missing on the other
ports            ->  port 3000 free on one, taken by another tool on the other
```

That is five independent ways to break. This is why "install the same thing" from U02 is not enough: the environment is not one thing. It is a whole set of things, each with its own version and state.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Runtime | The engine that executes code (Python, Node.js, JVM, .NET) | Not the same as the operating system |
| Library | Ready-made code the app uses | People call every library a "dependency" |
| Package | A library or tool bundled for installation | Not the same as a raw source file |
| Package manager | A tool that installs packages (`pip`, `npm`, `apt`) | `apt` manages system packages, not Python ones |
| Dependency | Anything the app needs to run | Broader than "external package" |
| Manifest | A file listing wanted dependencies (`requirements.txt`) | Not the same as a lockfile |
| Lockfile | A file recording the exact versions installed | Easily ignored, which causes drift |
| Environment variable | A named value passed to a program from outside | Not the same as a shell variable set and forgotten |
| Configuration | Settings the app reads from outside its code | Includes but is not limited to environment variables |
| Port | A numbered door where an app listens for traffic | Not a physical socket; a number |
| Host | The machine you connect to | Often "localhost," meaning this computer |
| Listening | An app waiting for connections on a port | Not the same as a finished request |

## Worked example

Consider a tiny web app. You are not required to run it; read what it needs. If you have Python installed and want to try it, that is optional and safe.

**File: `app.py`**

```python
import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "todo app is running"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port)
```

**File: `requirements.txt`**

```text
flask==3.0.0
```

Now list everything this app needs:

```text
Runtime            Python 3 (a specific version, e.g. 3.11)
Library            flask (and everything flask itself needs)
Manifest           requirements.txt
Configuration      the PORT environment variable (defaults to 5000)
Port               listens on 5000 unless told otherwise
OS bits            needs to read environment variables and open a network port
```

Every line is justified:

- `import os` and `os.environ.get("PORT", "5000")` — the app reads configuration from the environment; the `"5000"` is the fallback if `PORT` is unset.
- `from flask import Flask` — the app needs the `flask` library to be installed.
- `app.run(host="0.0.0.0", port=port)` — the app listens on the chosen port; `0.0.0.0` means "all network interfaces," which matters for containers later.
- `requirements.txt` — declares the library so a package manager can install it.

Now the failure modes this environment can produce.

### Failure A — missing library

If `flask` is not installed, the app prints:

```text
ModuleNotFoundError: No module named 'flask'
```

**Decoding it:** the Python runtime started fine, then tried to import `flask` and could not find it. The runtime is present; a **library** is missing. The fix is to install from the manifest (`pip install -r requirements.txt`), but you do not need to run this in this unit.

### Failure B — port already in use

If another program is already listening on port 5000, the app prints something like:

```text
OSError: [Errno 98] Address already in use
```

**Decoding it:** the app asked to listen on port 5000, but that door is already occupied. This is a **port** conflict, not a code bug. The fix is to stop the other program or choose a different `PORT`. You will meet this again in the Docker ports unit (U18).

## Common errors

### Error: assuming "installed" means "the right version"

**What happens:** A library is present but at a different version; the app behaves oddly with a confusing error.

**Fix:** Check versions, not just presence. This is why lockfiles exist. Drift is about versions, not existence.

### Error: forgetting an environment variable

**What happens:** The app falls back to a default that is wrong for this machine (for example, a local database address that does not exist here).

**Fix:** List the environment variables the app reads and confirm each is set. Write them down; do not rely on memory.

### Error: treating a port clash as a code bug

**What happens:** You debug the code for hours when the real problem is another program occupying the door.

**Fix:** Read the error. "Address already in use" names the resource, not the code. Find what is using the port before touching the app.

## Checkpoints

Answer before the assignment:

1. Name the runtime, one library, one configuration value, and one port for a small app of your choice.
2. Why does "install the same thing" fail to guarantee the same environment? (Use the word version.)
3. What does `ModuleNotFoundError: No module named 'flask'` tell you, and what does it *not* tell you?

If you can answer these, you are ready.

## Practice exercises

Ungraded, increasing difficulty.

### P1 — Read and predict

Given the `app.py` above, predict what happens if you run it (a) with `flask` installed and `PORT` unset, and (b) with `flask` not installed and `PORT` set to 5000. Write your predictions before checking the worked example.

### P2 — Change one value

Imagine you change `"5000"` in the code to `"8000"`. Write one sentence about what changes for the app, and one sentence about what does **not** change.

### P3 — Fill in the blanks

Complete the environment list for a Node.js web app:

```text
Runtime:            ________
Manifest:           package.json
Library example:    ________
Configuration:      the ________ environment variable
Port:               often 3000 by convention
```

### P4 — Write from a specification

Write a one-page "environment spec" for any app you have used: name its runtime, two libraries, one manifest or lockfile, two configuration values, and the port it listens on. Use headings.

### P5 — Fix the broken reasoning

A teammate says: "The app crashes, so I reinstalled everything. It still crashes, so the code must be broken." Write two or three sentences explaining the flaw in that reasoning and what to check instead.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No Docker commands; not installed or used.
- No installing package managers or running `pip`/`npm`.
- No container networking or port mapping (U18 covers ports in Docker).
- No data persistence or volumes (U17).

## Next unit

**U05 — Virtual machines vs containers** (the two ways to package an environment, and the honest trade-offs).
