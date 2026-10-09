# U24 — Environment variables and .env files

**Phase 5 — Docker Compose**

## Where you are

Your two-service app from U23 works, but its database password is written directly in `compose.yaml`. If you commit that file, the password goes into your project's history. This unit separates **configuration** from **secrets**, moves values into a `.env` file, and shows how Compose fills them in. This is a gentle introduction; deeper secret management comes in U33.

## What you will be able to do

- Tell the difference between configuration and secrets.
- Use `${VAR}` interpolation in `compose.yaml`.
- Create a `.env` file that Compose reads automatically.
- Explain why secrets must not be baked into images or committed to Git.
- Add `.env` to `.gitignore` and keep a safe `.env.example`.
- Run `docker compose config` to see resolved values, and understand its risk.

## What you need already

- **U15** — image layers and why things baked in stay baked in.
- **U22–U23** — services, `environment:`, a two-service app.
- Basic Git awareness (ignoring files). No Git expertise required.

## Time and energy

About **60–90 minutes**. This unit is more careful reading than typing. The ideas are small but consequential; read slowly.

## Why this exists

Hard-coded secrets are one of the most common and most damaging beginner mistakes. A password pasted into a tracked file leaks to everyone who ever clones the repository — including, sometimes, the public internet. This unit teaches the habit of keeping values *outside* the Compose file before that mistake becomes muscle memory.

## Plain-language teaching

### Configuration vs secrets

- **Configuration** is a setting that is not dangerous if seen: a port number, a hostname, a log level, a feature flag, the database name.
- A **secret** is a value that must stay private: a password, an API token, a private key.

Both are "environment variables" to a container. The difference is what happens if someone reads them. Treating them the same is how leaks happen.

### Why not put secrets in the image

Recall from U15 that an image is built in layers, and each layer is kept. If a Dockerfile contains a secret — even in a layer that is later deleted — the secret remains inside the image and can be read by anyone who has it. Putting a secret in a `RUN` or `ENV` line of a Dockerfile is a permanent, public record.

Even passing a secret as an environment variable has limits: anyone who can inspect the container can read it:

```text
docker inspect <container>
```

So environment variables are better than baking secrets into images, but they are not a vault. For local learning, a `.env` file that is **not committed** is a reasonable first step. Production needs a real secret store; we point at that in U33.

### Interpolation: `${...}` in the Compose file

**Interpolation** means Compose replaces a placeholder with a value when it reads the file. The syntax is `${NAME}`.

```yaml
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

Compose sees `${POSTGRES_PASSWORD}` and substitutes the value of that name. You can also provide a fallback:

```yaml
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-localdev}
```

The `:-` means "use `localdev` if the variable is not set." A fallback is convenient for local work but can hide a missing secret, so use it thoughtfully.

### Where does the value come from? Precedence

Compose looks for each variable in this order (first match wins):

1. Your **shell environment** (a variable you exported, or set in PowerShell).
2. A file named **`.env`** in the folder next to `compose.yaml`.

So `.env` is a convenient default that you can override from your shell when needed.

### The `.env` file and `env_file:` are different

This is a classic confusion, so name it now:

| Thing | What it does | Who reads it |
|-------|--------------|--------------|
| `.env` (project root) | Supplies values for `${VAR}` interpolation in `compose.yaml`. | Compose itself, when parsing the file. |
| `env_file:` (under a service) | Loads a file and sets those variables **inside the container**. | The container runtime, at start. |

`.env` configures the *file*; `env_file:` configures the *container*. They can hold the same kind of text but do different jobs.

### Keep the secret out of Git

- Add `.env` to `.gitignore` so it is never committed.
- Commit a **`.env.example`** — the same keys, with placeholder values. Teammates copy it to `.env` and fill in real values. This documents what is needed without leaking anything.

### A gentle note on Docker secrets

Docker has a feature called **Docker secrets**, but in its full form it is tied to Docker Swarm (a multi-machine mode we do not use here). For local Compose work, the practical pattern is: keep secrets in an untracked `.env`, and never bake them into images. Later units (U33) cover stronger habits.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Configuration | Non-sensitive setting | Not a secret; safe to see |
| Secret | A value that must stay private | Not just "any variable" |
| Interpolation | Replacing `${NAME}` with a value | Not the same as passing a file to a container |
| `.env` | File Compose reads for interpolation | Not automatically copied into the image |
| `env_file:` | File loaded into a service's container environment | Not the same file as `.env` |
| Fallback `${VAR:-x}` | Value used if `VAR` is unset | Can hide a missing secret |
| `.env.example` | Committed template of required keys | Not secret; contains placeholders |
| `.gitignore` | Tells Git which files to ignore | Does not delete a file already committed |
| `docker compose config` | Prints the resolved Compose file | Prints secrets in plaintext — handle with care |

## Worked example

We will take the U23 project and move its values into a `.env` file. Put these files in one folder, for example `u24`.

### File 1: `.env` (never committed)

```text
POSTGRES_USER=appuser
POSTGRES_PASSWORD=localdev-secret
POSTGRES_DB=appdb
WEB_HOST_PORT=8080
```

Plain rules for `.env`: one `KEY=value` per line, no spaces around `=`, and no surrounding quotes unless the value genuinely contains spaces. Blank lines and lines starting with `#` are ignored.

### File 2: `.env.example` (committed)

```text
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
WEB_HOST_PORT=8080
```

Same keys, empty or safe placeholders. This is the file a teammate reads to learn what to set.

### File 3: `.gitignore`

```text
.env
```

