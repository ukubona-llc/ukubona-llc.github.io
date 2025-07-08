#!/usr/bin/env python3
"""
generate_requirements.py 📦

Scans the active virtualenv and writes a clean requirements.txt
for reproducible deploys, including exact versions.
"""

import subprocess
import os
from pathlib import Path

VENV_BIN = Path(os.getenv("VIRTUAL_ENV", "venv")) / "bin"
REQUIREMENTS_FILE = Path("requirements.txt")

def generate_requirements():
    if not VENV_BIN.exists():
        print(f"❌ Virtualenv not found at {VENV_BIN}")
        return

    print("📦 Generating requirements.txt from virtualenv...")
    try:
        output = subprocess.check_output([VENV_BIN / "pip", "freeze"], text=True)
        REQUIREMENTS_FILE.write_text(output)
        print(f"✅ requirements.txt written with {len(output.splitlines())} packages.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to freeze packages: {e}")

if __name__ == "__main__":
    generate_requirements()

