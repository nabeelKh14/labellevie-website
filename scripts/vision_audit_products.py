import base64, urllib.request, json, os, subprocess, time

TMP_DIR = "/tmp/labellevie_audit"
os.makedirs(TMP_DIR, exist_ok=True)

cat = subprocess.run(["node", "--input-type=module", "-e",
  "import('./src/data/catalog.js').then(m=>process.stdout.write(JSON.stringify(m.products)))"],
  capture_output=True, text=True, cwd=".").stdout
products = json.loads(cat)

def prep(img_path):
    """Downscale to <=768px JPEG. qwen3-vl:2b rejects large/high-res inputs (HTTP 400)."""
    dst = os.path.join(TMP_DIR, os.path.basename(img_path).rsplit(".", 1)[0] + ".jpg")
    subprocess.run(["sips", "-s", "format", "jpeg", "-Z", "768", img_path, "--out", dst],
                   check=True, capture_output=True)
    return dst

def ask(img_path, prompt, tries=3):
    if not os.path.exists(img_path):
        return "MISSING FILE"
    try:
        tmp = prep(img_path)
    except Exception as e:
        return f"ERR:prep:{str(e)[:50]}"
    with open(tmp, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    payload={"model":"qwen3-vl:4b","prompt":prompt,"images":[b64],"stream":False}
    for t in range(tries):
        try:
            req = urllib.request.Request(
                "http://localhost:11434/api/generate",
                data=json.dumps(payload).encode(),
                headers={"Content-Type": "application/json"}, method="POST")
            r = json.loads(urllib.request.urlopen(req, timeout=120).read())["response"].strip()
            if r:
                return r
        except Exception as e:
            if t == tries - 1:
                return f"ERR:{str(e)[:60]}"
            time.sleep(3)
    return "ERR:blank-after-retries"

def check_product(p):
    img = "public" + p["image"]
    ans = ask(img, f'Does this photo show the skincare product "{p["name"]}"? Answer YES or NO, then one phrase on what the bottle/box says.')
    return (p["slug"], ans)

# RESUME-BUG FIX: drop blank/ERR entries so they retry.
outf = "scripts/vision_audit_products.json"
done = {}
if os.path.exists(outf):
    for s, a in json.load(open(outf)):
        if isinstance(a, str) and a.strip() and not a.startswith("ERR"):
            done[s] = a

print(f"resuming: {len(done)} valid done, {len(products)-len(done)} pending", flush=True)

results = list(done.items())
for p in products:
    if p["slug"] in done:
        continue
    r = check_product(p)
    if r[1] and not r[1].startswith("ERR") and r[1].strip():
        results.append(r)
        done[r[0]] = r[1]
        json.dump(results, open(outf, "w"), indent=2)  # incremental save
        print(f"  {r[0]}: {r[1][:90]}", flush=True)
    else:
        print(f"  {r[0]}: BLANK/ERR ('{r[1]}') -> will retry next run", flush=True)

bad = [r for r in results if not r[1].upper().startswith("YE")
       and "MISSING" not in r[1] and not r[1].startswith("ERR")]
print(f"\n=== {len(bad)} POSSIBLE MISMATCHES / ERRORS ===")
for b in bad:
    print("  ", b[0], "->", b[1][:80])
print(f"\nvalid: {len(done)} / {len(products)}")
