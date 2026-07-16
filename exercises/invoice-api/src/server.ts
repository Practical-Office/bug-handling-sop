/**
 * Tiny HTTP API — training fixture for bug-handling course Modules 3/4.
 * Not BookIQ / product code.
 */

import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listInvoices } from "./invoices.js";

const DEFAULT_PORT = 3847;

export function createServer(): http.Server {
  return http.createServer((req, res) => {
    const host = req.headers.host ?? `127.0.0.1:${DEFAULT_PORT}`;
    const url = new URL(req.url ?? "/", `http://${host}`);

    if (req.method === "GET" && url.pathname === "/health") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && url.pathname === "/v1/invoices") {
      const asOf = url.searchParams.get("asOf");
      const acceptTimezone = req.headers["accept-timezone"];
      const invoices = listInvoices({ asOf, acceptTimezone });
      sendJson(res, 200, { invoices });
      return;
    }

    sendJson(res, 404, { error: "not_found" });
  });
}

function sendJson(
  res: http.ServerResponse,
  status: number,
  body: unknown,
): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function isMainModule(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  return path.resolve(entry) === path.resolve(fileURLToPath(import.meta.url));
}

if (isMainModule()) {
  const port = Number(process.env.PORT) || DEFAULT_PORT;
  const server = createServer();
  server.listen(port, "127.0.0.1", () => {
    console.log(
      `invoice-api (Exercise Lab) listening on http://127.0.0.1:${port}`,
    );
    console.log("GET /v1/invoices?asOf=2026-07-16");
  });
}
