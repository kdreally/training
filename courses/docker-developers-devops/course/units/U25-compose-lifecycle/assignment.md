# U25 Assignment — Compose lifecycle

Submit the following to your trainer in **one folder or zip** named:

`U25-YourName`

## What to build and observe

Use your two-service project from U23/U24. You will run it in the background, inspect it, rebuild it, and clean up deliberately. Put your project files in a subfolder named `project/`.

## Files to submit

### 1. `project/compose.yaml`, `project/.env`, `project/app.py`, `project/Dockerfile`

Your project, carried over. When you edit `app.py` for Part B, submit the edited version.

### 2. `evidence.txt`

Paste exactly what you did and saw, in this order. Label each part.

**Part A — background start and inspection**

- The command that started the project detached, and the creation/start lines.
- The output of `docker compose ps`.
- The output of `docker compose logs db` (or a few key lines showing startup).

**Part B — rebuild vs restart**

- The change you made to `app.py`.
- The command and result after `docker compose restart` (did the page change?).
- The command and result after `docker compose up -d --build` (did the page change now?).

**Part C — inside the database**

- The `docker compose exec db psql ...` command and the `\dt` output.
- The command you used to quit.

**Part D — cleanup**

- The output of `docker compose down`.
- A one-line statement of whether the database volume still existed after `down`.

Do not run `down -v` on data you need. If you do run it to observe the effect, say so and one line about what happened.

### 3. `answers.md`

1. **Restart vs rebuild.** In your own words, explain the difference between `docker compose restart` and `docker compose up -d --build`. Give one change that needs each.
2. **`ps` and `logs`.** What does each command show that the other does not? One or two sentences each.
3. **`exec`.** Why does `docker compose exec db psql ...` work even though the database port is not published? Reference the project network.
4. **`down` vs `down -v`.** State exactly what each removes. Which one keeps your database data?
5. **Stale volume.** You change `POSTGRES_PASSWORD` in `.env` and restart, but the old password still works. Explain why, and give two different fixes depending on whether the data matters.
6. **Fix a broken config.** This file fails. Explain the error and give the corrected key.

   ```yaml
   services:
     web:
       build: .
       port:
         - "8080:8000"
   ```

7. **Predict then run.** You run `docker compose down` (without `-v`) and then `docker compose up -d`. Will the data you inserted into the database still be there? Predict, then run it if you can and report the result.

### 4. `checklist.md`

Copy and complete:

```markdown
- [ ] I read the U25 README fully (not only the assignment).
- [ ] I started the project detached with `docker compose up -d`.
- [ ] I read logs for at least one service.
- [ ] I opened the database with `docker compose exec`.
- [ ] I saw the difference between restart and `up -d --build`.
- [ ] I understand what `down -v` destroys.
- [ ] I read the U25 rubric before writing answers.md.
```

## Definition of done

- `project/` contains the project files, named as in U23/U24.
- `evidence.txt` has all four labeled parts with real output.
- `answers.md` is in your own words; Q5 and Q6 are answered concretely.
- `checklist.md` completed honestly.

## Submission format

One folder or zip named `U25-YourName` containing `project/`, `evidence.txt`, `answers.md`, and `checklist.md`, with names exactly as written.
