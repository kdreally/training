# U14 Assignment — Name, version, and clean up images

Submit the following to your trainer in **one folder or zip** named:

`U14-YourName`

## Files to submit

### 1. `answers.md`

Answer in your own words.

1. **Reference anatomy.** Explain the parts of `team-api:1.4.2`. Which part is optional, and what value does it default to?
2. **The trouble with `latest`.** Give three concrete problems with relying on `latest`, and for each one a one-line example or scenario.
3. **Pinning.** Explain the difference between `hello-flask:1.4.2`, `hello-flask:1.4`, and `hello-flask:latest`. Which would you use to deploy, and why?
4. **Naming rules.** List three naming rules or conventions for image names and tags.
5. **Tag vs build.** Explain the difference between `docker build -t` and `docker tag`.
6. **Removal.** Describe what happens when you remove one of several tags on the same image, and what happens when you remove a tag used by a container.

### 2. `evidence.md`

Paste evidence of the following, in order:
- A build with two tags (show the command and the final build line).
- `docker images` output showing at least three rows, where at least two share the same IMAGE ID.
- The result of removing one tag.
- The result of attempting to remove an image that a container is using (the conflict error), and the fix.

### 3. `checklist.md`

Copy and mark `[x]` when true:

```markdown
- [ ] I read the U14 README fully (not only the assignment).
- [ ] I built an image with at least two tags.
- [ ] I can explain why `latest` is not a version.
- [ ] I removed a tag and saw the image survive because another tag remained.
- [ ] I read the U14 rubric before writing answers.md.
```

## Definition of done

- `answers.md`, `evidence.md`, and `checklist.md` are present with those names.
- Evidence includes the "image in use" conflict and how you resolved it.
- Every answer is in your own words.

## Submission format recap

```text
U14-YourName/
  answers.md
  evidence.md
  checklist.md
```
