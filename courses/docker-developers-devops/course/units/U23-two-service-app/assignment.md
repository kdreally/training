# U23 Assignment — A two-service app

Submit the following to your trainer in **one folder or zip** named:

`U23-YourName`

## What to build

A working two-service Compose project based on the worked example, with the deliberate changes listed below, started and verified. Put your project in a subfolder named `project/`.

## Files to submit

### 1. `project/app.py`

The `app.py` from the README. You may keep it unchanged.

### 2. `project/Dockerfile`

The `Dockerfile` from the README.

### 3. `project/compose.yaml`

A Compose file that:

- names the app service `web` and the database service `database` (**not** `db`),
- builds `web` locally and publishes host port **8083** to container port **8000**,
- passes `DB_HOST` set to the database's service name and `DB_PORT` set to `"5432"` into `web`,
- makes `web` start after `database` using `depends_on`,
- runs `postgres:16-alpine` for `database`,
- sets a database name, user, and password of your choosing,
- stores the database data in a named volume mounted at `/var/lib/postgresql/data`.

### 4. `evidence.txt`

Paste exactly what you did and saw, in this order:

- The command that started the project.
- The `docker compose up` lines showing the network, volume, and both containers starting.
- The command used to reach the app and the response proving it reached the database (for example `OK: reached database at database:5432`).
- The command and output for `docker compose down`.

### 5. `answers.md`

1. **Service name as hostname.** Explain, in your own words, why `web` connects to `database` and not to `localhost`. Mention what `localhost` means inside a container.
2. **`depends_on`.** State what `depends_on` guarantees and one thing it does *not* guarantee. Give one sentence of reasoning for each.
3. **Why a volume.** Explain why the database needs the named volume. What happens to the data if the mount is missing and the containers are recreated?
4. **Published ports.** Why does the database service have no `ports:` entry? What is the benefit?
5. **Predict then run.** If you renamed the database service to `database` but forgot to change `DB_HOST` from `db` to `database`, what would the app report? Run it if you can and paste the result.
6. **Debug this.** The snippet below loses all data every time the project is cleaned up. Explain why and give the corrected `db` service.

   ```yaml
     db:
       image: postgres:16-alpine
       environment:
         POSTGRES_PASSWORD: changeme
       volumes:
         - db-data:/data
   ```

7. **Explain in your own words.** In 3–5 lines, describe the roles of the top-level `volumes:` key versus a service's `volumes:` list.

### 6. `checklist.md`

Copy and complete:

```markdown
- [ ] I read the U23 README fully (not only the assignment).
- [ ] The app reported it reached the database at `database:5432`.
- [ ] The database data lives in a named volume mounted at `/var/lib/postgresql/data`.
- [ ] `docker compose down` removed the containers and network but kept the volume.
- [ ] I read the U23 rubric before writing answers.md.
```

## Definition of done

- `project/` contains `app.py`, `Dockerfile`, and `compose.yaml` as specified.
- The app was actually reached and reported a successful database connection.
- `answers.md` is in your own words; Q6 fixes the volume correctly.
- `checklist.md` completed honestly.

## Submission format

One folder or zip named `U23-YourName` containing `project/`, `evidence.txt`, `answers.md`, and `checklist.md`, with names exactly as written.
