# Build plan — Five-Module D-stack (ship today for Review)

**Goal:** Publish the new GitHub Pages course + rewritten Living SOP today so humans can run **Post-Publish QA**.  
**Mode:** Orchestrator + parallel sub-agents.  
**Decisions:** Locked in grilling session; glossary in [`CONTEXT.md`](../../CONTEXT.md); ADR [`0001-five-module-d-stack-course.md`](../adr/0001-five-module-d-stack-course.md).  
**Content spine:** [`archive/review001.md`](./archive/review001.md) (consumed; archived with superseded banner).  
**Deploy:** Push `main` → Pages from `/docs` — see [`DEPLOY.md`](./DEPLOY.md).

---

## Definition of done (for Review publish)

- [ ] Living SOP rewritten to match locked process (Matt Diagnosis Loop, S/P labels, triage states, incident/postmortem thin rules)
- [ ] Published Course: hub, `setup.html`, modules 1–5, quick-ref, course-full, certification, workshop agenda
- [ ] Nav/`bug-handling.js` knows 5 modules + Setup; progress keys updated
- [ ] `AGENTS.md` + doctrine say Five-Module Course (not “4 modules for now”)
- [ ] Exercise Lab under `exercises/` runnable locally; Modules 3–4 point at it
- [ ] Evidence Pack certification (not checkbox-only)
- [x] `review001.md` archived with superseded banner
- [ ] Site live on https://practical-office.github.io/bug-handling-sop/ for Review
- [ ] Post-Publish QA checklist filed (issue or comment) for the human review pass

**Out of scope for today:** Marp/PPTX slides; separate lab repo; full severity migration across other product repos; BookIQ bugs.

---

## Canon (agents must follow)

1. Matt skills (`diagnosing-bugs`, `tdd`, `code-review`, `triage`, `setup-matt-pocock-skills`)
2. Living SOP (after rewrite) + `CONTEXT.md`
3. Peer research [`peer-bug-triage-sops.md`](../research/peer-bug-triage-sops.md) for triage extras only
4. Content Draft [`archive/review001.md`](./archive/review001.md) for teaching depth — not law where it conflicts with 1–2

### Locked defaults (use unless orchestrator amends)

| Topic | Default |
| --- | --- |
| Modules | 1 Report · 2 Triage · 3 Diagnosis · 4 Fix · 5 Review/Prevention |
| Setup | `setup.html` pre-req (not numbered) |
| Why | Hub intro only |
| Diagnosis | Matt 6 phases; Reproducibility First = principle |
| Severity | `severity/s1`–`severity/s4` (workaround-aware) |
| Priority | `priority/p0`–`priority/p3` |
| Triage states | Matt: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix` + category `bug`/`enhancement` |
| Needs-info stale | ~14 days no reply → close/nudge policy in SOP |
| Triage SLA | S1 ≤1h, S2 ≤4h; S3/S4 normal cadence |
| Resolution targets | Lightweight S1/S2 only (optional sentence in SOP) |
| Lab | In-repo `exercises/invoice-api` (timezone / Accept-Timezone bug from review001 Exercise C) |
| Cert | Evidence Pack + lead review |
| Artifacts | HTML + course-full print + workshop agenda; no slides |

---

## Wave plan (same day)

```text
Wave 0  Orchestrator   CONTEXT ✓ · ADR ✓ · this plan ✓ · claim wayfinder ticket
        │
        ├──────────────┬──────────────────┬─────────────────┐
Wave 1  │ Agent SOP    │ Agent Lab        │ Agent Shell     │  (parallel)
        │ rewrite SOP  │ exercises/…      │ nav + stubs +   │
        │ + template   │                  │ AGENTS.md       │
        └──────┬───────┴────────┬─────────┴────────┬────────┘
               │                │                  │
Wave 2         ├────────────────┼──────────────────┤  (parallel; use SOP draft + review001)
               │ Agent M12      │ Agent M34        │ Agent M5+
               │ Setup+M1+M2    │ M3+M4 ↔ lab      │ M5+cert+qref+agenda
               └────────┬───────┴────────┬─────────┘
                        │                │
Wave 3           Agent Integrate: hub, course-full, next-steps, archive review001,
                 DEPLOY smoke, link check
                        │
