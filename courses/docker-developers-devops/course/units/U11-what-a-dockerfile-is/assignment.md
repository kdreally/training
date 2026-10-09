# U11 Assignment — Describe and build your first image

Submit the following to your trainer in **one folder or zip** named:

`U11-YourName`

## Files to submit

### 1. `answers.md`

Answer in your own words. Short paragraphs or bullet lists are fine. Do not paste this assignment back unchanged.

1. **Definition.** In 3–5 sentences, explain what a Dockerfile is to someone who has never seen one. Include the words *instruction* and *build*.
2. **Not this.** Name three things a Dockerfile is *not*, and give one sentence of reasoning for each.
3. **Build context.** In 2–4 sentences, explain what the build context is and why it is more than just the Dockerfile.
4. **Command parts.** Break `docker build -t hello-docker .` into its three parts. Explain what each part does.
5. **Predict then run.** Look at this Dockerfile and write your prediction *before* you build it:

   ```dockerfile
   FROM alpine
   CMD ["echo", "assignment says hi"]
   ```

   Predict the exact output of `docker run --rm assign11`. Then build it as `docker build -t assign11 .`, run it, and paste the real output under a heading "What actually happened." If the two differ, explain why.
6. **Read an error on purpose.** Run the build from a folder that has no Dockerfile (or rename the file first). Paste the error text and decode it in one or two sentences.

### 2. `answers.md` includes your terminal evidence

Under a heading "Terminal evidence," paste the build output and the run output for question 5. Exact copy is fine; screenshots are also acceptable if your trainer allows them.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I read the U11 README fully (not only the assignment).
- [ ] I can explain what the build context is.
- [ ] I ran `docker build -t` successfully at least once.
- [ ] I ran the image and saw its output.
- [ ] I read the U11 rubric before writing answers.md.
```

## Definition of done

- `answers.md` and `checklist.md` are present with those exact names.
- Every answer is in your own words.
- Question 5 shows both a prediction and real terminal output.
- The checklist is completed honestly.

## Submission format recap

```text
U11-YourName/
  answers.md
  checklist.md
```
