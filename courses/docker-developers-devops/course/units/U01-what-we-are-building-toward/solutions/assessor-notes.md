# U01 Assessor notes

Assessor-only. Do not link from learner documents.

## Model answer sketch

**Q1:** An app needs an environment (runtime, libraries, settings, a port). Two machines drift apart, so "works on my machine" pain appears. Containers package the app plus its environment; an image is the saved blueprint and a container is a running copy. Compose runs several together; a registry shares images; CI builds images automatically; deployment runs them somewhere. The capstone does this end to end.

**Q2:**
- image → a reusable blueprint so we do not rebuild by hand each time.
- container → a consistent running copy that behaves the same everywhere.
- Dockerfile → a written, repeatable recipe for building the image.
- Compose → starting an app and its database together without juggling terminals.
- registry → moving images between laptops, teammates, and servers.
- CI → building/testing images automatically when code changes.
- deploy → running the app somewhere real users can reach it.

**Q3:** An image is the saved blueprint; a container is a running instance created from it. They should also note that the precise, rigorous version arrives in U08.

**Q4:** Capabilities: containerize a small app end to end; read any Dockerfile/Compose file; explain what each container is doing. Exclusions: deep Kubernetes; teaching programming; paid cloud requirements; advanced production infrastructure.

**Q5:** Any concrete app with plausible needs (e.g., "a Flask to-do app needing Python 3.11, a SQLite file, and port 5000"). The specific app does not matter; specificity does.

**Q6:** Any genuine "I still do not understand X" question. Common good ones: "what is a kernel?", "is an image a file?", "what does CI actually run on?"

## Common weak submissions

- Q1 restates the numbered list from the lesson with no connecting explanation.
- Q2 swaps image and container (very common; mark it clearly and point forward to U08).
- Q3 says "they are the same thing" or "an image is a container that is not running" (partially right; award partial and correct gently).
- Q5 is vague ("some website") with no needs named.
- Q6 claims no confusion. Treat as a possible engagement issue and follow up.

## Signals to watch

- A learner who lists only exclusions in Q4 may be anxious about the course's difficulty. Reassure and point to the capstone being achievable on a laptop.
- A learner who can explain image vs container already may have copied it; ask them to expand verbally in the next check-in.
