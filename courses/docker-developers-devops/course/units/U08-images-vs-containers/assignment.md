# U08 Assignment — Images vs containers

Submit: `U08-YourName`

## Files to submit

### 1. `images-vs-containers.md`

1. **Distinction.** Explain image vs container using your own analogy (or recipe/cake) with precision.
2. **Read-only + writable layer.** Why can you change files inside a container but the image stays same?
3. **Proof.** Paste output of `docker images` (or relevant lines). Paste output of `docker ps` and `docker ps -a` (relevant lines). Label each.
4. **States.** From your `ps -a` output, pick one container: state (running/exited/created) and which image it came from.
5. **One→many.** If you have one `ubuntu` image, how many containers can you create from it? Explain.
6. **Explain in your own words.** Why does `docker ps` not show stopped containers?

### 2. `checklist.md`

```markdown
- [ ] I ran `docker images`, `docker ps`, `docker ps -a`.
- [ ] I can explain image vs container clearly.
- [ ] I know why changes don't persist in image.
- [ ] I read rubric.
```

## Definition of done

- Both files present.
- Answers in own words.
- Proof from actual runs or clearly labeled.