# U19 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Names the three default networks and explains the bridge network | 3 | Yes | `answers.md` Q1 |
| Correctly states by-IP works and by-name usually does not on the default bridge | 4 | Yes | `answers.md` Q2 |
| Explains `localhost` inside a container and the namespace idea | 4 | Yes | `answers.md` Q3 |
| Predicts the name-lookup failure, runs it, and explains the result | 3 | Yes | `answers.md` Q4 |
| Gives the correct `docker inspect` command and a real IP | 2 | Yes | `answers.md` Q5 |
| Explains why hard-coded IPs are fragile and previews U20 | 2 | Yes | `answers.md` Q6 |
| Transcript shows by-IP success and both failures | 2 | Yes | `transcript.md` |
| Reflects honestly on a remaining confusion | 1 | No | `answers.md` Q7 |
| Files named correctly; checklist present and honest | 1 | Yes | folder structure |

### Partial credit notes (assessors)

- Q2: award 2/4 if they say containers can communicate but do not distinguish IP from name. Award full only if both answers are correct (IP yes; name usually no on the default bridge).
- Q3: award 2/4 if they describe `localhost` as "the container itself" but do not connect it to isolation/namespace.
- Q4: expected output is `ping: bad address 'b'`. Award 1/3 if the prediction is missing but the real run is present; award 0 if no run is shown. If the learner ran it on a user-defined network and got a reply, that is a legitimate variant — award full if they explain which network they were on.
- Q5: the command must be a working form (for example `docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" <name>`). Older `{{.NetworkSettings.IPAddress}}` is acceptable if it printed a real address.
- Q6: key idea is that IPs change across restarts and are hard to remember; names on a user-defined network are the better approach (U20).
- Do not penalize imperfect English. Penalize empty answers or lesson text pasted back with no personalization.
