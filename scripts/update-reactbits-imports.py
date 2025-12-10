#!/usr/bin/env python3
"""Update imports after ReactBits reorganization."""
import json
import re
from pathlib import Path

PROJECT_DIR = Path("/home/neon/programs/web_dev/Portfolio-v1")
REACTBITS_DIR = PROJECT_DIR / "components/reactbits"

# Read manifest
with open(REACTBITS_DIR / ".manifest.json") as f:
    manifest = json.load(f)

# Build component -> category map
comp_to_category = {}
for category, components in manifest["components"].items():
    for comp in components:
        comp_to_category[comp] = category

# Find all TSX files in project (excluding node_modules and reactbits itself)
tsx_files = list(PROJECT_DIR.glob("**/*.tsx"))
tsx_files = [f for f in tsx_files if "node_modules" not in str(f) and "components/reactbits/" not in str(f).replace("\\", "/")]

updated = 0
for file_path in tsx_files:
    content = file_path.read_text()
    original = content
    
    # Find imports like: from "@/components/reactbits/ComponentName"
    pattern = r'from ["\']@/components/reactbits/(\w+)["\']'
    
    def replace_import(match):
        comp_name = match.group(1)
        if comp_name in comp_to_category:
            category = comp_to_category[comp_name]
            return f'from "@/components/reactbits/{category}/{comp_name}"'
        return match.group(0)
    
    content = re.sub(pattern, replace_import, content)
    
    if content != original:
        file_path.write_text(content)
        updated += 1
        print(f"✓ Updated: {file_path.relative_to(PROJECT_DIR)}")

print(f"\n✅ Done! Updated {updated} files.")
