# Bug Handling SOP

**Version:** 2.0  
**Last Updated:** July 16, 2026  
**Owner:** Practical AI Engineering  
**Purpose:** Living process source of truth for reporting, triaging, diagnosing, fixing, and closing bugs with Cursor and Matt Pocock skills. The Published Course (Five-Module Course) must stay aligned with this document.

**Glossary:** Shared terms live in [`CONTEXT.md`](../../CONTEXT.md). Use those exact names in tickets, training, and agent work.

**Related:**

| Artifact | Path / URL |
| --- | --- |
| ADR (Five-Module D-stack) | [`docs/adr/0001-five-module-d-stack-course.md`](../adr/0001-five-module-d-stack-course.md) |
| Triage label map | [`docs/agents/triage-labels.md`](../agents/triage-labels.md) |
| Issue tracker | [`docs/agents/issue-tracker.md`](../agents/issue-tracker.md) |
| Teaching bug template | [`.github/ISSUE_TEMPLATE/bug-report.md`](../../.github/ISSUE_TEMPLATE/bug-report.md) |
| Published Course | https://practical-office.github.io/bug-handling-sop/ |
| Peer triage research | [`docs/research/peer-bug-triage-sops.md`](../research/peer-bug-triage-sops.md) |

---

## 1. Goals

- Reduce time-to-resolution without sacrificing root-cause quality
- Make every bug actionable: structured report, confirmed claim, ranked diagnosis, tested fix
- Separate **Severity** (impact) from **Priority** (scheduling)
- Enforce TDD and two-axis code review on production bug fixes
- Close every ticket with **Root Cause** + **Prevention**
- Build shared muscle memory with Matt skills (`mattpocock/skills`)
- Improve measurable intake quality, regression coverage, and recurrence rate

---

## 2. Core Principles

1. **Reproducibility First** — Do not start fixing until we have a reliable red signal for the bug. This is a *principle*, fulfilled by Diagnosis Loop Phases 1–2 — not a competing top-level workflow that replaces Matt’s six phases.
2. **Skills-Driven** — Major steps use Matt Pocock skills: `/triage`, `/diagnosing-bugs`, `/tdd`, `/code-review` (plus grill skills when intake is vague).
3. **Documentation Discipline** — Every closed production bug includes Root Cause + Prevention notes on the ticket.
4. **No Shortcuts** — `/tdd` and `/code-review` (Standards ‖ Spec) are mandatory for production bug fixes.
5. **Continuous Improvement** — Review this Living SOP quarterly; calibrate Severity/Priority after major misses.

---

## 3. End-to-End Flow

```text
Report (template)
  → optional /grill-me | /grill-with-docs
  → /triage (category + state + Severity + Priority)
  → ready-for-agent | ready-for-human
  → /diagnosing-bugs (six phases; feedback loop first)
  → /tdd (fix at agreed seams)
  → PR → /code-review (Standards ‖ Spec)
  → QA verifies
  → Root Cause + Prevention → Close
  → (outage-class severity/s1) thin Incident + Postmortem
```

Work starts only when Triage State is `ready-for-agent` or `ready-for-human`.

---

## 4. Bug Reporting Standard (Mandatory Template)

All bug reports **must** use this template. Incomplete tickets are returned or moved to `needs-info` — do not guess missing fields.

```markdown
**Title:** [Clear, concise description]

**Environment**
- Browser / OS / Version:
- Backend / API version:
- User role / permissions:
- Other relevant context (device, network, etc.):

**Reproduction Steps**
1.
2.
3.

**Expected Behavior**
[What should happen]

**Actual Behavior**
[What actually happens]

**Logs / Screenshots / Video**
[Attach or link here]

**Business / User Impact**
[Who is affected and how severely; note any workaround]

**Suggested Severity** (optional)
[severity/s1 … severity/s4 — triage confirms]

**Suggested Priority** (optional)
[priority/p0 … priority/p3 — triage confirms]
```

**Tips for great reports**

