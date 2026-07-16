# Bug Handling SOP & Team Training Program

**Version:** 1.0 (Draft)  
**Last Updated:** July 16, 2026  
**Owner:** Practical AI Engineering  
**Purpose:** This document serves as the single source of truth for our standardized bug handling process. It combines a formal SOP with training materials so the entire team operates with consistency, speed, and high quality using Cursor + Matt Pocock's skills repository.

This MD is designed to be shared with AI agents (Cursor, Claude, Grok, etc.) as a project guide. Feel free to update it iteratively.

---

## 1. Goals of This Process

- Reduce time-to-resolution for bugs
- Improve reproducibility and root cause analysis
- Enforce testing and prevention of regressions
- Build team muscle memory with Cursor skills
- Create measurable improvement in bug quality and velocity

---

## 2. Core Principles

- **Reproducibility First:** If we can't reliably reproduce it, we don't start fixing it.
- **Skills-Driven:** Every major step uses Matt Pocock's skills (`mattpocock/skills`).
- **Documentation Discipline:** Every ticket must end with root cause + prevention notes.
- **No Shortcuts:** TDD and code review are mandatory for all production bugs.
- **Continuous Improvement:** Review this SOP quarterly.

---

## 3. Bug Reporting Standard (Mandatory Template)

All bug reports **must** use this exact template. Tickets missing required sections will be returned for completion.

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
[Who is affected and how severely]
```

**Tips for Great Reports:**
- Make reproduction steps as short and reliable as possible.
- Include "before" and "after" states when relevant.
- Use `/grill-me` or `/grill-with-docs` with the reporter if clarification is needed.

---

## 4. Triage Process

1. **Severity Levels** (apply label):
   - **P1 (Blocker)**: Production outage, security issue, or blocks core user flows. Triage within **1 hour**.
   - **P2 (Major)**: Significant functionality broken for many users. Triage within **4 hours**.
   - **P3 (Minor)**: Affects limited users or non-critical paths.
   - **P4 (Cosmetic)**: Visual glitches, typos, low-impact UX issues.

2. Add component/area labels (e.g., `auth`, `dashboard`, `mobile`).
3. Assign to appropriate developer or move to **Backlog**.
4. Use `/triage` skill where available.

---

## 5. Diagnosis & Fixing Workflow

**Mandatory Skills to Use:**
- `/diagnosing-bugs` — Core diagnostic loop:
  1. Reproduce
  2. Minimize test case
  3. Hypothesize
  4. Instrument / add logging
  5. Fix
  6. Regression test

- `/tdd` — Red → Green → Refactor for every fix.

**Step-by-Step:**
1. Acknowledge ticket and set status to "In Progress".
2. Run `/diagnosing-bugs`.
3. Create minimal reproduction if needed.
4. Implement fix using TDD.
5. Add or update relevant tests.
6. Document findings in the ticket.

---

## 6. Code Review & Closure

1. Open PR with clear description referencing the ticket.
2. Run `/code-review` skill.
3. Address all feedback.
4. Update original ticket with:
   - **Root Cause:** [Detailed explanation]
   - **Prevention:** [What we'll do to stop this class of bug in future]
5. QA verifies fix.
6. Close ticket and PR.

---

## 7. Skills Setup (One-Time)

1. Install Matt Pocock skills: `npx skills@latest add mattpocock/skills`
2. Run `/setup-matt-pocock-skills` in Cursor.
3. Key skills to master:
   - `diagnosing-bugs`
   - `tdd`
   - `triage`
   - `code-review`
   - `grill-me` / `grill-with-docs`

---

## 8. Training Course Outline

**Total Time:** ~90-120 minutes (can be split across sessions)

### Module 1: Why Good Bug Processes Matter (15 min)
- Common failure modes
- Cost of poor bug handling
- Benefits of standardization

### Module 2: Reporting & Triage (20 min)
- Walk through template with live examples
- Severity calibration exercise
- Group activity: Improve weak bug reports

### Module 3: Diagnosis & Fixing with Skills (30-40 min)
- Live demo of `/diagnosing-bugs`
- Live demo of `/tdd`
- Paired exercise on a sample bug

### Module 4: Review, Closure & Prevention (20-25 min)
- Code review best practices
- Root cause / prevention documentation
- Metrics & feedback loop

**Post-Training:**
- Each engineer completes 1-2 bugs following the full process.
- Monthly retro on bug process effectiveness.

---

## 9. Metrics to Track

- Average time from report → fix (by severity)
- % of bugs with reproduction steps
- % of fixes with regression tests
- Recurring bug rate
- Team feedback on process

---

## 10. Updating This Document

This is a living document. Suggested improvements or new skills should be proposed in a dedicated ticket using this same process.

**Approval:** Team lead + engineering manager

---

**End of Document**
