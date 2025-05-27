import os
import subprocess
import shutil
from pathlib import Path
from datetime import datetime
import shlex

def run(cmd, cwd=None, check_error=True):
    print(f"▶️ {cmd}")
    result = subprocess.run(cmd, shell=True, text=True, cwd=cwd, capture_output=True)
    if result.returncode != 0:
        if check_error:
            print(f"❌ Error:\n{result.stderr.strip()}")
            exit(1)
        else:
            print(f"⚠️ Warning:\n{result.stderr.strip()}")
    return result.stdout.strip()

def git_push_with_message(message="2 Chronicles 16:9 as mission"):
    run("git add .")
    quoted = shlex.quote(message)
    commit_output = run(f'git commit -m {quoted}', check_error=False)
    if "nothing to commit" in commit_output.lower():
        print("⚠️ No new changes to commit.")
    else:
        print(commit_output)
    run("git push")

def move_index_html():
    src = Path("index.html")
    dest = Path("kitabo/ensi/index/index.html")
    dest.parent.mkdir(parents=True, exist_ok=True)
    if src.exists():
        if dest.exists():
            print("⚠️ Destination already exists. Skipping move.")
        else:
            shutil.move(str(src), str(dest))
            print(f"✅ Moved: {src} → {dest}")
    else:
        print("⚠️ No root index.html found. Already moved or never existed.")

def summarize_repo(root="."):
    print(f"\n📁 Scanning directory: {root}\n")
    total_files = 0
    total_folders = 0
    ext_count = {}

    for dirpath, dirnames, filenames in os.walk(root):
        total_folders += len(dirnames)
        total_files += len(filenames)
        for file in filenames:
            ext = Path(file).suffix.lower()
            ext_count[ext] = ext_count.get(ext, 0) + 1

    print(f"🗂️  Total files:  {total_files:>6}")
    print(f"📂 Total folders:{total_folders:>6}\n")

    print("🧾 File breakdown:")
    types = {
        ".html": "📄 HTML files",
        ".md": "📓 Markdown files",
        ".py": "🐍 Python files",
        ".js": "📜 JavaScript files",
        ".css": "🎨 CSS files",
        ".png": "🖼️  Image files",
        ".jpg": "🖼️  Image files",
        ".jpeg": "🖼️  Image files",
        ".svg": "🖼️  Image files",
        ".gif": "🖼️  Image files",
        ".cff": "🧾 Citation (.cff)",
        ".gz": "📦 Compressed files",
        ".tar": "📦 Compressed files",
        ".zip": "📦 Compressed files",
    }

    for ext, label in types.items():
        count = sum(v for k, v in ext_count.items() if k == ext)
        if count:
            print(f"  {label:<20}: {count:>4}")

    print("\n🕰️  Timestamp:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    print("✅ Done scanning.\n")

if __name__ == "__main__":
    print("\n🌍 Starting deployment sequence...\n")
    move_index_html()
    git_push_with_message("2 Chronicles 16:9 as mission")
    summarize_repo()
