# U21 Assignment — Why Compose exists

Submit the following to your trainer in **one folder or zip** named:

`U21-YourName`

## Files to submit

### 1. `answers.md`

Answer these prompts in your own words. Short paragraphs and honest lists are both fine. Do not paste this lesson back unchanged.

1. **The pain.** In your own words, describe the problem of starting a two-container app with separate `docker run` commands. Name at least three specific pains (for example: repetition, ordering, memory, terminals).
2. **Declarative in plain language.** Explain "declarative" to a friend who has never written a Compose file. Use one analogy from daily life (a recipe card, a packing list, a set of instructions, etc.) and say why it fits.
3. **What Compose is not.** State two things Compose is *not*. For each, one sentence of reasoning.
4. **Files and commands.** In a few lines, explain the difference between `compose.yaml` and `docker-compose.yml`, and between `docker compose` and `docker-compose`.
5. **Before and after.** Imagine a tiny app: one web service and one database. Write the two `docker run` commands you would use (approximate is fine), then describe in two or three sentences what a single Compose file would save you.
6. **Explain in your own words.** Finish this sentence and justify it in 2–3 lines: "A Compose file is *declarative*, which means …"

### 2. `version-output.txt`

Paste the exact output of running:

```text
docker compose version
```

If the command failed, paste the exact error message and write two sentences explaining what you tried (for example, starting Docker Desktop). A decoded failure is acceptable evidence if you explain it.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the U21 README fully (not only the assignment).
- [ ] I can explain imperative vs declarative in my own words.
- [ ] I know Compose does not replace my Dockerfile.
- [ ] I know `docker compose` (v2) is the command this course uses.
- [ ] I read the U21 rubric before writing answers.md.
```

## Definition of done

- All three files present with the names above.
- `answers.md` is in your own words, with at least one original analogy in Q2.
- `version-output.txt` contains real output or a decoded error, not a guess.
- Checklist completed honestly.

## Submission format

One folder or zip named `U21-YourName`, containing `answers.md`, `version-output.txt`, and `checklist.md` at the top level. If your trainer asked for a different channel, follow their instruction and keep the same file names.
