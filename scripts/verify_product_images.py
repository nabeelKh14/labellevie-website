from cloakbrowser import launch
import json, re

meta = json.load(open("scripts/product_images.json"))
# take 6 sample slugs across brands
samples = [
 "alastin-regenerating-skin-nectar",
 "nuface-trinity-pro-facial-toning-device",
 "epicutis-lipid-serum",
 "alpharet-overnight-cream-30-ml",
 "sunbetter-tone-smart-spf-75-sunscreen-lotion",
 "vfitplus",
]
BASE = "https://labelleviemedspa.com/shop/ols/products/"
browser = launch()
page = browser.new_page()
for slug in samples:
    url = BASE + slug
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(4500)
        # get ALL images with alt + src
        imgs = page.eval_on_selector_all(
            "img",
            "els => els.map(e => ({src:(e.src||e.getAttribute('data-src')||'').split('?')[0], alt:e.alt||''})).filter(i=>i.src.includes('wsimg.com') && !i.src.includes('blob-5f21e66'))"
        )
        print(f"\n=== {slug} ({meta.get(slug,{}).get('title')}) ===")
        for i in imgs[:4]:
            print(f"  alt='{i['alt']}' -> {i['src'].split('/')[-1][:60]}")
    except Exception as e:
        print(slug, "ERR", str(e)[:80])
    page.wait_for_timeout(400)
browser.close()
