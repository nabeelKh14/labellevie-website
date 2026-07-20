from cloakbrowser import launch
import json

browser = launch()
page = browser.new_page()
page.goto("https://labelleviemedspa.com/", wait_until="domcontentloaded", timeout=30000)
page.wait_for_timeout(5000)

# Walk the main content sections in document order, capturing heading/text + any bg image
sections = page.evaluate("""() => {
  const out = [];
  const main = document.querySelector('main') || document.body;
  // grab section-ish blocks: elements with a heading or background image
  const blocks = main.querySelectorAll('section, div, header, article');
  const seen = new Set();
  for (const b of blocks) {
    const txt = (b.innerText || '').replace(/\\s+/g,' ').trim();
    if (txt.length < 15) continue;
    // background image?
    const cs = getComputedStyle(b);
    let bg = '';
    const m = (cs.backgroundImage || '').match(/url\\(["']?([^"')\s]+)["']?\\)/);
    if (m) bg = m[1].split('?')[0];
    // imgs inside
    const imgs = Array.from(b.querySelectorAll('img')).map(i=>(i.src||i.getAttribute('data-src')||'').split('?')[0]).filter(s=>s.includes('wsimg.com'));
    // only keep meaningful blocks (heading present or has image)
    const hasH = b.querySelector('h1,h2,h3,h4');
    if (!hasH && !bg && imgs.length===0) continue;
    const key = txt.slice(0,40);
    if (seen.has(key)) continue; seen.add(key);
    out.push({ text: txt.slice(0,200), bg: bg, imgs: imgs.slice(0,3) });
  }
  return out.slice(0, 25);
}""")

browser.close()
json.dump(sections, open("scripts/live_home_sections.json","w"), indent=2)
for i,s in enumerate(sections):
    print(f"\n[{i}] {'BG' if s['bg'] else '   '} {'IMG' if s['imgs'] else '   '}")
    print("  ", s['text'][:140])
    if s['bg']: print("   bg:", s['bg'].split('/')[-1][:40])
    for im in s['imgs']: print("   img:", im.split('/')[-1][:40])
