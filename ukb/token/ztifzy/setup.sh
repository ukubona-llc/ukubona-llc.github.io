#!/bin/bash

# Exit on error
set -e

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Upgrade pip
python3 -m pip install --upgrade pip

# Install only what you need
pip install flask  # Only if your project uses Flask

echo "✅ Setup complete."
