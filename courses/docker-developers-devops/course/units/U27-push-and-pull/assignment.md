# U27 Assignment — Pushing and pulling images

Submit everything in **one folder or zip** named:

`U27-YourName`

## Files to submit

### 1. `evidence.md`

Document one complete round trip: build → tag → push → pull → run. Use the `shopping-list` app from the README, or your own tiny app (a one-line program is fine).

Copy the table and fill it in. Paste the **real** output lines you saw.

| Step | Command you ran | The one output line that proves success |
|------|-----------------|------------------------------------------|
| Build |  |  |
| Tag |  |  |
| Push |  |  |
| Remove local names |  |  |
| Pull |  |  |
| Run |  |  |

Then add a short paragraph: what did the `digest: sha256:...` line tell you?

### 2. `answers.md`

Answer in your own words.

1. **Two names, one image.** Explain why `docker image ls` can show the same IMAGE ID under two different repository names after `docker tag`.
2. **denied vs unauthorized.** A teammate pushed and got `denied: requested access to the resource is denied`. You got `unauthorized: authentication required`. Explain what is different about these two situations.
3. **Speed.** Explain why the second push of a nearly identical image is usually much faster than the first. Use the word *layer* correctly.
4. **Slimming.** Name three concrete ways to reduce image size before pushing and say what each one removes.
5. **Predict then explain.** During the practice exercise you pushed a second tag `1.1` from the same Dockerfile. Predict which layers the registry reported as `Pushed` and which as `Layer already exists`, then explain the pattern.
6. **Fix this.** This command failed. Correct it and explain the failure:

   ```bash
   docker pull Sam-Demo/shopping-list:1.0
   ```

   (Assume it should be public. If your reasoning depends on whether it is public or private, say so.)

### 3. `checklist.md`

```markdown
- [ ] I ran a real push to Docker Hub (or my trainer approved an alternative registry).
- [ ] I ran a real pull and run of the pushed image.
- [ ] I read the U27 README fully.
- [ ] I can tell `denied` from `unauthorized`.
- [ ] I read the U27 rubric before writing answers.md.
```

## Definition of done

- `evidence.md`, `answers.md`, and `checklist.md` present with the names above.
- Evidence table contains real output, not invented text.
- Answers are in your own words.

## If you cannot reach a registry

If a firewall blocks Docker Hub, tell your trainer and agree on an alternative before doing the assignment. Do not fake the evidence — say what you tried and what the error was.
