# U03 Assignment — A terminal transcript

Submit the following to your trainer in **one folder or zip** named:

`U03-YourName` (use your real name or student id as they prefer)

## Files to submit

### 1. `terminal-transcript.md`

Open your terminal and perform the tasks below. Copy the **actual output** you see and paste it into this file under each task. Your paths and file names will differ from any example — that is expected and correct. Do not invent output. If a command fails, keep the failure and add one sentence explaining what you did about it.

```text
Task 1  Show your current folder.
Task 2  List the files and folders there.
Task 3  Create a folder named exactly  terminal-practice  in your current folder.
        (Hint: the command is  mkdir terminal-practice )
Task 4  Move into  terminal-practice.
Task 5  Show your current folder again, so the transcript proves you moved.
Task 6  Print the text  docker starts here  using the echo command.
Task 7  Move back up to the folder you started in.
```

For each task, include the command you typed **and** the output, in a fenced block, like this:

```text
$ echo hello
hello
```

(On Windows PowerShell the command may still be `echo`; use `dir` instead of `ls` if you are in Command Prompt.)

### 2. `answers.md`

Answer in your own words. Do not paste the lesson back unchanged.

1. **Terminal vs shell.** What is the difference, in two or three sentences?
2. **The prompt.** Why do you not type the prompt yourself?
3. **Paths.** Explain the difference between an absolute path and a relative path, using a real example from your own transcript.
4. **`cd ..`.** What exactly does the `..` mean, and what happens if you run `cd ..` when you are already at the top of your filesystem?
5. **Explain in your own words.** Describe what `pwd`, `ls`/`dir`, and `cd` each do, as if to a friend who has never seen a terminal.
6. **Reading an error.** Paste one error you saw (or one from the lesson) and decode it: what did the shell look for, and why did it fail?

### 3. `broken-commands.md`

Each command below is wrong. For each, write the corrected command and a one-line reason.

```text
cd My Downloads
pwd Documents
cd ..Desktop
ls -1  (run in old Command Prompt)
```

### 4. `checklist.md`

```markdown
- [ ] I read the whole U03 README, not only the assignment.
- [ ] I ran every task myself and pasted real output.
- [ ] I can explain pwd, ls/dir, and cd without notes.
- [ ] I know the difference between Command Prompt and PowerShell.
- [ ] I read the U03 rubric before writing answers.md.
```

## Definition of done

- All four files present with the exact names above.
- The transcript is real output from your own machine, not copied from the lesson.
- `answers.md` covers all six prompts in your own words.
- `broken-commands.md` fixes all four broken commands with reasons.
- The checklist is completed honestly.
