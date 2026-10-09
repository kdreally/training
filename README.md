# training

Static training courses published to GitHub Pages. Each course is a self-contained, human-assessed course built from a shared teaching doctrine.

**Live site:** https://kdreally.github.io/training/

## Courses

| Course | Who it is for |
|--------|---------------|
| [courses/docker-developers-devops](./courses/docker-developers-devops) | Developers and DevOps practitioners learning containers |
| [courses/react-frontend-designers](./courses/react-frontend-designers) | Designers who want to build real React interfaces |

## Where the rules live

Shared teaching doctrine (applies to every course): [`AGENTS.md`](./AGENTS.md).

Each course also has its own `AGENTS.md` with its mission, audience profile, dependency chain, and unit map. Do not invent a parallel curriculum in chat and ignore them.

## Building the site

```powershell
.venv\Scripts\python.exe build.py
```

Generates the GitHub Pages site into `docs/`:

- `docs/index.html` — course catalog
- `docs/<course-slug>/index.html` — course home + unit list
- `docs/<course-slug>/units/<unit>/index.html` — lesson + assignment + rubric on one page

## Layout

```text
courses/<slug>/
  AGENTS.md          # course doctrine + curriculum map
  meta.json          # title, tagline, phases, unit->phase map
  course/
    README.md        # learner-facing course home
    units/           # one folder per unit (U00, U01, ...)
docs/                # generated static site (committed for GitHub Pages)
build.py             # markdown -> docs/ generator
style.css            # shared styles
```

## Status

- [x] Shared doctrine (`AGENTS.md`)
- [x] Course scaffolds + curriculum maps (both courses)
- [x] Docker course units **U00–U35** (36 units)
- [x] React course units **U00–U34** (35 units)
- [x] Published via GitHub Pages (`docs/`)
