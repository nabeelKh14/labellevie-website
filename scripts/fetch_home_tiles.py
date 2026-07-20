from cloakbrowser import launch
import json

browser = launch()
page = browser.new_page()
page.goto("https://labelleviemedspa.com/", wait_until="domcontentloaded", timeout=30000)
page.wait_for_timeout(5000)

data = page.evaluate("""() => {
  const out = [];
  const links = Array.from(document.querySelectorAll('a')).filter(a => a.querySelector('img'));
  for (const a of links) {
    const img = a.querySelector('img');
    const src = (img.src || img.getAttribute('data-src') || '').split('?')[0];
    if (!src.includes('wsimg.com') || src.includes('blob-5f21e66')) continue;
    const label = (a.innerText || '').replace(/\\s+/g, ' ').trim().split('\\n')[0].slice(0, 40);
    const href = a.getAttribute('href') || '';
    out.push({ label: label, href: href.slice(0, 60), img: src.split('/').pop().slice(0, 45) });
  }
  return out;
}""")

browser.close()
json.dump(data, open("scripts/live_home_tiles.json", "w"), indent=2)
print("TILES on homepage:", len(data))
for d in data:
    print(f"  {d['label'][:28]:28} | {d['href'][:34]:34} | {d['img'][:34]}")