- Make reproduction steps as short and reliable as possible.
- Include “before” and “after” states when relevant.
- Note workarounds (or “no workaround”) — they affect Severity.
- Use `/grill-me` or `/grill-with-docs` with the reporter when the story is incomplete.

Teaching copy of this template: [`.github/ISSUE_TEMPLATE/bug-report.md`](../../.github/ISSUE_TEMPLATE/bug-report.md).

---

## 5. Severity and Priority

**Severity** = user/business impact (how bad).  
**Priority** = scheduling urgency (when we plan to work it), given Severity and capacity.

Do **not** collapse these into a single P1–P4 impact scale. Label strings are canonical — see [`docs/agents/triage-labels.md`](../agents/triage-labels.md).

### 5.1 Severity (`severity/s1` … `severity/s4`) — workaround-aware

| Label | Meaning | Workaround lens |
| --- | --- | --- |
| `severity/s1` | Critical: production outage, data loss/corruption, security vulnerability with active risk, or core user flow blocked for many users | **No acceptable workaround** (or workaround is unsafe / destroys data) |
| `severity/s2` | Major: significant functionality broken for many users, or severe degradation of a primary workflow | Workaround exists but is **complex, costly, or partial** |
| `severity/s3` | Moderate: limited users, secondary paths, or non-critical features impaired | **Reasonable workaround** available |
| `severity/s4` | Low: cosmetic, typos, polish, minor UX friction | Workaround trivial or impact negligible |

**Calibration**

- When unsure between two severities, **overestimate briefly**, then confirm with a domain expert — do not leave hot bugs under-labeled.
- Security impact may be `severity/s1` or `severity/s2`, but **disclosure uses the private path** (§6.4) — never paste exploit details into public issues.

### 5.2 Priority (`priority/p0` … `priority/p3`)

| Label | Meaning |
| --- | --- |
| `priority/p0` | Schedule **now** — drop / interrupt current work |
| `priority/p1` | Next — current sprint / immediate queue |
| `priority/p2` | Soon — planned backlog (near term) |
| `priority/p3` | When capacity allows |

Typical pairing (guidance, not automatic):

| Severity | Common Priority |
| --- | --- |
| `severity/s1` | Usually `priority/p0` or `priority/p1` |
| `severity/s2` | Often `priority/p1` or `priority/p2` |
| `severity/s3` | Often `priority/p2` or `priority/p3` |
| `severity/s4` | Usually `priority/p3` |

A high-Severity bug can still wait if mitigated; a lower-Severity bug can be `priority/p0` when it blocks a release or customer commitment.

### 5.3 Triage SLAs (by Severity)

| Severity | First triage response |
| --- | --- |
| `severity/s1` | ≤ **1 hour** |
| `severity/s2` | ≤ **4 hours** |
| `severity/s3` / `severity/s4` | Normal triage cadence (daily skim; full triage within the working week) |

### 5.4 Resolution targets (lightweight)

Optional planning targets — track in metrics; do not invent process theater:

| Severity | Target direction |
| --- | --- |
| `severity/s1` | Mitigate ASAP; aim to resolve or permanently mitigate on the current release path |
| `severity/s2` | Resolve in the near-term planning window (days–weeks, not quarters) |

S3/S4 use normal backlog discipline.

---

## 6. Triage Process

Triage is **confirmation + routing**, not “add a label and hope.” Use `/triage` where available. Label map: [`docs/agents/triage-labels.md`](../agents/triage-labels.md).

### 6.1 Triage Category (exactly one)

| Label | Meaning |
| --- | --- |
| `bug` | Something is broken |
| `enhancement` | New feature or improvement (not a defect) |

### 6.2 Triage State (exactly one)

| Label | Meaning |
| --- | --- |
| `needs-triage` | Maintainer must evaluate |
| `needs-info` | Waiting on reporter |
| `ready-for-agent` | Fully specified; agent-ready brief attached |
| `ready-for-human` | Needs human judgment, access, or design |
| `wontfix` | Will not action (with reason) |

**Typical flow**

