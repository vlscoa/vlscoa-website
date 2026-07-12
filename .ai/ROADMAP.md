# Roadmap: Neeve AI Dev Framework

> Last reviewed: 2026-07-12
> Maintained by: kchristo-neeve

---

## How This Works

Single source of truth for what's planned, in progress, and shipped. Add items with `/roadmap add` or edit directly. At session start the agent compares this against recent commits and suggests priorities. After shipping, move items to `shipped` with the date + version/commit.

### Status Legend

| Status | Meaning |
|--------|---------|
| `planned` | Idea captured, not yet started |
| `in-progress` | Actively being worked on |
| `shipped` | Merged to main and tagged |
| `deferred` | Postponed — include reason |

### Priority Levels

`critical` (blocking) · `high` (next up) · `medium` (important, not urgent) · `low` (nice to have)

---

## Reasoning & Quality

| # | Item | Status | Priority | Target | Notes |
|---|------|--------|----------|--------|-------|
| 1 | `.ai/REASONING.md` — model-agnostic Reasoning Operating Manual + 5-question self-test | shipped | — | v1.30.0 | Authored by Fable 5, trap-test verified. Plan: `2026-07-12-1038-…-adopt-fable-brain.md` |
| 2 | Fable framework audit — 18 findings (correctness, safety, dedup) | shipped | — | v1.30.0 | All implemented, each re-verified against files first |
| 3 | Protect + ship `REASONING.md` as core framework infra | shipped | — | v1.30.1 | Protection hook + doc lists + update allowlist |

## Commands & Workflow

| # | Item | Status | Priority | Target | Notes |
|---|------|--------|----------|--------|-------|
| 1 | `/adr` — capture an ADR at decision time | shipped | — | v1.30.0 | |
| 2 | `/memory-gc` — prune MEMORY.md + consolidate lessons | shipped | — | v1.30.0 | |
| 3 | `/distill` — extract a strong model's reasoning / freeze a workflow into a skill | shipped | — | v1.30.0 | |
| 4 | `/consumer-smoke` — verify no-leak install (framework-dev) | shipped | — | v1.30.0 | Would have caught the v1.25 leak |
| 5 | `/framework-pull` — collaborator pull-and-review flow | shipped | — | v1.31.0 | Counterpart to `/framework-update`. Plan: `2026-07-12-1556-…-framework-pull.md` |
| 6 | Workflow chaining — `/ship`, `/test` (test gate), `/ci-setup` + monitoring/a11y | in-progress | high | — | Plan: `2026-06-30-1725-…-workflow-chaining.md`; awaiting James's review |
| 7 | `/mcp-builder` — scaffold + register an MCP server | shipped | — | v1.29.0 | |

## Collaboration & Release

| # | Item | Status | Priority | Target | Notes |
|---|------|--------|----------|--------|-------|
| 1 | Delivery automation — notification + consumer-update verification (currently manual Slack/ad-hoc) | planned | medium | — | From the release-flow capture (adopt-fable-brain report, Appendix B) |
| 2 | Cross-agent handoff fidelity — release started under one agent, continued under another | planned | high | — | Flagged first-class in the release-flow capture; largely untested |
| 3 | Cross-user handoff fidelity — K starts, James finishes, possibly different agents | planned | high | — | The framework's core bet; exercise at a real release |

## Observability & Verification

| # | Item | Status | Priority | Target | Notes |
|---|------|--------|----------|--------|-------|
| 1 | Evals & observability | planned | medium | — | Plan: `2026-06-28-1023-…-evals-observability.md` (NOT STARTED) |
| 2 | Re-verify `/mcp-builder` Python variant on a real machine | planned | low | — | Carried in MEMORY.md as an open verification |

---

## Shipped Log

> Completed items move here for historical reference. Newest first.

| Item | Category | Shipped | Reference |
|------|----------|---------|-----------|
| `/framework-pull` collaborator flow | Commands & Workflow | 2026-07-12 | v1.31.0 · `a547e8e` |
| Protect + ship `REASONING.md` | Reasoning & Quality | 2026-07-12 | v1.30.1 · `68cde71` |
| REASONING.md + full Fable audit (18) + `/adr` `/memory-gc` `/distill` `/consumer-smoke` | Reasoning & Quality / Commands | 2026-07-12 | v1.30.0 · `1617570` |
| `/mcp-builder` | Commands & Workflow | 2026-06-30 | v1.29.0 |
