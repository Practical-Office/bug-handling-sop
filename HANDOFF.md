# Bug Handling SOP — Session Handoff

**Date:** 2026-07-16  
**Split complete:** Bug Handling course work is a standalone Cursor project linked to `Practical-Office/bug-handling-sop`.

---

## Open this workspace

1. **Folder:** `/Users/richardsawyers/work/p-ai/bug-handling-sop`
2. **Remote:** https://github.com/Practical-Office/bug-handling-sop.git
3. **Workspace file:** `bug-handling-sop.code-workspace`

```bash
/usr/local/bin/cursor -n /Users/richardsawyers/work/p-ai/bug-handling-sop
# or
/usr/local/bin/cursor -n /Users/richardsawyers/work/p-ai/bug-handling-sop/bug-handling-sop.code-workspace
```

Do **not** edit this course from the BML onboarding workspace.

---

## Live course

https://practical-office.github.io/bug-handling-sop/

**Local preview:** `cd docs && python3 -m http.server 4174`

---

## Living document

[`docs/reference/BUG-HANDLING-SOP.md`](docs/reference/BUG-HANDLING-SOP.md) is the source of truth. Course modules mirror it; edit the SOP as process grows.

---

## Course structure (Five-Module D-stack)

- Hub “Why” + **Setup** pre-req (`setup.html`) — not numbered
- **1** Report · **2** Triage · **3** Diagnosis · **4** Fix · **5** Review/Prevention
- Duration ≈ 2.5–3.5h (workshop ≈ 3h) — see [`docs/reference/WORKSHOP-AGENDA.md`](docs/reference/WORKSHOP-AGENDA.md)
- Evidence Pack cert: `docs/certification.html`
- Exercise Lab: `exercises/invoice-api`

---

## Recommended next steps

1. Confirm GitHub Pages: **Settings → Pages → Deploy from branch → `main` / `/docs`**
2. Open this folder in its own Cursor window
3. Run first facilitated workshop; collect gaps on [First cohort workshop feedback](https://github.com/Practical-Office/bug-handling-sop/issues) (see wayfinder map)
4. Keep wayfinder map updated on `Practical-Office/bug-handling-sop`
5. Phase 0/1 rollout: [`docs/system-analysis-report.md`](docs/system-analysis-report.md)

---

## Agent entry points

- [`AGENTS.md`](./AGENTS.md)
- [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md)
- [`docs/system-analysis-report.md`](docs/system-analysis-report.md)
- [`.cursor/rules/`](./.cursor/rules/)
