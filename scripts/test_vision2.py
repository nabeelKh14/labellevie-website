import base64, urllib.request, json, sys

MODEL = sys.argv[1] if len(sys.argv) > 1 else "auto/pro-vision"
img_path = sys.argv[2] if len(sys.argv) > 2 else "public/images/products/alastin-regenerating-skin-nectar.jpg"
with open(img_path, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()

payload = {
    "model": MODEL,
    "messages": [
        {"role": "user", "content": [
            {"type": "text", "text": "What specific skincare product is shown? Name brand and product precisely. One line."},
            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}}
        ]}
    ]
}
req = urllib.request.Request(
    "http://localhost:20128/v1/chat/completions",
    data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json"}, method="POST",
)
try:
    raw = urllib.request.urlopen(req, timeout=90).read()
    d = json.loads(raw)
    print(f"[{MODEL}]", d["choices"][0]["message"]["content"])
except Exception as e:
    print(f"[{MODEL}] ERR:", str(e)[:200])
