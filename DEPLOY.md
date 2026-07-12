# VLSCOA Website — Deployment Runbook

Stack: **Eleventy** (static site generator) → **GitHub** (`vlscoa/vlscoa-website`) → **Cloudflare Pages** (builds on push) → **Cloudflare DNS/CDN/TLS** → **Sveltia CMS** at `/admin` for browser editing.

Cost: **$0**. Everything used here is on a free tier.

---

## Status of the DNS work (already done, 11 Jul 2026)

- Nameservers moved from Squarespace to Cloudflare (`kellen.ns.cloudflare.com`, `ximena.ns.cloudflare.com`).
- DNSSEC disabled at Squarespace, re-enabled at Cloudflare, DS record (key tag 2371, alg 13, SHA-256) added at Squarespace.
- Mail records carried over and grey-clouded (DNS-only): `MX → smtp.google.com` (pri 1), SPF, DKIM (`google._domainkey`), DMARC (`_dmarc`).
- Registration stays at Squarespace. Only DNS moved.

**Consequence:** `www.vlscoa.org` currently resolves to nothing (the old Squarespace forward to the Google Site did not come across). That is fine — the URL was never published. Step 3 below brings it back, this time serving the real site with the URL persisting (no redirect).

---

## Step 1 — Get the repo populated (one time)

The repo `vlscoa/vlscoa-website` is public and owned by the `vlscoa` org (owner: `vlscoa-ops`).

**Option A — push from your Mac as `vlscoa-ops` (recommended).**

⚠️ Do **not** use plain HTTPS. On a Mac that already has a work GitHub account, the keychain silently supplies that credential and the push fails with `Permission to vlscoa/vlscoa-website.git denied to <work-account>` (403). Erasing the keychain entry would break your work auth. Give the association its own SSH key instead, aliased so it is used only for this remote:

```bash
# 1. dedicated key for the association account
ssh-keygen -t ed25519 -C "ops@vlscoa.org" -f ~/.ssh/vlscoa_ops
pbcopy < ~/.ssh/vlscoa_ops.pub
```

Signed into GitHub **as `vlscoa-ops`**: Settings → *SSH and GPG keys* → **New SSH key** → paste. Store the key passphrase in 1Password (*IT Ops — GitHub SSH (vlscoa-ops)*).

```bash
# 2. host alias scoping the key to this remote
cat >> ~/.ssh/config <<'EOF'

Host github-vlscoa
  HostName github.com
  User git
  IdentityFile ~/.ssh/vlscoa_ops
  IdentitiesOnly yes
EOF

# 3. verify — must print "Hi vlscoa-ops!"
ssh -T git@github-vlscoa

# 4. push
cd vlscoa-website
git init -b main
git config user.name  "VLSCOA Ops"
git config user.email "ops@vlscoa.org"
git add .
git commit -m "Initial site: Eleventy + recorded instruments + CMS"
git remote add origin git@github-vlscoa:vlscoa/vlscoa-website.git
git push -u origin main
```

This keeps association infra completely separate from any personal or work GitHub identity — which is the point of the `vlscoa-ops` role account.

**Option B — web upload.** GitHub → the repo → *Add file → Upload files* → drag the whole folder in → Commit. Do not upload `node_modules/` or `_site/`.

Verify: the repo root should contain `package.json`, `.eleventy.js`, and `src/`.

## Step 2 — Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize the Cloudflare GitHub App **for the `vlscoa` organization** (this is where the org's *Third-party Access → GitHub Apps* approval finally appears). Grant it access to `vlscoa-website` only.
3. Select the repo. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `_site`
   - Production branch: `main`
4. **Save and Deploy.** You get a preview URL like `vlscoa-website.pages.dev` — check the site renders before touching DNS.

## Step 3 — Custom domains (this is what brings `www.vlscoa.org` back)

In the Pages project → **Custom domains → Set up a custom domain**:

