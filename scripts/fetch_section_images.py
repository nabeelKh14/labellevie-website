from cloakbrowser import launch
import json

browser = launch()
page = browser.new_page()
targets = {
  "home_hero": "https://labelleviemedspa.com/",
  "home_sections": "https://labelleviemedspa.com/",
  "about": "https://labelleviemedspa.com/about",
  "price_list": "https://labelleviemedspa.com/price-list-1",
  "promo": "https://labelleviemedspa.com/promo",
}
out = {}
for name, url in targets.items():
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(4000)
        imgs = page.eval_on_selector_all(
            "img, [style*='background-image']",
            """els => els.map(e => {
                if (e.tagName === 'IMG') return (e.src||e.getAttribute('data-src')||'').split('?')[0];
                const m = (e.getAttribute('style')||'').match(/url\\(["']?([^"')\s]+)["']?\\)/);
                return m ? m[1].split('?')[0] : '';
            }).filter(s => s.includes('wsimg.com') && !s.includes('blob-5f21e66'))"""
        )
        out[name] = list(dict.fromkeys(imgs))[:8]
    except Exception as e:
        out[name] = ["ERR:"+str(e)[:80]]
    page.wait_for_timeout(400)

browser.close()
json.dump(out, open("scripts/live_section_images.json","w"), indent=2)
for k,v in out.items():
    print(f"\n=== {k} ===")
    for i in v:
        print("  ", i.split("/")[-1][:70])
