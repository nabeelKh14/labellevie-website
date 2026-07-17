import sys, re, json
from cloakbrowser import launch

SLUGS = [
 "a-team-duo-kit","alastin-ha-hyaluronic-acid-immerse-serum","alastin-hydratint-pro-mineral-broad-spectrum-sunscreen-spf-36",
 "alastin-regenerating-skin-nectar","alastin-renewal-retinol","alastin-restorative-skin-complex","alastin-silksheild-all-mineral-sunscreen-spf-30",
 "alastin-ultra-calm-cleansing-cream","alastin-ultra-light-moisturizer","alpharet-clearing-serum","alpharet-exfoliating-peel-pads",
 "alpharet-overnight-cream-30-ml","alto-advanced-defense-and-repair-serum-30-ml","alto-advanced-defense-and-repair-serum-50-ml","alto-defense-serum-30-ml",
 "cleansing-gel-8-fl-oz","detoxifying-scrub-mask","epicutis-hyvia-creme","epicutis-lipid-recovery-mask","epicutis-lipid-recovery-mask-x5",
 "epicutis-lipid-serum","epicutis-oil-cleanser","epicutis-post-procedure-kit","even-tone-correcting-serum-50-ml","eyemax-alpharet-overnight-cream",
 "free-rapid-covid-testing","hydration-boosting-cream-50-ml","instant-effect-gel-eye","intensive-alpharet-overnight-cream-30-ml","intensive-alpharet-overnight-cream-50-ml",
 "mystro-active-balance-serum","nuface-trinity-pro-facial-toning-device","refining-foam-cleanser-5-fl-oz","sunbetter-sheer-spf-56-sunscreen-stick",
 "sunbetter-sheer-spf-70-sunscreen-lotion","sunbetter-tone-smart-spf-68-sunscreen-compact","sunbetter-tone-smart-spf-75-sunscreen-lotion","techno-neck-perfecting-cream-50-ml",
 "trio-luxe-moisture-treatment","trio-rebalancing-moisture-treatment-50-ml","vfitplus",
]

BASE = "https://labelleviemedspa.com/shop/ols/products/"
browser = launch()
page = browser.new_page()
results = []
for slug in SLUGS:
    url = BASE + slug
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(4500)
        text = page.inner_text("body")
        prices = re.findall(r'\$\s?[0-9]{1,4}(?:,[0-9]{3})*(?:\.[0-9]{2})?', text)
        results.append({"slug": slug, "title": page.title(), "prices": sorted(set(prices))})
    except Exception as e:
        results.append({"slug": slug, "error": str(e)[:160]})
    page.wait_for_timeout(600)

browser.close()
with open("scripts/prices.json", "w") as f:
    json.dump(results, f, indent=2)
print(f"DONE: {len(results)} products. {sum(1 for r in results if 'prices' in r and r['prices'])} with prices.")
