#!/bin/bash
# python3.12 -m venv myenv
python3 -m venv myenv
source myenv/bin/activate
pip install -r https://raw.githubusercontent.com/abikesa/requirements/main/requirements.txt
git add . 
python ukb/dolce && ./python/deploy.py
