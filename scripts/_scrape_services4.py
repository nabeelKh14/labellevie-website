from playwright.sync_api import sync_playwright
import re, json

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1280,'height':900})
    pg.goto('https://labelleviemedspa.com/', wait_until='domcontentloaded', timeout=30000)
    pg.wait_for_timeout(3000)
    for i in range(12):
        pg.evaluate(f'window.scrollTo(0, {(i+1)*500})')
        pg.wait_for_timeout(400)
    pg.wait_for_timeout(2000)
    # Extract service name + image pairs from rendered cards
    data = pg.evaluate('''() => {
        const out = [];
        // service cards: look for elements containing both an h-tag (name) and img
        const sections = document.querySelectorAll('section');
        for (const sec of sections) {
            const h = sec.querySelector('h2,h3,h4');
            if (!h) continue;
            const imgs = sec.querySelectorAll('img');
            if (imgs.length > 0) {
                const names = Array.from(sec.querySelectorAll('h2,h3,h4')).map(x => x.textContent.trim());
                const srcs = Array.from(imgs).filter(i => i.src.includes('wsimg')).map(i => i.src.split('?')[0]);
                if (srcs.length) out.push({section: h.textContent.trim(), names: names, imgs: srcs});
            }
        }
        return out;
    }''')
    for d in data:
        print(f"SECTION: {d['section']}")
        print(f"  names: {d['names'][:6]}")
        print(f"  imgs: {[i.split('/')[-1][:40] for i in d['imgs']]}")
    b.close()
