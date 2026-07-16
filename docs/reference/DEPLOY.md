# Deploy — GitHub Pages

**Site:** https://practical-office.github.io/bug-handling-sop/

## Prerequisites

- Repo: `Practical-Office/bug-handling-sop`
- Site source: `/docs` folder on `main`

## One-time GitHub Pages setup

1. Repo **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: **main** · Folder: **/docs**
4. Save — first deploy may take 1–3 minutes

## Verify deploy

```bash
# After push to main
curl -sI https://practical-office.github.io/bug-handling-sop/ | head -5
```

Open in browser:

- Hub: https://practical-office.github.io/bug-handling-sop/
- Quick ref: https://practical-office.github.io/bug-handling-sop/quick-reference.html
- Module 1: https://practical-office.github.io/bug-handling-sop/module-1.html

## Local preview

```bash
cd docs && python3 -m http.server 4174
# http://localhost:4174/
```

## What triggers redeploy

Any push to `main` that changes files under `docs/` (or Pages config).

## Printable PDF

1. Open https://practical-office.github.io/bug-handling-sop/course-full.html
2. Browser **Print** → **Save as PDF**

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on new page | Confirm file is under `docs/` and pushed to `main` |
| Stale content | Hard refresh; Pages build can lag ~1 min |
| Broken asset path | Use relative paths from `docs/` (e.g. `css/bug-handling.css`) |
