import base64, urllib.request, json, os, subprocess, time

TMP_DIR = "/tmp/labellevie_audit"
os.makedirs(TMP_DIR, exist_ok=True)

sections = [
    ("public/images/hero.jpg", "This is the HOMEPAGE HERO image of a medspa. Describe what it shows in one line (people? building? product? abstract?)."),
    ("public/images/treatment-1.jpg", "This image is used in the 'Our Mission' section of a medspa site. Describe what it shows in one line."),
    ("public/images/treatment-2.jpg", "This image is used as a BACKGROUND behind a philosophy statement on a medspa site. Describe what it shows in one line."),
    ("public/images/banner.jpg", "This image is used on the 'About' page of a medspa. Describe what it shows in one line."),
    ("public/images/logo.png", "Is this a medspa LOGO? Describe what text/brand it shows in one line."),
]
services = [(f"public/images/services/service-{i}.jpg",
             f"This is service tile #{i} on a medspa homepage. What treatment/service does the photo depict? One phrase.")
            for i in range(1, 9)]

outf = "scripts/vision_audit_sections.json"

# RESUME-BUG FIX: only count non-empty, non-ERR answers as done.
# Crash residue left blank/ERR entries stored as "done"; we drop them so they retry.
done = {}
if os.path.exists(outf):
    for p, a in json.load(open(outf)):
        if isinstance(a, str) and a.strip() and not a.startswith("ERR"):
            done[p] = a

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

allitems = sections + services
out = list(done.items())
print(f"resuming: {len(done)} valid done, {len(allitems)-len(done)} pending", flush=True)
for path, prompt in allitems:
    if path in done:
        continue
    a = ask(path, prompt)
    if a and not a.startswith("ERR") and a.strip():
        out.append((path, a))
        done[path] = a
        json.dump(out, open(outf, "w"), indent=2)
        print(f"  {path.split('/')[-1]}: {a[:90]}", flush=True)
    else:
        print(f"  {path.split('/')[-1]}: BLANK/ERR ('{a}') -> will retry next run", flush=True)

print("\nDONE")
print(f"valid: {len(done)} / {len(allitems)}")
