# VLSCOA Website — Agent Instructions

The public, member-facing website of the **Village at Ledge Stone Condominium Owners Association, Inc.** — a Texas condominium owners association in **Hays County, Texas**. Live at **https://www.vlscoa.org**.

This is not a marketing site. It exists to satisfy a **statutory obligation** and its URL appears on a **recorded, state-filed legal instrument**. Treat accuracy as the top priority, ahead of design.

## Prime directives

1. **This site is the Association's §82.1142 member-accessible website.** Tex. Prop. Code ch. 82 requires the Association to make its dedicatory instruments available to members. `https://www.vlscoa.org` is the URL recorded on the Association's **management certificate**. **Never change the canonical hostname** — it would break a legal filing. `www.vlscoa.org` is canonical; the apex 301s to it.

2. **The recorded instrument always controls.** Everything on this site is a *convenience copy*. The authoritative version of every governing document is the instrument recorded in the Official Public Records of **Hays County, Texas**. Every reading copy must carry the "unofficial — the recorded instrument controls" banner, and every instrument must link to its county record. Never weaken, remove, or bury that disclaimer.

3. **Never invent a legal fact.** Document numbers, volume/page cites, county, entity name, statute sections — never write one from memory. Verify against `src/_data/instruments.json` (which was itself verified against the recorded instruments) or against the source corpus. If you cannot verify it, say so; do not guess.
   - Entity name: **Village at Ledge Stone Condominium Owners Association, Inc.** (SOS File No. **800738983**)
   - County: **Hays** — *not Travis*. This error has been made before.

4. **No owner personal information. Ever.** No names, personal emails, home addresses, phone numbers, ledgers, delinquency data, violation history, or member roster. Contacts are **role-based only** (`board@`, `president@`, `secretary@`, `treasurer@`, `info@`, `support@` @vlscoa.org). Tex. Prop. Code **§82.1141** requires certain records to be withheld — this site is public, so the bar is absolute.

5. **Read `PUBLISHING-RULES.md` before adding or changing any published content.** It is the allow/deny list for this site. Only *approved* minutes are published — drafts never. Posting to the site is **not** statutory notice; notices under chs. 82/209 must still be delivered to owners of record.

6. Internal board work product — **not legal advice**. The footer disclaimer stays on every page.

## Architecture

**Eleventy (11ty) v3** static site → GitHub `vlscoa/vlscoa-website` → **Cloudflare Pages** (auto-builds on push to `main`) → Cloudflare DNS/CDN/TLS. Cost: $0.

```bash
npm install
npm start          # http://localhost:8080, live reload
npm run build      # → ./_site
```

Build command in Cloudflare Pages: `npm run build`. Output directory: `_site`. **Do not add a `wrangler.toml`** — this is a Pages project, not a Worker; a `[assets]` block will break the build.

## Where things live

| What | Path |
|---|---|
| **Recorded-instrument data — SINGLE SOURCE OF TRUTH** | `src/_data/instruments.json` |
| Association settings (contacts, form URLs, nav) | `src/_data/site.json` |
| Page templates | `src/*.njk` |
| Layouts | `src/_includes/{base,page,reading}.njk` |
| Reading copies (11 instruments, markdown) | `src/reading/*.md` |
| Recorded PDFs (14) | `src/documents/*.pdf` |
| Announcements / Approved minutes (CMS-managed) | `src/content/{notices,minutes}/*.md` |
| CMS config | `src/admin/config.yml` |
| Styles (single stylesheet, no framework) | `src/assets/styles.css` |

### `instruments.json` is load-bearing

All 14 instruments render from it — the Governing Documents page, every reading-copy banner, and every PDF/county link. **Add or correct an instrument there, not in a template.** Each record: `id`, `group` (plats/master/coa/manual/guidelines), `title`, `summary`, `docNo`, `opr`, `pdf`, `county`, `reading` (or `null` for plats).

PDF filenames must match the `pdf` field exactly. See `src/documents/README.md`.

## Content editing

Officers edit **Announcements**, **Approved Minutes**, and site settings via **Sveltia CMS** at `/admin` (GitHub login). It is **Git-backed: every save is a commit** — that audit trail is a deliberate governance feature. Saves **publish directly** (no review gate — a Board decision); the "approved minutes only" and "no PII" rules are enforced by policy, not software.

Anything the CMS manages can also be edited as markdown in the repo. Don't restructure the CMS collections without checking `src/admin/config.yml` stays in sync with the content folders and the Eleventy directory-data files (`src/content/*/*.json`).

## Working conventions

- **Prose over bullets** in member-facing copy. Owners are the audience; write plainly.
- **Pinpoint statutory cites**, deep-linked: `https://statutes.capitol.texas.gov/?tab=1&code=PR&chapter=PR.82&artSec=82.1142`
- Keep the site **dependency-light**: no framework, no client-side JS beyond the trivial. It must still build in five years with no maintainer.
- Verify changes against the **live** site, not just the build — `curl -sI` the URL and check the status code and content-type, especially for PDFs.

## Known landmines

- **`git push` over HTTPS will 403.** The Mac keychain silently supplies a *work* GitHub account. Use the SSH-alias remote: `git@github-vlscoa:vlscoa/vlscoa-website.git` (auths as the `vlscoa-ops` role account).
- **Declaration §18.3 says "Travis County"** — the instrument is recorded in **Hays**. That is a **scrivener's error in the recorded document**. Reading copies preserve it **verbatim**. Do not "fix" it. Do not propagate it into site copy either.
- Reading copies were auto-transcribed; OCR garble on scanned signature/notary/plat pages is marked `[sic]`. Nothing was fabricated. Pending Secretary spot-check.
- Never touch the zone's **MX / SPF / DKIM / DMARC** records — Association email runs on them.

## Fuller context

The governing-document corpus, verified conclusions, and definitions analysis live in the sibling **VLS Governance** project. The as-built record and remaining checklist for this site are in the **VLSCOA Infra Creation** project, docs `08` (§S4c) and `17`.
