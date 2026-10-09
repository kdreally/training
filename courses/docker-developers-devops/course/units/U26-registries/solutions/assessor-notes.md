# U26 Assessor notes (assessors only)

Do not link this file from learner docs.

## Model answer sketch

**Q1:** Local-only images cannot be shared, deployed, or tested by others without rebuilding; rebuilds may differ; no single source of truth.

**Q2:** Registry = server storing images; repository = one named image across versions; namespace = owning account/org; tag = version label.

**Q3:** `ghcr.io` / `acme` / `shopping-list` / `1.2`. `nginx:1.27` → `docker.io/library/nginx:1.27`.

**Q4:** Docker Hub (default, free public); GHCR (tied to GitHub code); GitLab registry; ECR/ACR/Artifact Registry; Harbor (self-hosted). Any two with a plausible rationale.

**Q5:** Login proves identity to a registry so it grants push/pull rights. Access tokens are revocable, single-purpose secrets; account passwords are too powerful to hand to tooling. Public pulls are anonymous, so no identity is needed.

**Q6:** A repository/name is not a registry; `docker.io/team-alpha/inventory` names a repository in a namespace inside the Docker Hub registry.

## Registry map key

| Name | Registry | Namespace | Repository | Tag | Local/remote |
|------|----------|-----------|------------|-----|--------------|
| `ubuntu:24.04` | `docker.io` | `library` | `ubuntu` | `24.04` | remote |
| `student-demo/shopping-list:1.0` | `docker.io` | `student-demo` | `shopping-list` | `1.0` | remote |
| `ghcr.io/team-alpha/inventory:2.4` | `ghcr.io` | `team-alpha` | `inventory` | `2.4` | remote |
| `postgres:16` | `docker.io` | `library` | `postgres` | `16` | remote |
| `docker.io/library/nginx:1.27` | `docker.io` | `library` | `nginx` | `1.27` | remote |

## Common weak submissions

- "Registry = where images are stored" only, with no repository distinction.
- Repeating "Docker Hub" as the answer to Q4's "two other registries."
- Confusing "namespace" with a Git branch or a folder.

## Grading discipline

Flag any answer that reproduces lesson sentences verbatim with no restatement. Prefer the learner's own (imperfect) wording over polished copy-paste.
