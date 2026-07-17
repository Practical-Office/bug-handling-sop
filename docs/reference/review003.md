# Published Course Review — `review003`

**Document type:** Cohort day-1 readiness review (punch-list closure + remaining ops)  
**Date:** 2026-07-16  
**Lens:** First facilitated workshop — can a lead run this tomorrow without embarrassment?  
**Baseline:** [`archive/review002.md`](./archive/review002.md) punch list + current Published Course  
**Living SOP:** v2.0 · **Course claim:** “cohort-ready” (`next-steps.html`, hub)

---

## 1. Executive verdict

**Yes — run the first workshop.** The review002 P0/P1 consistency bugs are fixed in-tree. Content, lab, certification, and facilitator materials form a coherent Five-Module D-stack. Remaining issues are **ops / peripheral docs** (README tree, tracker labels on this repo, build-plan checkbox hygiene) — not teaching defects that would confuse a mid-to-senior engineer mid-module.

**Grade after punch-list pass: A−**  
**Blockers for workshop day: none**  
**Blockers for “process adopted on product repos”: label vocabulary not yet created on this training tracker (see §5.2)**

---

## 2. review002 punch-list closure audit

| # | review002 item | Status now | Evidence |
| --- | --- | --- | --- |
| 1 | Sync Exercise A (M1 ↔ cert) | **Closed** | `certification.html` quotes Dashboard weak report; matches `module-1.html` |
| 2 | Sync `BUG_TEMPLATE` in JS | **Closed** | `bug-handling.js` includes workaround note + Suggested Severity/Priority; `STORAGE_KEY` → `…-progress-v2` |
| 3 | Align `course-full` M1 template | **Closed** | Printable M1 includes workaround + suggested S/P |
| 4 | Workshop “four” → five scenarios | **Closed** | `WORKSHOP-AGENDA.md` Block 2 detail: “five scenarios” |
| 5 | Module 3 hypothesis facilitator key | **Closed** | Reveal “Sample ranked hypotheses” on `module-3.html` |
| 6 | Bump progress localStorage key | **Closed** | `bug-handling-sop-progress-v2` (README notes it) |
| 7 | `SECURITY.md` stub | **Closed** | Root `SECURITY.md` points training vs product reporting; M2/SOP still teach private path |
| 8 | Optional M5 bad-fix PR / M4 timebox | **Open (optional)** | Still paper Exercise E; workshop agenda already timeboxes sketch vs green |
| 9 | Flip Review → cohort-ready | **Claimed** | Hub + `next-steps.html` say cohort-ready / Post-Publish QA complete; points leftovers to [issue #7](https://github.com/Practical-Office/bug-handling-sop/issues/7) |

**Conclusion:** The consistency pass landed. `review003` should not re-litigate those items unless a regression appears.

---

## 3. Learner journey walkthrough (day-1 simulation)

Walking the path a new engineer actually takes:

```text
Hub Why → Setup → M1 Report → M2 Triage → M3 Diagnosis (lab red)
  → M4 Fix (lab green) → M5 Review → Certification Evidence Pack
  → Next steps / Homework F
```

| Step | Friction found? | Notes |
| --- | --- | --- |
| Hub CTA → Setup | Low | Primary button correct; sidebar also lists Setup under Start |
| Setup install | Medium (env) | Depends on Cursor + `npx skills` network; page correctly allows “verify existing docs” on this repo |
| M1 copy template | Low | JS template now matches SOP |
| M2 calibration | Low | Five scenarios + reveal key |
| M3 `npm run phase1` | Low | Verified earlier in review002; still the right gate |
| M3 stop before fix | Medium (facilitation) | Clear on page; facilitator must enforce in room |
| M4 green in 30m workshop | Medium | Agenda already offers sketch-first / green as take-home — use it |
| M5 paper Spec fail | Low | Exercise E is enough for room; live `/code-review` optional |
| Cert pack | Low | Three artifacts unambiguous after Exercise A sync |
| Homework F | Low | Explicitly product backlog, not BookIQ / not lab |

**Net:** Self-paced path is clean. Workshop risk is only **time**, not **missing curriculum**.

---

## 4. Scorecard (post punch-list)

| Dimension | review002 | review003 | Delta |
| --- | --- | --- | --- |
| Process correctness (SOP) | 5 | 5 | — |
| Matt skills fidelity | 5 | 5 | — |
| Exercise quality | 4.5 | 5 | Hypothesis key + SECURITY.md landed |
| Cross-surface consistency | 3.5 | 4.5 | P0/P1 closed; README still stale (§5.1) |
| Workshop readiness | 4 | 4.5 | Agenda/scenario sync; M4 timebox still real |
| Certification seriousness | 4.5 | 5 | Exercise A aligned |
| Daily reference usefulness | 5 | 5 | Copy button fixed |
| Cohort-ops / peripheral docs | 4 | 3.5 | Claimed “ready” while README + labels lag (§5) |

**Weighted call:** Content is cohort-ready. Repo packaging still has a few “first impression” nits.

---

## 5. Remaining findings (actionable)

### 5.1 P1 — Root `README.md` still describes the old 4-module tree

[`README.md`](../../README.md) “What’s in this repo” shows:

```text
├── module-1.html … module-4.html
```

Missing: `setup.html`, `module-5.html`, `exercises/`, `WORKSHOP-AGENDA.md`, archive/reviews. Progress key note correctly says `v2`, but the tree will confuse anyone landing from GitHub before Pages.

**Fix:** Update the tree + one-line “Five-Module Course” blurb to match `AGENTS.md`.

### 5.2 P1 — Training repo GitHub labels incomplete vs Living SOP

`gh label list` on `Practical-Office/bug-handling-sop` currently has defaults + wayfinder labels (`bug`, `enhancement`, `wontfix`, …) but **not**:

- `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`
- `severity/s1` … `severity/s4`
- `priority/p0` … `priority/p3`

**Impact:** Course teaches label strings that do not exist on the teaching tracker. `/triage` demos on *this* repo will create labels on the fly or fail depending on permissions — messy for a live workshop.

**Fix (pick one):**

1. Create the canonical labels on this repo (script or `gh label create`), **or**
2. Add a Setup/M2 callout: “Product repos adopt `triage-labels.md`; this training repo may only have wayfinder labels — apply vocabulary on your product tracker.”

Prefer (1) so Homework F / course-improvement tickets can practice the real vocabulary here.

### 5.3 P2 — `BUILD-PLAN-D-STACK.md` definition-of-done still unchecked

Build plan checkboxes remain mostly `[ ]` even though the work shipped and next-steps claims Post-Publish QA complete. Stale plan docs erode trust for agents/humans using the plan as status.

**Fix:** Check completed items or add a banner: “Superseded — see issue #7 / review003.”

### 5.4 P2 — Optional pedagogy stretch (still open from review002)

| Item | Worth doing before workshop? |
| --- | --- |
| Lab branch / fixture for “remove Accept-Timezone globally” | Nice; not required — Exercise E paper works |
| Pre-baked failing unit test stub in lab | Nice for slow rooms; conflicts slightly with “agree the seam” pedagogy |
| Mermaid/SVG E2E on hub | Cosmetic |

### 5.5 P3 — Accessibility / polish

- Reveal buttons set `aria-expanded` — good.
- No skip-to-content link; progress track `aria-hidden` — acceptable for v1.
- Dark theme supported; reduced-motion not specially handled — low priority.
- `course-full.html` still a condensation — correct; do not expect full parity with interactive modules.

### 5.6 P3 — Hub “cohort-ready” vs living QA issue

Hub/next-steps point to issue #7 for leftovers. Good. Ensure #7 actually lists README + labels (or close #7 and open a small ops ticket) so the claim matches tracker reality.

---

## 6. Facilitator day-of runbook (condensed)

Use with [`WORKSHOP-AGENDA.md`](./WORKSHOP-AGENDA.md). This review adds only **stress points**:

| Block | Stress | Facilitator move |
| --- | --- | --- |
| 0 Setup | Skills install flaky offline | Pre-flight: everyone runs Setup **before** the room; Block 0 = verify only |
| 2 Triage | Old P1–P4 muscle memory | Explicitly kill mixed-P language; use S/P table on wall |
| 3 Diagnosis | Eager fixers | “No fix code until partner signs Phases 1–3”; use hypothesis reveal only after drafts |
| 4 Fix | Clock | Default to **test sketch + prose fix**; green path = homework if behind |
| 5 Review | Merging axes | Force every finding onto Standards **or** Spec column |
| 6 Cert | Checkbox theater | Show Evidence Pack outline; book lead review slots |

**Anti-patterns** in the agenda are still the right ones — especially no BookIQ live bugs in class.

---

## 7. What “done enough” means now

| Gate | Status |
| --- | --- |
| Living SOP ↔ modules language | **Pass** |
| Exercise Lab red signal | **Pass** |
| Certification unambiguous | **Pass** |
| Workshop agenda runnable | **Pass** |
| First-impression repo README | **Fail** (easy fix) |
| Tracker labels match taught vocabulary | **Fail** (create labels or disclose) |
| Product-repo adoption of labels | Out of scope (correctly) |

**Recommendation:** Ship workshop with current HTML. Fix §5.1 and §5.2 in the same small PR as “ops hygiene,” then treat content as stable unless the first cohort files gaps on #7.

---

## 8. Punch list for the next agent (narrow)

1. **Update root `README.md` tree** to Five-Module + Setup + `exercises/invoice-api` + workshop agenda.  
2. **Create triage/severity/priority labels** on `Practical-Office/bug-handling-sop` per `docs/agents/triage-labels.md` (or document training-repo exception on Setup + M2).  
3. **Close or refresh** `BUILD-PLAN-D-STACK.md` DoD checkboxes / superseded banner.  
4. **Confirm issue #7** lists any still-open workshop feedback items; archive this review beside 001/002 when consumed.  
5. **Do not** reopen module-count or Severity≠Priority debates — locked.

---

## 9. Relationship to prior reviews

| Doc | Role |
| --- | --- |
| `archive/review001.md` | Content spine that fed D-stack rewrite — historical |
| `archive/review002.md` | First deep publish review — punch list largely executed |
| **`review003.md` (this)** | Cohort readiness + residual ops; greenlight workshop |

---

## 10. Closing

The class is no longer a draft pretending to be a course. It is a **teachable, skills-faithful onboarding path** with a real lab and a real certification bar. The next failure mode is operational (stale README, missing labels), not curricular. Fix those, run the room, and let first-cohort feedback drive the next iteration via the Living SOP ticket process.

---

**End of review003**
```