1. Add `www.vlscoa.org`.
2. Add `vlscoa.org` (apex). Cloudflare uses **CNAME flattening** so the apex works natively.

Cloudflare creates the DNS records itself. Then in **DNS → Records**, delete any leftover Squarespace records if present: the four `A` records (`198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145`) and `CNAME www → ext-sq.squarespace.com`. They will conflict.

**Do not touch the MX / SPF / DKIM / DMARC records.** Email is unaffected by any of this.

Then set **Rules → Redirect Rules**: redirect `vlscoa.org/*` → `https://www.vlscoa.org/$1` (301), so there is one canonical hostname.

Verify: `https://www.vlscoa.org` serves the site, the URL stays in the address bar, and the padlock is valid.

## Step 4 — CMS login (Sveltia at `/admin`)

Sveltia is a Git-backed CMS: editors log in with GitHub, and every save is a real commit to `vlscoa/vlscoa-website`. That gives the Association a permanent, attributable audit trail of every content change — which is exactly what you want for an association website.

It needs a tiny OAuth broker. Use the maintained one:

1. Create a **GitHub OAuth App** (as `vlscoa-ops`, under the `vlscoa` org): Settings → Developer settings → **OAuth Apps → New**.
   - Homepage URL: `https://www.vlscoa.org`
   - Authorization callback URL: `https://vlscoa-cms-auth.<your-subdomain>.workers.dev/callback`
   - Save the **Client ID**; generate a **Client Secret**. Put both in 1Password (*IT Ops — GitHub OAuth (CMS)*).
2. Deploy the **`sveltia/sveltia-cms-auth`** Worker (Cloudflare → Workers → Create → Deploy from GitHub, or `npx wrangler deploy` from a clone). Set these Worker **secrets/variables**:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `ALLOWED_DOMAINS` = `www.vlscoa.org`
3. Edit `src/admin/config.yml` → set `base_url` to the deployed Worker URL (replace the `REPLACE-ME` placeholder), commit, push.

Then visit `https://www.vlscoa.org/admin` → *Login with GitHub*.

## Step 5 — Board editor access

CMS access = **write access to the repo**. Grant it in GitHub → `vlscoa` org → the repo → *Settings → Collaborators and teams*:

| Officer | GitHub account | Repo role |
|---|---|---|
| Secretary | (their account) | Write |
| President | (their account) | Write |
| Treasurer | (their account) | Write |
| `vlscoa-ops` | owner | Admin |

`publish_mode: editorial_workflow` is on, so an editor's save becomes a **pull request** rather than an instant publish — a second officer can review before it goes live. Turn that off in `config.yml` if it proves too heavy.

## Step 6 — Add the recorded PDFs

See `src/documents/README.md` for the exact filenames. Download the 14 PDFs from the **VLSCOA — Public Documents** shared drive → *Recorded Instruments*, rename to match, drop them in `src/documents/`, commit. Until then the "Recorded PDF" links 404; "Read online" and "County record" work regardless.

## Step 7 — Retire the Google Site

Once `www.vlscoa.org` is serving this site and the board has reviewed it: unpublish the Google Site (`sites.google.com/vlscoa.org/vlscoa`). Keep the **VLSCOA — Public Documents** shared drive — it stays the canonical public PDF store and the source of the files in `src/documents/`.

---

## Local development

```bash
npm install
npm start          # http://localhost:8080, live reload
npm run build      # writes ./_site
```

## Where things live

| What | Where |
|---|---|
| Recorded-instrument metadata (doc nos., OPR cites, county links) | `src/_data/instruments.json` |
| Association contacts, form URLs, nav | `src/_data/site.json` |
| Reading copies (11 instruments) | `src/reading/*.md` |
| Announcements | `src/content/notices/*.md` |
| Approved minutes | `src/content/minutes/*.md` |
| Recorded PDFs | `src/documents/*.pdf` |
| Page templates | `src/*.njk`, layouts in `src/_includes/` |
| CMS | `src/admin/` |
