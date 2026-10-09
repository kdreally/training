# U32 Assignment — Put your app on the web

Submit the following to your trainer in **one folder or zip** named:

`U32-YourName`

## Files to submit

### 1. `answers.md`

Answer in your own words. Short paragraphs or bullet lists are fine. Do not paste this file back unchanged.

1. **Static, explained.** In 4–6 lines, explain what makes a built React app a *static* site, and what the host is (and is not) doing for the visitor.
2. **Hosts.** Name three free hosts from the unit. Say one thing each is good at. State which one this course uses and why.
3. **Project vs user site.** Explain the difference, including the shape of each web address.
4. **The base path.** In your own words: what does the `base` setting tell the build to do, and why does a project site need a non-default value?
5. **Your live URL.** Paste the public URL of your deployed page. Confirm in one sentence that you opened it in a fresh browser tab (not the local preview) and that it works.
6. **Decode a failure.** Copy this console line and explain what went wrong and the fix:

   ```text
   GET https://samdesign.github.io/assets/index-5b6e9a0f.js 404 (Not Found)
   ```
7. **Explain in your own words.** A teammate uploads their `dist/` folder but the site shows GitHub's 404 page. List two different causes you would check, in order, and what each check would reveal.

### 2. `deploy-log.md`

Build this from your own project:

```markdown
# Deploy log — <your page name>

- Repo name: <your repo, e.g. my-page>
- Repo visibility: public
- Pages source: main / (root)
- Live URL: <https://...>

## vite.config.js base value I used
<copy the base line exactly>

## If I hit the 404-after-deploy problem
- What I saw: <blank page / 404 in console / other>
- The failing URL from the console: <paste it>
- What I changed: <one or two lines>
- Result after fixing: <worked / still broken>
```

If your deploy worked on the first try, write "I did not hit the 404 problem" and skip that section. Honesty is the grade, not a struggle story.

### 3. `checklist.md`

Copy and mark each item `[x]` when true:

```markdown
- [ ] My repo is public.
- [ ] The repo root contains index.html (not a nested dist folder).
- [ ] I set `base` to match my exact repo name, with leading and trailing slashes.
- [ ] I ran `npm run build` again after editing vite.config.js.
- [ ] I enabled Pages under Settings > Pages (main, / root).
- [ ] My live URL opens my styled page in a fresh tab.
- [ ] I read the browser console at least once to confirm no 404s.
```

## Definition of done

- All three files present with the names above.
- `deploy-log.md` contains your real repo name, real URL, and real `base` value.
- The error in Q6 is explained, not merely copied.
- The live URL genuinely loads the styled page.
- Checklist completed honestly.

## If you cannot get it online

Do not fake a URL. Run the U00 stuck protocol, paste the exact error or the failing URL into `deploy-log.md`, and describe what you tried. A specific, honest failure with a decoded console error earns substantial credit; an invented URL earns none.
