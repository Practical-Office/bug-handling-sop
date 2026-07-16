#!/usr/bin/env bash
# Open the Bug Handling SOP folder in a new Cursor window.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CURSOR_BIN="${CURSOR_BIN:-/usr/local/bin/cursor}"
if [[ ! -x "$CURSOR_BIN" ]]; then
  CURSOR_BIN="$(command -v cursor || true)"
fi
if [[ -z "$CURSOR_BIN" ]]; then
  echo "ERROR: cursor CLI not found. Open manually:"
  echo "  $ROOT"
  exit 1
fi
exec "$CURSOR_BIN" -n "$ROOT/bug-handling-sop.code-workspace"
