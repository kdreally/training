# U18 Assignment — Ports

Submit the following to your trainer in **one folder or zip** named:

`U18-YourName` (use your real name or student id as they prefer)

## Files to submit

### 1. `answers.md`

Answer these prompts in your own words. Short paragraphs and bullet lists are both fine. Do not paste the lesson back unchanged.

1. **Port vs IP.** In 4–6 lines, explain what a port identifies and what an IP address identifies, and why you need both to reach a program.
2. **The colon.** In `-p 6000:80`, say which number is on your computer and which is inside the container. Then explain what a browser request to `http://localhost:6000` does with that mapping.
3. **Why unreachable.** A teammate starts a web server in a container with no `-p` and cannot open it. In 4–6 lines, explain why, using the words *isolated* and *publish*.
4. **Predict, then check.** Without running it, predict the exact output of:

   ```bash
   docker run -d --name check -p 5500:80 nginx
   docker port check
   ```

   Write your prediction first, then run both commands and paste the real output below it. If your prediction was wrong, write one sentence explaining what you missed.
5. **Decode a failure.** A learner runs a second container with `-p 8080:80` while another container already uses host port 8080. Quote one plausible error message and explain, in your own words, what the message means and how you would fix it.
6. **Still fuzzy.** Name one part of this unit that still feels unclear. Write the exact question you would ask your trainer.

### 2. `transcript.md`

Paste the exact commands and output for this experiment, in order, in one code block:

1. Start `nginx` named `web` **without** `-p`.
2. Run `docker port web` (expect empty).
3. Remove it.
4. Start it again with `-p 7000:80`.
5. Run `docker port web`.
6. Reach it: `curl.exe http://localhost:7000` (Windows) or `curl http://localhost:7000` (macOS/Linux). A short excerpt of the HTML is enough; make clear it is not an error.

Your real output, not a retyped ideal version.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the whole U18 README, not only the assignment.
- [ ] I can say which side of `-p host:container` is the host port.
- [ ] I saw a container be unreachable before publishing, and reachable after.
- [ ] I ran `docker port` and read its output.
- [ ] I triggered or explained a port conflict.
- [ ] I read the U18 rubric before writing answers.md.
```

## Definition of done

- All three files are present with the exact names above.
- `answers.md` answers all six prompts in your own words.
- `transcript.md` shows the before (empty `docker port`) and after (published mapping + reachable server) states.
- The Q4 prediction is written *before* the real output, and any mismatch is explained.
- The checklist is completed honestly (do not tick an item you did not do).
