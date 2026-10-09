# U22 — Your first compose file

**Phase 5 — Docker Compose**

## Where you are

In U21 you learned *why* Compose exists: one declarative file instead of several long `docker run` commands. Now you will write that file, read every line of it aloud in plain words, and start your app with **two** commands. This is the smallest honest Compose file: one service. Two services come in U23.

## What you will be able to do

- Write a minimal `compose.yaml` for one service.
- Explain what `services`, `build`, `image`, `ports`, `volumes`, and `environment` mean.
- Start the app with `docker compose up` and stop it with `docker compose down`.
- Recognize and decode a YAML indentation error and a "port already allocated" error.

## What you need already

- **U11–U16** — building an image from a Dockerfile.
- **U17** — volumes.
- **U18** — ports (`-p 8080:8000` means host 8080 → container 8000).
- **U21** — what Compose is and why.

Docker Desktop (Windows/macOS) or Docker Engine with the Compose v2 plugin (Linux) must be running (U06).

## Time and energy

About **75–110 minutes**, because you will type files and run them. Breaks are fine. The first time you watch `docker compose up` start a real service and print logs, it is worth sitting with for a moment.

## Why this exists

A `docker run` command is a sentence you say once and forget. A Compose file is a written recipe your project keeps. Writing it forces you to name each decision — which image, which port, which folder for data, which settings — in a place a teammate can read. This unit is where that habit begins.

## Plain-language teaching

### What a "service" is

A **service** is one container's worth of instructions inside the Compose file. It has a name you choose (for example `web`) and a set of keys describing how to create its container. A service is a *description* until you run `docker compose up`; after that, a container exists for it.

### The keys, in plain words before any code

| Key | Plain meaning | What it replaces from `docker run` |
|-----|---------------|------------------------------------|
| `image:` | Use this existing image (built earlier or pulled). | the image name at the end of `docker run` |
| `build:` | Build the image now, from a Dockerfile in this folder. | running `docker build` yourself |
| `ports:` | Publish a container port to your machine. | `-p 8080:8000` |
| `volumes:` | Mount storage into the container. | `-v mydata:/data` |
| `environment:` | Set environment variables inside the container. | `-e KEY=value` |

You will not use every key every time. A service needs *either* `image:` *or* `build:` (or both, where `build` also tags the result), plus whatever else the container needs.

### How Compose knows it worked

Two ideas you will see in the output:

- **Project name.** Compose groups services into a **project**. By default the project is named after the folder containing the Compose file. So a folder named `u22` produces objects like `u22-web-1`.
- **Default network.** Compose creates a private network for the project automatically, so services in the same file can reach each other by name (U20). You no longer type `docker network create`.

### YAML in one minute

The Compose file is written in **YAML**: text where **indentation defines structure**. Two rules save you most pain:

1. Use spaces, not tabs. Pick 2 spaces and be consistent.
2. Colons separate a key from its value; a dash marks a list item.

We explain the exact lines below, so you are not guessing.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Service | One container's description inside the Compose file | Not a running container until you start it |
| `compose.yaml` | The file Compose reads from your current folder | Not a script you execute |
| `build:` | Tells Compose to build an image from a local Dockerfile | Not a command you type |
| `image:` | Tells Compose which image to run | Not automatically a local build |
| `ports:` | Host-to-container port mapping | The two numbers are host first, container second |
| `volumes:` | Storage mounted into the container | Not the same as `COPY` at build time (U12) |
| `environment:` | Key/value settings passed into the container | Values are strings in YAML; quote them when in doubt |
| Project | The named group Compose creates | Defaults to the folder name |
| `docker compose up` | Build/pull, create, and start all services | Not the same as `docker run` |
| `docker compose down` | Stop and remove this project's containers and network | By default it keeps named volumes (U25) |

## Worked example

We will build a tiny web service that needs **no extra dependencies**: it uses only Python's standard library. Create a new empty folder, for example `u22`, and put three files in it.

### File 1: `app.py`

```python
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

GREETING = os.environ.get("GREETING", "Hello from Compose")

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = f"<h1>{GREETING}</h1>\n".encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    HTTPServer(("0.0.0.0", 8000), Handler).serve_forever()
```

Why this file: it reads one environment variable (`GREETING`) and answers every web request with it. That lets us *see* `environment:` working. It listens on port 8000 inside its container.

### File 2: `Dockerfile`

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

Line by line: `FROM` starts from a small official Python image (U12); `WORKDIR` sets the working folder inside the image; `COPY` brings our script in; `CMD` is the default command when the container runs. There is no `RUN pip install` because the app has no dependencies.

### File 3: `compose.yaml`

```yaml
services:
  web:
    build: .
    ports:
      - "8080:8000"
    environment:
      GREETING: "Hello from a Compose service"
```

Line-by-line, matching the indentation exactly:

