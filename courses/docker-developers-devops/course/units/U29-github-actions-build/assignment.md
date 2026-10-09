# U29 Assignment — A minimal GitHub Actions build

Submit everything in **one folder or zip** named:

`U29-YourName`

## Files to submit

### 1. `workflow.yml`

Your finished workflow file. It must:

- Live at `.github/workflows/build.yml` in your repository (so tell your trainer the repo URL and that path).
- Trigger on a push to `main`.
- Check out the code.
- Build your image with `docker build`.
- (Optional, for extra credit) log in and push to Docker Hub using secrets.

If you cannot publish to GitHub, submit the file and complete `answers.md` — your trainer will assess the file and your reasoning.

### 2. `evidence.md`

1. Paste the **URL** of one successful Actions run (or, if offline, describe what you saw step by step).
2. For each step in the run, write one line: step name → green or red.
3. Paste the single log line that proved the image was built.
4. If you did the push half, paste your image's name as it appears on Docker Hub (no token, ever).

**Important:** never paste a secret or token value into your submission. If GitHub shows `***`, that is correct — leave it as `***`.

### 3. `answers.md`

Answer in your own words.

1. **Anatomy.** Define workflow, job, and step, and give one example of each from your own file.
2. **Location matters.** Where exactly must a workflow file live, and what happens if it is elsewhere?
3. **uses vs run.** Explain the difference between a step that uses `uses:` and one that uses `run:`, using two steps from your file as examples.
4. **Refresh the build.** Why is `actions/checkout@v4` almost always the first step? What would your build do without it?
5. **Secrets.** Why do we write `${{ secrets.DOCKERHUB_TOKEN }}` instead of the token itself? What does GitHub print for the secret in the log, and why is that safe?
6. **Predict then explain.** Priya adds the push step but forgets to create the `DOCKERHUB_TOKEN` secret. Predict the failure, name the exact error text you would expect, and describe the fix.
7. **Debug this.** A workflow never appears in the Actions tab. Give the first two things you would check and why.

### 4. `checklist.md`

```markdown
- [ ] My workflow file is at .github/workflows/ (not somewhere else).
- [ ] My workflow ran at least once and I opened the log.
- [ ] I never committed a secret value into any file.
- [ ] I read the U29 README fully.
- [ ] I read the U29 rubric before writing answers.md.
```

## Definition of done

- `workflow.yml`, `evidence.md`, `answers.md`, and `checklist.md` present with the names above.
- The workflow is valid YAML and correctly located.
- No secret values anywhere in the submission.
- Answers are in your own words.

## Definition of *not* done

- A workflow file at the repository root instead of `.github/workflows/`.
- Any token or password pasted into the submission.
- Copying the README's YAML with no explanation in `answers.md`.
