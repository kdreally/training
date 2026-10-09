# U31 Assignment — Your first "service" note

Submit the following to your trainer in **one folder or zip** named:

`U31-YourName`

## Files to submit

### 1. `answers.md`

Answer these prompts in your own words. Short paragraphs or bullet lists are fine. Do not paste the lesson text back unchanged.

1. **Deploy.** In 4–7 lines, explain what "deploy" means for a container. Use the words *host*, *runtime*, and *service* at least once each, correctly.
2. **The three ingredients.** Name the three things a running service needs. For each, say what could go wrong if it were missing.
3. **Restart policy choice.** For each policy below, give one realistic situation where it is the right choice and one sentence of justification:
   - `no`
   - `on-failure:3`
   - `unless-stopped`
4. **Prediction.** You start a container with `--restart unless-stopped`, then run `docker stop <name>`. Later the host reboots. Predict what `docker ps -a` shows after the reboot, and explain why.
5. **Bug hunt.** A teammate says: "It restarts on its own, so the service must be healthy." Write 3–5 lines explaining why this is wrong, and what they should check instead.
6. **Reflection.** Name one thing about deployment that confused you before this unit and is now clear. Name one thing still fuzzy.

### 2. `evidence.txt`

Paste the actual terminal transcript of the following, in order, with the command and its visible output:

1. Start a service with a restart policy (any image and port you like; local only).
2. `docker ps` showing it `Up`.
3. Deliberately kill its main process.
4. `docker ps` showing it `Up` again with a small uptime.
5. `docker inspect -f "{{.RestartCount}}" <name>` showing a number greater than `0`.
6. `docker stop` and `docker rm`.

Label each step with a short comment line so the trainer can follow it.

### 3. `deploy-note.md`

Write a short deployment note (half a page) for this service, as if handing it to a colleague. It must state:

- What the image is and where it came from (local build or a registry, U26).
- The exact command you used to run it, with every flag explained in one short phrase.
- The restart policy and the reason you chose it.
- Which machine is the **host** in your case, and one honest limitation of using that host.

## Definition of done

- Three files present with the names above.
- `evidence.txt` shows a real restart count greater than `0`.
- Every flag in your run command is explained somewhere.
- Answers are in your own words, not copy-pasted.
