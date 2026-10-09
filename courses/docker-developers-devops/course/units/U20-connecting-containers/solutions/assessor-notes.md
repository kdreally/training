# U20 Assessor notes — Connecting containers to each other

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** Both are bridge-type networks, but a user-defined network is created by you and Docker runs an embedded DNS server on it. That DNS registers each container's name, so containers on the same user-defined network can reach each other by name. On the default `bridge`, names generally do not resolve (only IPs work). This matters because a two-service app needs a stable way to find its database across restarts.

**Q2:** Host `db`, port `5432` — written `db:5432`. `localhost:5432` fails because inside the app container `localhost` means the app container itself, which runs no database.

**Q3:** Docker's embedded DNS maps a container name (such as `db`) to that container's current IP on the network. Because you address the container by name, you never need to know or hard-code its IP.

**Q4:** The command as written is missing `--network appnet`, so the client is on the default bridge and the honest result is `ping: bad address 'cache'`. If the learner adds `--network appnet` and gets a reply, that is a correct variant; award full if they explain the difference. The intended lesson is that BOTH containers must be on the same network.

**Q5:** Likely log line: `Connection refused` (or `could not connect to server: Connection refused`). The app tried `localhost`, which is itself; the fix is to use the database's name `db` (and correct port `5432`) as the host.

**Q6:** Use `docker network connect` when a container is already running and you need to add it to a network; undo with `docker network disconnect <network> <container>`.

**Q7:** Any concrete question.

## Expected transcript shape

```text
docker network create appnet
docker run -d --name web --network appnet nginx
docker run --rm --network appnet alpine wget -qO- http://web
<!DOCTYPE html> ... Welcome to nginx! ...
docker run --rm --network appnet alpine wget -qO- http://localhost
wget: can't connect to remote host (127.0.0.1): Connection refused
docker run -d --name db --network appnet -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=devpass postgres:16-alpine
docker run --rm --network appnet alpine ping -c 1 db
PING db (172.18.0.3): 56 data bytes ... 1 packets transmitted, 1 packets received
docker run -d --name late nginx
docker network connect appnet late
docker run --rm --network appnet alpine ping -c 1 late
PING late (172.18.0.4): ... 1 packets received
```

Key evidence: by-name request returns HTML; `localhost` fails with `Connection refused`; `ping db` resolves an address; `late` resolves only after `docker network connect`.

## Common weak submissions

- Believes names work on the default bridge (they usually do not). Award Q1 partial; point to U19.
- Uses `localhost:5432` for the database. Award Q2 partial; this is the exact confusion the unit targets.
- Forgets `--network appnet` on the client container and misreads `bad address` as a database problem.
- Thinks publishing ports is required for container-to-container traffic (it is not).
- Tries to remove the network while containers are still attached and reports the error as a failure of the exercise; it is a legitimate lesson (active endpoints).
- Confuses the volume name (`pgdata`) with the service name (`db`).

## Common wrong-but-thoughtful answers (partial credit)

- Argues the database should be reachable at `localhost` "because it's on my machine." Reasonable intuition; explain the namespace boundary and that `localhost` is per-container.
- Uses a network alias and finds it works. Accept; note that the container name works by default and aliases are a convenience.
- On Docker Desktop versions where the default bridge offers partial name resolution, accepts observed behavior with a correct explanation, but stresses that user-defined networks are the reliable, portable choice (and what Compose uses).
