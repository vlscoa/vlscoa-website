# Project Configuration

> Project-specific settings for **VLSCOA Website**. Created by `/framework-init` and freely editable.
> `/sync-configs` merges this file with `.ai/AGENT_GUIDE.md` to produce tool-specific configs (`CLAUDE.md`, `.cursorrules`, etc.).

---

## Project Context

### Overview

**VLSCOA Website** — the public, member-facing website of the **Village at Ledge Stone Condominium Owners Association, Inc.** (SOS File No. **800738983**), a Texas condominium owners association in **Hays County, Texas**. Live at **https://www.vlscoa.org**.

This is not a marketing site. It exists to satisfy a **statutory obligation** (Tex. Prop. Code **§82.1142** — member-accessible dedicatory instruments) and its URL appears on a **recorded, state-filed legal instrument** (the Association's management certificate). Treat accuracy as the top priority, ahead of design.

Everything on the site is a *convenience copy*; the authoritative version of every governing document is the instrument recorded in the Official Public Records of **Hays County, Texas**.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Static site generator | Eleventy (11ty) v3 — Nunjucks templates + Markdown |
| Styling | Single stylesheet (`src/assets/styles.css`) — no CSS framework |
| Client-side JS | None beyond the trivial (deliberate — must build in 5 years with no maintainer) |
| CMS | Sveltia CMS at `/admin` (GitHub login, Git-backed — every save is a commit and publishes directly) |
| Repo | GitHub `vlscoa/vlscoa-website` |
| Hosting | Cloudflare Pages (auto-builds on push to `main`; build `npm run build`, output `_site`) |
| DNS/CDN/TLS | Cloudflare |
| Cost | $0 |

### Architecture

```
vlscoa-website/
├── src/
│   ├── _data/
│   │   ├── instruments.json   Recorded-instrument data — SINGLE SOURCE OF TRUTH (all 14 instruments)
│   │   └── site.json          Association settings (contacts, form URLs, nav)
│   ├── _includes/             Layouts: base.njk, page.njk, reading.njk
│   ├── *.njk                  Page templates
│   ├── reading/               Reading copies (11 instruments, markdown)
│   ├── documents/             Recorded PDFs (14) — filenames must match instruments.json `pdf` field
│   ├── content/
│   │   ├── notices/           Announcements (CMS-managed)
│   │   └── minutes/           Approved minutes (CMS-managed; approved only, never drafts)
│   ├── admin/config.yml       Sveltia CMS config (must stay in sync with content folders)
│   └── assets/styles.css      Single stylesheet
├── PUBLISHING-RULES.md        Allow/deny list for published content
└── _site/                     Build output (gitignored)
```

`instruments.json` is load-bearing: the Governing Documents page, every reading-copy banner, and every PDF/county link render from it. **Add or correct an instrument there, not in a template.** Each record: `id`, `group` (plats/master/coa/manual/guidelines), `title`, `summary`, `docNo`, `opr`, `pdf`, `county`, `reading` (or `null` for plats).

### Branding

- **Primary**: navy `#1f3a5f` (dark variant `#16293f`)
- **Accent**: warm "ledge stone" `#9a7b4f`
- **Text**: `#22272e` · **Link**: `#1f5fa8` · **Stone gray**: `#6b7280` (light `#f4f5f7`)
- **Font**: system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`)
- Source of truth is `src/assets/styles.css` CSS custom properties; mirrored in `.ai/branding/tokens.json`

---

## How we work

- **Prose over bullets** in member-facing copy. Owners are the audience; write plainly.
- **Pinpoint statutory cites**, deep-linked: `https://statutes.capitol.texas.gov/?tab=1&code=PR&chapter=PR.82&artSec=82.1142`
- Keep the site **dependency-light**: no framework, no client-side JS beyond the trivial. It must still build in five years with no maintainer.
- Verify changes against the **live** site, not just the build — `curl -sI` the URL and check status code and content-type, especially for PDFs.
- Accuracy over design, always. If a legal fact cannot be verified, say so — do not guess.

---

## Critical Policies

**Prime directives** (from `CLAUDE.md` — these are absolute):

1. **This is the Association's §82.1142 member-accessible website.** `https://www.vlscoa.org` is the URL recorded on the management certificate. **Never change the canonical hostname.** `www.vlscoa.org` is canonical; the apex 301s to it.
2. **The recorded instrument always controls.** Every reading copy carries the "unofficial — the recorded instrument controls" banner and links to its county record. Never weaken, remove, or bury that disclaimer.
3. **Never invent a legal fact.** Document numbers, volume/page cites, county, entity name, statute sections — verify against `src/_data/instruments.json` or the source corpus. Entity: **Village at Ledge Stone Condominium Owners Association, Inc.** County: **Hays** — *not Travis* (this error has been made before).
4. **No owner personal information. Ever.** No names, personal emails, home addresses, phones, ledgers, delinquency data, violation history, or rosters. Contacts are role-based only (`board@`, `president@`, `secretary@`, `treasurer@`, `info@`, `support@` @vlscoa.org). Tex. Prop. Code §82.1141 — this site is public, so the bar is absolute.
5. **Read `PUBLISHING-RULES.md` before adding or changing any published content.** Only *approved* minutes — drafts never. Posting to the site is **not** statutory notice.
6. Internal board work product — **not legal advice**. The footer disclaimer stays on every page.

**Known landmines:**

- **`git push` over HTTPS will 403** (Mac keychain supplies a work GitHub account). Use the SSH-alias remote: `git@github-vlscoa:vlscoa/vlscoa-website.git` (auths as `vlscoa-ops`).
- **Declaration §18.3 says "Travis County"** — a scrivener's error in the recorded document (it's Hays). Reading copies preserve it **verbatim**; do not "fix" it, and do not propagate it into site copy.
- Reading copies were auto-transcribed; OCR garble on scanned signature/notary/plat pages is marked `[sic]`. Nothing was fabricated. Pending Secretary spot-check.
- **Never touch the zone's MX / SPF / DKIM / DMARC records** — Association email runs on them.
- **Do not add a `wrangler.toml`** — this is a Cloudflare Pages project, not a Worker; an `[assets]` block will break the build.

