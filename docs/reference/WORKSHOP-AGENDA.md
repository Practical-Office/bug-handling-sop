# Workshop Agenda — Five-Module Bug Handling Course

**Duration:** ≈ 3 hours (facilitator-led)  
**Audience:** Practical AI engineers onboarding to the Living SOP + Matt skills workflow  
**Artifacts:** Published Course HTML (`docs/`), Exercise Lab (`exercises/invoice-api`), this agenda  
**Living SOP:** [`BUG-HANDLING-SOP.md`](./BUG-HANDLING-SOP.md)  
**Certification:** Evidence Pack + lead review (`docs/certification.html`)

> Facilitator plan only — not a slide deck. Point learners at the live pages; use this table for timing.

---

## Prerequisites (before the room)

| Who | Action |
| --- | --- |
| Learners | Complete **Setup Pre-req** (`setup.html`) — skills installed, `/setup-matt-pocock-skills` run once |
| Facilitator | Clone repo; smoke Exercise Lab red command; open hub + Modules 1–5 locally or on Pages |
| Facilitator | Print or share [`quick-reference.html`](../quick-reference.html) |

If Setup is incomplete for most of the room, spend Block 0 verifying installs before Module 1.

---

## Agenda (≈ 3 hours)

| Block | Time | Content | Facilitator notes |
| --- | --- | --- | --- |
| **0** | **15m** | Hub **Why** + principles + Setup verification | Reproducibility First as principle; skills chain overview; confirm Cursor + Matt skills present |
| **1** | **25m** | **Module 1 — Report** + grill exercise | Mandatory template; weak vs strong; `/grill-me` or `/grill-with-docs`; Paper Exercise A (or rewrite a weak report) |
| **2** | **25m** | **Module 2 — Triage** calibration | Severity `s1`–`s4` vs Priority `p0`–`p3`; Triage States; SLAs (S1 ≤1h, S2 ≤4h); Paper Exercise B |
| **3** | **45m** | **Module 3 — Diagnosis** demo + paired dry-run | Diagnosis Loop Phases 1–2 deep; show Exercise Lab red Phase 1; pairs draft hypotheses (Exercise C style) — no product/BookIQ backlog |
| **4** | **30m** | **Module 4 — Fix** TDD demo | Seams; red → green with `/tdd`; minimal fix; re-run original Phase 1; Exercise D sketch |
| **5** | **25m** | **Module 5 — Review / Prevention** | `/code-review` Standards ‖ Spec; RCA + Prevention template; thin Incident + Postmortem for outage-class S1; Exercise E |
| **6** | **15m** | E2E checklist + Evidence Pack + homework | Walk certification requirements; assign Exercise F (1–2 real bugs); point to monthly retro |

**Total:** 15 + 25 + 25 + 45 + 30 + 25 + 15 = **180 minutes**.

---

## Block detail

### Block 0 — Why + Setup (15m)

- Open hub: why shared bug process matters.
- Core principles from Living SOP §2.
- Spot-check: can everyone invoke `/diagnosing-bugs`, `/tdd`, `/code-review`, `/triage`?
- Hand out quick-reference one-pager.

### Block 1 — Report (25m)

- Teach mandatory template fields.
- Demo grilling an incomplete report.
- Learners: Exercise A or rewrite a weak report (paper).
- Checkpoint: STR ≤ ~6 steps; impact specific.

### Block 2 — Triage (25m)

- Separate Severity (impact) from Priority (schedule) — kill P1–P4-as-impact habits.
- Walk Triage Category + State machine; work starts only at `ready-for-*`.
- Security: private advisory path (no exploit details in public issues).
- Calibration Exercise B (four scenarios).

### Block 3 — Diagnosis (45m)

- Hard truth: feedback loop first (Phase 1).
- Facilitator live demo: Exercise Lab invoice `Accept-Timezone` red signal.
- Pairs: Phase 1 command, minimise plan, 3–5 falsifiable hypotheses, first probe, seam proposal.
- Do **not** write production fix code in this block.

### Block 4 — Fix (30m)

- `/tdd` rules for bugs: agree seams, regression first when seam exists, minimal fix.
- Demo or walk red → green on the lab (or outline if time-boxed).
- Emphasize re-running the original un-minimised Phase 1 command.

### Block 5 — Review & Prevention (25m)

- Two-axis review: classify findings as Standards or Spec — never merge axes.
- Write Root Cause + Prevention on a sample ticket.
- Thin Incident rules; Postmortem only for outage-class `severity/s1` Incidents.
- Exercise E: “remove Accept-Timezone globally” PR — Spec fail required.

### Block 6 — Close the loop (15m)

- End-to-end skill sequence on the whiteboard or quick-ref.
- Evidence Pack requirements (report/Exercise A · Phase 1 output · RCA+Prevention · lead review).
- Homework F: 1–2 real bugs; bring Phase 1 + Prevention to monthly retro.
- Point to Living SOP for ongoing updates.

---

## Shorter cut (90–120m)

| Keep | Skim / homework |
| --- | --- |
| Block 0 principles (10m) | Full Setup (async before) |
| Module 1–2 light (30m combined) | Deep grill / all of Exercise B |
| Module 3 deep (40m) | Full paired write-up |
| Modules 4–5 skim (20m) | Lab green path + Exercise E as take-home |
| Evidence Pack + homework (10m) | — |

---

## Materials checklist

- [ ] https://practical-office.github.io/bug-handling-sop/ (or local `python3 -m http.server 4174` in `docs/`)
- [ ] `docs/setup.html`, `module-1.html` … `module-5.html`, `certification.html`, `quick-reference.html`
- [ ] `exercises/invoice-api` README + Phase 1 red command verified
- [ ] Living SOP open for “source of truth” questions
- [ ] Timer visible; parking lot for SOP change proposals (file tickets on `Practical-Office/bug-handling-sop`)

---

## Facilitator anti-patterns

| Avoid | Do instead |
| --- | --- |
| Using BookIQ live bugs as class drills | Use Exercise Lab + Paper Exercises |
| Collapsing Severity into old P1–P4 | Teach `severity/s*` + `priority/p*` |
| Skipping Spec axis in review demo | Force Standards ‖ Spec classification |
| Declaring every S1 a full postmortem | Thin Incident; Postmortem for outage-class only |
| Checkbox-only “you’re certified” | Require Evidence Pack + lead review |

---

**End of agenda**
