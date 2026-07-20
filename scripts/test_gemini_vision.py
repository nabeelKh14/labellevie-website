import base64, urllib.request, json, os

GEMINI_KEY = os.environ.get("GEMINI_KEY", "")
if not GEMINI_KEY:
    print("NO KEY"); raise SystemExit

img_path = "public/images/products/alastin-regenerating-skin-nectar.jpg"
with open(img_path, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_KEY}"
payload = {
    "contents": [{
        "parts": [
            {"text": "What specific skincare product is shown? Name brand and product precisely. One line."},
            {"inline_data": {"mime_type": "image/jpeg", "data": b64}}
        ]
    }]
}
req = urllib.request.Request(url, data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json"}, method="POST")
try:
    resp = urllib.request.urlopen(req, timeout=60).read()
    d = json.loads(resp)
    print("RESPONSE:", d["candidates"][0]["content"]["parts"][0]["text"])
except Exception as e:
    print("ERR:", str(e)[:300])
