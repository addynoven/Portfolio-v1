#!/usr/bin/env python3
"""
Unused Files Scanner and Cleaner for Next.js/React Project
Scans the project and identifies/removes files that are not imported anywhere.
"""

import os
import re
import sys
import shutil
from pathlib import Path
from collections import defaultdict

# Project root
PROJECT_ROOT = Path("/home/neon/programs/web_dev/Portfolio-v1")

# Directories to scan for source files
SOURCE_DIRS = ["components", "app", "lib", "hooks"]

# File extensions to check
EXTENSIONS = {".tsx", ".ts", ".jsx", ".js"}

# Directories to skip
SKIP_DIRS = {"node_modules", ".next", ".git", "public", "scripts"}

# Entry points that are always used (layout, page files, etc.)
ENTRY_POINTS = {
    "layout.tsx", "page.tsx", "layout.js", "page.js",
    "globals.css", "not-found.tsx", "error.tsx", "loading.tsx",
    "route.ts", "route.js"  # API routes
}

# Files/patterns to NEVER delete (safety list)
PROTECTED_PATTERNS = [
    "app/api/",          # API routes
    "ui/button",         # Core UI components
    "ui/input",
    "ui/sheet",
    "ui/tooltip",        # May be used by other components
    "ui/tabs",
    "ui/select",
    "ui/scroll-area",
    "ui/dialog",
    "lib/utils",
    "lib/data",
    "lib/accentColor",
    "hooks/use",
]

def get_all_source_files():
    """Get all source files in the project."""
    files = []
    for source_dir in SOURCE_DIRS:
        dir_path = PROJECT_ROOT / source_dir
        if not dir_path.exists():
            continue
        for root, dirs, filenames in os.walk(dir_path):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            for filename in filenames:
                if Path(filename).suffix in EXTENSIONS:
                    files.append(Path(root) / filename)
    return files

def extract_imports(file_path):
    """Extract all import paths from a file."""
    imports = set()
    try:
        content = file_path.read_text(encoding='utf-8')
        import_patterns = [
            r'import\s+.*?\s+from\s+["\']([^"\']+)["\']',
            r'import\s+["\']([^"\']+)["\']',
            r'require\s*\(\s*["\']([^"\']+)["\']\s*\)',
            r'dynamic\s*\(\s*\(\s*\)\s*=>\s*import\s*\(\s*["\']([^"\']+)["\']\s*\)',
        ]
        for pattern in import_patterns:
            matches = re.findall(pattern, content)
            imports.update(matches)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return imports

def resolve_import_path(import_path, importer_file):
    """Resolve an import path to an actual file path."""
    if import_path.startswith("@/"):
        resolved = PROJECT_ROOT / import_path[2:]
    elif import_path.startswith("./") or import_path.startswith("../"):
        resolved = (importer_file.parent / import_path).resolve()
    else:
        return None
    
    for ext in ["", ".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts", "/index.jsx", "/index.js"]:
        test_path = Path(str(resolved) + ext)
        if test_path.exists() and test_path.is_file():
            return test_path
    return None

def is_protected(file_path):
    """Check if a file is protected from deletion."""
    rel_path = str(file_path.relative_to(PROJECT_ROOT))
    for pattern in PROTECTED_PATTERNS:
        if pattern in rel_path:
            return True
    return False

def find_unused_files():
    """Find all files that are not imported anywhere."""
    all_files = get_all_source_files()
    print(f"\n📁 Found {len(all_files)} source files to analyze\n")
    
    imported_files = set()
    for file_path in all_files:
        imports = extract_imports(file_path)
        for imp in imports:
            resolved = resolve_import_path(imp, file_path)
            if resolved:
                imported_files.add(resolved)
    
    unused_files = []
    for file_path in all_files:
        filename = file_path.name
        if filename in ENTRY_POINTS:
            continue
        if is_protected(file_path):
            continue
        if file_path not in imported_files:
            unused_files.append(file_path)
    
    return unused_files, all_files

def delete_unused_files(unused_files, dry_run=True):
    """Delete unused files."""
    deleted = []
    failed = []
    total_bytes = 0
    
    for f in unused_files:
        try:
            size = f.stat().st_size
            if not dry_run:
                f.unlink()
            deleted.append((f, size))
            total_bytes += size
        except Exception as e:
            failed.append((f, str(e)))
    
    return deleted, failed, total_bytes

def delete_empty_dirs():
    """Delete empty directories after file cleanup."""
    deleted_dirs = []
    for source_dir in SOURCE_DIRS:
        dir_path = PROJECT_ROOT / source_dir
        if not dir_path.exists():
            continue
        # Walk bottom-up to delete empty dirs
        for root, dirs, files in os.walk(dir_path, topdown=False):
            for d in dirs:
                full_path = Path(root) / d
                try:
                    if full_path.exists() and not any(full_path.iterdir()):
                        full_path.rmdir()
                        deleted_dirs.append(full_path)
                except:
                    pass
    return deleted_dirs

def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "report"
    
    unused_files, all_files = find_unused_files()
    
    print("=" * 60)
    print("📊 UNUSED FILES REPORT")
    print("=" * 60)
    print(f"\nTotal source files: {len(all_files)}")
    print(f"Potentially unused files: {len(unused_files)}")
    
    if not unused_files:
        print("\n✅ No unused files found!")
        return
    
    # Group by directory
    by_dir = defaultdict(list)
    for f in unused_files:
        rel_path = f.relative_to(PROJECT_ROOT)
        by_dir[str(rel_path.parent)].append(f)
    
    print("\n" + "-" * 60)
    print("\n🔍 FILES TO BE DELETED:\n")
    
    total_size = 0
    for dir_path, files in sorted(by_dir.items()):
        print(f"📂 {dir_path}/")
        for f in sorted(files, key=lambda x: x.name):
            size = f.stat().st_size
            total_size += size
            print(f"   ├── {f.name} ({size:,} bytes)")
        print()
    
    print(f"Total: {len(unused_files)} files, {total_size:,} bytes ({total_size/1024:.1f} KB)")
    print("-" * 60)
    
    if mode == "delete":
        print("\n🗑️  DELETING FILES...\n")
        deleted, failed, bytes_freed = delete_unused_files(unused_files, dry_run=False)
        
        print(f"✅ Deleted {len(deleted)} files ({bytes_freed:,} bytes freed)")
        
        if failed:
            print(f"\n⚠️  Failed to delete {len(failed)} files:")
            for f, err in failed:
                print(f"   • {f}: {err}")
        
        # Clean up empty directories
        empty_dirs = delete_empty_dirs()
        if empty_dirs:
            print(f"\n📁 Removed {len(empty_dirs)} empty directories")
        
        print("\n✨ Cleanup complete!")
    else:
        print("\n💡 To delete these files, run:")
        print("   python3 scripts/find_unused_files.py delete")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
