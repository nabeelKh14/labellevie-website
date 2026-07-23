from playwright.sync_api import sync_playwright
import re

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1280,'height':900})
    pg.goto('https://labelleviemedspa.com/', wait_until='domcontentloaded', timeout=30000)
    pg.wait_for_timeout(3000)
    for i in range(12):
        pg.evaluate(f'window.scrollTo(0, {(i+1)*500})')
        pg.wait_for_timeout(400)
    pg.wait_for_timeout(2000)
    # Find service cards by their structure: a card with a title (service name) and a bg image
    data = pg.evaluate('''() => {
        const out = [];
        // GoDaddy service list: each service is a clickable card with an image div + title
        const allDivs = Array.from(document.querySelectorAll('div'));
        for (const div of allDivs) {
            const bg = getComputedStyle(div).backgroundImage;
            if (bg && bg.includes('wsimg') && bg.includes('url')) {
                // find the service name - look for an h-tag within this div or nearby
                const titleEl = div.querySelector('h2,h3,h4') || div.parentElement?.querySelector('h2,h3,h4');
                const bgUrl = bg.match(/url\\("?([^")]+)"?\\)/);
                if (bgUrl && titleEl) {
                    out.push({name: titleEl.textContent.trim().slice(0,50), img: bgUrl[1].split('?')[0]});
                }
            }
        }
        return out;
    }''')
    # dedupe by name
    seen = set()
    for d in data:
        key = d['name']
        if key in seen: continue
        seen.add(key)
        print(f"{d['name'][:45]:45s} | {d['img'].split('/')[-1][:40]}")
    b.close()
