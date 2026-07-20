import base64, urllib.request, json

img_path = "public/images/products/alastin-regenerating-skin-nectar.jpg"
with open(img_path, "rb") as f:
    b64 = base64.b64encode(f.read()).decode()

payload = {
    "model": "auto/vision",
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
    headers={"Content-Type": "application/json"},
    method="POST",
)
try:
    resp = urllib.request.urlopen(req, timeout=60).read()
    d = json.loads(resp)
    print("RESPONSE:", d["choices"][0]["message"]["content"])
except Exception as e:
    print("ERR:", str(e)[:200])
