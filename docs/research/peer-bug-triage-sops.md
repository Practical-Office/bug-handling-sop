# Peer bug-triage / incident SOP research

**Date:** 2026-07-16  
**Ticket:** [Research peer bug-triage SOPs before deepening the living document](https://github.com/Practical-Office/bug-handling-sop/issues/5)  
**Compared against:** [`docs/reference/BUG-HANDLING-SOP.md`](../reference/BUG-HANDLING-SOP.md)

## Summary

High-trust peer sources converge on four requirements that our living SOP already partially covers, plus several process gaps worth considering before deepening Module 3 or expanding process sections.

**Peers consistently require:**

1. **Structured intake** — templates/forms so reports are actionable (GitHub Docs; Chromium reporting guidelines).
2. **Triage as confirmation + routing** — reproduce/confirm, dedupe, label severity/priority/owner, and only then treat the bug as ready for work (Kubernetes; Chromium; Mozilla; GitLab).
3. **Impact-based severity with response timing** — clear severity definitions (often workaround-aware), triage SLAs for hot bugs, and often separate **resolution** SLOs (GitLab; Mozilla).
4. **Closure with learning** — verify the fix, document root cause, and land preventive follow-ups (Chromium Fixed→Verified; Google SRE postmortems; our living SOP’s root-cause + prevention notes).

**Vs our living SOP (v1.0 Draft):** We are strong on reproducibility-before-fix, mandatory report template, diagnosis/TDD/review skills, and root-cause + prevention at close. We are thinner on (a) severity-vs-priority separation, (b) resolution SLOs (we only state triage response times), (c) explicit needs-info / stale / non-bug routing, (d) a confirmation gate at triage, (e) security as a separate disclosure path, and (f) when a lightweight “postmortem” is required beyond ticket notes.

**Source strength note:** Google SRE (sre.google), GitLab Handbook, Kubernetes community triage guide, Mozilla Firefox Source Docs, Chromium project docs, GitHub Docs, and Microsoft Learn Azure Boards / security IR docs are first-party. Azure Boards is product documentation (workflow tooling), not a full eng “handbook” for triage philosophy—treat it as supporting, not primary doctrine.

---

## Sources consulted

- [Google SRE — Managing Incidents](https://sre.google/sre-book/managing-incidents/) — role separation, live incident state doc, when to declare an incident, restore-first then root-cause.
- [Google SRE — Postmortem Culture](https://sre.google/sre-book/postmortem-culture/) — postmortem triggers, blameless RCA, preventive action items, formal review (“no postmortem left unreviewed”).
- [Google SRE — Example Postmortem](https://sre.google/sre-book/example-postmortem/) — concrete RCA + categorized prevent/detect/mitigate action items.
- [GitLab Handbook — Issue Triage](https://handbook.gitlab.com/handbook/product-development/how-we-work/issue-triage/) — what “fully triaged” means; severity definitions (workaround-aware); severity resolution SLOs; overestimate severity when unsure.
- [Kubernetes community — Issue Triage Guidelines](https://github.com/kubernetes/community/blob/main/contributors/guide/issue-triage.md) — `needs-triage` → `triage/accepted`; reproduce-to-validate bugs; needs-information; support vs bug; priority labels; stale lifecycle.
- [Chromium — Triaging Bugs](https://www.chromium.org/getting-involved/bug-triage/) — reproduce/clarify as first triage duty; Needs-Feedback; Unconfirmed → Available.
- [Chromium — Bug Life Cycle and Reporting Guidelines](https://www.chromium.org/for-testers/bug-reporting-guidelines/) — report fields; Fixed vs Verified; reduced test cases.
- [Mozilla Firefox Source Docs — Triage for Bugzilla](https://firefox-source-docs.mozilla.org/bug-mgmt/policies/triage-bugzilla.html) — triage owners; daily skim + full triage ≤1 week; S1 assignment ≤2 business days; needinfo timeouts; defect severity required.
- [Mozilla — Defect Severity](https://firefox-source-docs.mozilla.org/bug-mgmt/guides/severity.html) + [BMO bug_severity field](https://wiki.mozilla.org/BMO/UserGuide/BugFields#bug_severity) — S1–S4 impact definitions; severity ≠ priority.
- [GitHub Docs — About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates) — templates/forms for structured intake; security policy pointer.
- [GitHub Docs — Privately reporting a security vulnerability](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability) — private vulnerability reporting / advisories as the security path (not public issues).
- [Microsoft Learn — Define, capture, triage, and manage bugs (Azure Boards)](https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/manage-bugs) — periodic triage meetings; queries for new/unassigned/stale bugs (supporting).
- [Microsoft Learn — Microsoft security incident management](https://learn.microsoft.com/en-us/compliance/assurance/assurance-security-incident-management) — NIST-style prepare → detect/analyze → contain/eradicate/recover → post-incident (security incidents, not product-bug triage).

---

## Comparison matrix

| Practice | Peer sources | Living SOP | Keep / Consider / Skip |
| --- | --- | --- | --- |
| Mandatory structured bug report (env, steps, expected/actual, evidence, impact) | GitHub templates/forms; Chromium reporting guidelines | §3 mandatory template covers these fields | **Keep** |
| Reproducibility bar before investing in a fix | Kubernetes: validate by reproducing; Chromium: “knowing how to reproduce is the first step”; Mozilla: needinfo for missing STR | §2 “Reproducibility First”; diagnosis starts with Reproduce | **Keep** (core strength) |
| Triage confirmation gate (Unconfirmed / needs-triage → accepted only after confirm) | Chromium Unconfirmed→Available; Kubernetes `needs-triage` / `triage/accepted`; Mozilla UNCONFIRMED + STR | Triage is severity + labels + assign; no explicit “confirmed” state | **Consider** |
| Severity = user impact; Priority = scheduling urgency (separate fields) | Mozilla severity vs priority; GitLab severity + priority labels; Kubernetes priority labels | Single P1–P4 scale mixes impact and urgency | **Consider** |
| Workaround-aware severity definitions | GitLab: S1 no workaround / data loss; S2 complex workaround; S3 has workaround | Impact text exists; no workaround rubric | **Consider** |
| Triage response SLAs for hottest bugs | Living SOP P1 1h / P2 4h; Mozilla daily assess + S1 assign ≤2 business days; Chromium layout team: triage within 1 week | P1/P2 triage times present; P3/P4 silent | **Keep** P1/P2 triage SLAs; **Consider** stating P3/P4 triage cadence |
| Resolution / fix SLOs by severity | GitLab type::bug resolution SLOs (e.g. S1 within ~30 days / current release path; S2 ~60 days) | Metrics track time-to-fix; no published fix SLO | **Consider** (lightweight for P1/P2 only) |
| Overestimate severity when uncertain, then confirm with expert | GitLab Issue Triage | Not stated | **Consider** |
| Needs-info / incomplete lifecycle with timeout | Kubernetes: needs-information, close after ~20 days no response; Mozilla: needinfo ≤2 weeks; Chromium: Needs-Feedback, close after reminders | Incomplete templates “returned”; no timeout/stale policy | **Consider** |
| Route non-bugs (support, duplicate, enhancement/task) out of bug queue | Kubernetes kind/support + close; Mozilla defect vs enhancement vs task; Chromium duplicate handling | Not covered | **Consider** (short routing rules) |
| Component / area ownership + triage owner or rotation | Mozilla Triage Owner per component; Kubernetes SIG ownership; GitLab group labels + PM/EM ping for S1/S2 | Component labels + assign or Backlog | **Keep** labels; **Consider** named triage DRI/rotation if volume grows |
| Security bugs use private disclosure / advisory path, not public bug template alone | GitHub private vulnerability reporting + SECURITY.md; GitLab vulnerability severity/SLA | Security folded into P1 | **Consider** (pointer + policy, not full PSIRT) |
| Incident command for multi-team / customer-visible outages (roles, live state doc, handoff) | Google SRE Managing Incidents; Microsoft security IR (NIST phases) | Bug workflow only; no incident bifurcation | **Consider** thin “when this is an incident” pointer; **Skip** full ICS for routine bugs |
| Blameless postmortem with triggers + reviewed preventive AIs | Google SRE Postmortem Culture (triggers: user-visible downtime, data loss, on-call intervention, long resolution, monitoring failure) | Every ticket: Root Cause + Prevention notes; no postmortem trigger set | **Keep** ticket RCA/prevention; **Consider** postmortem only for P1/outage-class events |
| Minimize / reduce reproduction (minimal test case) | Chromium: reduced test cases; diagnosis culture aligns with SRE troubleshooting | `/diagnosing-bugs` minimize step | **Keep** |
| Regression-aware triage | Mozilla: regressions monitored; Chromium: Bug-Regression / bisect guidance | Metrics: recurring bug rate; no regression label/process | **Consider** |
| Fixed then Verified (QA confirms) before true close | Chromium Fixed vs Verified | §6 QA verifies then close | **Keep** |
| Mandatory TDD / skill-mandated diagnosis loop for every production bug | Peers emphasize reproduce + verify; do not mandate a specific TDD skill stack | `/diagnosing-bugs` + `/tdd` mandatory | **Keep** (team differentiator; not contradicted by peers) |
| Full GitLab multi-category severity matrices (availability / performance / UX / saturation tables) | GitLab Handbook | Single severity table | **Skip** for now (too heavy for current team size) |
| Full Chromium/Monorail hotlist taxonomy | Chromium | Simple labels | **Skip** |
| Treating product-bug SOP as NIST security incident response | Microsoft security IR / M365 IR guide | N/A | **Skip** as primary bug process (security incidents ≠ product bugs) |

---

## Recommendations for this map

### Keep

- **Reproducibility First** and the diagnosis loop (reproduce → minimize → hypothesize → instrument → fix → regression test) — peers treat confirmation/reproduction as the triage and fix gate; our wording is already aligned with Chromium and Kubernetes.
- **Mandatory report template** (environment, STR, expected/actual, evidence, impact) — matches GitHub template/form guidance and Chromium reporting fields.
- **Root cause + prevention on every closed ticket** — peers require learning artifacts; SRE goes further for incidents, but ticket-level RCA/prevention is the right default for product bugs.
- **QA verification before closure** — same idea as Chromium Fixed → Verified.
- **P1/P2 triage urgency** — peers insist hot bugs get fast attention (Mozilla S1 assign ≤2 business days; GitLab S1/S2 escalate to PM/EM).
- **Skills-driven TDD + code review for production fixes** — not universal in OSS triage docs, but complementary: peers require regression tests / verification; we operationalize how.

### Consider (before deepening Module 3 or expanding process sections)

1. **Add a triage confirmation gate** — e.g. `needs-info` / `confirmed` (or “accepted”) so “assign and fix” only happens after reproduce-or-agree-STR. Cite Kubernetes `triage/accepted` and Chromium Unconfirmed→Available.
2. **Clarify severity vs priority** — severity = impact (optionally workaround-aware, per GitLab); priority = when we schedule. Even a one-paragraph distinction would reduce P1 inflation.
3. **Publish resolution targets for P1/P2 only** — GitLab-style fix SLOs; keep lighter than their full S1–S4 release matrix. Pair with existing time-to-fix metrics.
4. **Needs-info / stale policy** — request missing STR once; auto-nudge; close incomplete after a stated window (peers use ~2–3 weeks needinfo or ~20 days).
5. **Short non-bug routing** — duplicate, support/question, enhancement/task — so the bug queue stays bugs (Kubernetes/Mozilla).
6. **Security path pointer** — SECURITY.md / private advisory (GitHub Docs); do not file public P1s for unfixed vulns.
7. **Incident vs bug bifurcation (thin)** — if customer-visible outage, multi-team, or >1h concentrated analysis without resolve: declare incident, live state notes, then postmortem (SRE triggers). Do not fold ICS into Module 3’s diagnosis demo.
8. **Postmortem triggers for outage-class P1s** — blameless write-up + owned preventive actions + review (SRE), above-and-beyond ticket Prevention notes.
9. **Regression label + “bisect or last-known-good” tip** — Mozilla/Chromium treat regressions as special; Module 3 can demo this without a large process rewrite.
10. **“When unsure, overestimate severity, then confirm”** — one sentence from GitLab triage culture.

### Skip (for now)

- **Full ICS / war-room role theatre for every bug** — SRE itself scopes incident management to multi-team / customer-visible / stuck cases.
- **GitLab’s full category-specific severity tables and infradev saturation machinery** — valuable at GitLab scale; noise for a small team SOP.
- **Chromium hotlist ontology / Monorail-specific workflows**.
- **NIST security IR phases as the product-bug SOP spine** — use only if/when writing a separate security incident playbook.
- **Mandatory CVSS for every bug** — appropriate for vulnerability triage (GitLab PSIRT), not general product defects.
- **Rewriting Module 3 around peer handbook length** — deepen diagnosis skills content; fold process gaps into Module 2 (reporting/triage) and Module 4 (closure/prevention/postmortem) first.

---

## Implications for Module 3 vs process sections

| Area | Guidance from this research |
| --- | --- |
| **Module 3 (Diagnosis & Fixing)** | Stay focused on `/diagnosing-bugs` + `/tdd`. Peers reinforce reproduce/minimize/verify; they do not require expanding Module 3 into triage bureaucracy. Optional add: regression bisect / last-known-good, and “do not start fix until confirmed.” |
| **Module 2 / SOP §4 Triage** | Highest-value peer gaps live here: confirmation gate, severity rubric (workaround), needs-info timeout, non-bug routing, severity-vs-priority, security pointer. |
| **Module 4 / SOP §6 Closure** | Keep RCA + prevention; optionally add P1 postmortem trigger + Fixed/Verified language + owned follow-up AIs for outages. |
| **Living SOP depth** | Prefer small, cited additions over a handbook-scale rewrite. |

---

## Citations

1. Betsy Beyer et al., “Managing Incidents,” *Site Reliability Engineering* (Google), https://sre.google/sre-book/managing-incidents/  
2. Betsy Beyer et al., “Postmortem Culture: Learning from Failure,” *Site Reliability Engineering* (Google), https://sre.google/sre-book/postmortem-culture/  
3. “Example Postmortem,” *Site Reliability Engineering* (Google), https://sre.google/sre-book/example-postmortem/  
4. GitLab, “Issue Triage,” GitLab Handbook, https://handbook.gitlab.com/handbook/product-development/how-we-work/issue-triage/  
5. Kubernetes community, “Issue Triage Guidelines,” https://github.com/kubernetes/community/blob/main/contributors/guide/issue-triage.md  
6. Chromium, “Triaging Bugs,” https://www.chromium.org/getting-involved/bug-triage/  
7. Chromium, “Bug Life Cycle and Reporting Guidelines,” https://www.chromium.org/for-testers/bug-reporting-guidelines/  
8. Mozilla, “Triage for Bugzilla,” Firefox Source Docs, https://firefox-source-docs.mozilla.org/bug-mgmt/policies/triage-bugzilla.html  
9. Mozilla, “Defect Severity,” Firefox Source Docs, https://firefox-source-docs.mozilla.org/bug-mgmt/guides/severity.html  
10. MozillaWiki, “BMO/UserGuide/BugFields” (bug_severity / priority), https://wiki.mozilla.org/BMO/UserGuide/BugFields  
11. GitHub Docs, “About issue and pull request templates,” https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates  
12. GitHub Docs, “Privately reporting a security vulnerability,” https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability  
13. Microsoft Learn, “Define, capture, triage, and manage bugs in Azure Boards,” https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/manage-bugs  
14. Microsoft Learn, “Microsoft security incident management,” https://learn.microsoft.com/en-us/compliance/assurance/assurance-security-incident-management  
15. Practical AI Engineering, “Bug Handling SOP & Team Training Program,” `docs/reference/BUG-HANDLING-SOP.md` (v1.0 Draft, 2026-07-16)
