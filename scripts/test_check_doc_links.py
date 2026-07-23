#!/usr/bin/env python3
"""Regression tests for Published Course link integrity."""

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

from check_doc_links import check_docs

REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS = REPO_ROOT / "docs"


class CheckDocLinksTests(unittest.TestCase):
    def test_live_course_passes_link_check(self) -> None:
        errors = check_docs(DOCS)
        self.assertEqual(errors, [], "\n".join(errors))

    def test_forbidden_bug_report_md_pattern_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            docs = Path(tmp) / "docs"
            docs.mkdir()
            (docs / "module-1.html").write_text(
                '<a href="https://github.com/x/ISSUE_TEMPLATE/bug-report.md">bad</a>',
                encoding="utf-8",
            )
            errors = check_docs(docs)
            self.assertTrue(any("bug-report.md" in e for e in errors))

    def test_broken_relative_link_fails(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            docs = Path(tmp) / "docs"
            docs.mkdir()
            (docs / "page.html").write_text('<a href="missing.html">x</a>', encoding="utf-8")
            errors = check_docs(docs)
            self.assertTrue(any("missing.html" in e for e in errors))


if __name__ == "__main__":
    unittest.main()