- `services:` — top-level key. Everything indented under it is a service. There is exactly one here.
- `  web:` — the service name. You chose it. It appears in logs and container names (`u22-web-1`).
- `    build: .` — build an image using the Dockerfile in the current folder (`.` means "this folder"). This is where U11–U16 pay off.
- `    ports:` — start a list.
- `      - "8080:8000"` — publish host port 8080 to container port 8000 (U18). The quotes are optional here but harmless.
- `    environment:` — start a map of settings.
- `      GREETING: "Hello from a Compose service"` — set the `GREETING` variable inside the container.

That is the whole file. No network to create, no `--name` to remember.

### Running it

**Command 1:**

```text
docker compose up
```

**What it does:** reads `compose.yaml` in the current folder, builds the `web` service image from the Dockerfile, creates a project network, creates and starts the container, and attaches to the logs so you see them live. It runs in the **foreground** until you stop it.

**Success looks like this** (versions and build step counts vary):

```text
[+] Building 4.1s (8/8) FINISHED
 => [web internal] load build definition from Dockerfile
 => [web] resolving provenance for metadata file
[+] Running 2/2
 ✔ Network u22_default  Created
 ✔ Container u22-web-1  Created
Attaching to web-1
web-1  | 172.18.0.1 - - [..] "GET / HTTP/1.1" 200 -
```

**Now reach it.** Open `http://localhost:8080` in a browser, or in a second terminal run `curl http://localhost:8080`. You should see the greeting text. That proves the port mapping and the environment variable both worked.

**To stop:** press `Ctrl+C` in the terminal running `up`. This stops the containers but leaves them defined. To clean up fully, use the next command.

**Command 2:**

```text
docker compose down
```

**What it does:** stops and removes the containers and the network for this project. It does **not** remove named volumes unless you add `-v` (that is U25).

**Success looks like this:**

```text
[+] Running 2/2
 ✔ Container u22-web-1  Removed
 ✔ Network u22_default  Removed
```

### A note on operating systems

- The Compose and Docker commands are identical on Windows (PowerShell), macOS, and Linux.
- On Windows, Docker Desktop must be running. If `docker compose up` cannot find the Docker engine, start Docker Desktop first.
- If you later add a bind mount (a folder from your machine mapped into the container), Windows paths work best with a relative path like `./site` or forward slashes. We do not need one in this unit.

## Common errors

### Error: YAML indentation or tab characters

**What you see:**

```text
yaml: line 4: mapping values are not allowed in this context
```

**What it means:** YAML cares about indentation, and it does not allow tab characters. A line is indented one space too many, or a tab sneaked in from an editor.

**Fix:** Show whitespace in your editor, replace tabs with spaces, and make every child line consistently deeper than its parent. Compare against the exact file above.

### Error: Port already in use

**What you see:**

```text
Error response from daemon: driver failed programming external connectivity ...
Bind for 0.0.0.0:8080 failed: port is already allocated
```

**What it means:** something already owns host port 8080 — an earlier container you left running, or another program. The `8080` here is the **host** side of `"8080:8000"`.

**Fix:** stop the other container (`docker compose down` in its folder, or `docker ps` to find it per U10), or change the host side to a free port such as `"8081:8000"` and open `http://localhost:8081`.

### Error: No configuration file found

**What you see:**

```text
no configuration file provided: not found
```

**What it means:** you ran the command from a folder that has no `compose.yaml` or `docker-compose.yml`.

**Fix:** change into the folder that contains your file (`cd`) and run the command there (U03).

## Checkpoints

Answer before starting the assignment:

1. Which key would you use to run an image you pulled from Docker Hub, and which to build one locally?
2. In `"8080:8000"`, which number is on your machine and which is inside the container?
3. After `docker compose down`, does the project network still exist?

If those are clear, you are ready.

## Practice exercises

### P1 — Change one value

Change the host port to `"8090:8000"`. Predict which URL you will open, then run `docker compose up` and confirm. Stop with `Ctrl+C`, then `docker compose down`.

### P2 — Environment feedback loop

Change the `GREETING` value to include your name (for example `"Hello, Amara"`). Predict what the browser will show *before* you rebuild. Then run `docker compose up` again and check. Did you need to rebuild the image, or only restart the container? Write the answer and why.

### P3 — Fill in the blank

You want the service to be named `website` instead of `web`. Write only the changed lines of `compose.yaml`. (Hint: only the service name changes; the URL stays the same.)

### P4 — Write from a specification

Write a minimal `compose.yaml` that runs the official `nginx:alpine` image (no build), publishes host port 8080 to container port 80, and sets an environment variable `NGINX_HOST=example.local`. Do not run it yet; we will use it in the assignment.

### P5 — Fix a broken example

This file fails to start. Find and fix the error, then explain it in one sentence.

```yaml
services:
web:
    image: nginx:alpine
  ports:
    - "8080:80"
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No multiple services or databases (U23).
- No `.env` files or `${VAR}` interpolation (U24).
- No lifecycle commands such as `up -d`, `logs`, `exec`, `ps`, or `build` (U25).
- No orchestration or deployment (Phase 6–7).

## Next unit

**U23 — A two-service app** (app + database, `depends_on`, connection settings, and why data needs a volume).
