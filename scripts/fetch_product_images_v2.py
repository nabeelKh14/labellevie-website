from cloakbrowser import launch
import json, os, urllib.request, re

prices = json.load(open("scripts/prices.json"))
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
        # Get ALL imgs with alt + natural size + src. Pick the one whose alt
        # EXACTLY matches the product title and is the largest (main shot).
        imgs = page.eval_on_selector_all(
            "img",
            """els => els.map(e => {
                const src = (e.src||e.getAttribute('data-src')||'').split('?')[0];
                if (!src.includes('wsimg.com') || src.includes('blob-5f21e66')) return null;
                return { src, alt:(e.alt||'').trim(), w:e.naturalWidth||0, h:e.naturalHeight||0 };
            }).filter(Boolean)"""
        )
        title = (meta[slug].get("title") or "").strip().lower()
        # exact alt match
        exact = [i for i in imgs if i["alt"].lower() == title]
        # fallback: alt contains title words
        partial = [i for i in imgs if title and title.split()[0] in i["alt"].lower()]
        pick = (exact or partial or imgs)
        # prefer largest
        pick = sorted(pick, key=lambda x: x["w"]*x["h"], reverse=True)
        best = pick[0] if pick else None
        results[slug] = {
            "title": meta[slug].get("title"),
            "price": (meta[slug].get("prices") or [None])[0],
            "image": best["src"] if best else None,
            "alt": best["alt"] if best else None,
            "all_alts": [i["alt"] for i in imgs[:5]],
        }
    except Exception as e:
        results[slug] = {"error": str(e)[:160]}
    page.wait_for_timeout(400)

browser.close()
json.dump(results, open("scripts/product_images_v2.json","w"), indent=2)

# download originals
os.makedirs("public/images/products", exist_ok=True)
def clean(u): return u.split("?")[0].replace("/:/rs=w:1000,h:1000","").replace("/:/rs=w:1200,h:1200","")
mismatch = []
for slug, d in results.items():
    img = d.get("image")
    if not img:
        mismatch.append(slug+":NOIMG"); continue
    ext = ".png" if clean(img).lower().endswith(".png") else ".jpg"
    dest = f"public/images/products/{slug}{ext}"
    try:
        req = urllib.request.Request(clean(img), headers={"User-Agent":"Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=40).read()
        with open(dest,"wb") as f: f.write(data)
        # verify alt matches title
        if d.get("alt") and d["alt"].lower() != (d.get("title") or "").strip().lower():
            mismatch.append(f"{slug}: alt='{d['alt'][:30]}' != title")
    except Exception as e:
        mismatch.append(slug+":DLFAIL")
print(f"Downloaded. Mismatches/flags: {len(mismatch)}")
for m in mismatch[:20]: print("  ", m)
