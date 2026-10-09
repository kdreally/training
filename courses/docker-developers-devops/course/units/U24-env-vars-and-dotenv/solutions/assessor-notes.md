# U24 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Q1:** Configuration = settings safe to see (host port, DB name, log level). Secret = value that must stay private (DB password, API token). Examples should come from their project.

**Q2:** `${WEB_HOST_PORT}` is an interpolation placeholder. Compose replaces it at parse time using the value from the shell environment, or from the project `.env` file if the shell does not define it.

**Q3:** `.env` in the project root supplies values for interpolation in `compose.yaml`; **Compose** reads it. `env_file:` under a service loads a file and sets variables **inside the container** at runtime; the **container** gets them. They can contain similar text but serve different roles.

**Q4:** The shell environment wins over `.env`. To test: set the variable in the shell (PowerShell `$env:POSTGRES_PASSWORD="x"`; bash `export ...`), run `docker compose config`, and observe the shell value overriding `.env`.

**Q5:** Image layers are stored permanently. A secret in an `ENV` or `RUN` line lives in that layer; deleting it in a later layer does not remove the earlier one. Anyone who can read the image (for example with `docker history` or by extracting layers) can recover it.

**Q6:** Same leak: `ENV DB_PASSWORD=SuperSecret123` is baked into the image and shipped to anyone who pulls it. Correct local approach: remove the `ENV` line; read the value at runtime from the container environment, supplied via `.env` interpolation (or `env_file:`) with `.env` untracked, and `.env.example` committed.

**Q7:** `.gitignore` only prevents Git from tracking files going forward. A file already committed remains in history and can be recovered. The real remedy is to rotate the secret.

## Expected artifacts

- `compose.yaml` with `${POSTGRES_USER}`, `${POSTGRES_PASSWORD}`, `${POSTGRES_DB}`, `${WEB_HOST_PORT}`.
- `.env` with concrete values; `.env.example` with the same keys, placeholders.
- `.gitignore` containing `.env` (optionally `!.env.example`).
- Evidence showing `docker compose config --quiet` (no secret output) and a successful DB-reached response.

## Common weak submissions

- Password still literal in `compose.yaml` while other values are interpolated.
- `.env.example` omits keys present in `.env`, or contains the real secret.
- `.gitignore` lists `.env` but the learner pasted full `config` output with the password.
- Q3 describes `.env` and `env_file:` as "the same thing."
- Q5 says secrets are safe "because you deleted the line."
- Evidence shows a run but no `config --quiet` step.

## Grading stance

The critical, non-negotiable outcome is that `compose.yaml` contains no hard-coded secret and the learner did not expose a secret while producing evidence. Reward correct habits over polished prose. Be strict on Q3 and Q5, since both are foundation ideas for U33 (security habits).
