from cloakbrowser import launch
import json, urllib.request, os

browser = launch()
page = browser.new_page()
# price list service images (w:370)
page.goto("https://labelleviemedspa.com/price-list-1", wait_until="domcontentloaded", timeout=30000)
page.wait_for_timeout(4500)
pl_imgs = page.eval_on_selector_all(
    "img",
    "els => els.map(e => (e.src||e.getAttribute('data-src')||'').split('?')[0]).filter(s=>s.includes('wsimg.com')&&!s.includes('blob-5f21e66'))"
)
# about page squares
page.goto("https://labelleviemedspa.com/about", wait_until="domcontentloaded", timeout=30000)
page.wait_for_timeout(4000)
about_imgs = page.eval_on_selector_all(
    "img",
    "els => els.map(e => (e.src||e.getAttribute('data-src')||'').split('?')[0]).filter(s=>s.includes('wsimg.com')&&!s.includes('blob-5f21e66'))"
)
browser.close()

# download price-list service images (the w:370 ones = treatment thumbnails)
os.makedirs("public/images/services", exist_ok=True)
def base(u): return u.split("?")[0]
pl_set = [base(u) for u in pl_imgs if "rs=w:370" in u][:8]
about_set = [base(u) for u in about_imgs if "rs=w:600" in u or "rs=w:1240" in u][:3]

print("price-list service imgs:", len(pl_set))
print("about imgs:", len(about_set))

# download
def dl(url, dest):
    try:
        req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"})
        d = urllib.request.urlopen(req, timeout=40).read()
        open(dest,"wb").write(d)
        return True
    except Exception as e:
        print("FAIL", dest, str(e)[:60]); return False

for i,u in enumerate(pl_set):
    dl(u, f"public/images/services/service-{i+1}.jpg")
for i,u in enumerate(about_set):
    dl(u, f"public/images/about-{i+1}.jpg")

json.dump({"services": pl_set, "about": about_set}, open("scripts/section_imgs.json","w"), indent=2)
print("downloaded service imgs:", len([f for f in os.listdir('public/images/services') if f.endswith('.jpg')]))
