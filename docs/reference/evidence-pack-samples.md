# Evidence Pack Samples (Facilitator Reference)

These are complete, anonymized Evidence Pack examples that facilitators can open live during certification without inventing artifacts.

They follow the exact structure defined in [certification.html](../certification.html).

---

## Sample 1 — Exercise Lab Path (Recommended default)

Use this for most workshops. It combines Exercise A (report rewrite) with the official Invoice API Phase 1 lab.

```markdown
# Evidence Pack — Alex Rivera — 2026-07-22

## 1. Course completion
- Setup Pre-req: done
- Modules 1–5 checklists: done

## 2. Report rewrite / Exercise A

**Title:** [Dashboard] KPI cards blank on iOS Safari after refresh

**Environment**
- Browser / OS / Version: iOS 18.2, Safari; also reproducible in iPhone 15 Simulator
- Backend / API version: api v2.14.1 (staging + prod)
- User role / permissions: Org Admin
- Other: Wi-Fi only; does not reproduce on desktop Chrome 126

**Reproduction Steps**
1. Sign in as Org Admin on iPhone Safari.
2. Open Dashboard → Overview.
3. Pull to refresh (or hard-reload).
4. Observe KPI card row.

**Expected Behavior**
KPI cards show revenue, active users, and open tickets with numbers.

**Actual Behavior**
Cards render with labels but values stay "—" indefinitely. Network tab shows
`/api/metrics/summary` returning 200 with body `{ "error": "timezone_offset_invalid" }`
after refresh (first load is fine).

**Logs / Screenshots / Video**
- HAR attached
- Console screenshot of fetch error
- Loom: https://example.invalid/loom/kpi-blank

**Business / User Impact**
Org Admins cannot trust daily metrics on mobile (~30% of admin sessions).
Support tickets rising; not a full outage. Workaround: use desktop Chrome.

**Suggested Severity:** severity/s3  
**Suggested Priority:** priority/p2

## 3. Phase 1 command + output

**Command:**
```bash
cd exercises/invoice-api && npm run phase1
```

**Red output (trimmed):**
```
RED — Phase 1 reproduce signal
GET /v1/invoices?asOf=2026-07-16 with Accept-Timezone → 200 + empty list
GET /v1/invoices?asOf=2026-07-16 without header → 200 + invoices
Exit code: 1
```

**Source:** Exercise Lab (exercises/invoice-api)

## 4. Root Cause + Prevention

**Root Cause:**  
Timezone offset from Safari was sent as `undefined` after refresh. The server rejected the `Accept-Timezone` header and returned an error body. The UI treated that error body as an empty data list, so the KPI cards rendered blank.

**Prevention:**
- [x] Regression test at the metrics summary seam that asserts timezone header handling
- [x] Guard: server now returns a clear 400 with a typed error code instead of a silent empty list
- [ ] Follow-up: clarify `Accept-Timezone` behavior in CONTEXT.md (ticket opened)

## 5. Lead review
Reviewer: @jordan-lee  
Date: 2026-07-22  
Verdict: **approved**
```

---

## Sample 2 — Realistic Production-Style Path

Use this when you want to show what a real ticket-based pack looks like.

```markdown
# Evidence Pack — Sam Patel — 2026-07-21

## 1. Course completion
- Setup Pre-req: done
- Modules 1–5 checklists: done

## 2. Report rewrite / Exercise A

**Title:** [Checkout] Address validation fails for EU users with saved addresses after payment-provider update

**Environment**
- Browser / OS / Version: Chrome 127 / macOS 15.1 + Safari 18 on iOS
- Backend / API version: payments-service v3.2.1 (prod)
- User role / permissions: Customer with saved EU addresses
- Other: Reproducible only after the 2026-07-15 Stripe integration change

**Reproduction Steps**
1. Log in as a customer who has a saved address in Germany or France.
2. Add any item to cart and proceed to checkout.
3. Select the saved EU address.
4. Click "Continue to payment".

**Expected Behavior**
Address is accepted and the payment step loads.

**Actual Behavior**
Error toast: "Invalid address data". Network shows `POST /api/checkout/validate` returning 422 with `countryCode is required`.

**Logs / Screenshots / Video**
- Full network HAR attached
- Screenshot of error toast + response body
- Loom: https://example.invalid/loom/eu-checkout

**Business / User Impact**
~12% of checkout sessions from EU customers fail. Support volume up 40% since the release. Temporary workaround: force users to re-enter address manually.

**Suggested Severity:** severity/s2  
**Suggested Priority:** priority/p1

## 3. Phase 1 command + output

**Command:**
```bash
./scripts/test-eu-checkout.sh
```

**Red output (trimmed):**
```
FAIL: Expected 200, got 422
Response body: {"error":"countryCode is required","field":"address.countryCode"}
RED — Phase 1 reproduce signal
Exit code: 1
```

**Source:** Real bug (ticket #1847) diagnosed with /diagnosing-bugs

## 4. Root Cause + Prevention

**Root Cause:**  
The new payment-provider adapter stripped `countryCode` from saved addresses when the address object was normalized. The validation endpoint correctly rejected the incomplete payload, but the frontend had no fallback for missing countryCode on saved addresses.

**Prevention:**
- [x] Regression test that seeds a saved EU address and asserts the full checkout flow succeeds
- [x] Guard: address normalization now requires and preserves countryCode
- [x] Added explicit validation error message mapping in the UI
- [ ] Architecture follow-up: shared address schema between frontend and payments service (ticket #1853 opened)

## 5. Lead review
Reviewer: @morgan-chen  
Date: 2026-07-21  
Verdict: **approved**
```

---

## Facilitator Notes

- Prefer **Sample 1** for first-time workshops — it stays fully inside the course lab material.
- Use **Sample 2** when you want to show the difference between lab and real-ticket packs.
- Both packs satisfy the pass criteria table on the certification page.
- You can open either as a Gist, Notion page, or GitHub comment during the live session.
