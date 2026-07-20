from cloakbrowser import launch
import json

browser = launch()
page = browser.new_page()
page.goto("https://labelleviemedspa.com/", wait_until="domcontentloaded", timeout=30000)
page.wait_for_timeout(5000)

# Find the block containing 'Services' and dump its image+text children in order
data = page.evaluate("""() => {
  const all = Array.from(document.querySelectorAll('*'));
  const svc = all.find(e => (e.innerText||'').includes('Services') && (e.innerText||'').length < 400);
  if (!svc) return {found:false};
  const parent = svc.parentElement || svc;
  const kids = Array.from(parent.children);
  const tiles = [];
  for (const k of kids) {
    const img = k.querySelector('img');
    const src = img ? (img.src||img.getAttribute('data-src')||'').split('?')[0] : '';
    const txt = (k.innerText||'').replace(/\\s+/g,' ').trim().slice(0,40);
    if (src.includes('wsimg.com')) tiles.push({ label: txt, img: src.split('/').pop().slice(0,45) });
    else if (txt) tiles.push({ label: txt });
  }
  return { found: true, parentText: (parent.innerText||'').replace(/\\s+/g,' ').trim().slice(0,200), tiles };
}""")

browser.close()
json.dump(data, open("scripts/live_services_block.json","w"), indent=2)
print(json.dumps(data, indent=2)[:2000])
