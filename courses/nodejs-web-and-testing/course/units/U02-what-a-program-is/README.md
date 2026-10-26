# U02 — What a computer program is

**Phase 1 — First principles of programming**

## Where you are

Map is set. Now: the most basic idea — **what a program is** — without Node, packages, or web noise.

## What you will be able to do

- Define *program*, *instruction*, *language*, and *algorithm* in plain words.
- Distinguish program vs document vs data vs application.
- Trace a tiny instruction list by hand.
- Explain why precise language matters to computers.

## What you need already

- **U00**, **U01**

## Time and energy

**60–90 minutes.**

## Why this exists

People “write code” for months without a stable definition of *program*. Then every new tool feels like magic. We start with a definition you can stand on.

## Plain-language teaching

### A computer is obedient and literal

A computer does not “know what you meant.” It follows **instructions** written in a form it can execute. If the instructions are wrong, it does the wrong thing **perfectly**.

That is not hostility. That is literalness.

### What a program is

A **program** is a collection of instructions that a computer can carry out to perform a task.

More carefully:

1. Someone writes instructions in a **programming language**.
2. Those instructions are stored as **text in files** (usually).
3. A **runtime** or related tools turn that text into actions the machine can perform.
4. When the program **runs**, the computer performs those actions in a defined order (with branches and loops you will learn soon).

You do not need the hardware details yet. You need this shape.

### Program vs related words

| Thing | What it is | Example |
|-------|------------|---------|
| **Program** | Instructions a computer can run | A file that adds two numbers and prints the sum |
| **Algorithm** | A clear process to solve a problem (can be on paper) | “To find the largest number, look at each, remember the biggest so far” |
| **Code** | Instructions written in a programming language | The text of the program |
| **Document** | Text for humans (maybe formatted) | A recipe in a Word file — the computer does not *cook* |
| **Data** | Information programs use | The numbers `3` and `5`, a list of names |
| **Application / app** | A program (or set of programs) meant for users to accomplish something | A notes app |

A recipe is like an algorithm for humans. A program is an algorithm expressed so a machine can execute it without common sense.

### Languages

Humans use English, Swahili, Spanish… Computers need **programming languages** with strict rules.

Examples of languages: JavaScript, Python, Java, C.

**JavaScript** is the language we will use.  
**Node.js** (later) is one *place* JavaScript can run — not a different language.

### Source code is text

When we say “write a program,” we almost always mean: type text into a file, save it, then run it with a tool.

That text must follow the language’s rules (**syntax**). Break the rules → the tool complains (an **error**). Complaints are feedback, not insults.

### A tiny program in plain language (not real JS yet)

Task: greet a person.

Algorithm on paper:

1. Remember the name “Amina”.
2. Build the message “Hello, Amina”.
3. Show that message to the user.

As fake structured instructions:

```text
SET name TO "Amina"
SET message TO "Hello, " + name
SHOW message
```

You can **trace** this: after line 1, name is Amina; after line 2, message is Hello, Amina; line 3 displays it.

Tracing by hand is a core skill. It means: pretend you are the computer, one step at a time.

### What makes a good instruction list

- **Clear order** — what happens first, next, next.
- **Defined words** — names mean something specific.
- **No hand-waving** — “handle the user stuff” is not an instruction.
- **Finite** — it should finish (or intentionally wait — servers do that later, with a reason).

### Programs transform inputs to outputs (often)

Many programs:

**inputs** → **processing** → **outputs**

Example: inputs `3` and `5` → processing “add” → output `8`.

Web backends later: input = an HTTP request; output = an HTTP response. Same shape, bigger costume.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Program | Runnable instructions for a task | Not the same as “project” always |
| Instruction | One step the machine should perform | Not a tutorial step for you |
| Algorithm | Process to solve a problem | Can exist without a computer |
| Programming language | Rule-based language for programs | Not the same as the runtime |
| Syntax | Rules for valid code text | Not the same as “good design” |
| Run / execute | Make the computer carry out the program | Not “open the file in Word” |
| Trace | Step through by hand, tracking state | Not “search online” |
| Runtime | Tool/environment that executes code | Node is a runtime for JS (later) |

## Worked example — trace on paper

```text
SET a TO 10
SET b TO 3
SET c TO a - b
SHOW c
```

Trace table:

| After step | a | b | c | Shown |
|------------|---|---|---|--------|
| start | ? | ? | ? | |
| SET a | 10 | ? | ? | |
| SET b | 10 | 3 | ? | |
| SET c | 10 | 3 | 7 | |
| SHOW c | 10 | 3 | 7 | 7 |

If you can fill tables like this, you are programming — even before real syntax.

## Common errors

### Error: Treating a saved file as “already a running program”

**Reality:** Saving creates storage. **Running** makes the computer obey.

### Error: Assuming the computer will fill gaps

**Reality:** “Print the total” without saying total of *what* is incomplete. Humans guess. Computers do not.

### Error: Confusing HTML with a general program

**Reality:** HTML mainly **describes structure** of a page. It is not the same as general-purpose programming you will do in JavaScript. Prior HTML help is fine; it is not the whole skill.

## Checkpoints

1. Define *program* in one sentence.
2. How does an algorithm differ from a program?
3. What does it mean to *trace* code?
4. Why are programming languages strict?

## Practice

### P1 — Sort the pile

Label each as program-ish, document, data, or algorithm-on-paper:

- A PDF of a novel  
- “To swap two cups: pour A into spare, pour B into A, pour spare into B”  
- The number `42`  
- A JavaScript file that calculates tax when run  

### P2 — Write an algorithm

On paper, write numbered steps to decide whether a number is even. Do not write real JS. Be precise.

### P3 — Trace

```text
SET x TO 2
SET x TO x + 1
SET y TO x * 4
SHOW y
```

Make a trace table. What is shown?

### P4 — Broken instructions

Why is this a bad program-like list for a machine?

```text
Do the login thing.
Make it nice.
Finish.
```

Rewrite it as clearer human steps for “check password length is at least 8” (still on paper).

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Real JavaScript syntax rules (next units)
- Installing Node
- Files on disk details beyond “code is text”

## Next unit

**U03 — Values, expressions, and statements**
