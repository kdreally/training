# U34 Assignment — `U34-YourName`

## Express app

- `POST /notes`  
  - requires non-empty string `title`  
  - optional string `body`  
  - success `201` JSON note `{ id, title, body }` (id can be fixed or incrementing)  
  - failure `400` JSON `{ error: "..." }`
- Keep a simple `GET /health`

## `answers.md`

1. Validation rules you enforced.
2. Why 400 not 500 for missing title.
3. How express.json fits.
4. curl/HTTP examples for 201 and 400 (text).
5. What you would validate next if building a real app.
