from cloakbrowser import launch
import re, json

browser = launch()
page = browser.new_page()
urls = [
    "https://labelleviemedspa.com/",
    "https://labelleviemedspa.com/about",
    "https://labelleviemedspa.com/shop",
    "https://labelleviemedspa.com/promo",
]
all_imgs = set()
for u in urls:
    try:
        page.goto(u, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(4000)
        imgs = page.eval_on_selector_all("img", "els => els.map(e => e.src || e.getAttribute('data-src') || '').filter(Boolean)")
        for i in imgs:
            if "wsimg.com" in i or "isteam" in i:
                all_imgs.add(i.split("?")[0])
    except Exception as e:
        print("ERR", u, str(e)[:100])
    page.wait_for_timeout(500)

browser.close()
# normalize isteam urls to a clean form
clean = sorted(all_imgs)
with open("scripts/live_images.json", "w") as f:
    json.dump(clean, f, indent=2)
print(f"Found {len(clean)} live images:")
for c in clean[:60]:
    print(" ", c)
