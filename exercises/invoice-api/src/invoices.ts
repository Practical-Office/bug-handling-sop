/**
 * Training fixture for bug-handling course Modules 3/4 (Exercise Lab).
 * Intentional bug lives here — NOT BookIQ / product code. Do not ship.
 */

export type Invoice = {
  id: string;
  amountCents: number;
  issuedOn: string; // YYYY-MM-DD
};

const STORE: Invoice[] = [
  { id: "inv_1001", amountCents: 4200, issuedOn: "2026-07-01" },
  { id: "inv_1002", amountCents: 9900, issuedOn: "2026-07-10" },
  { id: "inv_1003", amountCents: 1500, issuedOn: "2026-07-15" },
];

export type ListInvoicesOpts = {
  asOf: string | null;
  /** Raw Accept-Timezone header value from the HTTP request. */
  acceptTimezone: string | string[] | undefined;
};

/**
 * Returns invoices on or before asOf.
 *
 * INTENTIONAL BUG (course Exercise Lab): when Accept-Timezone is present,
 * a faulty "timezone normalization" path returns an empty list.
 * Without the header, results are correct.
 */
export function listInvoices(opts: ListInvoicesOpts): Invoice[] {
  let results = STORE.slice();

  if (opts.asOf) {
    results = results.filter((inv) => inv.issuedOn <= opts.asOf!);
  }

  if (hasAcceptTimezone(opts.acceptTimezone)) {
    // Simulated bad PR: "normalize asOf into the client timezone before filter"
    return normalizeAsOfForTimezone(results, opts.acceptTimezone!);
  }

  return results;
}

function hasAcceptTimezone(
  value: string | string[] | undefined,
): value is string | string[] {
  if (value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0 && value.some((v) => v !== "");
  return value !== "";
}

/**
 * Broken helper introduced by a fictional "timezone normalization" PR.
 * Always drops the filtered set — the learner's red signal for Phase 1.
 */
function normalizeAsOfForTimezone(
  _invoices: Invoice[],
  _timezone: string | string[],
): Invoice[] {
  return [];
}
