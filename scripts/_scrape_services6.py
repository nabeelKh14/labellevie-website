from playwright.sync_api import sync_playwright
import re, time

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1280,'height':900})
    # capture image requests with the current visible service name
    pairs = []
    def on_response(response):
        url = response.url
        if 'wsimg' in url and 'isteam/ip' in url and any(x in url for x in ['IMG_', 'Nectar', 'Hydratint', 'HA.', 'moisturizer', 'restore', 'Retinol', 'LS%20panel', 'Consult', 'bed%20lights', 'Nectar']):
            # get currently visible service heading
            try:
                name = pg.evaluate('''() => {
                    const heads = Array.from(document.querySelectorAll('h2,h3,h4')).filter(h => {
                        const r = h.getBoundingClientRect();
                        return r.top > 0 && r.top < window.innerHeight * 0.6;
                    });
                    return heads.length ? heads[0].textContent.trim() : '';
                }''')
                if name:
                    pairs.append((name, url.split('?')[0]))
            except:
                pass
    pg.on('response', on_response)
    pg.goto('https://labelleviemedspa.com/', wait_until='domcontentloaded', timeout=30000)
    pg.wait_for_timeout(3000)
    # scroll slowly through entire page
    for i in range(25):
        pg.evaluate(f'window.scrollTo(0, {i*400})')
        pg.wait_for_timeout(600)
    pg.wait_for_timeout(2000)
    # dedupe
    seen = set()
    for name, url in pairs:
        key = (name, url.split('/')[-1])
        if key in seen: continue
        seen.add(key)
        print(f"{name[:42]:42s} | {url.split('/')[-1][:45]}")
    b.close()
