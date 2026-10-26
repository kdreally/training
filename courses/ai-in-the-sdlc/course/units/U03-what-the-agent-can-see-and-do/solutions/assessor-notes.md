# U03 Assessor notes

Assessor-only.

## Model answer sketch

**Types:** read = open without change (path shown); edit = file content or presence changes (diff); command = shell line plus output; refuse = stop with a reason and no matching diff.

**Transcript:**

1. read. Keep or mild problem (looked at src, not loans). Accept either.
2. read. Same.
3. edit. Problem. New file the task did not name.
4. command. Problem. Installs express.
5. edit. Problem. Rewrites the server onto a framework.
6. refuse. Keep. Secrets stay unread.

**Sight:** The agent sees files in the folder and the prompt. A roadmap in a tracker is invisible until someone puts the relevant text in the prompt or in a file. Being fluent is not the same as having the document.

**Refusals:** `npm install …`, `git push --force`, any database client pointed at a real server, `rm -rf` outside a scratch file. Harm: unwanted dependency, destroyed history, production data, deleted work.

## Common weak submissions

- Calls `npm install` an edit because `package.json` changes. The install is a command; the file change is a separate edit. If they only had the install line, command is the expected type.
- Says the agent can see the roadmap "if it is a good model."