Wave 4           Orchestrator: commit → push main → verify Pages → open Review issue
```

---

## Sub-agent briefs

### Wave 0 — Orchestrator (parent)

1. Confirm branch (prefer `main` or short-lived `course-d-stack` then PR merge — **for today Review: merge/push to `main`** so Pages updates).
2. Claim one wayfinder ticket on `Practical-Office/bug-handling-sop` (or create `[Build] Five-Module D-stack publish for Review`).
3. Launch Wave 1 agents with full briefs below + path to this plan + `CONTEXT.md`.
4. After Wave 1: paste SOP § headings into Wave 2 agents if needed; resolve conflicts.
5. After Wave 3: commit, push, curl Pages, file Post-Publish QA checklist issue.

---

### Wave 1A — Living SOP + templates

**Write:** `docs/reference/BUG-HANDLING-SOP.md` (full rewrite, keep version bump e.g. 2.0).  
**Also:** `.github/ISSUE_TEMPLATE/bug-report.md` aligned to template; add/update `docs/agents/triage-labels.md` with severity/priority/state labels.

**Must include**

- Goals + principles (Reproducibility First as principle)
- Mandatory report template
- Severity S1–S4 (workaround-aware) + Priority P0–P3 + triage SLAs
- Matt triage category/state machine + needs-info ~14d + non-bug routing + security private-reporting pointer
- Diagnosis = Matt 6 phases; Fix = `/tdd`; Review = `/code-review` Standards‖Spec
- Closure: RCA + Prevention; QA verify; Evidence Pack pointer for course
- Incident thin rules + Postmortem for outage-class S1
- Training outline = Five-Module Course + Setup + Workshop Agenda
- Metrics section updated (drop pure P1–P4 language)
- Skills setup section

**Do not:** rewrite HTML modules (Wave 2).

---

### Wave 1B — Exercise Lab

**Create:** `exercises/invoice-api/` (or similar name)

Minimum:

- Tiny Node (or TS) HTTP API with intentional bug matching review001 Exercise C (`Accept-Timezone` → empty invoices)
- README: how to install, run, run the red Phase 1 command, expected symptom
- One failing/red-capable test or script agents can run
- No BookIQ / product code
- License/comment: training fixture only

**Acceptance:** From repo root, README steps produce a deterministic red signal without Cursor.

---

### Wave 1C — Site shell + doctrine

**Edit:**

- `docs/js/bug-handling.js` — MODULES 1–5 labels/times; add Setup + update REFERENCE/FLOW order; progress key maps for 5 modules + setup + cert
- Stubs: `docs/setup.html`, `docs/module-5.html` (valid shell matching existing HTML patterns)
- Re-title existing modules in filenames stay `module-1.html`… but **content ownership** moves: M1=Report, M2=Triage, M3=Diagnosis, M4=Fix, M5=Review (Wave 2 fills)
- `AGENTS.md`, `.cursor/rules` if they say “4 modules”
- `docs/reference/DEPLOY.md` — list new URLs (setup, module-5)

**Do not:** deep teaching content (Wave 2).

---

### Wave 2D — Setup + Modules 1–2 + paper exercises

**Sources:** SOP (Wave 1A), review001 §§3–5, peer research for triage extras.

**Write content into:** `setup.html`, `module-1.html` (Report), `module-2.html` (Triage).

Include learning objectives, key concepts, demos, paper exercises A/B, checklists. Match existing CSS/component patterns (`section-card`, checklists, `data-progress`).

---

### Wave 2E — Modules 3–4 ↔ lab

**Sources:** Matt diagnosing-bugs + tdd skills, review001 §§6–7, Exercise Lab README.

**Write:** `module-3.html` (Diagnosis Loop deep dive), `module-4.html` (Fix / TDD / seams).

Must reference Exercise Lab paths and Phase 1 completion criteria. Paired exercises use lab, not product backlog.

---

### Wave 2F — Module 5 + cert + quick-ref + workshop agenda

**Write/update:**

- `module-5.html` — review, closure, RCA/Prevention, incident/postmortem thin, metrics
- `certification.html` — Evidence Pack requirements + lead review
- `quick-reference.html` — template, S/P labels, triage states, 6 diagnosis phases, skill cheatsheet
- `docs/reference/WORKSHOP-AGENDA.md` (or `docs/workshop-agenda.html`) — ~3h facilitator plan from review001 Appendix A (retimed for 5 modules)

---

### Wave 3G — Integrate + archive

**Update:**

- `docs/index.html` — Why intro, 5-module TOC, ~2.5–3.5h, links to Setup
- `docs/course-full.html` — concatenate/printable path for all pages
- `docs/next-steps.html` — homework F + Evidence Pack + Post-Publish QA note for cohort
- Archive: move `docs/reference/review001.md` → `docs/reference/archive/review001.md` with superseded banner pointing at Living SOP + live modules (done Wave 3G)
- Grep for “4 modules”, “P1–P4” as sole scale, “Reproduce first” step lists — fix stragglers
- Local smoke: `cd docs && python3 -m http.server 4174` + open hub/setup/m1–m5
- Lab smoke: run Exercise Lab red command

---

### Wave 4 — Publish for Review (orchestrator)

```bash
# after status/diff/log per commit rules — only when user asked to commit
git add … && git commit … && git push origin HEAD

curl -sI https://practical-office.github.io/bug-handling-sop/ | head -5
```

Open/update GitHub issue: **Post-Publish QA — Five-Module D-stack** with checklist:

1. SOP ↔ Module fidelity (diagnosis phases, labels, triage states)
2. Setup install steps work on a clean machine
3. Exercise Lab red → green path
4. Evidence Pack clear to a lead
5. Mobile + desktop hub/nav
6. Print/PDF course-full
7. Broken links / stale “4 module” copy
8. Sign off or file fixups

Site URL for reviewers: https://practical-office.github.io/bug-handling-sop/

---

## Conflict rules (parallel agents)

- **SOP wins** process wording; HTML teaches SOP.
- **Filenames:** keep `module-N.html`; change titles/body only.
- **No BookIQ** code or issues.
- **CSS:** reuse `bug-handling.css`; no redesign unless broken.
- If two agents touch `bug-handling.js`, only Wave 1C owns it; Wave 3 may extend progress keys.
- Lab package manager lockfile: one agent only (1B).

---

## Suggested timebox (today)

| Wave | Clock | Notes |
| --- | --- | --- |
| 0 | 15m | Plan + launch |
| 1 | 60–90m | SOP + lab + shell in parallel |
| 2 | 90–120m | Three content agents |
| 3 | 45–60m | Integrate + smoke |
| 4 | 15–30m | Commit, push, Pages, QA issue |

---

## Launch checklist (orchestrator copy-paste)

```text
Launch 3 generalPurpose agents (Wave 1):
1) SOP — follow docs/reference/BUILD-PLAN-D-STACK.md Wave 1A; read CONTEXT.md + review001 + peer research
2) Lab — Wave 1B; portable invoice Accept-Timezone bug; README + red command
3) Shell — Wave 1C; js MODULES 1-5 + setup.html stub + module-5.html stub + AGENTS.md

After all three return, launch Wave 2 (3 agents): 2D, 2E, 2F
Then Wave 3 integrate; then Wave 4 publish
```
