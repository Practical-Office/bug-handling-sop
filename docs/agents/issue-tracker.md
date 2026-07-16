# Issue tracker: GitHub

All issues for this project live as **GitHub Issues** on **`Practical-Office/bug-handling-sop`**. Use the `gh` CLI for all skill-driven issue operations.

## Conventions

- **Create an issue**: `gh issue create --repo Practical-Office/bug-handling-sop --title "..." --body "..."`
- **Read an issue**: `gh issue view <number> --repo Practical-Office/bug-handling-sop --comments`
- **List issues**: `gh issue list --repo Practical-Office/bug-handling-sop --state open`
- **Comment**: `gh issue comment <number> --repo Practical-Office/bug-handling-sop --body "..."`
- **Labels**: `gh issue edit <number> --repo Practical-Office/bug-handling-sop --add-label "..."`
- **Close**: `gh issue close <number> --repo Practical-Office/bug-handling-sop --comment "..."`

Infer the repo from `git remote -v` when run inside this clone (`Practical-Office/bug-handling-sop`).

## Wayfinder map

The canonical wayfinder map is a single issue labelled `wayfinder:map`. Child tickets use `wayfinder:task`, `wayfinder:prototype`, `wayfinder:research`, or `wayfinder:grilling`.

Refer to tickets **by linked title**, not bare issue numbers, in map narration and handoffs.

## Product bugs (separate tracker)

Live product bug tickets remain on the owning product repo (e.g. **`Book-IQ/bookiqv1-rc`**). This repo holds the SOP, training course, and teaching templates — not production incidents.

## When a skill says "publish to the issue tracker"

Create or update a GitHub issue on `Practical-Office/bug-handling-sop`.
