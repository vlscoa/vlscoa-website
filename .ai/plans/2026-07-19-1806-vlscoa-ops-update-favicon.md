# Plan: update-favicon

| Field | Value |
|-------|-------|
| **Owner** | vlscoa-ops |
| **Created** | 2026-07-19 18:06 CDT |

## Context

Update the site favicon for https://www.vlscoa.org. The current favicon is a single SVG at `src/assets/favicon.svg`, referenced once from the base layout (`src/_includes/base.njk:9`). The specific design/asset changes will be captured here as the user describes them during the session.

---

## Discovery

### What Was Searched

- `grep -rn "favicon|icon" src/_includes/base.njk` → single reference: `<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">` at `src/_includes/base.njk:9`
- `ls src/assets/` → `favicon.svg`, `styles.css` (no PNG/ICO fallbacks, no apple-touch-icon)

### Existing Implementations

- `src/assets/favicon.svg` — current favicon asset
- `src/_includes/base.njk` — base layout with the sole `<link rel="icon">` tag

### Reusable Code

- Branding tokens: navy `#1f3a5f`, accent `#9a7b4f` (source of truth `src/assets/styles.css` custom properties; mirrored in `.ai/branding/tokens.json`)

### Dependency Map

- `base.njk` is the root layout — every page inherits the favicon link. No other templates reference favicon assets.

### Patterns to Follow

- Dependency-light static assets; no build-step image tooling. Eleventy passthrough-copies `src/assets/`.

---

## Changes

### 1. [MODIFY]: `src/assets/favicon.svg`

Replace/update the favicon artwork (details from the user).

### 2. [MODIFY]: `src/_includes/base.njk` *(only if needed)*

Add fallback/touch-icon links if the update calls for PNG/ICO variants.

---

## Files

| File | Action | Description |
|------|--------|-------------|
| `src/assets/favicon.svg` | MODIFY | Updated favicon artwork |
| `src/_includes/base.njk` | MODIFY (conditional) | Additional icon links if variants are added |

---

## Verification

1. `npm run build` → exits 0; `_site/assets/favicon.svg` contains the new artwork
2. Local check at http://localhost:8080 — new favicon renders in the browser tab
3. After push/deploy: `curl -sI https://www.vlscoa.org/assets/favicon.svg` → `200` with `image/svg+xml` content-type

**Honest failure signal**: The browser tab still shows the old icon (hard-refresh/cache-cleared), the build output is missing the asset, or the live URL returns non-200 / wrong content-type.

---

## Implementation Status

**Status**: COMPLETE — 2026-07-19 18:24 CDT
**Commits**: `4d0eb6d` (two-line VLS/COA lockup), `89f7ddf` (gold stripe removed, recentered — user follow-up directive)
**Verification**: build clean; live URL polled both deploys (HTTP/2 200, `image/svg+xml`, new content confirmed).
**Report**: `.ai/reports/plan-implementation/2026-07-19-1824-vlscoa-ops-update-favicon-report.md`
`base.njk` change not needed — no icon variants were requested.
