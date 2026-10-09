# U06 Assessor notes

## Model answer sketch

**Q1:** e.g. "Docker Desktop on Windows (WSL2) because it bundles Engine and handles virtualization."

**Q2:** Checked virtualization enabled in BIOS/UEFI; ensured WSL2 installed; or on Linux, confirmed system packages.

**Q3:** 
- `Docker version 28.4.0, build d8eb465`
- `Hello from Docker!`

**Q4:** The Docker daemon is the background service that runs containers. Client talks to daemon; if daemon not running, commands fail.

**Q5:** Example: `'docker' not recognized` → PATH missing; reopened terminal after install or started Docker Desktop.

**Q6:** `docker --version` shows client/daemon reachability in part, but `docker run hello-world` proves pull+create+start+output end-to-end.

## Common weak submissions

- No proof lines (vague "it worked").
- Confuses image vs daemon.
- Says "just installed" with no pre-check.