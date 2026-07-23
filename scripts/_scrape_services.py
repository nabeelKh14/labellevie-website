from playwright.sync_api import sync_playwright
import re, json

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1280,'height':900})
    pg.goto('https://labelleviemedspa.com/', wait_until='domcontentloaded', timeout=30000)
    pg.wait_for_timeout(5000)
    html = pg.evaluate('''() => {
        const heads = Array.from(document.querySelectorAll('h2,h3,h4'));
        const h = heads.find(x => x.textContent.trim().startsWith('Injectables'));
        if (!h) return 'NO HEADING';
        let cur = h;
        while (cur && cur.tagName !== 'SECTION') cur = cur.parentElement;
        return cur ? cur.outerHTML.slice(0, 4000) : 'NONE';
    }''')
    # Find image refs
    refs = re.findall(r'(src|data-src|srcset|background-image|style)\s*[:=]\s*["\']?([^"\'>\s}]+)', html)
    print("IMAGE REFS:")
    for attr, val in refs[:40]:
        if 'img' in val.lower() or 'wsimg' in val or 'http' in val or 'url' in val:
            print(f"  {attr}: {val[:90]}")
    # filenames
    fnames = re.findall(r'([A-Za-z0-9_\-]+\.(jpeg|jpg|png|webp))', html)
    print("\nFILENAMES:")
    for f in dict.fromkeys(fnames):
        print("  ", f)
    b.close()
