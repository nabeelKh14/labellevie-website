from cloakbrowser import launch
import re, json

# Load existing prices to drive the slug list
prices = json.load(open("scripts/prices.json"))
# slug -> {title, price}
meta = {p["slug"]: p for p in prices}

slugs = list(meta.keys())
BASE = "https://labelleviemedspa.com/shop/ols/products/"

browser = launch()
page = browser.new_page()
results = {}
for slug in slugs:
    url = BASE + slug
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(4500)
        # grab wsimg product images (exclude the logo blob png)
        imgs = page.eval_on_selector_all(
            "img",
            "els => els.map(e => (e.src||e.getAttribute('data-src')||'').split('?')[0]).filter(Boolean)"
        )
        prod_imgs = [i for i in imgs if "wsimg.com" in i and "blob-5f21e66" not in i]
        results[slug] = {
            "title": meta[slug].get("title"),
            "price": (meta[slug].get("prices") or [None])[0],
            "image": prod_imgs[0] if prod_imgs else None,
            "all_imgs": prod_imgs[:3],
        }
    except Exception as e:
        results[slug] = {"error": str(e)[:160]}
    page.wait_for_timeout(500)

browser.close()
json.dump(results, open("scripts/product_images.json", "w"), indent=2)
with_imgs = sum(1 for v in results.values() if v.get("image"))
print(f"DONE: {len(results)} products, {with_imgs} with an image.")
for k, v in list(results.items())[:5]:
    print(f"  {k}: {v.get('image')}")
