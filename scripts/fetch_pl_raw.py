from cloakbrowser import launch
import json

browser = launch()
page = browser.new_page()
page.goto("https://labelleviemedspa.com/price-list-1", wait_until="domcontentloaded", timeout=30000)
page.wait_for_timeout(4500)
# Get all w:370 image srcs IN DOCUMENT ORDER, plus the full text content split by lines
imgs = page.eval_on_selector_all("img", "els => els.map(e => (e.src || '').split('?')[0]).filter(s => s.includes('rs=w:370') && !s.includes('blob'))")
# get text of every element that looks like a service title (h-tags + bold spans) in order
texts = page.eval_on_selector_all("h1,h2,h3,h4,h5,strong,b", "els => els.map(e=>e.innerText.trim()).filter(t=>t.length>2&&t.length<60)")
browser.close()
print("IMAGES (", len(imgs), "):")
for i in imgs[:10]:
    print("  ", i.split("/")[-1][:45])
print("\nTEXT NODES (first 40):")
for t in texts[:40]:
    print("  ", repr(t))
json.dump({"imgs": imgs, "texts": texts}, open("scripts/pl_raw.json","w"), indent=2)
