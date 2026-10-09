# U11 Assessor notes

Assessor-only. Do not link from the learner README.

## Model answer sketch

**Q1:** A Dockerfile is a plain text file named `Dockerfile` that holds a top-to-bottom list of instructions. Docker reads it during a *build* and follows each instruction to produce an image. It is the recipe for an image.

**Q2 (any three):**
- Not a script you run directly — `docker build` reads it; you never execute the file.
- Not a program with logic — no loops or conditionals; just a fixed list.
- Not the image itself — the image is the built result; the file is the source.
- Not stored inside the running container — it lives on your machine and shapes the image.

**Q3:** The build context is the bundle of files Docker receives from the folder you point at. It includes the Dockerfile but also every other file/subfolder (minus `.dockerignore` in U13). `COPY` can only reach files inside it.

**Q4:** `docker build` = read a Dockerfile and build an image. `-t hello-docker` = name (tag) the resulting image. `.` = use the current folder as the build context and find the Dockerfile there.

**Q5:** Prediction should be `assignment says hi` (one line). Real output should match. Any honest mismatch discussion is acceptable.

**Q6:** Expected error resembles `failed to read Dockerfile: open Dockerfile: no such file or directory`. Correct decoding: Docker looked in the current folder for a file named `Dockerfile` and found none — wrong directory or misnamed file, not a broken install.

## Partial credit guidance

- Build context: many learners will say "the files you copy." That is a symptom, not the definition. Ask for the correction; award 2/3 with a note.
- Q5: the pedagogy is *predict first*. If they ran first and "predicted" after, award at most 2/4 and note it, because the skill being tested is prediction.
- Q6: a learner who panics at red text but correctly identifies "wrong folder" gets full Q6 marks. Confidence with errors is a course objective.

## Common weak submissions

- Definition copies U11 README sentences verbatim, including "plain text file named exactly `Dockerfile`," with no personal explanation.
- Claims a Dockerfile runs like `bash script.sh`.
- Says the build context is only the Dockerfile.
- Q5 shows the terminal output but no prediction, defeating the exercise.
- Confuses `-t` with "temporary" or "terminal."
- Reports the `.txt` extension trap without realizing it happened to them.

## Red flags for a trainer conversation

- Learner believes Docker "uploads their whole computer" for no reason. Redirect to U13.
- Learner is afraid of red error text to the point of stopping. Reinforce the stuck protocol from U00.
