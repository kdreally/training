# U19 Assignment — Container networking basics

Submit the following to your trainer in **one folder or zip** named:

`U19-YourName` (use your real name or student id as they prefer)

## Files to submit

### 1. `answers.md`

Answer these prompts in your own words. Short paragraphs and bullet lists are both fine. Do not paste the lesson back unchanged.

1. **Default networks.** List the three default networks from `docker network ls` and give one sentence on each. Then explain in two sentences what the `bridge` network is.
2. **By IP vs by name.** Can two containers on the default `bridge` network reach each other by IP? By name? Answer both clearly and explain why.
3. **The localhost trap.** In 4–6 lines, explain what `localhost` means inside a container, and why an app container cannot reach a database container at `localhost`. Use the word *namespace* correctly.
4. **Predict, then check.** Two containers `a` and `b` run on the default bridge. Without running it, predict the result of this command:

   ```bash
   docker run --rm alpine ping -c 1 b
   ```

   Write your prediction first, then set up the two containers and run the command. Paste the real output below your prediction. If your prediction was wrong, explain what you missed.
5. **Find an address.** Write the exact command that prints a container's IP address. Then run it on one of your containers and paste the result.
6. **Why names matter.** In 3–5 lines, explain why hard-coding a container's IP address is fragile, and what better approach U20 will introduce.
7. **Still fuzzy.** Name one part of this unit that still feels unclear. Write the exact question you would ask your trainer.

### 2. `transcript.md`

Paste the exact commands and output for this experiment, in order, in one code block:

1. Start `site1` and `site2` (both `nginx`) on the default bridge.
2. Find `site1`'s IP with `docker inspect`.
3. Reach `site1` **by IP** from a throwaway alpine container.
4. Try to reach `site2` **by name** and show the failure.
5. Run `curl.exe http://localhost` (or `curl http://localhost`) from a throwaway alpine container and show the failure.

Your real output, not a retyped ideal version. Keep the HTML excerpt short.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the whole U19 README, not only the assignment.
- [ ] I ran `docker network ls` and can name the default networks.
- [ ] I found a container's IP address with `docker inspect`.
- [ ] I reached one container from another by IP.
- [ ] I saw a name lookup fail on the default bridge.
- [ ] I explained why `localhost` differs inside a container.
- [ ] I read the U19 rubric before writing answers.md.
```

## Definition of done

- All three files are present with the exact names above.
- `answers.md` answers all seven prompts in your own words.
- `transcript.md` shows a real by-IP success and both expected failures (name lookup, `localhost`).
- The Q4 prediction is written *before* the real output, and any mismatch is explained.
- The checklist is completed honestly (do not tick an item you did not do).
