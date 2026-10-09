# U07 Assignment — Your first container

Submit in folder/zip named: `U07-YourName`

## Files to submit

### 1. `first-container.md`

1. **Steps.** Explain `docker run hello-world` in your own words: what happens at pull/create/start? (3–5 lines)
2. **Flags.** What do `-i`, `-t`, and `--name` each do? Give one reason to use each.
3. **Proof.** Paste key lines from `hello-world` run (at least the "Hello from Docker!" line). Then show: (a) the prompt you saw when inside Ubuntu, (b) output of one command you ran inside (`cat /etc/os-release | head -n 1` or `pwd`), (c) that you exited back to host.
4. **Host vs container.** In your own words: when inside the container, are you changing your host files? Why or why not (by default)?
5. **Name conflict.** What does "container name ... is already in use" mean? How would you fix it (conceptually) without guessing? (Refer to U10 idea if desired.)
6. **Explain in your own words.** Why does `docker run` sometimes pull an image first?

### 2. `checklist.md`

```markdown
- [ ] I ran `docker run hello-world` and observed output.
- [ ] I ran `docker run -it --name myfirst-ubuntu ubuntu`, executed a command inside, then `exit`.
- [ ] I can explain pull/create/start.
- [ ] I can explain `-i`, `-t`, `--name`.
- [ ] I read U07 rubric.
```

## Definition of done

- Both files present.
- Answers in your own words.
- Proof from your actual runs (or clearly labeled if blocked).
- Checklist honest.