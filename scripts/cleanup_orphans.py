"""
Clean up orphaned ProductCard function bodies left by the previous patch.
The issue: the function signature was removed but the body { ... } remained.
We look for lines that start with `: { label: string; href: string; img: string; desc: string }) {`
and remove everything from that point until the matching closing `}` followed by the next function or export.
"""
import os
import re

BASE = "/home/ubuntu/pfs-spray-booths/client/src/pages"

# Files with TS errors
PROBLEM_FILES = [
    "industries/AerospacePage.tsx",
    "industries/AutomotiveManufacturingPage.tsx",
    "industries/CollisionRepairPage.tsx",
    "industries/EnergyUtilitiesPage.tsx",
    "industries/GovernmentMilitaryPage.tsx",
    "industries/HeavyEquipmentPage.tsx",
    "industries/IndustrialManufacturingPage.tsx",
    "industries/MarinePage.tsx",
    "industries/RailTransitPage.tsx",
    "industries/TruckBusFleetPage.tsx",
    "industries/WoodworkingPage.tsx",
    "products/AircraftBoothPage.tsx",
    "products/CrossFlowBoothPage.tsx",
    "products/OpenFaceBoothPage.tsx",
]

def find_matching_brace_end(content: str, start: int) -> int:
    """Find the position after the matching closing brace starting from start."""
    depth = 0
    i = start
    while i < len(content):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return len(content)

def remove_orphan(content: str) -> str:
    """
    Remove orphaned card function bodies. These look like:
    : { label: string; href: string; img: string; desc: string }) {
      const [hovered, setHovered] = useState(false);
      ...
    }
    """
    # Pattern: a line starting with `: { label: string` (the orphaned function body start)
    orphan_pattern = re.compile(
        r'\n: \{ label: string; href: string; img: string; desc: string \}\) \{',
        re.MULTILINE
    )
    for match in orphan_pattern.finditer(content):
        start = match.start()
        # Find the opening brace
        brace_pos = content.index('{', match.end() - 1)
        end = find_matching_brace_end(content, brace_pos)
        content = content[:start] + content[end:]
        return remove_orphan(content)  # recurse in case of multiple
    return content

for rel in PROBLEM_FILES:
    fpath = os.path.join(BASE, rel)
    if not os.path.exists(fpath):
        print(f"  SKIP (not found): {rel}")
        continue
    with open(fpath) as f:
        content = f.read()
    new_content = remove_orphan(content)
    if new_content != content:
        with open(fpath, "w") as f:
            f.write(new_content)
        print(f"  ✓ cleaned: {rel}")
    else:
        print(f"  – no orphan found: {rel}")

print("Done.")
