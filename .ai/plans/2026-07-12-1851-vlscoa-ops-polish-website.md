# Plan: Finalize vlscoa.org — corpus cleanup, reading-copy overhaul, site polish

## Context

The accuracy review (`.ai/reports/qa/2026-07-12-vlscoa-website-accuracy-review.md`, artifact 38416908) found: two published instrument PDFs carrying board markup (Master Covenant, Declaration) and one bundling an extraneous instrument (Design Guidelines pp. 31–38 = 2023 POA Parking & Towing Policy); reading copies ranging from clean to failing-verbatim (Master Covenant worst); Ch. 209 miscited on two pages; and 12 technical-hygiene items. The president answered all Part C decisions and added 12 site-change directives. Goal: a fully polished, statutorily accurate site the updated management certificate can point to, with the instrument corpus made consistent across all four work directories.

**Decisions locked in** (from the president + follow-up questions):
- Reading copies become **readable body-text editions**: omit signature/notary/acknowledgment blocks, clerk filing/recording-stamp pages, and handwritten fills; correct obvious typos/OCR errors. Exception: **Declaration §18.3 "Travis County" is preserved verbatim with a visible editorial note** (legally significant scrivener's error, flagged to counsel).
- Clean PDF sources (verified: genuine recorded copies, correct page counts, text layers, zero annotations):
  - Declaration: `~/Dropbox/finance & investments/Homes/Austin Home Search/Village at Ledge Stone (VLS) Governing Docs/COA/Provided at Closing/02. VLSCOA Development Area Declaration…pdf` (89 pp, md5 94c47b5c…)
  - Master Covenant: `…/COA/Public Sharing/01.b VLS Master Covenant_0 Original.pdf` (58 pp, md5 9c889238…)
  - Design Guidelines candidate: `…/Provided at Closing/05. VLS Design Guidelines Version 2.0.pdf` (verify 30 pp at Gate 1; fallback = cut pp. 31–38 from working copy)
- Delete annotations authored by **"Kaleb Christoffersen" / "kchristoffersen"** everywhere; **keep "aarthur" and "sshannon"**.
- Plats: **no new PDFs** — corpus evidence shows 70018711/06027639 are OPR-series re-recordings of already-published plats, and 22047589 is commercial Block E only (condo is Lot 1 Block D). Add a one-line cross-reference note; 4 county-portal confirmations listed for the president (below).
- Management certificate: keep "Coming soon" for the recorded PDF; fill the page from the draft-cert data + corpus; deliver updated draft-cert language (incl. `https://www.vlscoa.org`) as a file for the Google Doc.
- Google Site verbiage (BOC ch. 22 explainer, announcements@/notices@ blurbs): recover live via **Chrome extension** (president must be logged into Google as president@ in Chrome; Site ID 1qlkNoUJ1bm73e6lGlwHlVWncrw77ShsU). Fallback: reconstruct from docs 15/16 + corpus for review.
- Ch. 209 references: remove (COA is Ch. 82 only, §209.003(d)).
- Tech-hygiene batch: yes, one commit.

---

## Workstream A — PDF corpus cleanup (run first)

Per the designed pipeline (venv with **pikepdf** for mutations, **PyMuPDF** read-only verification, poppler as third opinion; scripts in scratchpad; nothing edited in place on Drive mounts):

1. **Phase 0–1**: venv + `pip install pikepdf pymupdf`; baseline audit (`audit.py` → md5/pages/annotations/TOC for every PDF in all 4 trees + clean sources); verify DG candidate (30 pp? stamps? no annots?); locate the aarthur annot in the 38-pp DG (pp 1–30 vs tail); build bundle span table from outlines; diff the **divergent 00.c/00.e** copies (VLS Governance vs Records — both modified 2026-07-12 AM) → present divergence + span table for sign-off. **Gate 1 = human review.**
2. **Phase 2**: backup every file to be modified → `~/vlscoa-pdf-backup-20260712/` + manifest (outside Drive and /tmp); verify hashes.
3. **Phase 3**: stage clean standalones (declaration 89 pp, master covenant 58 pp, design guidelines 30 pp); emit `pdftotext -layout`/`-raw`/per-page-JSON dumps (input for Workstream B); verify page counts, stamps (first/last-page renders), text layers, zero target-author annots.
4. **Phase 4**: bundle surgery on authoritative copies of 00.a–00.e — replace embedded Master Covenant + Declaration spans 1:1 with clean pages (abort on span-length mismatch), delete Parking/Towing tails (00.c pp ~196–203, 00.e ~337–344), fix DG span to 30 pp; snapshot + remap 4-level outlines; verify TOC count/depth/titles, aarthur/sshannon annots intact, boundary-page renders. **Gate 4 = human review.**
5. **Phase 5**: residual strip of Kaleb/kchristoffersen annotations (+ popup pairs; never Links/Widgets); prove `pdftotext` byte-identical pre/post (text-layer gate).
6. **Phase 6**: fan-out blessed binaries — Drive/Dropbox locations via write-temp-then-rename + md5 re-read (5 Master Covenant, 5 Declaration, 7 Design Guidelines, 2×5 bundles; keep each location's filename); website repo on branch `pdf-corpus-cleanup`: replace `src/documents/{01,02,04}-*.pdf`, `npm run build`, verify `_site` md5s, commit.
7. **Phase 7**: full-tree annotation census (assert authors ⊆ {aarthur, sshannon}); untouched-file md5 check; persist artifacts to the backup dir. **Gate 7 = final sign-off.**

## Workstream B — Reading-copy overhaul (after A; uses A's text dumps)

New convention applied to all 11 files in `src/reading/`:
- **Structure**: title + existing front matter → banner (via `reading.njk`) → body text of the instrument only. Remove: clerk recording-stamp blocks, signature/notary/acknowledgment sections, handwritten-fill transcriptions. Keep textual attachment content (allocation tables, general notes, exhibit text); pure graphics (plat sheets, maps) become a one-line pointer: *"[Plat/survey sheets — graphical; see the recorded PDF.]"*
- **Corrections**: fix all reviewed substantive/minor items in body text (per-instrument lists in the QA report); correct obvious recorded typos for readability (e.g., "DECLARATIONOF OF" → "DECLARATION OF", "supercedes" → stays? no — obvious errors corrected per direction: "supersedes"); **§18.3 keeps "Travis County"** + editorial note. Remove all `[sic]` markers except where an editorial note is genuinely needed.
- **Regeneration vs patching**: **01 Master Covenant and 02 Declaration are regenerated** from the clean PDFs' text layers (born-digital → high fidelity), structured into markdown headings matching the instruments' articles/sections, then diffed against current copies to catch regressions. The other 9 are **patched** per the QA findings + convention edits.
- **Banner update** (`src/_includes/reading.njk`): add one sentence: reading copies present the body text for readability; signature, notary, and clerk filing pages are omitted and obvious typographical errors corrected; the recorded instrument controls.
- Per-file editorial notes updated to the new convention (e.g., 02.3's de-bundle note stays; 04's false "illegible" note replaced with the real table values 2/2, 0/0, 4/4, 18/5, 20/10).

## Workstream C — Site content, compliance & UX

Data (`src/_data/instruments.json` + `src/_data/site.json`):
- Add Fine Policy to the Community Manual summary (5 components).
- Plat entries: add cross-reference sentence to summaries (DOC383S1176 also recorded as OPR 06027639; 00000423 also recorded as OPR 70018711 w/ tax certs).
- `site.json`: no nav changes needed (single-row nav comes from layout width).

`src/governing-documents.njk`:
- Reorder sections to hierarchical ID order: **Plats (00) → Master (01) → Condominium (02) → Community Manual (03) → Design Guidelines (04)**, with the "How these fit together" explainer expanded by the recovered/reconstructed **TUCA ch. 82 + BOC ch. 22** statutory-framework passage (deep-linked: `…code=PR&chapter=PR.82…` and `…code=BO&chapter=BO.22…`).
- Pinpoint §82.1142 deep link in the lead.
- Add Fine Policy to the manual section heading/copy.

`src/index.njk`: hero → **"Welcome to the Village at Ledge Stone COA"**; drop Ch. 209 from the notices callout (cite ch. 82 + Bylaws); Governing Documents card lists docs hierarchically incl. **Master Covenant** first; "New to the community?" — hyperlink "owner contact information current" → `site.forms.contactUpdate`.

`src/meetings.njk`: drop Ch. 209 ("as required by the Bylaws and Texas Property Code chapter 82", deep-linked).

`src/board-contacts.njk`: reorder to **President, Secretary, Treasurer, Board**; fix managing-agent sentence (add managing-agent info to the Management Certificate page from the draft cert: Alliance Association Management, 1812 Centre Creek Dr #350, Austin TX 78754, 512-328-6100, AHCinfo@associa.us — or reword if the president prefers not to list AAM; default = list it, since the cert page is where §82.116 expects it).

`src/management-certificate.njk`: add rows from draft-cert data — managing agent (above), plat recording data (Vol 13 Pg 225), Community Manual/Bylaws recording (Doc 11030484); keep mailing address "To be added" and recorded-cert "Coming soon". Entity name stays the correct "Ledge Stone" form.

`src/forms.njk`: "General contact" → `board@`; retitle "Maintenance / issue report" → **"Member / issue report"**; deep-link §82.1141 (already done) and add §82.116/§82.1142 links where referenced.

`src/faq.njk`: soften "The recorded management certificate is on the…" → "identifying information is on the Management Certificate page; the recorded certificate will be posted there once the updated certificate is recorded."

Google Site recovery (Chrome extension; president logged in as president@): open Site 1qlkNoUJ1bm73e6lGlwHlVWncrw77ShsU, extract the TUCA/BOC explainer + announcements@/notices@ blurbs + anything else not yet carried forward; merge (dedupe, keep complementary). announcements@/notices@ blurbs land on Board & Contacts (and/or Home notices callout). Fallback: reconstruct from docs 15/16 + corpus, president reviews.

Link-target policy (site-wide): internal links same tab (status quo); external links (county records, statutes, Google Forms) **and PDFs** get `target="_blank" rel="noopener"`.

Statutory citations: sweep all pages; every statute mention deep-linked to the exact section.

Draft-cert deliverable: write `…/VLSCOA Update Mgmt Certificate/2026-07-12 Draft Mgmt Certificate — updates for website + corrections.md` with the corrected entity name, §82.116/§82.1142 recitals, website URL `https://www.vlscoa.org`, and field-by-field corrections for pasting into the working Google Doc. (The .gdoc itself can't be edited locally.)

## Workstream D — Design & tech hygiene (one commit)

`src/assets/styles.css`:
- `--max: 960px → 1200px` (halves side margins on typical desktops; applies uniformly to header bar, nav, hero, main, footer). Remove `.reading{max-width:52rem}` cap so reading copies follow the same width.
- Header: `.brand .tag` styled same as `.brand .name` (1.35rem/700/white); nav single row (widened container fixes FAQ wrap; keep flex-wrap as small-screen fallback).
- Footer: `©` line onto its own line (base.njk `<br>` before ©).
- Consolidate the duplicate `.btn` blocks (lines 184–193 vs 205–210).
- Mobile: `table` wrappers/`overflow-x:auto` at ≤620px; darken `--stone` to ~`#5c626b`; `a:focus-visible` outline style.

`src/_includes/base.njk`: canonical link (`{{ site.url }}{{ page.url }}`); favicon (`/assets/favicon.svg` — simple navy/accent "VLS" monogram, hand-authored small SVG); og:title/description/url/type; footer line break.

Other: exclude `/admin/` + `/documents/README` from `sitemap.njk` (and `eleventyExcludeFromCollections`); consolidate robots.txt `User-agent: *` groups; `src/_headers`: add HSTS (`max-age=31536000; includeSubDomains`) + conservative CSP (`default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'` — move the footer year script inline→file or drop it to avoid `unsafe-inline`); `forms.njk` card headings h3→h2.

**HTML5/mobile answer for the president** (include in final report): the site is semantic HTML5 (header/nav/main/footer landmarks, skip link), responsive via fluid grid/flex — mobile-friendly on Android/iOS after the table-overflow fix; it deliberately uses **no** JS frameworks or data-viz packages (CLAUDE.md "dependency-light, must build in 5 years" rule + zero client JS). Modern design/UX practices are applied via CSS only. If data-viz is wanted later (e.g., budget charts), propose static SVG generated at build time.

## Sequencing

1. A (PDF pipeline, Gates 1/4/7 = user sign-offs) → 2. B (reading copies from A's text dumps) → 3. G-Site recovery via Chrome (needs president logged in) → 4. C + D + E site changes → 5. `npm run build` + local verify → 6. commit(s) on branch → merge to `main` → push (SSH alias) → Cloudflare deploy → 7. live verification → 8. update QA report + session checkpoint; deliver draft-cert file + plat-confirmation list.

## Verification

- PDF gates as designed (page counts, TOC integrity, annotation census ⊆ {aarthur, sshannon}, byte-identical fan-out, `pdftotext` invariance).
- Reading copies: rebuilt 01/02 diffed against prior versions; per-fix spot checks against A's text dumps; `npm run build` clean.
- Site: build + `curl -sI` all pages/PDFs on live (200s, content-types); verify canonical/og/headers with curl; sitemap no longer lists /admin; mobile check via Chrome device emulation (Chrome extension) for nav single-row, table scroll, margins.
- **Honest failure signals**: any live copy of an instrument hashing differently from the blessed md5; an aarthur/sshannon annotation missing after surgery; a reading copy whose body text diverges from the clean PDF's text layer; the FAQ nav item wrapping at 1280×800; any statute link 404ing.

## For the president (external checks, not blocking)

County-portal confirmations (browser): 70018711 = same Revised plat as 00000423 + tax certs; 06027639 = same original plat as DOC383S1176; 22047589 scope limited to Block E; then mark DOC383S1176/06027639 "superseded by Revised" in the inventory xlsx.
