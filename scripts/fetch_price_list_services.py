from cloakbrowser import launch
import json

browser = launch()
page = browser.new_page()
page.goto("https://labelleviemedspa.com/price-list-1", wait_until="domcontentloaded", timeout=30000)
page.wait_for_timeout(4500)
# services: each has an image + a heading; capture nearby text per image
data = page.eval_on_selector_all(
    "img",
    """els => els.map(e => {
        const img = e.src ? e.src.split('?')[0] : '';
        if (!img.includes('wsimg.com') || img.includes('blob-5f21e66') || !img.includes('rs=w:370')) return null;
        // walk up to find a heading/text near this image
        let node = e, txt = '';
        for (let i=0;i<4 && node; i++){ node = node.parentElement; if(!node) break;
            const h = node.querySelector('h1,h2,h3,h4,p,span'); if(h && h.innerText) { txt = h.innerText.trim().split('\\n')[0]; break; }
        }
        return { img, label: txt };
    }).filter(Boolean)"""
)
browser.close()
for d in data:
    print(d["label"][:50], "->", d["img"].split("/")[-1][:40])
json.dump(data, open("scripts/price_list_services.json","w"), indent=2)
