import sys, re, json
from cloakbrowser import launch

BASE = "https://labelleviemedspa.com/shop/ols/products/"
SLUGS = sys.argv[1:] or ["alastin-silksheild-all-mineral-sunscreen-spf-30"]

browser = launch()
page = browser.new_page()
results = []
for slug in SLUGS:
    url = BASE + slug
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(5000)  # let JS price populate
        text = page.inner_text("body")
        prices = re.findall(r'\$\s?[0-9]{1,4}(?:,[0-9]{3})*(?:\.[0-9]{2})?', text)
        title = page.title()
        results.append({"slug": slug, "title": title, "prices": sorted(set(prices))})
    except Exception as e:
        results.append({"slug": slug, "error": str(e)[:200]})
    page.wait_for_timeout(800)

browser.close()
print(json.dumps(results, indent=2))
