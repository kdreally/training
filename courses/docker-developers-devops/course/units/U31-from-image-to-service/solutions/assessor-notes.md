# U31 Assessor notes

## Model answer sketch

**Q1:** Deploy = turn a built image into a running service on a host, where a runtime (Docker) starts it and keeps it running without a human watching. Host = the machine; runtime = the container engine; service = the long-lived container others use.

**Q2:** Host (missing → nothing to run on / no power or network); runtime (missing → the host cannot turn images into containers); a long-lived process (missing → the container exits immediately and there is nothing to serve). Good answers may also mention network reachability.

**Q3:** `no` for one-shot jobs (backups, migrations, tests). `on-failure:3` for a job that should retry a transient error but not loop forever. `unless-stopped` for a personal service you sometimes stop by hand. `always` is acceptable in place of `unless-stopped` if justified.

**Q4:** After reboot, `docker ps -a` shows it **Exited**, not Up. `unless-stopped` honours the earlier manual `docker stop`, so the runtime does not resurrect it; `always` would.

**Q5:** A restart policy only sees the process exit. An app can be running yet broken (wrong data, 500s, wrong port). Check `docker logs`, the restart count, and a health check.

**Q6:** Accept any honest pair.

## Common weak submissions

- Says "deploy means upload to the cloud." Redirect to the host/runtime/service model.
- Chooses `always` everywhere with no reasoning.
- Q4 prediction wrong in the `always` direction (says it comes back).
- `evidence.txt` pastes only commands, no output (impossible to verify the restart).
- Treats `-d` as "keeps it running."

## Fast verification recipe

1. Skim `answers.md` for the words host, runtime, service.
2. In `evidence.txt`, look for a `RestartCount` line with a value > 0 and a second `docker ps` showing `Up` seconds after a kill.
3. Confirm the deploy note explains every flag in the run command.