---

## Key Files

| Purpose | Path |
|---------|------|
| Recorded-instrument data — **single source of truth** | `src/_data/instruments.json` |
| Association settings (contacts, form URLs, nav) | `src/_data/site.json` |
| Publishing allow/deny list | `PUBLISHING-RULES.md` |
| CMS config | `src/admin/config.yml` |
| Layouts | `src/_includes/{base,page,reading}.njk` |
| Page templates | `src/*.njk` |
| Reading copies | `src/reading/*.md` |
| Recorded PDFs (naming rules) | `src/documents/` + `src/documents/README.md` |
| CMS-managed content | `src/content/{notices,minutes}/*.md` |
| Stylesheet | `src/assets/styles.css` |
| Design tokens | `.ai/branding/tokens.json` |

---

## Development

```bash
npm install
npm start          # http://localhost:8080, live reload
npm run build      # → ./_site
```

Deploy: push to `main` → Cloudflare Pages auto-builds (`npm run build`, output dir `_site`). Push via the SSH-alias remote (`git@github-vlscoa:vlscoa/vlscoa-website.git`), not HTTPS.

### Environment Variables

None. The site builds with no env vars and no secrets. (Association email DNS and the Sveltia CMS auth Worker are managed in Cloudflare, outside this repo.)

---

## Additional Features

- **Sveltia CMS at `/admin`**: officers edit Announcements, Approved Minutes, and site settings via GitHub login. Git-backed — every save is a commit (deliberate governance audit trail) and publishes directly (no review gate — a Board decision). "Approved minutes only" and "no PII" are enforced by policy, not software.
- Anything the CMS manages can also be edited as markdown in the repo. Keep `src/admin/config.yml` in sync with the content folders and the Eleventy directory-data files (`src/content/*/*.json`).
- Fuller context: the governing-document corpus and analysis live in the sibling **VLS Governance** project; the as-built record and remaining checklist are in **VLSCOA Infra Creation** docs `08` (§S4c) and `17`.
