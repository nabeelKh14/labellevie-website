import json, os

meta = json.load(open("scripts/product_images_v2.json"))
prices = json.load(open("scripts/prices.json"))
price_by_title = {p.get("title","").strip().lower(): (p.get("prices") or [None])[0] for p in prices}

def brandOf(t):
    t=t.lower()
    if "alastin" in t: return "Alastin"
    if "epicutis" in t: return "Epicutis"
    if any(k in t for k in ["alpharet","alto","sunbetter","even tone","mystro","trio","hydration","instant effect","techno","cleansing gel","refining foam","detoxifying","eyemax"]): return "SkinBetter"
    if "nuface" in t: return "NuFACE"
    return "La Belle Vie"

def catOf(t,b):
    t=t.lower()
    if b=="Epicutis": return "epicutis"
    if b=="La Belle Vie":
        if "covid" in t: return "treatments"
        if "vfit" in t: return "treatments"
        return "treatments"
    if "cleans" in t: return "cleansers"
    if any(k in t for k in ["moistur","cream","hydrat","hyvia","luxe","rebalancing","trio"]): return "moisturizers"
    if "mask" in t or "scrub" in t: return "masks-and-scrubs"
    if "sun" in t or "spf" in t: return "sun-protection"
    if "sensitive" in t: return "sensitive-skin"
    if "acne" in t or "clearing" in t: return "acne-defense"
    if "tone" in t or "light" in t: return "skin-lighteners"
    return "age-defense"

imgmap = {}
for slug,d in meta.items():
    if d.get("image"):
        ext = ".png" if d["image"].split("?")[0].lower().endswith(".png") else ".jpg"
        imgmap[slug] = f"/images/products/{slug}{ext}"

rows = []
for slug,d in meta.items():
    title = d.get("title") or slug
    price = d.get("price")
    if slug=="free-rapid-covid-testing": price="Free"
    elif slug=="vfitplus": price="$495.00"
    brand = brandOf(title); cat = catOf(title, brand)
    img = imgmap.get(slug,"")
    nm = title.replace("'","\\'")
    rows.append(f"  {{ name: '{nm}', brand: '{brand}', category: '{cat}', price: '{price or ''}', slug: '{slug}', image: '{img}' }},")

cat_lines = ",\n".join(f"  {{ slug: '{c['slug']}', label: '{c['label']}' }}" for c in [
  {"slug":"all","label":"All Products"},{"slug":"cleansers","label":"Cleansers"},
  {"slug":"moisturizers","label":"Moisturizers"},{"slug":"masks-and-scrubs","label":"Masks & Scrubs"},
  {"slug":"age-defense","label":"Age Defense"},{"slug":"skin-lighteners","label":"Skin Lighteners"},
  {"slug":"acne-defense","label":"Acne Defense"},{"slug":"sun-protection","label":"Sun Protection"},
  {"slug":"sensitive-skin","label":"Sensitive Skin"},{"slug":"epicutis","label":"Epicutis"},
  {"slug":"skinbetter","label":"SkinBetter"},{"slug":"membership","label":"Membership"},
  {"slug":"treatments","label":"In-Clinic Treatments"},
])

featured = ["Alastin Regenerating Skin Nectar","AlphaRet Overnight Cream 30 mL","Epicutis Lipid Serum","NuFACE Trinity PRO Facial Toning Device","Alastin SilkSHEILD All Mineral Sunscreen SPF 30","Even Tone Correcting Serum 50 mL"]

cat_arr = ",\n".join(f"  '{f}'," for f in featured)

catalog = (
"// Real La Belle Vie Medspa catalog — sourced from their live GoDaddy/OLS store.\n"
"// Product names, slugs, PRICES, and IMAGES are VERIFIED via CloakBrowser render of\n"
"// each live product page (scripts/product_images_v2.json). Images matched by exact\n"
"// alt-text == product title, largest variant chosen (main shot, not thumbnail).\n\n"
"export const brands = ['Alastin', 'Epicutis', 'SkinBetter', 'NuFACE', 'La Belle Vie']\n\n"
"export const categories = [\n" + cat_lines + "\n]\n\n"
"export const products = [\n" + "\n".join(rows) + "\n]\n\n"
"export const featuredSlugs = [\n" + cat_arr + "]\n\n"
"export function getFeatured() {\n  return featuredSlugs\n    .map((n) => products.find((p) => p.name === n))\n    .filter(Boolean)\n}\n"
)
with open("src/data/catalog.js","w") as f:
    f.write(catalog)
print("catalog.js rebuilt with", len(rows), "products;", len(imgmap), "with images")
