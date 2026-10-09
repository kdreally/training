# U24 Assignment — Environment variables and .env files

Submit the following to your trainer in **one folder or zip** named:

`U24-YourName`

## What to build

Take your two-service project from U23 and move all configurable values into a `.env` file, with a committed `.env.example` and a `.gitignore` that ignores `.env`. Put your project in a subfolder named `project/`.

## Files to submit

### 1. `project/.env`

Must define at least: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and `WEB_HOST_PORT`. Use your own values. This file is **not** secret from your trainer (they need to grade it), but imagine it is.

### 2. `project/.env.example`

The same keys with empty or placeholder values — the file a teammate would commit and copy.

### 3. `project/.gitignore`

Must ignore `.env` while allowing `.env.example`.

### 4. `project/compose.yaml`

A two-service Compose file where:

- every configurable value uses `${...}` interpolation,
- the database service reads `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`,
- the web service's published host port comes from `${WEB_HOST_PORT}`,
- the database data is still stored in a named volume at `/var/lib/postgresql/data`.

### 5. `project/app.py` and `project/Dockerfile`

Carried over from U23, unchanged is fine.

### 6. `evidence.txt`

Paste exactly what you did and saw, in this order:

- The command that validated the file without printing secrets.
- The command that started the project and the lines showing it started.
- The web response proving the app reached the database.
- The command and output for `docker compose down`.

Do **not** paste the full output of `docker compose config` here, because it would print your password. Note in one line why you avoided it.

### 7. `answers.md`

1. **Configuration vs secret.** Define each in your own words and give two examples of each from your own project.
2. **Interpolation.** Explain what `${WEB_HOST_PORT}` means and where its value comes from when Compose runs.
3. **`.env` vs `env_file:`.** Explain the difference between the project `.env` file and the `env_file:` service key. Who reads each one?
4. **Precedence.** If you set `POSTGRES_PASSWORD` in your shell *and* in `.env`, which one does Compose use? How could you test this?
5. **Not baking secrets.** Why is putting a secret in a Dockerfile `ENV` line dangerous even if you delete it in a later line? Reference image layers.
6. **Debug this.** A teammate commits this Dockerfile. Explain the leak and describe the correct approach for a local project.

   ```dockerfile
   FROM python:3.12-slim
   ENV DB_PASSWORD=SuperSecret123
   WORKDIR /app
   COPY . .
   CMD ["python", "app.py"]
   ```

7. **Gitignore honesty.** Explain why adding `.env` to `.gitignore` does **not** protect a secret in a file that was already committed.

### 8. `checklist.md`

Copy and complete:

```markdown
- [ ] I read the U24 README fully (not only the assignment).
- [ ] `compose.yaml` contains no hard-coded secrets.
- [ ] `.env` exists locally and is listed in `.gitignore`.
- [ ] `.env.example` contains the same keys as `.env`, with placeholders.
- [ ] I validated the file with `docker compose config --quiet`.
- [ ] I did not paste full `docker compose config` output anywhere.
- [ ] I read the U24 rubric before writing answers.md.
```

## Definition of done

- `project/` contains the files listed, named exactly as above.
- `compose.yaml` has no literal secret values; all configurable values use `${...}`.
- `.env.example` and `.gitignore` are correct.
- The project was started and the app reported a successful database connection.
- `answers.md` is in your own words, with Q6 and Q7 answered concretely.
- `checklist.md` completed honestly.

## Submission format

One folder or zip named `U24-YourName` containing `project/`, `evidence.txt`, `answers.md`, and `checklist.md`, with names exactly as written.
