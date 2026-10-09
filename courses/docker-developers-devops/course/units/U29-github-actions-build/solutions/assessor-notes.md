# U29 Assessor notes (assessors only)

Do not link this file from learner docs.

## Model answer sketch

**Q1:** Workflow = whole `.yml` file (e.g. "Build image"); job = `build` under `jobs:`; step = e.g. "Check out the code".

**Q2:** `.github/workflows/<name>.yml` at the repository root. Elsewhere, GitHub ignores it.

**Q3:** `uses:` runs a prebuilt action (`actions/checkout@v4`); `run:` runs a shell command (`docker build ...`).

**Q4:** It copies the repository onto the otherwise-empty runner. Without it, there is no Dockerfile/code to build, so the build fails with "no such file or directory".

**Q5:** The secret value lives only in GitHub settings; the YAML references it by name. GitHub substitutes it at run time and prints `***`, so logs and repo readers never see it.

**Q6:** Failure at the login/push step. Expected text: `Error: Username and password required` (login action) or `denied: requested access to the resource is denied` (push). Fix: create the secret with the exact name, or correct case/spelling, and ensure the namespace matches the account.

**Q7:** (1) File path/name — must be `.github/workflows/*.yml`; (2) trigger — branch filter may not match the branch pushed.

## Workflow sanity checklist

- File path exactly `.github/workflows/build.yml`.
- `on: push: branches: [ main ]` present.
- `actions/checkout@v4` before any build.
- `docker build` step present.
- Optional: `docker/login-action@v3` + `docker/build-push-action@v6` with `${{ secrets.* }}`.
- No literal secrets.

## Common weak submissions

- Workflow at repo root or named `build.yaml` in the wrong folder.
- Build step uses `run: docker build` with no `-t`.
- Token pasted into `with: password: ...` as a literal.

## Grading discipline

Any exposed secret is a hard stop on the push half; advise rotation in feedback. Award the bonus only when the push run is green and no secret is visible.
