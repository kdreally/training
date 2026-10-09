# U06 Assignment — Installing Docker safely

Submit the following to your trainer in **one folder or zip** named:

`U06-YourName` (use your real name or student id as they prefer)

## Files to submit

### 1. `install-notes.md`

Answer these prompts in your own words.

1. **Choice.** Which did you use (Docker Desktop or Docker Engine)? Why did you choose that for your OS? (2–4 lines)
2. **Pre-check.** What did you check before installing (virtualization, OS version, etc.)? If nothing was needed, explain why.
3. **Proof.** Paste (or type exactly) the output of `docker --version` (first line is enough). Paste the line containing `Hello from Docker!` from `docker run hello-world`.
4. **Daemon.** Explain the Docker daemon in your own words. Why does it matter when a command fails?
5. **Failure decode.** Describe one actual error you hit during install (or a realistic one you prevented). Explain: what it meant, and what fixed/prevented it. If you hit nothing, describe **one common install failure** for your OS and how you would fix it.
6. **Explain in your own words.** Why do we run `docker run hello-world` after `docker --version` (not just version alone)?

### 2. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read U06 README fully.
- [ ] I can explain Docker Desktop vs Docker Engine in my own words.
- [ ] I ran `docker --version` and saw a version string.
- [ ] I ran `docker run hello-world` and saw "Hello from Docker!".
- [ ] I can say what the Docker daemon is.
- [ ] I read the U06 rubric before submitting.
```

## Definition of done

- Both files present.
- Answers are in your own words (no verbatim copy of large blocks).
- Checklist completed honestly.
- Proof lines match your actual terminal output (or clearly labeled if environment prevented run).