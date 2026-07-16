/**
 * Phase 1 reproduce command for the Exercise Lab (Modules 3/4).
 *
 * Asserts correct behavior: Accept-Timezone must not empty the invoice list.
 * While the intentional bug is present this script exits non-zero (RED).
 * Training fixture only — not BookIQ / product code.
 */

import { createServer } from "../src/server.js";

const ASOF = "2026-07-16";

async function main(): Promise<void> {
  const server = createServer();
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("failed to bind ephemeral port");
  }

  const base = `http://127.0.0.1:${address.port}`;

  try {
    const baselineRes = await fetch(`${base}/v1/invoices?asOf=${ASOF}`);
    const baseline = (await baselineRes.json()) as { invoices: unknown[] };

    if (baselineRes.status !== 200 || !Array.isArray(baseline.invoices)) {
      console.error("FAIL: baseline response malformed", baselineRes.status, baseline);
      process.exitCode = 1;
      return;
    }

    if (baseline.invoices.length === 0) {
      console.error(
        "FAIL: baseline without Accept-Timezone should return invoices",
      );
      process.exitCode = 1;
      return;
    }

    const withTzRes = await fetch(`${base}/v1/invoices?asOf=${ASOF}`, {
      headers: { "Accept-Timezone": "America/New_York" },
    });
    const withTz = (await withTzRes.json()) as { invoices: unknown[] };

    if (withTzRes.status !== 200) {
      console.error("FAIL: unexpected status with Accept-Timezone", withTzRes.status);
      process.exitCode = 1;
      return;
    }

    if (!Array.isArray(withTz.invoices) || withTz.invoices.length === 0) {
      console.error("RED — Phase 1 reproduce signal");
      console.error(
        `GET /v1/invoices?asOf=${ASOF} with Accept-Timezone: America/New_York`,
      );
      console.error(
        `→ ${withTzRes.status} empty list (invoices.length=${Array.isArray(withTz.invoices) ? withTz.invoices.length : "n/a"})`,
      );
      console.error(
        `Baseline without header returned ${baseline.invoices.length} invoice(s).`,
      );
      process.exitCode = 1;
      return;
    }

    console.log("GREEN — Accept-Timezone returns invoices (bug fixed)");
    console.log(`baseline=${baseline.invoices.length} withHeader=${withTz.invoices.length}`);
    process.exitCode = 0;
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
