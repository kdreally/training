# U18 Assessor notes — Ports

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1:** A port is a numbered door for one program on a machine; an IP address identifies the machine on the network. You need both because many programs share a machine, and the port picks out which one.

**Q2:** `6000` is the host port (on your computer); `80` is the container port. Browsing `http://localhost:6000` knocks on port 6000 of your machine; Docker forwards that to port 80 inside the container, where the server is listening.

**Q3:** A container has its own isolated network, so its ports face inward. Nothing on the host reaches it until a port is *published* with `-p`, which connects a host port to the container port.

**Q4:** Real output is a mapping such as:

```text
80/tcp -> 0.0.0.0:5500
```

Expected prediction matches this. If the learner predicted empty output, that is the classic mistake (they forgot the port was published); the explanation should mention the container was started with `-p`.

**Q5:** Accept any true form of the conflict message:
- `driver failed programming external connectivity ... bind: address already in use`
- `Ports are not available: exposing port TCP 0.0.0.0:8080`
Fix: choose another host port (for example `8081:80`) or stop/remove whatever owns 8080.

**Q6:** Any concrete question. A frequent one: "How do I reach a container from another computer?" (Answer: the mapping binds `0.0.0.0` by default; the other machine uses your host's LAN IP, subject to firewalls. Out of scope here.)

## Expected transcript shape

```text
docker run -d --name web nginx
docker port web
            <- empty
docker rm -f web
docker run -d --name web -p 7000:80 nginx
docker port web
80/tcp -> 0.0.0.0:7000
curl.exe http://localhost:7000
<!DOCTYPE html> ... Welcome to nginx! ...
```

Key evidence: empty output before publishing, a mapping line after, and HTML (not a connection error) at the end.

## Common weak submissions

- Confuses which side of the colon is the host port.
- Believes `EXPOSE 80` publishes the port (it is documentation only).
- Says the app "is broken" when the real issue is a missing `-p`.
- Tries to add `-p` to an existing container instead of recreating it.
- Windows note missed: using PowerShell `curl` (the alias) and getting confusing option errors instead of calling `curl.exe`.

## Common wrong-but-thoughtful answers (partial credit)

- Claims `-p 80:8080` is correct for nginx. Award Q2/Q4 partial; explain that the right number must match what the server listens on (nginx: 80), and the left number is arbitrary and free.
- Says `localhost` inside a container reaches the host. This is a normal misconception and a perfect bridge to U19; award Q1–Q3 on their own merit and note the confusion for U19.