If you already commit a file that contains a secret, adding it to `.gitignore` afterwards is **not** enough — the secret stays in history. Rotating (changing) the password is the real fix. This is a good reason to get the habit right now.

### File 4: `compose.yaml`

```yaml
services:
  web:
    build: .
    ports:
      - "${WEB_HOST_PORT}:8000"
    environment:
      DB_HOST: db
      DB_PORT: "5432"
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

Compare to U23: the literal values are gone; placeholders remain. The file is now safe to commit. `app.py` and `Dockerfile` are unchanged from U23.

### Seeing the resolved values

**Command:**

```text
docker compose config
```

**What it does:** reads `compose.yaml`, applies interpolation from your shell and `.env`, and prints the fully resolved configuration to your screen. It is a syntax check and a way to confirm which values will be used. It starts nothing.

**Success looks like this** (abbreviated and reformatted):

```text
name: u24
services:
  web:
    build:
      context: .
    ports:
      - published: "8080"
        target: 8000
    environment:
      DB_HOST: db
      DB_PORT: "5432"
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: localdev-secret
      POSTGRES_DB: appdb
volumes:
  db-data:
    name: u24_db-data
```

Notice how `${...}` became real values. If a value shows up empty, the variable was not found.

**A typical failure, decoded:**

```text
invalid interpolation format for "environment" option in service "db":
required variable POSTGRES_PASSWORD is missing a value
```

**What it means:** Compose found `${POSTGRES_PASSWORD}` but neither your shell nor `.env` provided `POSTGRES_PASSWORD`. **Fix:** add the key to `.env` (or set it in your shell). If you intended a default, use `${POSTGRES_PASSWORD:-somedefault}`.

**Important caution:** the `config` output prints secrets in plaintext. Do not paste it into a chat, an issue, or a screenshot. When you need only validation, you can quiet the output:

```text
docker compose config --quiet
```

`--quiet` prints nothing if the file is valid, and prints the error if it is not. Use it freely; use full `config` carefully.

### Starting it

```text
docker compose up
```

Compose reads `.env`, resolves the placeholders, and starts the services exactly as before. The difference is that the password now lives in an untracked file. To verify the app still reaches the database, open `http://localhost:8080` and look for `OK: reached database at db:5432`. Stop with `Ctrl+C`, then `docker compose down`.

### A note on operating systems

- `.env` files are read the same way on Windows, macOS, and Linux. Use a plain text editor and save without a byte-order mark if your editor offers the option.
- To set a variable in the shell instead: PowerShell uses `$env:POSTGRES_PASSWORD = "value"`; bash uses `export POSTGRES_PASSWORD="value"`. Shell values win over `.env`.

## Common errors

### Error: A required variable is missing

**What you see** (often when starting or running `config`):

```text
required variable POSTGRES_PASSWORD is missing a value
```

**What it means:** the placeholder has no source. Either `.env` lacks the key, the key is misspelled (`PASSWORD` vs `POSTGRES_PASSWORD`), or you added a trailing space in `.env` and the parser read it as part of the value.

**Fix:** compare keys in `.env` and `compose.yaml` character by character. `KEY=value` with no spaces around `=`.

### Error: It works for you but not after a fresh clone

**What it means:** `.env` was never committed — correctly! — but the teammate did not create their own. They have no values.

**Fix:** commit `.env.example` and tell teammates to copy it: `cp .env.example .env` (macOS/Linux) or `Copy-Item .env.example .env` (PowerShell), then fill in real values.

### Error: A secret was committed before `.gitignore` was added

**What it means:** `.gitignore` prevents *future* tracking. It cannot erase a file from past commits.

**Fix:** rotate the secret (change the password/key), then remove the file from tracking properly. Never assume the old value is still private.

## Checkpoints

1. What is the difference between configuration and a secret?
2. Where does Compose look for `${VAR}` values, and in what order?
3. Why is `.env` not the same as `env_file:`?

If those are clear, you are ready.

## Practice exercises

### P1 — Change one value

Set `WEB_HOST_PORT` to `8090` in `.env`, predict the new URL, then run `docker compose config --quiet` and `docker compose up`. Confirm the URL.

### P2 — Fallback behavior

Change the password line in `compose.yaml` to `${POSTGRES_PASSWORD:-fallback-pass}`, then rename the key in `.env` to `PASSWORD_OLD` so it is no longer found. Run `docker compose config --quiet`; then run `docker compose config` and look at what value is used. What did the fallback do?

### P3 — Fill in the blank

Write the two lines you would add to a `.gitignore` to ignore `.env` and any `.env.local`, while keeping `.env.example`.

### P4 — Write from a specification

Given a service that needs `API_TOKEN` and `LOG_LEVEL`, write the `environment:` block using interpolation, where `LOG_LEVEL` defaults to `info` if unset. Then write the `.env.example` for both keys.

### P5 — Debug this broken snippet

A teammate commits this and wonders why their password leaks. Explain the problem in one or two sentences and describe the fix.

```dockerfile
FROM python:3.12-slim
ENV DB_PASSWORD=SuperSecret123
WORKDIR /app
COPY . .
CMD ["python", "app.py"]
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No full secrets-management tooling (Docker secrets/Swarm, vaults). That is a pointer for U33.
- No `up -d`, `logs`, `ps`, or `exec` (U25).
- No CI or registry concerns (Phase 6).

## Next unit

**U25 — Compose lifecycle** (`up -d`, `down`, `down -v`, `logs`, `build`, `ps`, `exec`, and the failures that follow).
