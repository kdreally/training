# U34 Assignment — Diagnosis notes

Submit the following to your trainer in **one folder or zip** named:

`U34-YourName`

## The scenarios

Each block below shows a command and its real output. Diagnose each one using the method from the lesson. You are not required to reproduce these containers, though you may if you wish.

### Scenario A

```text
$ docker run --name web myapp:1.0
$ docker ps -a
CONTAINER ID   IMAGE       COMMAND           CREATED          STATUS                       PORTS   NAMES
a1b2c3d4e5f6   myapp:1.0   "python server"   5 seconds ago    Exited (127) 4 seconds ago           web
$ docker logs web
sh: 1: python: not found
```

### Scenario B

```text
$ docker run -d --name api -p 8080:80 nginx
docker: Error response from daemon: driver failed programming external connectivity on endpoint api: Bind for 0.0.0.0:8080 failed: port is already allocated.
```

### Scenario C

```text
$ docker run -d --name worker --memory 20m myworker:1.0
$ docker ps -a
CONTAINER ID   IMAGE          COMMAND        CREATED          STATUS                       PORTS   NAMES
9f8e7d6c5b4a   myworker:1.0   "worker.py"    8 seconds ago    Exited (137) 3 seconds ago           worker
$ docker inspect -f "{{.State.OOMKilled}}" worker
true
$ docker logs worker
processing batch 1
processing batch 2
```

### Scenario D

```text
$ docker run -d --name web2 -p 8000:8000 boundapp:1.0
$ docker ps
CONTAINER ID   IMAGE           COMMAND        CREATED          STATUS         PORTS                    NAMES
c3d4e5f6a7b8   boundapp:1.0    "python app"   10 seconds ago   Up 9 seconds   0.0.0.0:8000->8000/tcp   web2
$ curl http://localhost:8000
curl: (52) Empty reply from server
$ docker logs web2
 * Running on http://127.0.0.1:8000
```

## Files to submit

### 1. `diagnosis.md`

For **each** scenario (A–D), write a short structured note:

- **State:** what `docker ps -a` tells you.
- **Evidence:** the exact line(s) from the outputs that matter.
- **Exit code (if any):** the number and what it points to.
- **Likely cause:** one or two sentences.
- **Fix:** the specific change you would make.
- **Command used to confirm:** the single command you would run next to be sure.

### 2. `method.md`

Answer in your own words:

1. Write the five-step diagnostic method from memory as a numbered list.
2. Explain why `docker ps -a` is the first command, and what it can show that `docker ps` cannot.
3. For Scenario C, explain why the logs look "normal" even though the container was killed.
4. For Scenario D, explain why the container is `Up` yet unreachable, and name the one word in the logs that gives it away.
5. Describe one time in this course you used (or wish you had used) the stuck protocol from U00 while debugging.

### 3. `practice-log.txt`

Paste a real terminal transcript where you create **one** failing container of your own, then diagnose it with at least three of the method's commands. Label each command with a short comment.

## Definition of done

- Three files present with the names above.
- Every scenario has a stated cause and a concrete fix.
- Scenario D's answer identifies the `127.0.0.1` binding problem.
- The practice log shows a real container and real command output.
