# Security & Risk Register

Durable record of security findings and risk decisions for this project. Unlike the ephemeral `.ai/reports/qa/` audit snapshots (which go stale on the next commit), this file is **tracked and persistent** — it answers "what risks do we know about, and what did we decide?" for any future agent or collaborator.

`/security-audit` and `/qa-gate` append durable findings here; their full run output stays in `.ai/reports/qa/`.

## How to use
- Add a row when a security finding is worth remembering, or when a risk is explicitly **accepted** or **deferred** (with the why).
- Move a row to "Resolved" when the underlying issue is fixed (git history preserves the full trail).
- Keep it high-signal — a register of decisions and known risks, not a log of every scan.

## Known risks & decisions

| Date | Finding / Risk | Severity | Decision | Owner | Notes |
|------|----------------|----------|----------|-------|-------|
| _(none yet)_ | | | accepted / deferred / fixed | | |

## Resolved (kept for posterity)

| Date | Finding | Resolution |
|------|---------|------------|
| _(none yet)_ | | |
