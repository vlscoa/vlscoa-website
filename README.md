# vlscoa-website

Public, member-accessible website for **Village at Ledge Stone Condominium Owners Association, Inc.** — live at <https://www.vlscoa.org>.

It exists to satisfy the Association's obligation to make its dedicatory instruments available to members (Tex. Prop. Code ch. 82, incl. §82.116 and §82.1142), and to give owners a single place to read the governing documents, reach the Board, and file requests.

Every recorded instrument is published three ways: an **unofficial reading copy** (HTML), the **recorded PDF**, and a direct link to the **official Hays County record**. The recorded instrument always controls.

- Static site: **Eleventy** → **Cloudflare Pages**
- Content editing: **Sveltia CMS** at `/admin` (Git-backed — every save is a commit)
- Build: `npm install && npm run build` → `_site/`

Deployment, CMS setup, and board access: see [`DEPLOY.md`](DEPLOY.md).

Internal board work product. Not legal advice.
