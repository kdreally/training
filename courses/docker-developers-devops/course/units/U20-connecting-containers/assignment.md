# U20 Assignment — Connecting containers to each other

Submit the following to your trainer in **one folder or zip** named:

`U20-YourName` (use your real name or student id as they prefer)

## Files to submit

### 1. `answers.md`

Answer these prompts in your own words. Short paragraphs and bullet lists are both fine. Do not paste the lesson back unchanged.

1. **Why user-defined networks.** In 4–6 lines, explain the key difference between the default `bridge` network and a network you create yourself. Say what the upgrade is, and why it matters for a two-service app.
2. **Names vs localhost.** A database container is named `db`. An app container is on the same user-defined network. Write the host and port the app should use to reach the database, and explain in 4–6 lines why `localhost:5432` fails.
3. **DNS in plain words.** In 3–5 lines, explain what Docker's embedded DNS does and why it means you do not need to know the database's IP address.
4. **Predict, then check.** Two containers, `api` and `cache`, are on a user-defined network `appnet`. Without running it, predict the result of:

   ```bash
   docker run --rm alpine ping -c 1 cache
   ```

   Write your prediction first. Then create `appnet`, start `api` and `cache` on it, and run the command exactly as written. Paste the real output. If your prediction was wrong, explain what you missed (look carefully at which network the client container is on).
5. **Decode a failure.** A learner creates `appnet`, starts `db` on it, then starts the app with `--network appnet` but reaches it at `localhost`. The app logs `Connection refused`. Quote the likely line and explain, in your own words, the mistake and the fix.
6. **Attaching later.** In 3–4 lines, explain when you would use `docker network connect` instead of `--network`, and what you would use to undo it.
7. **Still fuzzy.** Name one part of this unit that still feels unclear. Write the exact question you would ask your trainer.

### 2. `transcript.md`

Paste the exact commands and output for this experiment, in order, in one code block:

1. Create a network named `appnet`.
2. Start `nginx` named `web` on `appnet`.
3. Reach `web` **by name** from a throwaway `alpine` container on `appnet` (show the HTML or a clear success line).
4. Show the `localhost` failure from another `appnet` container.
5. Start `postgres:16-alpine` named `db` on `appnet` with a named volume and the `POSTGRES_PASSWORD` variable, then confirm the name `db` resolves with a ping from another `appnet` container.
6. Attach a container that was started **without** `--network` using `docker network connect`, and prove its name resolves afterwards.

Your real output, not a retyped ideal version. Keep the HTML excerpt short.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the whole U20 README, not only the assignment.
- [ ] I created a user-defined network with `docker network create`.
- [ ] I reached one container from another by name.
- [ ] I demonstrated that `localhost` still fails between containers.
- [ ] I ran app and database containers on the same network.
- [ ] I attached an already-running container with `docker network connect`.
- [ ] I read the U20 rubric before writing answers.md.
```

## Definition of done

- All three files are present with the exact names above.
- `answers.md` answers all seven prompts in your own words.
- `transcript.md` shows by-name success, the `localhost` failure, the database reachability check, and the `docker network connect` step.
- The Q4 prediction is written *before* the real output, and any mismatch is explained.
- The checklist is completed honestly (do not tick an item you did not do).