```text
unlabeled → needs-triage → (verify claim / repro)
    ├─ needs-info ⇄ needs-triage
    ├─ ready-for-agent  (+ agent brief)
    ├─ ready-for-human  (+ human brief)
    └─ wontfix          (duplicate / already implemented / rejected / support)
```

AI-generated triage comments **must** start with:

```markdown
> *This was generated by AI during triage.*
```

### 6.3 Triage steps

1. Ensure the report template is complete enough to evaluate (else `needs-info`).
2. Apply **exactly one** Triage Category and **exactly one** Triage State.
3. Apply **Severity** (`severity/s1`–`severity/s4`) and **Priority** (`priority/p0`–`priority/p3`).
4. Add component/area labels (e.g. `auth`, `dashboard`, `mobile`).
5. **Verify the claim** — for bugs: reproduce from STR or agree the STR is sufficient. Outcomes: confirmed / failed / insufficient detail.
6. Route: assign owner, place on backlog, or attach agent/human brief for `ready-for-*`.
7. Deduplicate against open/closed issues; close duplicates as `wontfix` with a pointer to the canonical ticket.

### 6.4 Needs-info stale policy (~14 days)

1. Request missing information once using the needs-info template (below).
2. Nudge if there is no reply after ~7 days.
3. If **~14 days** pass with no reporter reply, **close** (or re-close) with a polite note that the ticket can be reopened when details arrive.
4. When the reporter replies, move `needs-info` → `needs-triage` and re-evaluate.

**Needs-info template**

```markdown
## Triage Notes

**What we've established so far:**

- point 1
- point 2

**What we still need from you (@reporter):**

- question 1
- question 2
```

### 6.5 Non-bug routing

Keep the bug queue for defects. Route other intake quickly:

| Signal | Action |
| --- | --- |
| Duplicate | `wontfix` + link to canonical issue |
| Support / how-to / question | Close or redirect to support channel; not `bug` work |
| Feature request | Category `enhancement` (not severity theater on a fake bug) |
| Already implemented | `wontfix` + pointer to code/docs |
| Out of scope / rejected enhancement | `wontfix` + record in `.out-of-scope/` per Matt triage skill |

### 6.6 Security — private advisory path

Do **not** file public issues with exploit details, secrets, or reproducible attack steps.

- Prefer the repository’s private vulnerability reporting / security advisory flow (GitHub private reporting and/or `SECURITY.md` where present).
- Triage may still assign high Severity once the report is in the private channel.
- Public tickets, if any, stay high-level (“security issue under private advisory”) without payload.

---

## 7. Diagnosis Loop (`/diagnosing-bugs`)

Mandatory diagnosis workflow for hard bugs and performance regressions. **Six phases — feedback loop first.** Skip a phase only when explicitly justified.

**Reproducibility First** is satisfied when Phases 1–2 produce a tight, red-capable, minimized signal. Do not replace this section with a “reproduce then patch” shortcut list.

Read `CONTEXT.md` and relevant ADRs before deep exploration.

### Phase 1 — Build a feedback loop

**This is the skill.** Goal: **one command** you have already run that is:

- **Red-capable** — asserts the reporter’s exact symptom (not merely “didn’t crash”)
- **Deterministic** (or high enough repro rate for flakes)
- **Fast** — seconds, not minutes
- **Agent-runnable** (HITL only via a structured harness if a human must click)

Construct loops aggressively (failing test, curl/script, CLI fixture, headless browser, trace replay, throwaway harness, fuzz, bisect, differential, HITL last). Tighten until sharp.

If you cannot build a loop: stop, list attempts, ask for env/artifacts/instrumentation permission. **Do not hypothesise without a loop.**

### Phase 2 — Reproduce + minimise

Run the loop red. Confirm it shows the **user’s** failure mode. Shrink until every remaining element is load-bearing.

### Phase 3 — Hypothesise

Write **3–5 ranked, falsifiable** hypotheses *before* testing any. Format: *If X is the cause, then Y will make the bug disappear / worsen.* Show the ranked list to the user when practical.

### Phase 4 — Instrument

