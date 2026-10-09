# U17 Assignment — Volumes

Submit the following to your trainer in **one folder or zip** named:

`U17-YourName` (use your real name or student id as they prefer)

## Files to submit

### 1. `answers.md`

Answer these prompts in your own words. Short paragraphs and bullet lists are both fine. Do not paste the lesson back unchanged.

1. **Why data disappears.** In 4–6 lines, explain why a file written inside a container is gone after you remove the container. Use the phrase *writable layer* correctly at least once.
2. **Two kinds of storage.** Explain the difference between a **named volume** and a **bind mount**. Then state one situation where you would choose each, and why.
3. **Predict, then check.** Read this sequence without running it:

   ```bash
   docker volume create demo
   docker run --rm -v demo:/data alpine sh -c "echo hello > /data/hello.txt"
   docker run --rm -v demo:/data alpine cat /data/hello.txt
   ```

   Write what the third command prints. Then run the three commands yourself and paste the real third-command output under your prediction. If your prediction was wrong, write one sentence explaining what you missed.
4. **Decode a failure.** A learner runs the two commands below and the second one fails:

   ```bash
   docker volume create logs
   docker run --rm -v logs:/var/log alpine sh -c "echo test > /var/log/app.txt"
   ```

   Give **one** plausible decoded error message and explain, in your own words, what you would check first. (Hint: it may be a permissions problem or a name problem — pick one and justify it.)
5. **Database use case.** A teammate runs a database container **without** a volume, stores data, then removes and recreates the container. In 4–6 lines, explain what happens to the data, and how adding a named volume at the database's data folder changes the outcome. You do not need to run a database for this answer.
6. **Still fuzzy.** Name one part of this unit that still feels unclear. Write the exact question you would ask your trainer.

### 2. `transcript.md`

Paste the exact commands you ran for **Practice P5** (the fixed command that proves data survives removal) and their output, in order. Include the `docker rm` step and the final read-back step. Use a code block. Your actual output, not a retyped ideal version.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the whole U17 README, not only the assignment.
- [ ] I can explain what a writable layer is.
- [ ] I can say when to use a named volume and when to use a bind mount.
- [ ] I created a named volume and proved data survived removing the container.
- [ ] I ran `docker volume ls` and `docker volume inspect`.
- [ ] I read the U17 rubric before writing answers.md.
```

## Definition of done

- All three files are present with the exact names above.
- `answers.md` answers all six prompts in your own words.
- `transcript.md` shows a real command transcript where data survives a container removal.
- The prediction in Q3 is written *before* the real output, and any mismatch is explained.
- The checklist is completed honestly (do not tick an item you did not do).
