# Roadmap: VLSCOA Website

> Last reviewed: 2026-07-12
> Maintained by: vlscoa-ops

---

## How This Works

This roadmap tracks all feature ideas, improvements, and technical debt for the project. It is the **single source of truth** for what's planned, in progress, and shipped.

### Workflow
- **Add items anytime** — use `/roadmap add` or edit this file directly
- **Session start** — the agent reads this file, compares against recent commits, and suggests next priorities
- **After shipping** — move items to `shipped` with the date and commit/PR reference
- **Deprioritized work** — mark as `deferred` with a reason, don't delete

### Status Legend

| Status | Meaning |
|--------|---------|
| `planned` | Idea captured, not yet started |
| `in-progress` | Actively being worked on |
| `shipped` | Merged to main and deployed |
| `deferred` | Postponed — include reason |

### Priority Levels

| Priority | Meaning |
|----------|---------|
| `critical` | Blocking users or breaking functionality |
| `high` | Next up — significant value or unblocks other work |
| `medium` | Important but not urgent |
| `low` | Nice to have, do when time allows |

---

## Accuracy & Legal Compliance

| # | Item | Status | Priority | Target | Notes |
|---|------|--------|----------|--------|-------|
| 1 | Full accuracy review of all 11 reading copies vs recorded PDFs — zero OCR/transcription errors; flag uncertain items for review | in-progress | critical | — | Plan: `2026-07-12-1851-vlscoa-ops-polish-website.md` |
| 2 | Secretary spot-check of auto-transcribed reading copies | planned | high | — | External review; pending since launch |

## UX & Design

| # | Item | Status | Priority | Target | Notes |
|---|------|--------|----------|--------|-------|
| 1 | Hierarchical governing-documents listing (currently flat) — group by `group` field in `instruments.json` | in-progress | high | — | Plan: `2026-07-12-1851-vlscoa-ops-polish-website.md` |
| 2 | Site-wide UX improvements | in-progress | high | — | Same plan |
| 3 | Visual/design polish — typography, spacing, mobile | in-progress | medium | — | Same plan |

## Content & Technical Hygiene

| # | Item | Status | Priority | Target | Notes |
|---|------|--------|----------|--------|-------|
| 1 | Content & copy pass on member-facing pages (plain language, cites, disclaimers) | in-progress | medium | — | Same plan |
| 2 | Technical hygiene: meta tags, sitemap, 404, headers, accessibility, live PDF link checks | in-progress | medium | — | Same plan |

---

## Shipped Log

> Completed items move here for historical reference. Newest first.

| Item | Category | Shipped | Reference |
|------|----------|---------|-----------|
| Favicon: two-line VLS/COA lockup, stripe removed | UX & Design | 2026-07-19 | `4d0eb6d`, `89f7ddf` |
| Adopt `.ai/` dev framework; pin deps with lockfile | Infrastructure | 2026-07-12 | `cf3df83` |
| Site launch: 14 instruments, 11 reading copies, CMS, Cloudflare Pages | Launch | 2026-07-11 | `71f345f` and earlier |

---

## Deferred Items

> Items that were considered but postponed. Include the reason so future sessions don't re-propose them.

| Item | Category | Reason | Revisit |
|------|----------|--------|---------|
| *(none yet)* | | | |
