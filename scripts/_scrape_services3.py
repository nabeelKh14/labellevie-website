from playwright.sync_api import sync_playwright
import re

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1280,'height':900})
    captured = []
    pg.on('response', lambda r: captured.append(r.url) if ('wsimg' in r.url.lower()) else None)
    pg.goto('https://labelleviemedspa.com/', wait_until='domcontentloaded', timeout=30000)
    pg.wait_for_timeout(3000)
    for i in range(12):
        pg.evaluate(f'window.scrollTo(0, {(i+1)*500})')
        pg.wait_for_timeout(500)
    pg.wait_for_timeout(2000)
    wsimg = [u for u in captured if 'wsimg' in u]
    print(f"WSIMG URLS CAPTURED: {len(wsimg)}")
    for u in dict.fromkeys(wsimg):
        print(u.split('/')[-1].split('?')[0][:70])
    b.close()
