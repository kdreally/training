# U32 Assignment — The honest recommendation

Submit the following to your trainer in **one folder or zip** named:

`U32-YourName`

## Files to submit

### 1. `answers.md`

Answer these prompts in your own words. This is a judgement exercise, not a commands exercise.

1. **One host's limits.** Name the four ways one host stops being enough. Write two lines for each.
2. **Define three words.** Define *scheduling*, *scaling*, and *self-healing* in your own words, then give one realistic example of each.
3. **Docker vs Kubernetes.** In 5–8 lines, explain how Kubernetes relates to Docker. You must address: (a) does it replace the image format, and (b) what does it rely on to actually start containers?
4. **When not to.** List at least three situations where reaching for Kubernetes is a mistake, and explain the cost in each case.
5. **Concept mapping.** Complete this table:

   | Docker Compose idea | Kubernetes equivalent, or "no simple equivalent" |
   |---------------------|--------------------------------------------------|
   | A service definition | |
   | `ports:` | |
   | `volumes:` | |
   | `restart:` | |
   | `depends_on:` | |

6. **Recommendation.** Read the scenario below and write a short recommendation (6–10 lines). State your choice, give two reasons, and name one trigger that would change your mind.

   > **Scenario:** A two-person team maintains an internal "meeting notes" web app. It runs as a Python web service plus a PostgreSQL database using `docker compose` on a single office server. Load is light and steady. There are occasional weekend restarts of the server for updates.

7. **Reflection.** Name one sentence in this unit that changed how you think about Kubernetes, and one sentence you still find unclear.

### 2. `manifest-reading.md`

Re-read the sample manifest in the unit. Answer:

- What does `replicas: 3` ask the cluster to do?
- What does `image: yourname/notes-app:1.0` tell the cluster?
- Why is a manifest described as "desired state" rather than "commands"?

## Definition of done

- Both files present with the names above.
- The recommendation is specific and names a trigger to revisit the decision.
- The concept-mapping table is filled in (it is acceptable to write "no simple equivalent" where that is honest).
- Answers are in your own words.
