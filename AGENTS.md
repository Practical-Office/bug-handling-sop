# Bug Handling SOP Onboarding — Cursor Agent Doctrine

> **Canonical repo:** [`Practical-Office/bug-handling-sop`](https://github.com/Practical-Office/bug-handling-sop) — shareable Bug Handling SOP, onboarding course, and teaching templates. Do not commit this course work to `Book-IQ/bookiqv1-rc` or `Practical-Office/bml-onboarding`.

## Destination

Ship and maintain a public **Bug Handling** onboarding course (GitHub Pages + living SOP) so Practical AI teammates report, triage, diagnose, fix, and close bugs with a shared Cursor-skills workflow.

## Issue tracker

All wayfinder map tickets and course work issues live on **`Practical-Office/bug-handling-sop`**. See [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md).

Product bugs and live BookIQ issues stay on **`Book-IQ/bookiqv1-rc`** (or the owning product repo) — out of scope for this workspace unless explicitly scoped.

## Hard rules

1. **Living SOP** is [`docs/reference/BUG-HANDLING-SOP.md`](docs/reference/BUG-HANDLING-SOP.md) — edit it as process evolves; course modules should stay aligned.
2. **Reproducibility first** — if it cannot be reproduced, do not start fixing.
3. **Skills-driven** — diagnosis uses `/diagnosing-bugs`; fixes use `/tdd`; review uses `/code-review`.
4. **Documentation discipline** — every closed bug includes root cause + prevention notes.
5. **Do not edit BookIQ product code, ledger, or live product issues** from this training workspace.
6. **Course structure:** 4 modules for now; Module 3 may split later if it grows.

## Skills

Use Matt/Cursor skills: `/diagnosing-bugs`, `/tdd`, `/code-review`, `/grill-with-docs`, `/grilling`, `/triage` (when available), `/wayfinder` as ticket type requires.

## Live course

**Pages:** https://practical-office.github.io/bug-handling-sop/

**Local preview:** `cd docs && python3 -m http.server 4174`

## Reference layout

| Path | Purpose |
|------|---------|
| `docs/index.html` | Course hub (GitHub Pages entry) |
| `docs/module-*.html` | Modules 1–4 |
| `docs/quick-reference.html` | Printable one-pager (template + severity) |
| `docs/course-full.html` | Printable full course |
| `docs/reference/BUG-HANDLING-SOP.md` | Living SOP (source of truth) |
| `.github/ISSUE_TEMPLATE/bug-report.md` | Teaching copy of bug report template |
