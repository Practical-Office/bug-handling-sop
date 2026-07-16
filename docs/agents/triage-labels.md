# Triage Labels

Canonical label vocabulary for bug handling on this project’s issue tracker and for product repos that adopt the Living SOP ([`docs/reference/BUG-HANDLING-SOP.md`](../reference/BUG-HANDLING-SOP.md) v2.0).

Skills speak in **roles**; this file maps roles to **exact label strings**. When a skill says “apply needs-triage,” use the tracker label in the right-hand column.

Glossary terms: [`CONTEXT.md`](../../CONTEXT.md) — **Severity**, **Priority**, **Triage State**, **Triage Category**.

---

## Triage Category (exactly one)

| Role in mattpocock/skills | Label in our tracker | Meaning |
| --- | --- | --- |
| `bug` | `bug` | Something is broken |
| `enhancement` | `enhancement` | New feature or improvement |

---

## Triage State (exactly one)

| Role in mattpocock/skills | Label in our tracker | Meaning |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | Maintainer needs to evaluate |
| `needs-info` | `needs-info` | Waiting on reporter for more information |
| `ready-for-agent` | `ready-for-agent` | Fully specified; ready for an AFK agent (brief attached) |
| `ready-for-human` | `ready-for-human` | Requires human implementation / judgment / access |
| `wontfix` | `wontfix` | Will not be actioned |

**State machine (summary)**

```text
unlabeled → needs-triage → (verify claim)
    ├─ needs-info ⇄ needs-triage   (~14d stale → close/nudge per Living SOP)
    ├─ ready-for-agent
    ├─ ready-for-human
    └─ wontfix
```

Work starts only at `ready-for-agent` or `ready-for-human`.

---

## Severity (impact — exactly one for bugs)

Workaround-aware definitions: Living SOP §5.1.

| Role / concept | Label in our tracker | Short meaning |
| --- | --- | --- |
| S1 Critical | `severity/s1` | Outage / data loss / active security risk / core flow blocked; no acceptable workaround |
| S2 Major | `severity/s2` | Significant breakage; workaround complex or partial |
| S3 Moderate | `severity/s3` | Limited / secondary impact; reasonable workaround |
| S4 Low | `severity/s4` | Cosmetic / polish / negligible impact |

**Triage SLAs:** `severity/s1` ≤ 1h · `severity/s2` ≤ 4h · S3/S4 normal cadence.

---

## Priority (scheduling — exactly one)

| Role / concept | Label in our tracker | Meaning |
| --- | --- | --- |
| P0 Now | `priority/p0` | Schedule now / interrupt |
| P1 Next | `priority/p1` | Current sprint / immediate queue |
| P2 Soon | `priority/p2` | Near-term backlog |
| P3 Later | `priority/p3` | When capacity allows |

Severity ≠ Priority. Do not use a mixed P1–P4 scale for impact.

---

## Creating labels (GitHub)

Example once per repo (adjust colors as desired):

```bash
# Category
gh label create bug --description "Triage category: defect" --color "d73a4a" || true
gh label create enhancement --description "Triage category: feature/improvement" --color "a2eeef" || true

# State
gh label create needs-triage --description "Triage state: needs evaluation" --color "fbca04" || true
gh label create needs-info --description "Triage state: waiting on reporter (~14d stale)" --color "e4e669" || true
gh label create ready-for-agent --description "Triage state: agent-ready with brief" --color "0e8a16" || true
gh label create ready-for-human --description "Triage state: needs human" --color "1d76db" || true
gh label create wontfix --description "Triage state: will not action" --color "ffffff" || true

# Severity
gh label create severity/s1 --description "Critical impact; no acceptable workaround" --color "b60205" || true
gh label create severity/s2 --description "Major impact; complex/partial workaround" --color "d93f0b" || true
gh label create severity/s3 --description "Moderate impact; reasonable workaround" --color "fbca04" || true
gh label create severity/s4 --description "Low / cosmetic impact" --color "fef2c0" || true

# Priority
gh label create priority/p0 --description "Schedule now" --color "b60205" || true
gh label create priority/p1 --description "Next / current sprint" --color "d93f0b" || true
gh label create priority/p2 --description "Soon / near-term backlog" --color "fbca04" || true
gh label create priority/p3 --description "When capacity allows" --color "c5def5" || true
```

This training repo may not need the full product Severity/Priority set on every teaching issue; product repos adopting the Living SOP should create the full set.

---

## Security

Security vulnerabilities use private advisory / private vulnerability reporting — not public exploit writeups on issues. Labels may still record Severity after private intake. See Living SOP §6.6.
