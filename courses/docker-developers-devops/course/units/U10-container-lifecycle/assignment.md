# U10 Assignment — Container lifecycle

Submit: `U10-YourName`

## Files to submit

### 1. `lifecycle.md`

1. **States.** Define created/running/exited with examples from your runs.
2. **Actions.** Explain `docker stop`, `docker start`, `docker logs`, `docker exec`, `docker rm` and when to use each.
3. **Detached vs foreground.** What does `-d` do? When prefer detached?
4. **Proof.** Show lifecycle: run detached nginx with name → logs → exec (e.g. `echo hi`) → stop → start → stop → rm. Include key outputs/state observations.
5. **Name conflict fix.** If you get "name already in use", explain exact steps to fix safely.
6. **Explain in your own words.** Difference between `docker exec` and `docker run`.

### 2. `checklist.md`

```markdown
- [ ] I did full lifecycle round trip.
- [ ] I can explain states and actions.
- [ ] I know stop != rm.
- [ ] I read rubric.
```

## Definition of done

- Both files present.
- Answers in own words.
- Proof from runs or clearly labeled.