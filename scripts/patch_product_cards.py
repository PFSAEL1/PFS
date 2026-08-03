"""
Batch-patch all pages that have a local ProductCard / RelatedCard / AlsoLikeCard function.
For each file:
  1. Add the SiteProductCard import (if not already present)
  2. Find the local card component definition and the section that uses it
  3. Replace the section with <SiteProductCardSection ... />
  4. Remove the now-unused local component definition

Strategy: we look for the pattern:
  - A local `function ProductCard(...)` or similar
  - A <section> block that calls `.map((p) => <ProductCard ...>)`
  - Replace the section with <SiteProductCardSection cards={PRODUCTS_VAR} />
  - Remove the local function definition

This script is idempotent — if SiteProductCardSection is already imported, it won't double-import.
"""
import os
import re
import sys

BASE = "/home/ubuntu/pfs-spray-booths/client/src/pages"
IMPORT_LINE = 'import { SiteProductCardSection } from "@/components/SiteProductCard";'

# Files already handled manually
SKIP = {
    "products/CrossFlowBoothPage.tsx",
    "products/ProductSubPage.tsx",
}

def add_import(content: str) -> str:
    if "SiteProductCardSection" in content:
        return content
    # Insert after the last import line
    lines = content.split("\n")
    last_import_idx = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            last_import_idx = i
    lines.insert(last_import_idx + 1, IMPORT_LINE)
    return "\n".join(lines)

def patch_file(filepath: str) -> tuple[bool, str]:
    with open(filepath, "r") as f:
        content = f.read()

    if "SiteProductCardSection" in content and "function ProductCard" not in content:
        return False, "already patched"

    original = content

    # Step 1: Add import
    content = add_import(content)

    # Step 2: Find the local ProductCard/RelatedCard function and remove it
    # Pattern: function ProductCard(...) { ... } — match the whole function block
    func_pattern = re.compile(
        r'function\s+(?:ProductCard|RelatedCard|AlsoLikeCard)\s*\([^)]*\)[^{]*\{',
        re.MULTILINE
    )
    for match in func_pattern.finditer(content):
        start = match.start()
        # Find matching closing brace
        depth = 0
        i = match.end() - 1  # position of opening {
        while i < len(content):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
                if depth == 0:
                    end = i + 1
                    # Remove the function (and any preceding blank lines)
                    func_block = content[start:end]
                    content = content[:start] + content[end:]
                    break
            i += 1

    # Step 3: Find the related products section and replace with SiteProductCardSection
    # Look for the section that maps over PRODUCTS or RELATED_PRODUCTS or similar
    # Pattern: <section ...> ... {SOMETHING.map((p) => <ProductCard ...>)} ... </section>
    section_pattern = re.compile(
        r'\{/\*\s*(?:RELATED PRODUCTS|You May Also|Related Products|COMPLETE YOUR|also-like|ALSO LIKE)[^*]*\*/\}\s*'
        r'<section[^>]*>.*?</section>',
        re.DOTALL | re.IGNORECASE
    )

    def make_replacement(m):
        section_text = m.group(0)
        # Try to extract the array variable name used in .map()
        arr_match = re.search(r'\{(\w+)\.map\(', section_text)
        arr_name = arr_match.group(1) if arr_match else "PRODUCTS"
        # Try to extract heading text
        heading_match = re.search(r'(?:You May Also Need|Complete Your[^"<]*|Related Products)', section_text, re.IGNORECASE)
        heading = heading_match.group(0).strip() if heading_match else "You May Also Need"
        return f'''      {{/* RELATED PRODUCTS */}}
      <SiteProductCardSection
        heading="{heading}"
        label="Complete Your System"
        cards={{{arr_name}}}
      />'''

    new_content = section_pattern.sub(make_replacement, content)

    # If the pattern didn't match, try a simpler approach
    if new_content == content:
        # Look for any section with ProductCard.map or similar
        simple_pattern = re.compile(
            r'<section[^>]*>(?:[^<]|<(?!/?section))*\{[A-Z_]+\.map\([^)]*\)\s*=>\s*<(?:ProductCard|RelatedCard|AlsoLikeCard)[^/]*/>\s*\}(?:[^<]|<(?!/?section))*</section>',
            re.DOTALL
        )
        new_content = simple_pattern.sub(
            lambda m: f'''      <SiteProductCardSection
        heading="You May Also Need"
        label="Complete Your System"
        cards={{PRODUCTS}}
      />''',
            content
        )

    if new_content == content and "function ProductCard" not in content:
        return False, "no section found to replace (function removed but section unchanged)"

    content = new_content

    if content == original:
        return False, "no changes made"

    with open(filepath, "w") as f:
        f.write(content)

    return True, "patched"


# Collect all files
files_to_patch = []
for root, dirs, files in os.walk(BASE):
    for fname in files:
        if not fname.endswith(".tsx"):
            continue
        rel = os.path.relpath(os.path.join(root, fname), BASE)
        if rel in SKIP:
            continue
        fpath = os.path.join(root, fname)
        with open(fpath) as f:
            c = f.read()
        if "function ProductCard" in c or "function RelatedCard" in c or "function AlsoLikeCard" in c:
            files_to_patch.append((rel, fpath))

print(f"Files to patch: {len(files_to_patch)}")
for rel, fpath in sorted(files_to_patch):
    changed, reason = patch_file(fpath)
    status = "✓" if changed else "–"
    print(f"  {status} {rel}: {reason}")

print("Done.")
