# U10 Assessor notes

## Model answer sketch

**Q1:** created = object made; running = process active; exited = stopped/finished.

**Q2:** stop graceful; start resumes; logs show output; exec runs command in running container; rm deletes stopped container.

**Q3:** -d background (services). Foreground attached (interactive/see logs).

**Q4:** Show container ID from run -d, logs output, exec echo, STATUS changes across stop/start/rm.

**Q5:** Stop old → rm old (or use new name). exec needs running container; run creates new container.

**Q6:** exec = inside existing; run = new instance.

## Common weak submissions

- stop == rm.
- exec works on exited container.