Each probe maps to a prediction. Change **one variable at a time**. Prefer debugger/REPL → targeted tagged logs (`[DEBUG-…]`) → never “log everything.” Perf bugs: measure first, then bisect.

### Phase 5 — Fix + regression test

Prefer writing the regression test **before** the fix when a **correct seam** exists (exercises the real bug pattern at the call site). Then apply the fix with `/tdd` (§8). Re-run the original Phase 1 loop (un-minimised). If no correct seam exists, document that finding for architecture follow-up.

### Phase 6 — Cleanup + post-mortem (ticket-level)

- Original Phase 1 loop green  
- Regression test passes (or seam absence documented)  
- Debug instrumentation and throwaway harnesses removed  
- Winning hypothesis stated in PR/commit  
- Ask what would have prevented this; file architecture follow-ups separately if needed  

---

## 8. Fix (`/tdd`)

Production bug fixes use `/tdd` — red → green → refactor in **vertical slices** at agreed seams.

**Rules that matter for bugs**

1. Confirm seams with the human before large test scaffolds.
2. Prefer a failing regression test that encodes the minimized repro (when a correct seam exists).
3. Minimal fix — do not bundle speculative refactors into the bug PR.
4. After green: re-run the original Diagnosis Loop Phase 1 command.
5. Keep the winning hypothesis visible in the PR description.

Recommended sequence once Triage State is `ready-for-*`:

1. Acknowledge / set in progress.
2. Run `/diagnosing-bugs` through a red Phase 1 (+ minimise).
3. Agree seams; implement fix with `/tdd`.
4. Document findings on the ticket as you go.

---

## 9. Code Review, Closure & Prevention

### 9.1 Review (`/code-review`)

Mandatory for production bug PRs. Run **two axes in parallel** — do not merge or re-rank findings across axes:

| Axis | Question |
| --- | --- |
| **Standards** | Does the diff follow repo coding standards and smell baseline? |
| **Spec** | Does the diff faithfully fix the originating issue (right behavior)? |

Pin a fixed point (`main`, merge-base, or SHA); confirm a non-empty three-dot diff; identify standards + spec sources; aggregate under separate headings.

### 9.2 Closure checklist

1. Open PR referencing the ticket; state the winning hypothesis.
2. Run `/code-review` (Standards ‖ Spec); address feedback.
3. Update the ticket with Root Cause + Prevention (template below).
4. **QA verifies** the fix (Fixed → Verified) before true close.
5. Close ticket and PR.
6. File follow-ups (architecture, monitoring, docs) as separate tickets when needed.

### 9.3 Root Cause + Prevention (mandatory)

```markdown
## Closure

**Root Cause:**
[Mechanism — what broke and why. Prefer causal detail over labels like “null pointer.”]

**Prevention:**
- [ ] Regression test at seam: …
- [ ] Guard / validation: …
- [ ] Docs / CONTEXT.md term clarified: …
- [ ] Follow-up architecture ticket (if seam missing): …
```

### 9.4 Evidence Pack (course certification)

For the Published Course, certification uses an **Evidence Pack** (not checkbox-only): self-attest plus linked proof — rewritten report (or Paper Exercise), Phase 1 command+output from the Exercise Lab or a real bug, and Root Cause + Prevention from a closed or lab ticket — reviewed by a lead. See the course certification page after publish.

---

## 10. Incident and Postmortem (thin rules)

Most bugs follow §§4–9 only. Escalate to **Incident** handling when:

- Customer-visible outage or data loss  
- Multi-team response required  
- Concentrated investigation stuck beyond a short window without restore path  
- On-call / monitoring failure that hid the issue  

**Incident (thin)**

- Declare explicitly; restore service **first**, deep RCA second.
- Keep a live state note (what’s known, what’s tried, next action, owner).
- Do **not** fold full ICS / war-room role theatre into routine Diagnosis Loop work.

**Postmortem**

