from playwright.sync_api import sync_playwright
import re, json

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width':1280,'height':900})
    pg.goto('https://labelleviemedspa.com/', wait_until='domcontentloaded', timeout=30000)
    pg.wait_for_timeout(4000)
    for i in range(8):
        pg.evaluate(f'window.scrollTo(0, {(i+1)*600})')
        pg.wait_for_timeout(400)
    # Search for service data in scripts - look for the service list JSON
    html = pg.evaluate('() => document.documentElement.outerHTML')
    # GoDaddy Wix-style: look for "services" array with imageUrl
    # Try to find JSON blobs containing both a service name and wsimg
    matches = re.findall(r'\{[^{}]*"name"\s*:\s*"([^"]+) "[^{}]*?"image"[^}]*\}', html)
    # Broader: find all wsimg URLs with surrounding context
    # Find pattern: serviceName followed by image
    pairs = re.findall(r'"title"\s*:\s*"([^"]+)"[^}]{0,200}?"(https://img1\.wsimg\.com/isteam/ip/[^"\\]+)"', html)
    print("PAIRS FOUND:", len(pairs))
    for name, url in pairs[:40]:
        print(f"  {name[:40]:40s} | {url.split('/')[-1][:40]}")
    # Also try serviceName + imageUrl pattern
    pairs2 = re.findall(r'"serviceName"\s*:\s*"([^"]+)"[^}]{0,300}?"imageUrl"\s*:\s*"(https://[^"]+)"', html)
    print("\nPAIRS2:", len(pairs2))
    for name, url in pairs2[:20]:
        print(f"  {name[:40]:40s} | {url.split('/')[-1][:40]}")
    b.close()
