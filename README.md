# Bug Handling SOP Onboarding

Shareable **Bug Handling** onboarding course for Practical AI teammates. Canonical process lives in the living SOP; the class site teaches it.

**Live course (GitHub Pages):** https://practical-office.github.io/bug-handling-sop/

**Living SOP:** [`docs/reference/BUG-HANDLING-SOP.md`](docs/reference/BUG-HANDLING-SOP.md)

**Systems analysis (Phase 0/1 rollout):** [`docs/system-analysis-report.md`](docs/system-analysis-report.md)

Branding matches Practical AI / BookIQ product chrome (dark sidebar, light canvas, `#FCBB48` accent) — same visual language as [BML onboarding](https://practical-office.github.io/bml-onboarding/).

## What’s in this repo

```text
bug-handling-sop/
├── README.md
├── AGENTS.md
├── HANDOFF.md
├── SECURITY.md
├── docs/
│   ├── index.html              ← course hub (GitHub Pages entry)
│   ├── setup.html              ← Setup pre-req (skills install; not numbered)
│   ├── module-1.html … module-5.html
│   ├── quick-reference.html    ← printable one-pager
│   ├── course-full.html        ← printable full course
│   ├── certification.html
│   ├── next-steps.html
│   ├── css/bug-handling.css
│   ├── js/bug-handling.js
│   ├── agents/                 ← issue-tracker + triage-labels for agents
│   ├── reference/
│   │   ├── BUG-HANDLING-SOP.md ← living SOP (edit as we grow)
│   │   ├── WORKSHOP-AGENDA.md
│   │   └── DEPLOY.md
│   └── system-analysis-report.md
├── exercises/
│   └── invoice-api/            ← Exercise Lab (Modules 3 & 4)
├── .github/
│   ├── ISSUE_TEMPLATE/         ← bug, feature, SOP-change, new-hire forms
│   └── PULL_REQUEST_TEMPLATE.md
└── scripts/
```

## Local preview

```bash
cd docs
python3 -m http.server 4174
```

Open http://localhost:4174/

Progress checklists persist in `localStorage` (`bug-handling-sop-progress-v2`). Use **Reset progress** in the top bar to clear.

## Deploy (GitHub Pages)

See [`docs/reference/DEPLOY.md`](docs/reference/DEPLOY.md).

## Contributing

Edit the living SOP when process changes. Keep modules aligned with the SOP. Propose SOP changes via a ticket on this repo.

**Agent / Cursor:** See [`AGENTS.md`](./AGENTS.md) and [`HANDOFF.md`](./HANDOFF.md). Issues: `Practical-Office/bug-handling-sop`.

**Team boards:** [Bug Report](https://github.com/orgs/Practical-Office/projects/1) · [Team Work](https://github.com/orgs/Practical-Office/projects/2) — see Setup page and [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md).
