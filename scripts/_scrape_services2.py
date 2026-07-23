from playwright.sync_api import sync_playwright
import re, json

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1280,'height':900})
    # intercept network requests for service images / data
    captured = []
    pg.on('response', lambda r: captured.append(r.url) if ('service' in r.url.lower() or 'istream' in r.url.lower() or 'wsimg' in r.url.lower()) else None)
    pg.goto('https://labelleviemedspa.com/', wait_until='networkidle', timeout=40000)
    pg.wait_for_timeout(3000)
    # scroll through to trigger lazy loads
    for i in range(10):
        pg.evaluate(f'window.scrollTo(0, {(i+1)*600})')
        pg.wait_for_timeout(400)
    pg.wait_for_timeout(2000)
    # look for embedded JSON with image data
    data = pg.evaluate('''() => {
        const scripts = Array.from(document.querySelectorAll('script'));
        const out = [];
        for (const s of scripts) {
            const t = s.textContent;
            if (t.includes('wsimg') || t.includes('serviceImage') || t.includes('imageUrl')) {
                out.push(t.slice(0, 500));
            }
        }
        return out;
    }''')
    print("=== EMBEDDED JSON WITH IMAGES ===")
    for d in data[:5]:
        print(d[:300])
        print("---")
    print("\n=== CAPTURED WSIMG/IMAGE URLS ===")
    wsimg = [u for u in captured if 'wsimg' in u]
    for u in dict.fromkeys(wsimg):
        print(u.split('/')[-1].split('?')[0][:70])
    b.close()
