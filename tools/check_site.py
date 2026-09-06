#!/usr/bin/env python3
"""Validate licoup.com as a static, crawlable, internally consistent site."""
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://licoup.com"
class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(); self.title=""; self._in_title=False; self.meta={}; self.links=[]; self.canonical=None
    def handle_starttag(self, tag, attrs_list):
        attrs={k:v or "" for k,v in attrs_list}
        if tag=="title": self._in_title=True
        elif tag=="meta":
            if "name" in attrs: self.meta[("name",attrs["name"])]=attrs.get("content","")
            if "property" in attrs: self.meta[("property",attrs["property"])]=attrs.get("content","")
        elif tag=="link" and attrs.get("rel")=="canonical": self.canonical=attrs.get("href")
        elif tag=="a" and "href" in attrs: self.links.append(attrs["href"])
    def handle_endtag(self, tag):
        if tag=="title": self._in_title=False
    def handle_data(self, data):
        if self._in_title: self.title+=data
def url_for_page(path):
    rel=path.relative_to(ROOT).as_posix()
    if rel=="index.html": return ORIGIN+"/"
    if rel.endswith("/index.html"): return ORIGIN+"/"+rel[:-10]
    raise AssertionError(f"unexpected indexable page path: {path}")
def local_target(href):
    if href.startswith(("#","mailto:","tel:")): return None
    parsed=urlparse(href)
    if parsed.scheme or parsed.netloc:
        if parsed.scheme=="https" and parsed.netloc=="licoup.com": path=parsed.path
        else: return None
    else: path=parsed.path
    if not path.startswith("/"): return None
    target=ROOT/path.lstrip("/")
    if path.endswith("/"): target=target/"index.html"
    return target
def main():
    failures=[]; pages=sorted(ROOT.glob("**/index.html")); expected_urls=set()
    if not pages: failures.append("no indexable HTML pages found")
    for page in pages:
        text=page.read_text(encoding="utf-8"); parser=PageParser(); parser.feed(text); expected=url_for_page(page); expected_urls.add(expected)
        if not parser.title.strip(): failures.append(f"{page}: missing <title>")
        if not parser.meta.get(("name","description"),"").strip(): failures.append(f"{page}: missing meta description")
        robots=parser.meta.get(("name","robots"),"")
        if "index" not in robots or "follow" not in robots: failures.append(f"{page}: must explicitly be index,follow")
        if parser.canonical!=expected: failures.append(f"{page}: canonical {parser.canonical!r} != {expected!r}")
        for prop in ("og:type","og:site_name","og:title","og:description","og:url"):
            if not parser.meta.get(("property",prop),"").strip(): failures.append(f"{page}: missing {prop}")
        if parser.meta.get(("property","og:url"))!=expected: failures.append(f"{page}: og:url does not match canonical")
        for href in parser.links:
            target=local_target(href)
            if target is not None and not target.exists(): failures.append(f"{page}: broken internal link {href} -> {target.relative_to(ROOT)}")
    home=(ROOT/"index.html").read_text(encoding="utf-8")
    for schema_type in ('"WebSite"','"Organization"','"SoftwareApplication"'):
        if schema_type not in home: failures.append(f"index.html: missing Schema.org type {schema_type}")
    if "AGPL-3.0-or-later" not in home: failures.append("index.html: missing AGPL-3.0-or-later projection")
    if re.search(r"(?<!A)GPL-3\.0-or-later",home): failures.append("index.html: stale GPL-3.0-or-later LicoUp claim found")
    try:
        tree=ET.parse(ROOT/"sitemap.xml"); ns={"sm":"http://www.sitemaps.org/schemas/sitemap/0.9"}; sitemap_urls={n.text for n in tree.findall(".//sm:loc",ns) if n.text}
    except Exception as exc:
        failures.append(f"sitemap.xml: cannot parse: {exc}"); sitemap_urls=set()
    if sitemap_urls!=expected_urls: failures.append(f"sitemap.xml URLs do not exactly match canonical HTML pages: missing={sorted(expected_urls-sitemap_urls)}, extra={sorted(sitemap_urls-expected_urls)}")
    robots=(ROOT/"robots.txt").read_text(encoding="utf-8")
    if "User-agent: OAI-SearchBot" not in robots or "Allow: /" not in robots: failures.append("robots.txt: OAI-SearchBot is not explicitly allowed")
    if "Sitemap: https://licoup.com/sitemap.xml" not in robots: failures.append("robots.txt: sitemap declaration missing")
    llms=(ROOT/"llms.txt").read_text(encoding="utf-8")
    for url in sorted(expected_urls):
        if url not in llms and url!="https://licoup.com/": failures.append(f"llms.txt: missing canonical page {url}")
    if "AGPL-3.0-or-later" not in llms: failures.append("llms.txt: missing current LicoUp license")
    not_found=ROOT/"404.html"
    if not not_found.exists(): failures.append("404.html missing")
    elif 'content="noindex,follow"' not in not_found.read_text(encoding="utf-8"): failures.append("404.html must be noindex,follow")
    if failures:
        print("site validation failed:")
        for item in failures: print(f"- {item}")
        return 1
    print(f"site validation passed: {len(pages)} canonical pages"); return 0
if __name__=="__main__": sys.exit(main())
