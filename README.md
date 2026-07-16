# Bug Handling SOP Onboarding

Shareable **Bug Handling** onboarding course for Practical AI teammates. Canonical process lives in the living SOP; the class site teaches it.

**Live course (GitHub Pages):** https://practical-office.github.io/bug-handling-sop/

**Living SOP:** [`docs/reference/BUG-HANDLING-SOP.md`](docs/reference/BUG-HANDLING-SOP.md)

Branding matches Practical AI / BookIQ product chrome (dark sidebar, light canvas, `#FCBB48` accent) — same visual language as [BML onboarding](https://practical-office.github.io/bml-onboarding/).

## What’s in this repo

```text
bug-handling-sop/
├── README.md
├── AGENTS.md
├── docs/
│   ├── index.html              ← course hub (GitHub Pages entry)
│   ├── module-1.html … module-4.html
│   ├── quick-reference.html    ← printable one-pager
│   ├── course-full.html        ← printable full course
│   ├── certification.html
│   ├── css/bug-handling.css
│   ├── js/bug-handling.js
│   ├── assets/                 ← favicon + Practical AI mark
│   └── reference/
│       └── BUG-HANDLING-SOP.md ← living SOP (edit as we grow)
├── .github/ISSUE_TEMPLATE/bug-report.md
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
