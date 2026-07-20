# Team Work board setup

Configure [Team Work](https://github.com/orgs/Practical-Office/projects/2) so each teammate’s **BML**, **Update**, and **Bug** work is visible. GitHub does not expose view creation via API — an org admin applies these steps once in the project UI.

**See also:** [`issue-tracker.md`](issue-tracker.md) (org boards + daily use) · [`setup.html`](../setup.html) (course Step 3) · [`scripts/team-work-project-readme.md`](../../scripts/team-work-project-readme.md) (short readme to paste into the GitHub Project)

**Prerequisites:** Project fields **Ticket Type** (BML | Update | Bug), **Status**, **Priority**, and **Assignees** already exist.

**Org members (2026-07):** `james-p-ai`, `rich-p-ai`, `zmac22` — extend views when headcount grows.

---

## Required on every card

| Field | Rule |
| --- | --- |
| **Assignees** | Exactly one owner (the teammate doing the work) |
| **Ticket Type** | BML \| Update \| Bug |
| **Status** | Backlog → Ready → In Progress → In Review → Done |
| **Priority** | P0–P3 when in Ready or In Progress |

**Bug** tickets: also add to [Bug Report](https://github.com/orgs/Practical-Office/projects/1) when you want triage lifecycle tracking.

---

## View 1 — Team roster (default table)

**Purpose:** See everyone’s open work by person and ticket type.

1. Open Team Work → **…** → duplicate **View 1** or edit it.
2. **Rename:** `Team roster`
3. **Layout:** Table
4. **Fields (columns):** Title, Assignees, Ticket Type, Status, Priority, Repository
5. **Group by:** Assignees
6. **Filter:** `-status:Done` (or `is:open`)
7. **Sort:** Priority (desc), then Status
8. Set as **default view** (pin for landing URL)

---

## View 2 — Kanban by status (team)

**Purpose:** Shared sprint board; slice shows who owns each card.

1. **Rename:** `Kanban — by status`
2. **Layout:** Board
3. **Group by:** Status (Backlog | Ready | In Progress | In Review | Done)
4. **Slice by:** Assignees (one swimlane per teammate + Unassigned)
5. **Filter:** `-status:Done`
6. **Sort:** Priority (desc)

---

## View 3 — By person × ticket type (optional table)

**Purpose:** Scan BML vs Update vs Bug load per person.

1. **New view** → **Table**
2. **Rename:** `Load by type`
3. **Group by:** Assignees
4. **Slice by:** Ticket Type (BML | Update | Bug)
5. **Filter:** `-status:Done`
6. **Columns:** Title, Status, Priority

---

## View 4 — My work (each teammate)

**Purpose:** Personal daily queue.

1. **New view** → **Board**
2. **Rename:** `My work`
3. **Group by:** Status
4. **Filter:** `assignee:@me -status:Done`
5. **Sort:** Priority (desc)

Each person bookmarks this view (filter resolves to their login).

---

## Per-teammate filtered views (optional)

Duplicate **View 4** for leads who manage others:

| View name | Filter |
| --- | --- |
| `James` | `assignee:james-p-ai -status:Done` |
| `Rich` | `assignee:rich-p-ai -status:Done` |
| `Zac` | `assignee:zmac22 -status:Done` |

Layout: Board, group by Status, columns include Ticket Type.

---

## Link to Bug Report

Team Work does **not** auto-sync with Bug Report. For **Ticket Type = Bug**:

1. File on the product repo (e.g. `Book-IQ/bookiqv1-rc`)
2. Add to **Team Work** (capacity) — set Assignee + Ticket Type **Bug**
3. Add to **Bug Report** (triage) — optional but recommended for defects

Bug Report readme: https://github.com/orgs/Practical-Office/projects/1

---

## Verify

- [ ] Every open Team Work card has **Assignee** + **Ticket Type**
- [ ] Team roster table groups by Assignee and shows BML / Update / Bug mix
- [ ] Kanban slice by Assignees shows who owns In Progress work
- [ ] Bug cards that need triage also appear on Bug Report
