# U18 Assignment — `U18-YourName`

## Files

### `asyncRead.js`
- Logs `1-start`
- Calls `fs.readFile` on `data.txt` (you create with a short string)
- In callback: if err, log it; else log `3-contents:` + text
- After starting read (outside callback), log `2-after-start`

### `answers.md`

1. Explain the order you observed and why.
2. Define callback and error-first.
3. What goes wrong if you use the file text on the next line after `readFile` without waiting?
4. In 3–5 sentences, why async I/O matters for servers (plain language).
