#!/usr/bin/env python3
"""Organize ReactBits components into category subfolders."""
import json
import shutil
from pathlib import Path

REACTBITS_DIR = Path("/home/neon/programs/web_dev/Portfolio-v1/components/reactbits")

# Read manifest
with open(REACTBITS_DIR / ".manifest.json") as f:
    manifest = json.load(f)

# Create folders
for category in ["TextAnimations", "Animations", "Components", "Backgrounds"]:
    (REACTBITS_DIR / category).mkdir(exist_ok=True)

# Move files
moved = 0
for category, components in manifest["components"].items():
    dest_folder = REACTBITS_DIR / category
    for comp in components:
        # Move .tsx file
        tsx_file = REACTBITS_DIR / f"{comp}.tsx"
        if tsx_file.exists():
            shutil.move(str(tsx_file), str(dest_folder / f"{comp}.tsx"))
            moved += 1
            print(f"✓ {comp}.tsx -> {category}/")
        
        # Move .css file if exists
        css_file = REACTBITS_DIR / f"{comp}.css"
        if css_file.exists():
            shutil.move(str(css_file), str(dest_folder / f"{comp}.css"))
            print(f"✓ {comp}.css -> {category}/")

print(f"\n✅ Done! Moved {moved} components into 4 folders.")
