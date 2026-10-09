# U26 Assignment — Registries

Submit everything in **one folder or zip** named:

`U26-YourName`

## Files to submit

### 1. `answers.md`

Answer in your own words. Short paragraphs or bullets are fine. Do not paste the lesson back unchanged.

1. **The problem.** In 4–6 lines, explain why an image that only exists on your laptop causes trouble for a team. Name at least two consequences.
2. **Definitions.** Define each in one sentence: registry, repository, namespace, tag.
3. **Name decoding.** For `ghcr.io/acme/shopping-list:1.2`, state the registry, namespace, repository, and tag. Then write what `nginx:1.27` expands to in full.
4. **Registries compared.** Name Docker Hub and two other registries. For each, write one sentence on when a team would choose it.
5. **Login, explained.** In your own words, what does `docker login` actually prove, and why is an access token used instead of an account password? Why is login unnecessary for pulling public images?
6. **Predict then explain.** Read this name: `docker.io/team-alpha/inventory`. A teammate says "that is a registry." Correct them in two sentences.

### 2. `registry-map.md`

Make a small table with columns **Name | Registry | Namespace | Repository | Tag | Local or remote?** and fill it for these five names:

```text
ubuntu:24.04
student-demo/shopping-list:1.0
ghcr.io/team-alpha/inventory:2.4
postgres:16
docker.io/library/nginx:1.27
```

For "Local or remote?" write whether the name *could* address a registry (remote) or only ever a local image. One word or short phrase per cell is fine.

### 3. `checklist.md`

Copy and mark `[x]` when true:

```markdown
- [ ] I read the U26 README fully (not only the assignment).
- [ ] I can name the four parts of an image name.
- [ ] I can explain why a registry exists.
- [ ] I understand login is for pushing, not for pulling public images.
- [ ] I read the U26 rubric before writing answers.md.
```

## Definition of done

- All three files present with the names above.
- Answers are in your own words.
- The registry map is complete and readable.
- Checklist completed honestly.

## Definition of *not* done

- Filling `registry-map.md` by pasting a search engine answer without being able to explain it.
- Saying "Docker Hub" for every registry column.
