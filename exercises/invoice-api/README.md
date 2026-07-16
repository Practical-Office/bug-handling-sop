# Invoice API — Exercise Lab

**Training fixture for the Bug Handling course (Modules 3 & 4).**  
Portable sample bug only — **not** BookIQ / product code. Do not copy into product repos.

## Symptom (intentional)

`GET /v1/invoices?asOf=2026-07-16` returns **200 with an empty list** when the client sends an `Accept-Timezone` header.  
Without that header, invoices return correctly. (Story: started after a fictional “timezone normalization” PR.)

## Requirements

- Node.js **≥ 20**
- npm

## Install

```bash
cd exercises/invoice-api
npm install
```

## Run the server (optional — manual curl)

```bash
npm start
```

Server listens on `http://127.0.0.1:3847`.

```bash
# Works — invoices present
curl -s "http://127.0.0.1:3847/v1/invoices?asOf=2026-07-16"

# Bug — 200 empty list when Accept-Timezone is set
curl -s -H "Accept-Timezone: America/New_York" \
  "http://127.0.0.1:3847/v1/invoices?asOf=2026-07-16"
```

## Phase 1 red command (deterministic)

From `exercises/invoice-api`, after `npm install`:

```bash
npm run phase1
```

(`npm test` is an alias for the same script.)

**Expected while the bug is present:** exit code **1**, stderr/stdout includes `RED — Phase 1 reproduce signal`.  
No Cursor required. The script starts an ephemeral server, hits the route with and without `Accept-Timezone`, then exits.

## Course use

| Module | Use |
| --- | --- |
| 3 Diagnosis | Run `npm run phase1` as Phase 1 feedback; minimise; hypothesize; instrument |
| 4 Fix | Keep the red command failing until a minimal fix + regression seam turns it green |

## Layout

| Path | Role |
| --- | --- |
| `src/server.ts` | Tiny HTTP API |
| `src/invoices.ts` | List logic (**intentional bug**) |
| `scripts/phase1-red.ts` | Phase 1 reproduce / red signal |
