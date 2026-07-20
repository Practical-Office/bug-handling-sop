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

## Org Projects (boards)

| Board | URL | Purpose |
| --- | --- | --- |
| **Bug Report** | https://github.com/orgs/Practical-Office/projects/1 | Bug lifecycle: Needs Triage → Needs Info → Ready → In Progress → Done |
| **Team Work** | https://github.com/orgs/Practical-Office/projects/2 | Per-teammate BML \| Update \| Bug; see [`team-work-board.md`](team-work-board.md) |

### Bug Report columns (Status)

- **Needs Triage** — new / unconfirmed (`needs-triage`)
- **Needs Info** — waiting on reporter (`needs-info`)
- **Ready** — `ready-for-agent` or `ready-for-human`
- **In Progress** — diagnosis or fix underway
- **Done** — closed with Root Cause + Prevention (bugs)

### Project workflows (label → Status)

Configure in GitHub Projects UI (org admin):

| Trigger | Status column |
| --- | --- |
| Label `needs-triage` | Needs Triage |
| Label `needs-info` | Needs Info |
| Label `ready-for-agent` or `ready-for-human` | Ready |
| Issue closed | Done |
| Label `class-example` | Set **Example** = Class example (keep off Team Work Ready) |

### Daily use (Team Work)

Track **BML**, **Update**, and **Bug** work **per assignee**:

1. Every card: **Assignees** (one owner) + **Ticket Type** (BML | Update | Bug) + **Status**
2. **My work** view — filter `assignee:@me -status:Done`; In Progress = current work
3. **Team roster** table — group by **Assignees**; columns include Ticket Type and Priority
4. **Kanban — by status** — group by Status, **slice by Assignees** to see who owns each column
5. **Bug** type → also add to Bug Report board when triage tracking is needed

Full view setup (UI): [`team-work-board.md`](team-work-board.md). Short project readme (paste into GitHub Project): [`scripts/team-work-project-readme.md`](../../scripts/team-work-project-readme.md)

### Product bugs

1. File on the **owning product repo** (e.g. `Book-IQ/bookiqv1-rc`, `Book-IQ/frs`)
2. Optionally add the issue to **Bug Report** board for visibility
3. Do **not** file production incidents only on `bug-handling-sop`

## Wayfinder map

The canonical wayfinder map is a single issue labelled `wayfinder:map`. Child tickets use `wayfinder:task`, `wayfinder:prototype`, `wayfinder:research`, or `wayfinder:grilling`.

Refer to tickets **by linked title**, not bare issue numbers, in map narration and handoffs.

## Product bugs (separate tracker)

Live product bug tickets remain on the owning product repo (e.g. **`Book-IQ/bookiqv1-rc`**). This repo holds the SOP, training course, and teaching templates — not production incidents.

## When a skill says "publish to the issue tracker"

Create or update a GitHub issue on `Practical-Office/bug-handling-sop`.
