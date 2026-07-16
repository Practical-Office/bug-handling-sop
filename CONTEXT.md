# Bug Handling SOP Course

Shared language for the Bug Handling onboarding course and living process docs in this repo.

## Language

**Living SOP**:
The process source of truth for bug handling (`docs/reference/BUG-HANDLING-SOP.md`). Course modules must stay aligned with it.
_Avoid_: handbook, process doc (when meaning this file), training outline

**Published Course**:
The GitHub Pages HTML modules and hub under `docs/` that learners actually take.
_Avoid_: review draft, content spine (when meaning the live site)

**Content Draft**:
A non-published course content proposal used to feed rework of the Living SOP and Published Course. After publish, consumed drafts are archived under `docs/reference/archive/` with a superseded banner (e.g. `review001.md`).
_Avoid_: live course, source of truth, keeping superseded drafts beside the Living SOP without archive

**Post-Publish QA**:
A review pass after the first D publish to verify Living SOP ↔ Published Course ↔ Exercise Lab fidelity before treating the course as final for the team cohort.
_Avoid_: shipping without a planned QA pass, treating Content Draft as the QA artifact

**Rework Path**:
Build the full course stack as the first publish: Living SOP + Five-Module Published Course + Setup Pre-req + portable exercises/sample bugs + meaningful certification + printable/PDF path. No interim “B-phase only” compromise — the team has not taken the class yet.
_Avoid_: phased B-then-D compromise, HTML-only rework, keep-4-for-now

**Five-Module Course**:
The Published Course structure after rework: five numbered content modules — (1) Report, (2) Triage, (3) Diagnosis, (4) Fix, (5) Review/Prevention — plus hub intro (“Why”) and a Setup pre-req page, not numbered as modules.
_Avoid_: four-module course (as the target shape), hybrid Module 3, Setup as Module 0

**Setup Pre-req**:
The one-time skills install/config page (`setup.html`) learners complete before Module 1; not a numbered content module.
_Avoid_: Module 0, Setup module

**Diagnosis Loop**:
Matt Pocock’s six-phase `/diagnosing-bugs` workflow: feedback loop → reproduce+minimise → hypothesise → instrument → fix+regression test → cleanup+post-mortem. This is the mandatory diagnosis workflow in the Living SOP.
_Avoid_: “Reproduce first” as the top-level step list, ad-hoc debug, stare-then-patch

**Reproducibility First**:
The principle that we do not start fixing until we have a reliable red signal for the bug. Fulfilled by Diagnosis Loop Phases 1–2, not a separate competing workflow.
_Avoid_: Reproducibility First as a synonym for “write STR and start coding”

**Severity**:
User/business impact of a bug (how bad), independent of when engineering schedules the work. Labels: `severity/s1` … `severity/s4` (workaround-aware definitions in the Living SOP).
_Avoid_: Priority (when used to mean impact), P1–P4 as the impact field, bare `S1` labels

**Priority**:
Scheduling urgency — when the team plans to work the bug, given Severity and capacity. Labels: `priority/p0` … `priority/p3` (`priority/p0` = schedule now).
_Avoid_: Severity (when used to mean “do this now”), single mixed P-scale, bare `P1` for impact

**Triage State**:
Matt `/triage` workflow state on an issue: exactly one of `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, or `wontfix`. Work starts only at a `ready-for-*` state.
_Avoid_: “triaged” as a vague status, assign-before-confirm

**Triage Category**:
Matt `/triage` category role: exactly one of `bug` or `enhancement`.
_Avoid_: mixing type into severity labels

**Exercise Lab**:
The in-repo runnable sample (`exercises/…`) with intentional portable bugs used for Diagnosis/Fix practice — not product/BookIQ code.
_Avoid_: live product backlog as the Module 3/4 exercise, BookIQ issues for class drills

**Paper Exercise**:
A scenario writeup (report rewrite, severity/triage calibration, review critique) completed without running product code.
_Avoid_: calling paper drills the Exercise Lab

**Evidence Pack**:
The certification deliverable: self-attest plus linked proof — rewritten report (or Exercise A), Phase 1 command+output from Exercise Lab or real bug, and Root Cause + Prevention from a closed or lab ticket — reviewed by a lead.
_Avoid_: checkbox-only certification, graded quiz platform

**Workshop Agenda**:
A short in-repo facilitator plan (~3h) for running the Five-Module Course live; complements HTML/printable — not a slide deck.
_Avoid_: Marp/PPTX as a v1 deliverable

**Incident**:
A customer-visible outage, multi-team response, or concentrated investigation stuck beyond a short window — handled with live state notes and restore-first discipline, not the routine bug ticket flow alone.
_Avoid_: treating every Severity S1 as automatic full ICS, folding war-room roles into Module 3

**Postmortem**:
Blameless write-up with owned preventive actions and review, required for outage-class `severity/s1` Incidents — above-and-beyond ticket Root Cause + Prevention notes.
_Avoid_: postmortem for every routine bug
