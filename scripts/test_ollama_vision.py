import base64, urllib.request, json

IMG = "public/images/products/alastin-regenerating-skin-nectar.jpg"
with open(IMG,"rb") as f: b64 = base64.b64encode(f.read()).decode()

payload = {
    "model": "qwen3-vl:2b",
    "prompt": "What specific skincare product is shown? Name brand and product precisely. One line.",
    "images": [b64],
    "stream": False,
}
req = urllib.request.Request("http://localhost:11434/api/generate",
    data=json.dumps(payload).encode(), headers={"Content-Type":"application/json"}, method="POST")
try:
    resp = urllib.request.urlopen(req, timeout=90).read()
    print("VISION:", json.loads(resp)["response"].strip())
except Exception as e:
    print("ERR:", str(e)[:200])
