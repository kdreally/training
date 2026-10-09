# U19 Assessor notes — Container networking basics

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** `bridge` (default; containers without `--network` join it), `host` (container shares the host's network), `none` (no networking). The bridge network is a private, Docker-managed network; containers on it can talk to each other but are not reachable from outside unless a port is published.

**Q2:** By IP: yes. By name: usually no on the default bridge — Docker does not publish container names into DNS there. (A user-defined network adds name resolution; U20.)

**Q3:** Inside a container, `localhost` (`127.0.0.1`) means that container itself, because each container has its own network namespace. An app container asking for `localhost` is asking about itself, not the database container, so the connection is refused. It must use the database's IP (or name on a user-defined network).

**Q4:** Predicted and real: `ping: bad address 'b'`. If they predicted a reply, the explanation should mention running on a network without name resolution.

**Q5:** e.g. `docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" site1` → `172.17.0.2`.

**Q6:** IPs change when a container is recreated/restarted and are hard for humans to remember; U20 introduces user-defined networks where containers reach each other by service/container name.

**Q7:** Any concrete question.

## Expected transcript shape

```text
docker run -d --name site1 nginx
docker run -d --name site2 nginx
docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" site1
172.17.0.2
docker run --rm alpine wget -qO- http://172.17.0.2
<!DOCTYPE html> ... Welcome to nginx! ...
docker run --rm alpine ping -c 1 site2
ping: bad address 'site2'
docker run --rm alpine wget -qO- http://localhost
wget: can't connect to remote host (127.0.0.1): Connection refused
```

Key evidence: the by-IP request returns HTML; the by-name request fails with `bad address`; the `localhost` request fails with `Connection refused`.

## Common weak submissions

- Claims containers on the default bridge can use each other's names (they usually cannot). This is a genuine and common misconception — award Q2 partial and note U20.
- Says `localhost` inside a container refers to the host. Award Q3 partial; explain the namespace isolation.
- Confuses IP addresses with ports.
- Believes publishing a port is required for container-to-container traffic (it is not).
- Hard-codes an IP in the transcript and then re-uses it after a restart without noticing it changed.

## Common wrong-but-thoughtful answers (partial credit)

- Argues that name resolution "should" work because Docker "knows the names." Reasonable intuition; explain that on the default bridge Docker keeps names out of DNS, and that user-defined networks change this (U20).
- Uses `docker exec site1 ping site2` instead of a throwaway container. Functionally similar if done inside the namespace; accept if the output is real and interpreted correctly.
- On Docker Desktop, some learners may find the default bridge already offers limited name resolution in their version. Accept genuine observed behavior with a correct explanation; the key learning is that names are unreliable on the default bridge and reliable on user-defined networks.
