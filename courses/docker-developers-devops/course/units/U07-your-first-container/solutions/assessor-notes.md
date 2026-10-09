# U07 Assessor notes

## Model answer sketch

**Q1:** Find image locally; if missing pull from registry. Create container from image. Start container process.

**Q2:** -i keeps STDIN open; -t gives pseudo-terminal for readable I/O; --name gives friendly unique reference.

**Q3:** Example: "Hello from Docker!"; inside prompt `root@abc123:/#`; `PRETTY_NAME="Ubuntu 24.04.1 LTS"`; exited to host prompt.

**Q4:** By default isolated filesystem — changes inside container do not appear on host (no bind mount yet).

**Q5:** Name already used → remove old container (`docker rm <name>`) or use new name.

**Q6:** If image not present locally, Docker pulls `image:tag` (usually `latest` if omitted).

## Common weak submissions

- Confuses create vs start.
- Says "-it" is one thing with no meaning.
- Claims host files changed.