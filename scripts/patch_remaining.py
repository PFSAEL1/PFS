"""
Targeted patch for OpenFaceBoothPage, AircraftBoothPage, and all industry pages
that still have local ProductCard components.
"""
import os
import re

BASE = "/home/ubuntu/pfs-spray-booths/client/src/pages"
IMPORT_LINE = 'import { SiteProductCardSection } from "@/components/SiteProductCard";'

def add_import(content: str) -> str:
    if "SiteProductCardSection" in content:
        return content
    lines = content.split("\n")
    last_import_idx = 0
    for i, line in enumerate(lines):
        if line.startswith("import "):
            last_import_idx = i
    lines.insert(last_import_idx + 1, IMPORT_LINE)
    return "\n".join(lines)

def remove_local_card_func(content: str) -> str:
    """Remove any local ProductCard / RelatedCard / AlsoLikeCard function definition."""
    func_pattern = re.compile(
        r'(?:^|\n)(?:/\*[^*]*\*\/\s*)?function\s+(?:ProductCard|RelatedCard|AlsoLikeCard)\s*\([^)]*\)[^{]*\{',
        re.MULTILINE
    )
    for match in func_pattern.finditer(content):
        start = match.start()
        # Find matching closing brace
        depth = 0
        i = content.index('{', match.start()) 
        while i < len(content):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
                if depth == 0:
                    end = i + 1
                    content = content[:start] + content[end:]
                    break
            i += 1
        # Only remove one at a time, restart
        return remove_local_card_func(content)
    return content

def patch_section(content: str, arr_name: str, heading: str = "You May Also Need") -> str:
    """Replace the section that maps over arr_name with SiteProductCardSection."""
    # Pattern: {/* ... RELATED ... */} <section ...> ... {arr_name.map(...)} ... </section>
    pattern = re.compile(
        r'\{/\*[^*]*(?:RELATED|You May|also-like|COMPLETE)[^*]*\*/\}\s*'
        r'<section[^>]*>.*?</section>',
        re.DOTALL | re.IGNORECASE
    )
    replacement = f'''      {{/* RELATED PRODUCTS */}}
      <SiteProductCardSection
        heading="{heading}"
        label="Complete Your System"
        cards={{{arr_name}}}
      />'''
    new_content = pattern.sub(replacement, content, count=1)
    return new_content

# --- OpenFaceBoothPage ---
fpath = os.path.join(BASE, "products/OpenFaceBoothPage.tsx")
with open(fpath) as f:
    content = f.read()
content = add_import(content)
content = remove_local_card_func(content)
content = patch_section(content, "PRODUCTS", "Complete Your Finishing System")
with open(fpath, "w") as f:
    f.write(content)
print("✓ OpenFaceBoothPage.tsx")

# --- AircraftBoothPage ---
fpath = os.path.join(BASE, "products/AircraftBoothPage.tsx")
with open(fpath) as f:
    content = f.read()
content = add_import(content)
content = remove_local_card_func(content)
content = patch_section(content, "RELATED_PRODUCTS", "Complete Your Finishing System")
with open(fpath, "w") as f:
    f.write(content)
print("✓ AircraftBoothPage.tsx")

# --- Industry pages ---
industry_dir = os.path.join(BASE, "industries")
for fname in sorted(os.listdir(industry_dir)):
    if not fname.endswith(".tsx"):
        continue
    fpath = os.path.join(industry_dir, fname)
    with open(fpath) as f:
        content = f.read()
    if "function ProductCard" not in content and "function RelatedCard" not in content:
        continue
    # Find the array name used in the map
    arr_match = re.search(r'const\s+([A-Z_]+)\s*=\s*\[', content)
    arr_name = arr_match.group(1) if arr_match else "PRODUCTS"
    content = add_import(content)
    content = remove_local_card_func(content)
    content = patch_section(content, arr_name, "You May Also Need")
    with open(fpath, "w") as f:
        f.write(content)
    print(f"✓ industries/{fname}")

print("Done.")
