> **SUPERSEDED — Post-Publish QA review archived.**  
> Punch-list items from §8 were implemented; course is **cohort-ready**.  
> **Use instead:**
> - Living SOP: [`docs/reference/BUG-HANDLING-SOP.md`](../BUG-HANDLING-SOP.md)
> - Published Course: hub [`docs/index.html`](../../index.html) · Setup [`setup.html`](../../setup.html) · Modules [`module-1.html`](../../module-1.html)–[`module-5.html`](../../module-5.html)
> - Workshop agenda: [`docs/reference/WORKSHOP-AGENDA.md`](../WORKSHOP-AGENDA.md)
>
> Historical findings below describe the pre-punch-list publish — do not treat open defects in §6 as current unless re-verified.

---

# Published Course Review — `review002`

**Document type:** Deep review of the **published** Five-Module Course (as shipped in-repo / GitHub Pages)  
**Date:** 2026-07-16  
**Reviewer role:** Engineering manager + technical educator lens  
**Scope:** Live HTML course under `docs/`, Exercise Lab, Living SOP v2.0 alignment, nav/JS behavior, certification path  
**Out of scope for this file:** Rewriting the course (findings only). Prior content spine archived at [`archive/review001.md`](./review001.md).

**Live URL:** https://practical-office.github.io/bug-handling-sop/  
**Local:** `cd docs && python3 -m http.server 4174`

---

## 1. Executive verdict

**Ship-quality for first cohort Review — not yet “final.”** The published course is a coherent, professional onboarding path that largely matches Living SOP v2.0 and Matt’s skills. It correctly graduated from the old 4-module / mixed-P1–P4 model to:

- Hub **Why** (not numbered) + **Setup Pre-req** + **Modules 1–5**
- Severity `severity/s*` ≠ Priority `priority/p*`
- Matt Triage State machine + peer extras (needs-info stale, security path, non-bug routing)
- Diagnosis Loop with **Phase 1 feedback loop first**
- Portable **Exercise Lab** (`exercises/invoice-api`) with a real red command
- **Evidence Pack** certification (not checkbox-only)
- Thin Incident / Postmortem rules

**Overall grade: B+ / A− for a first public cohort.** Pedagogy and process fidelity are strong. The remaining gaps are mostly **cross-surface consistency bugs**, **print/copy fidelity**, and **cohort-ops polish** — the kind of Post-Publish QA the site itself already warns about on `next-steps.html`.

**Do not treat this as “rewrite from scratch.”** Prefer a punch-list pass against §8.

---

## 8. Priority punch list for the next agent

Ordered for a Post-Publish QA pass:

1. **Sync Exercise A** across `module-1.html`, `certification.html`, `WORKSHOP-AGENDA.md` (and any SOP cert blurb).  
2. **Sync `BUG_TEMPLATE` in `bug-handling.js`** to Living SOP §4 / issue template (workaround + suggested S/P).  
3. **Align `course-full.html` M1 template** (or mark abbreviated).  
4. **Fix workshop “four scenarios” → five** (or drop a scenario deliberately).  
5. **Add Module 3 sample hypothesis key** (reveal).  
6. **Decide:** bump `localStorage` progress key to v2 for clean cohort.  
7. **Decide:** add root `SECURITY.md` stub vs explicit “training repo exception” sentence.  
8. **Optional stretch:** lab bad-fix PR for Module 5 `/code-review` drill; facilitator timebox card for M4 sketch vs full green.  
9. **Re-run Post-Publish QA checklist** (§9) and update hub/next-steps from “Review” → “Cohort-ready” only when green.

**Status (2026-07-16):** Items 1–7 and 9 implemented; item 8 deferred (lab bad-fix PR).

---

**End of review002 (archived)**
