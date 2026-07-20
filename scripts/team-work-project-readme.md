# Team Work board

**Purpose:** Track each teammate’s **BML**, **Update**, and **Bug** work in one place. Paste this into the [Team Work](https://github.com/orgs/Practical-Office/projects/2) project readme field; full view setup lives in the repo.

**Related:** [Bug Report](https://github.com/orgs/Practical-Office/projects/1) — defect triage lifecycle (add Bug cards there too). Org boards overview: [issue-tracker.md](https://github.com/Practical-Office/bug-handling-sop/blob/main/docs/agents/issue-tracker.md).

## Ticket Type (required on every card)

| Type | Use for |
| --- | --- |
| **BML** | Build–Measure–Learn experiments, onboarding course work |
| **Update** | Docs, process, non-defect improvements |
| **Bug** | Defects — also add to Bug Report when triage tracking helps |

## Status columns

Backlog → Ready → In Progress → In Review → Done

## Required fields

1. **Assignees** — one owner per card
2. **Ticket Type** — BML \| Update \| Bug
3. **Priority** — when Ready or In Progress

## Recommended views (configure in UI)

| View | Layout | Group by | Slice by | Filter |
| --- | --- | --- | --- | --- |
| **Team roster** (default) | Table | Assignees | — | `-status:Done` |
| **Kanban — by status** | Board | Status | Assignees | `-status:Done` |
| **Load by type** | Table | Assignees | Ticket Type | `-status:Done` |
| **My work** | Board | Status | — | `assignee:@me -status:Done` |

Full setup steps: [team-work-board.md](https://github.com/Practical-Office/bug-handling-sop/blob/main/docs/agents/team-work-board.md) in bug-handling-sop.

## Daily use

1. **My work** view → In Progress = what I am doing now
2. **Team roster** → leads see everyone’s BML / Update / Bug mix
3. New card → set Assignee + Ticket Type before moving to Ready
