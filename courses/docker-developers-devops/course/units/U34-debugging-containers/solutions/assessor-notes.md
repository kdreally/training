# U34 Assessor notes

## Model diagnoses

**Scenario A:** State `Exited (127)`. Evidence: `Exited (127)` and `sh: 1: python: not found`. Exit 127 = command not found. Cause: the image has no `python` on its PATH (wrong base image, or the command name is wrong). Fix: use the correct interpreter/command or a base image that contains it. Confirm: `docker run --rm --entrypoint sh myapp:1.0 -c "command -v python || echo missing"` (or inspect the image's history/entrypoint).

**Scenario B:** The container never started; the daemon failed to bind the host port. Evidence: `Bind for 0.0.0.0:8080 failed: port is already allocated`. Cause: something already uses host port 8080. Fix: stop the other process or use `-p 8090:80`. Confirm: `docker ps` (find the other container), then `netstat -ano | findstr :8080` (Windows) or `lsof -i :8080` (macOS/Linux).

**Scenario C:** State `Exited (137)`. Evidence: `--memory 20m`, `Exited (137)`, `OOMKilled` = `true`, logs stop after batch 2. Exit 137/SIGKILL plus OOMKilled means the kernel killed it for exceeding the memory limit. Cause: 20 MB is far too little for the worker. Fix: raise or remove `--memory`, or reduce the worker's memory use. Confirm: `docker stats --no-stream` while it runs, or `docker inspect -f "{{.State.OOMKilled}}"`.

**Scenario D:** State `Up`, port mapped `0.0.0.0:8000->8000/tcp`, yet `curl: (52) Empty reply`. Evidence: logs say `Running on http://127.0.0.1:8000`. Cause: the app binds to loopback *inside* the container, so the published port reaches nothing. Fix: bind the app to `0.0.0.0` (for example `app.run(host="0.0.0.0", port=8000)`). Confirm: re-run and `curl http://localhost:8000`.

## Method (Q1) model

1. State — `docker ps -a`.
2. Logs — `docker logs --tail 50 <name>`.
3. Exit code — `docker inspect -f "{{.State.ExitCode}}" <name>`.
4. Details — `docker inspect` (image, ports, memory, OOMKilled).
5. Get inside if running — `docker exec -it <name> sh`.
6. Fix one thing, recreate, observe.

(Steps 5 and 6 may be merged for scoring; the key is state → evidence → cause.)

## Common weak submissions

- Scenario A answered "restart the container" with no mention of the missing command.
- Scenario C not connecting exit 137 / OOMKilled to the memory limit.
- Scenario D answered "the port is wrong" rather than "the app binds to 127.0.0.1."
- Method is only "check logs."
- Practice log fabricated or containing no output.

## Fast verification recipe

1. Check that each scenario's "Fix" is an actual change, not a repeat of the failing command.
2. Confirm Scenario D's note quotes `127.0.0.1`.
3. Confirm the practice log contains at least three caret-prefixed command lines with visible output beneath.