- Required for **outage-class** `severity/s1` Incidents (and similar SRE-style triggers: user-visible downtime, data loss, on-call intervention, long time-to-mitigate, monitoring miss).
- Blameless write-up with **owned** preventive actions and a review pass — above-and-beyond ticket Root Cause + Prevention.
- Routine bugs: ticket RCA + Prevention is enough; do not require a Postmortem for every `severity/s1` label if it was not an Incident.

---

## 11. Skills Setup (One-Time / Setup Pre-req)

Learners complete the **Setup Pre-req** (`setup.html` on the Published Course) before Module 1.

1. Install Matt Pocock skills:

   ```bash
   npx skills@latest add mattpocock/skills
   ```

2. Select the bug-handling set (at minimum): `diagnosing-bugs`, `tdd`, `triage`, `code-review`, `grill-me` / `grill-with-docs`, and **`setup-matt-pocock-skills`**.
3. Target **Cursor** (and other agents as needed).
4. Run `/setup-matt-pocock-skills` once per repo (issue tracker, triage label vocabulary, domain docs layout).
5. Confirm [`docs/agents/issue-tracker.md`](../agents/issue-tracker.md) and [`docs/agents/triage-labels.md`](../agents/triage-labels.md) match this Living SOP.

| Skill | Role |
| --- | --- |
| `/setup-matt-pocock-skills` | One-time repo configuration |
| `/grill-me` / `/grill-with-docs` | Clarify vague reports / plans |
| `/triage` | Category, state, verify, brief, route |
| `/diagnosing-bugs` | Diagnosis Loop (six phases) |
| `/tdd` | Red → green vertical slices |
| `/code-review` | Parallel Standards ‖ Spec |
| `/ask-matt` | “Which skill should I use?” |

---

## 12. Training Outline — Five-Module Course

**Published Course structure** (hub “Why” + Setup Pre-req + five numbered modules):

| Piece | Content | Notes |
| --- | --- | --- |
| Hub intro | **Why** good bug process matters | Not a numbered module |
| **Setup Pre-req** | Skills install + `/setup-matt-pocock-skills` | `setup.html` — complete before Module 1 |
| **Module 1 — Report** | Mandatory template, weak vs strong reports, grill skills | Paper Exercise OK |
| **Module 2 — Triage** | Severity + Priority, Triage State/Category, SLAs, security path | Paper Exercise OK |
| **Module 3 — Diagnosis** | Diagnosis Loop deep dive (Phase 1 first) | Exercise Lab |
| **Module 4 — Fix** | `/tdd`, seams, minimal fix | Exercise Lab |
| **Module 5 — Review / Prevention** | `/code-review`, RCA + Prevention, Incident/Postmortem thin, metrics | Evidence Pack path |

**Duration:** ~2.5–3.5 hours full program (self-paced or workshop).  
**Workshop Agenda:** facilitator plan (~3h) lives with the course materials after publish.  
**Exercise Lab:** in-repo portable sample under `exercises/` — not product/BookIQ backlog.  
**Certification:** Evidence Pack + lead review (§9.4).

Post-training: each engineer completes 1–2 real bugs with the full process; monthly bug-process retro; quarterly Living SOP review.

---

## 13. Metrics

Track (prefer Severity labels; do not use a mixed P1–P4 impact scale as the primary dimension):

| Metric | Why |
| --- | --- |
| Avg time report → fix (by `severity/s*`) | Velocity vs impact |
| % bugs meeting triage SLAs (S1 ≤1h, S2 ≤4h) | Hot-path responsiveness |
| % bugs with reproduction steps / red Phase 1 command recorded | Intake + diagnosis quality |
| % fixes with regression tests | Prevention muscle |
| Recurring bug rate (same class) | Are Prevention notes working? |
| `needs-info` close rate / age | Stale intake health |
| Team feedback on process | SOP fitness |

**Cadence:** engineer homework post-training; monthly process retro; quarterly Living SOP review; Severity/Priority calibration after major misses.

---

## 14. Updating This Document

This is a living document. Propose improvements via a ticket on `Practical-Office/bug-handling-sop` using this same process. Course modules must be updated when process wording here changes.

**Approval:** Team lead + engineering manager.

---

**End of Document**
