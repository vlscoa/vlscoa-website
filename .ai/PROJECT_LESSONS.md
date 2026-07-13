# Project Lessons

Lessons learned from corrections, mistakes, and discoveries during development sessions on this project. This file is the project's institutional memory — reviewed at session start, appended when corrections occur.

> This file captures **project-specific** lessons (API quirks, data model gotchas, architecture decisions).
> For framework-level lessons, see `.ai/LESSONS.md`.

**How it works:**
- Agents review this file (and `.ai/LESSONS.md`) at the start of every session
- When a correction occurs during a session, the agent appends a lesson entry during `/session-save`, `/session-end`, or `/session-handoff`
- Entries are appended ABOVE the `<!-- LESSON_MARKER -->` line

---

### 2026-07-12 — Never use the `kchristo-neeve` identity in this project

**What happened**: `detect-user.sh` resolved the active user to `kchristo-neeve` (a work GitHub account supplied by `gh`/the Mac keychain), and it was nearly used as the owner handle in session/plan filenames — some of which are committed to this repo.

**Rule**: The owner directed that `kchristo-neeve` must not be used *at all* for this project. Use the role identity **`vlscoa-ops`** (matches git `ops@vlscoa.org` / the GitHub role account this repo pushes as). `.ai/sessions/.user` is set to `vlscoa-ops`; if it is ever re-resolved (cache cleared), verify the result is `vlscoa-ops` before generating any filename or artifact.

**Why**: This is the Association's repo — artifacts should carry role-based identity only, consistent with the site's own role-based-contacts policy; the work account is unrelated to the Association.

<!-- LESSON_MARKER — new lessons are inserted above this line -->
