from cloakbrowser import launch
import re, json

browser = launch()
page = browser.new_page()
url = "https://labelleviemedspa.com/promo"
out = {}
try:
    page.goto(url, wait_until="domcontentloaded", timeout=30000)
    page.wait_for_timeout(4000)
    out["title"] = page.title()
    out["text"] = page.inner_text("body")[:2500]
    # form fields
    fields = page.eval_on_selector_all("input,textarea,select", "els => els.map(e => ({type:e.type, name:e.name||e.id, placeholder:e.placeholder||''}))")
    out["form_fields"] = fields
    # images
    imgs = page.eval_on_selector_all("img", "els => els.map(e => (e.src||e.getAttribute('data-src')||'').split('?')[0]).filter(Boolean)")
    out["images"] = [i for i in imgs if "wsimg.com" in i][:20]
except Exception as e:
    out["error"] = str(e)[:200]
browser.close()
print(json.dumps(out, indent=2))
