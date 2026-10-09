# U33 Assignment — Security review

Submit the following to your trainer in **one folder or zip** named:

`U33-YourName`

## The Dockerfile under review

Below is a Dockerfile with several security problems. You will audit it, fix it, and explain your changes. Copy it into a file named `Dockerfile.review`.

```dockerfile
FROM python:latest
ENV DB_PASSWORD=SuperSecret123
ENV API_TOKEN=abc123-live-token
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y build-essential curl
CMD ["python", "app.py"]
```

## Files to submit

### 1. `audit.md`

Work through the five-minute review checklist from the lesson. For **each** item, state pass or fail and quote the exact line responsible when it fails. Then list **every** security problem you can find in `Dockerfile.review`, with one short sentence per problem explaining the risk.

Minimum problems to address (there may be more):

- The base image tag.
- Two secrets.
- The user the container runs as.
- The build tools left in the final image.
- What `COPY . .` brings in if `.dockerignore` is missing.

### 2. `Dockerfile.fixed`

Write a corrected Dockerfile. It must:

- Use a minimal, pinned base image.
- Contain **no** secrets.
- Run as a non-root user.
- Use a multi-stage build to keep build tools out of the final image (U16).
- Keep the app's runtime behavior equivalent (still runs `python app.py`).

You do **not** need working app code or a real `requirements.txt`; the assessor is reviewing the Dockerfile, not running the app. If you want to test the build, any trivial `app.py` that prints a line and exits will do.

### 3. `explain.md`

Answer in your own words:

1. **Secrets.** Explain why `ENV DB_PASSWORD=...` is unsafe, and why deleting the file in a later layer would **not** fix it. Use the phrase *image layer* correctly.
2. **Non-root.** Explain what `USER` does and why running as root inside a container increases risk.
3. **Base image.** Explain the trade-off you accepted when choosing your base image, and name one thing you gave up.
4. **Pinning.** Explain the difference between a tag and a digest, and why `latest` is risky.
5. **Own words.** In 3–5 lines, summarise the security habits from this unit as if advising a teammate, without using the words "simply," "just," or "obviously."

## Definition of done

- Three files present with the names above.
- Every checklist item in `audit.md` is marked pass/fail with evidence where it fails.
- `Dockerfile.fixed` has two `FROM` lines (multi-stage), a non-root `USER`, a pinned base, and no secrets.
- `explain.md` avoids banned filler words.
