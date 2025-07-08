# generate_token.py
import os
import csv
import secrets
from datetime import datetime, timedelta

TOKEN_DIR = "ukb/token"
TEMPLATE_ASSETS = "ukb/assets"
CATALOG = "ukb/token_catalog.csv"

LINKS = [
    { "name": "ChatGPT", "url": "https://abikesa.github.io/t-s-eliot/gpt-z1.html", "icon": "🌊" },
    { "name": "DeepSeek", "url": "https://abikesa.github.io/t-s-eliot/deepseek-1.html", "icon": "🚢" },
    { "name": "Grok-3", "url": "https://abikesa.github.io/t-s-eliot/grok-1.html", "icon": "🏴‍☠️" },
    { "name": "Internship", "url": "https://jonnygas07.github.io/class-presentation-template/", "icon": "✂️" },
    { "name": "Mythopoetics", "url": "./assets/vscode/onboarding-myth/creative-destruction.html", "icon": "🏺" },
    { "name": "MacOS", "url": "./assets/vscode/onboarding-automated/automated-mac.html", "icon": "🍎" },
    { "name": "Mock", "url": "./assets/html/mock-presentation.html", "icon": "⚾️" },
    { "name": "Final", "url": "./assets/html/final.html", "icon": "🎓" }
]

def generate_token_dir(intern_name, days_valid=7):
    token = secrets.token_hex(3)
    path = os.path.join(TOKEN_DIR, token)
    os.makedirs(path, exist_ok=True)

    created_at = datetime.now()
    expires_at = created_at + timedelta(days=days_valid)

    # Write README.md
    with open(os.path.join(path, "README.md"), "w") as f:
        f.write(f"# Access Token: `{token}`\n")
        f.write(f"- **Intern:** {intern_name}\n")
        f.write(f"- **Created:** {created_at.isoformat()}\n")
        f.write(f"- **Expires:** {expires_at.isoformat()}\n")
        f.write("\n## Resources\n")
        for link in LINKS:
            f.write(f"- {link['icon']} [{link['name']}]({link['url']})\n")

    # Write index.html
    with open(os.path.join(path, "index.html"), "w") as f:
        f.write("<!DOCTYPE html>\n<html><head><title>Resources</title></head><body>\n")
        f.write(f"<h1>Welcome, {intern_name}</h1>\n")
        f.write(f"<p><strong>Token:</strong> {token}<br>\n")
        f.write(f"<strong>Expires:</strong> {expires_at.strftime('%Y-%m-%d %H:%M')}</p>\n")
        f.write("<ul>\n")
        for link in LINKS:
            f.write(f"<li>{link['icon']} <a href='{link['url']}' target='_blank'>{link['name']}</a></li>\n")
        f.write("</ul>\n</body></html>")

    # Optionally copy assets folder (if needed)
    os.system(f"cp -R {TEMPLATE_ASSETS} {path}/assets")

    # Log metadata
    with open(CATALOG, "a", newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([token, intern_name, created_at.isoformat(), expires_at.isoformat(), path, "active"])

    return token, path

# Example CLI
if __name__ == "__main__":
    name = input("Intern name: ")
    token, path = generate_token_dir(name)
    print(f"\n✅ Token created for {name}\n🔑 Token: {token}\n📁 Path: {path}")

