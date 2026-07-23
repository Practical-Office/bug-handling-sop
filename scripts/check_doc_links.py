#!/usr/bin/env python3
"""Verify Published Course HTML: local links resolve; known-broken patterns absent."""

from __future__ import annotations

import argparse
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

FORBIDDEN_SUBSTRINGS = [
    "ISSUE_TEMPLATE/bug-report.md",
]


class _LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {k: v for k, v in attrs if v is not None}
        if tag == "a" and "href" in attr_map:
            self.links.append(("href", attr_map["href"]))
        elif tag in ("img", "script") and "src" in attr_map:
            self.links.append(("src", attr_map["src"]))


def _is_external(url: str) -> bool:
    parsed = urlparse(url)
    return bool(parsed.scheme and parsed.netloc)


def _local_target_exists(docs_dir: Path, page: Path, url: str) -> bool:
    if url.startswith(("#", "mailto:", "javascript:")):
        return True
    if _is_external(url):
        return True
    resolved = (page.parent / url).resolve()
    try:
        resolved.relative_to(docs_dir.resolve())
    except ValueError:
        return False
    return resolved.is_file()


def check_docs(docs_dir: Path) -> list[str]:
    errors: list[str] = []
    if not docs_dir.is_dir():
        return [f"docs dir missing: {docs_dir}"]

    for html_path in sorted(docs_dir.rglob("*.html")):
        text = html_path.read_text(encoding="utf-8")
        rel_page = html_path.relative_to(docs_dir)

        for pattern in FORBIDDEN_SUBSTRINGS:
            if pattern in text:
                errors.append(f"{rel_page}: forbidden pattern {pattern!r}")

        if 'href="reference/issues/"' in text or "href='reference/issues/'" in text:
            errors.append(f"{rel_page}: directory link reference/issues/ must target index.html")

        parser = _LinkParser()
        parser.feed(text)
        for kind, url in parser.links:
            if _is_external(url) or url.startswith(("#", "mailto:", "javascript:")):
                continue
            if not _local_target_exists(docs_dir, html_path, url):
                errors.append(f"{rel_page}: {kind} {url!r} does not resolve under docs/")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--docs-dir",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "docs",
    )
    args = parser.parse_args()
    errors = check_docs(args.docs_dir)
    if errors:
        for err in errors:
            print(err, file=sys.stderr)
        print(f"\n{len(errors)} link check(s) failed.", file=sys.stderr)
        return 1
    print(f"OK — {args.docs_dir} link checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
