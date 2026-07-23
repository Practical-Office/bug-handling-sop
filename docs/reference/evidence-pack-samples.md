# Evidence Pack Samples (Facilitator Kit)

These are complete, anonymized Evidence Pack examples that facilitators can open live during certification without inventing artifacts.

They follow the exact structure defined in [certification.html](../certification.html).

---

## Sample 1 — Exercise Lab Path (Recommended default)

Use this for most workshops. One coherent pack on the Invoice API Exercise Lab: Exercise A–style report rewrite, then Phase 1 through RCA.

````markdown
# Evidence Pack — Alex Rivera — 2026-07-22

## 1. Course completion
- Setup Pre-req: done
- Modules 1–5 checklists: done

## 2. Report rewrite / Exercise A

**Title:** [Invoice API] List returns empty when Accept-Timezone header is sent

**Environment**
- Client: curl 8.x / Node 20 exercise harness
- Service: invoice-api exercise lab (`exercises/invoice-api`, local port 3847)
- User role / permissions: N/A (public list endpoint in lab fixture)
- Other: Reproducible only when `Accept-Timezone` is present; baseline request without header returns invoices

**Reproduction Steps**
1. Start the exercise server (`npm start` in `exercises/invoice-api`).
2. `GET /v1/invoices?asOf=2026-07-16` without `Accept-Timezone` — note non-empty list.
3. Repeat the same request with header `Accept-Timezone: America/New_York`.
4. Compare response bodies.

**Expected Behavior**
Both requests return the same invoice list for the `asOf` date.

**Actual Behavior**
Without header: 200 with invoices. With `Accept-Timezone`: 200 with an **empty list** (silent wrong result, not an error status).

**Logs / Screenshots / Video**
- curl transcript attached
- Screenshot of side-by-side responses
- Loom: https://example.invalid/loom/invoice-empty-tz

**Business / User Impact**
In the lab narrative, clients sending timezone context see no invoices — blocks reconciliation demos and Module 3 diagnosis practice. Workaround: omit the header (not acceptable for production API contract).

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
GET /v1/invoices?asOf=2026-07-16 with Accept-Timezone: America/New_York
  → 200, count=0
GET /v1/invoices?asOf=2026-07-16 (no header)
  → 200, count=3
Exit code: 1
```

**Source:** Exercise Lab (exercises/invoice-api)

## 4. Root Cause + Prevention

**Root Cause:**  
List logic applied timezone normalization to the `asOf` filter when `Accept-Timezone` was present, shifting the effective cutoff so every fixture row fell outside the range. The handler returned 200 with an empty array instead of surfacing the filter bug.

**Prevention:**
- [x] Regression test at the invoice list seam (`npm run phase1` / equivalent assertion)
- [x] Guard: timezone-aware filter must not exclude all rows for valid fixture data
- [ ] Follow-up: document `Accept-Timezone` contract in exercise README (ticket opened)

## 5. Lead review
Reviewer: @jordan-lee  
Date: 2026-07-22  
Verdict: **approved**
````

---

## Sample 2 — Realistic Production-Style Path

Use this when you want to show what a real ticket-based pack looks like.

````markdown
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
````

---

## Facilitator Notes

- Prefer **Sample 1** for first-time workshops — one coherent story on the Invoice API lab (Modules 3–4).
- Use **Sample 2** when you want to show the difference between lab and real-ticket packs.
- Both packs satisfy the pass criteria table on the certification page.
- You can open either as a Gist, Notion page, or GitHub comment during the live session.
