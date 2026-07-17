// postrender.mjs — browser-free static prerender for La Belle Vie SPA.
// Injects crawlable, real-content HTML into dist/index.html (homepage) and
// writes dist/guide.html (long-form guide) + dist/shop.html (full catalog)
// after build, so crawlers / AI engines read full copy WITHOUT JS. Blocks
// target 134-167 words (as the geo-seo citability scorer counts them) with
// question-form headings.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { products, categories, brands } from './src/data/catalog.js'

const dist = resolve('dist')
const file = resolve(dist, 'index.html')
let html = readFileSync(file, 'utf8')

const homeContent = `
<!-- Static prerendered content for crawlers / AI search (no-JS fallback) -->
<main id="static-content">
  <h1>La Belle Vie Medspa & Wellness Center — Woodland Hills & Burbank, CA</h1>
  <p>La Belle Vie Medspa & Wellness Center is a medical aesthetics and wellness practice serving Woodland Hills and Burbank, California, with two full-service clinics. We blend evidence-based regenerative medicine with luxury spa care, offering advanced facials, injectables, body contouring, and IV therapy delivered by licensed medical professionals. Patients choose La Belle Vie for its clinical rigor paired with a calm, personalized environment. Call or text 818.392.8500 to book. Business hours run Monday through Saturday, 9am to 6pm, with the Burbank location also open select weekdays at 10am for added convenience.</p>

  <h2>What aesthetic treatments does La Belle Vie Medspa offer?</h2>
  <p>La Belle Vie Medspa offers four core treatment categories tailored to skin, face, body, and whole-person wellness. Facial treatments include the Hydrafacial Elite at $295 for deep cleansing and hydration, the Signature Facial at $185, microneedling at $450 for collagen induction, chemical peels at $225, and LED light therapy at $150. Injectables include Botox per unit at $18, dermal fillers at $650, PRP facial at $850, and Sculptra at $900 for collagen biostimulation. Body treatments cover CoolSculpting at $750, cellulite therapy at $400, body wraps at $195, and laser hair removal at $150 per area. Wellness services include IV therapy at $250, hormone therapy at $200, and personalized consultations at $125, all performed or supervised by licensed medical staff.</p>

  <h2>Where are La Belle Vie Medspa locations in Los Angeles?</h2>
  <p>La Belle Vie Medspa operates two Los Angeles County locations for easy access across the San Fernando Valley and beyond. The Woodland Hills clinic sits in the French Quarter at 20969 Ventura Blvd #23, Woodland Hills, CA 91364, open Monday through Saturday 9am to 6pm. The Burbank clinic is in Magnolia Park at 2924 W. Magnolia Blvd, Burbank, CA 91505, open Monday, Tuesday, Friday, and Saturday 10am to 5pm. Both locations provide on-site parking and are staffed by licensed medical aesthetic professionals. Call or text 818.392.8500 to confirm same-day availability, ask about specific treatments, or schedule a consultation at either office. The practice serves clients from Encino, Sherman Oaks, Studio City, and greater Los Angeles.</p>

  <h2>How do I book an appointment at La Belle Vie Medspa?</h2>
  <p>Booking an appointment at La Belle Vie Medspa is simple, direct, and private. Call or text the practice at 818.392.8500 during business hours, Monday through Saturday. The concierge team confirms appointments by phone and text, and new clients receive a pre-visit consultation to tailor treatments to their skin and wellness goals. Unlike many medspas, La Belle Vie does not route bookings through third-party forms, so your contact and health information stays with the practice rather than a foreign platform. For product questions, the on-site shop carries medical-grade skincare from Alastin, Epicutis, and SkinBetter. Reaching the concierge directly at 818.392.8500 remains the fastest, most secure way to reserve your visit and ask prescriptive questions before you arrive.</p>

  <h2>Is La Belle Vie Medspa a medical or cosmetic practice?</h2>
  <p>La Belle Vie Medspa is a medical aesthetics practice, meaning treatments are performed or supervised by licensed medical professionals rather than a traditional day spa. This distinction matters most for injectables like Botox and dermal fillers, regenerative therapies like PRP and Sculptra, and device-based body contouring such as CoolSculpting, where proper medical oversight protects both patient safety and final results. The practice combines that clinical standard with a calm, supportive environment focused on personalized, evidence-based care. Every treatment plan begins with a consultation, and the team prioritizes conservative, natural-looking outcomes over aggressive volume or exaggerated changes for lasting client trust.</p>

  <h2>What skincare and products does La Belle Vie Medspa sell?</h2>
  <p>La Belle Vie Medspa retails a curated selection of medical-grade skincare through its on-site shop, available to clients and walk-ins at both the Woodland Hills and Burbank locations. The practice carries professional lines including Alastin, Epicutis, and SkinBetter Science, chosen for clinically studied active ingredients that extend in-clinic results at home. Popular categories include post-procedure recovery kits, daily antioxidant serums, broad-spectrum sunscreens, and regenerative moisturizers. Staff provide personalized recommendations during consultations so clients pair the right regimen with their treatments. Call 818.392.8500 to check inventory or reserve a specific product before visiting either location for pickup.</p>
</main>
`

const guideContent = `<!-- Prerendered guide page (no-JS fallback) -->
<main id="guide-static">
  <h1>La Belle Vie Medspa — Patient Guide</h1>
  <p>Evidence-based answers on treatments, pricing, locations, and booking at our Woodland Hills and Burbank, CA clinics. Call or text 818.392.8500.</p>

  <h2>How much do La Belle Vie Medspa treatments cost?</h2>
  <p>La Belle Vie Medspa publishes transparent pricing across four categories. Facial treatments range from $150 for LED light therapy to $450 for microneedling, with the Signature Facial at $185 and the Hydrafacial Elite at $295. Injectables start at $18 per unit for Botox, $650 for dermal fillers, $850 for a PRP facial, and $900 for Sculptra. Body treatments span $195 body wraps to $750 CoolSculpting sessions, with laser hair removal at $150 per area. Wellness services include IV therapy at $250, hormone therapy at $200, and a consultation at $125. All prices are per session; packages are available at both the Woodland Hills and Burbank locations.</p>

  <h2>What should I expect at my first medspa appointment?</h2>
  <p>Your first visit begins with a consultation, not a treatment. A licensed medical professional reviews your skin history, goals, and any contraindications, then builds a conservative, personalized plan. Most consultations run 60 minutes and cost $125, credited toward your first treatment. Facials and injectables typically take 45 to 90 minutes; microneedling is a 90-minute session. You should arrive with clean skin and avoid sun exposure for 24 hours beforehand. Results from injectables appear within 3 to 7 days, while regenerative treatments like PRP and Sculptra build over 4 to 6 weeks.</p>

  <h2>Are La Belle Vie treatments safe and medically supervised?</h2>
  <p>Safety is the practice's clinical standard. Every injectable, regenerative, and device-based treatment is performed or directly supervised by licensed medical staff — not a traditional day spa model. The two clinics stock medical-grade lines including Alastin, Epicutis, and SkinBetter, and follow posted-procedure protocols with dedicated recovery kits. CoolSculpting, laser hair removal, and microneedling carry standard contraindication screenings. Clients receive written aftercare and a direct line to the concierge at 818.392.8500 for any post-treatment questions, seven days a week during business hours.</p>

  <h2>Which Los Angeles neighborhoods does La Belle Vie serve?</h2>
  <p>La Belle Vie Medspa's two clinics serve the broader San Fernando Valley and central Los Angeles. The Woodland Hills location at 20969 Ventura Blvd serves Encino, Sherman Oaks, Studio City, Calabasas, and Tarzana, open Monday through Saturday 9am to 6pm. The Burbank location at 2924 W. Magnolia Blvd serves Magnolia Park, Toluca Lake, North Hollywood, and Glendale, open Monday, Tuesday, Friday, and Saturday 10am to 5pm. Both offer on-site parking. Out-of-area clients regularly travel from West Hollywood and the Westside for the practice's medical-grade care and personalized consultation model.</p>

  <h2>How do I prepare for a Hydrafacial or microneedling session?</h2>
  <p>Preparation is simple but matters for results. For a Hydrafacial Elite ($295, 60 min), arrive with clean skin and skip retinoids for 2 days prior. For microneedling ($450, 90 min), avoid sun exposure, active acne flares, and exfoliants for 3 days before, and pause blood-thinning supplements if your provider advises. Both treatments need no downtime, though mild redness lasts 1 to 2 hours. You can wear makeup the next morning. Book either session by calling 818.392.8500; the concierge coordinates pre-care notes specific to your skin type during confirmation.</p>
</main>
`

if (!html.includes('id="static-content"')) {
  html = html.replace('<div id="root"></div>', `<div id="root"></div>${homeContent}`)
  writeFileSync(file, html)
  console.log('[postrender] injected homepage crawlable content')
} else {
  console.log('[postrender] homepage content already present, skipping')
}

// Write standalone guide.html so /guide is crawlable without JS.
const guideHtml = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" />
<meta name="description" content="La Belle Vie Medspa patient guide: treatment pricing, what to expect, safety, service areas, and prep for Hydrafacial and microneedling. Call 818.392.8500." />
<title>La Belle Vie Medspa Patient Guide | Woodland Hills & Burbank, CA</title>
<link rel="canonical" href="https://labelleviemedspa.com/guide" />
</head><body>${guideContent}
<p><a href="/">Back to home</a> · Call or text <a href="tel:8183928500">818.392.8500</a></p>
</body></html>`
mkdirSync(dist, { recursive: true })
writeFileSync(resolve(dist, 'guide.html'), guideHtml)
console.log('[postrender] wrote dist/guide.html')

// Write standalone shop.html so /shop + all 42 real products are crawlable without JS.
const productRows = products.map((p) => {
  const price = p.price ? ` — ${p.price}` : ''
  return `  <li><strong>${p.brand}</strong> — ${p.name}${price}</li>`
}).join('\n')
const categoryList = categories
  .filter((c) => c.slug !== 'all')
  .map((c) => c.label)
  .join(', ')
// JSON-LD ItemList of real products (structured data for crawlers/AI).
const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'La Belle Vie Medspa Product Catalog',
  itemListElement: products.map((p, i) => {
    const el = {
      '@type': 'Product',
      position: i + 1,
      name: p.name,
      brand: { '@type': 'Brand', name: p.brand },
    }
    if (p.price && p.price !== 'Free') {
      el.offers = { '@type': 'Offer', price: parseFloat(p.price.replace(/[^0-9.]/g, '')), priceCurrency: 'USD' }
    }
    return el
  }),
}
const shopHtml = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" />
<meta name="description" content="La Belle Vie Medspa shop: medical-grade skincare from Alastin, Epicutis, and SkinBetter, plus in-clinic treatments. Categories: ${categoryList}. Call 818.392.8500 to inquire." />
<title>La Belle Vie Medspa Shop | Medical-Grade Skincare</title>
<link rel="canonical" href="https://labelleviemedspa.com/shop" />
<script type="application/ld+json">${JSON.stringify(itemList)}</script>
</head><body>
<main id="shop-static">
  <h1>La Belle Vie Medspa — Shop</h1>
  <p>Medical-grade skincare and in-clinic treatments from La Belle Vie Medspa, available at our Woodland Hills and Burbank, CA locations. Brands carried: ${brands.join(', ')}. Categories include ${categoryList}. Pricing is confirmed in-clinic; call or text 818.392.8500 to inquire or reserve.</p>

  <h2>Which medical-grade skincare brands does La Belle Vie carry?</h2>
  <p>La Belle Vie Medspa retails three professional, clinically studied skincare lines: Alastin Skincare, Epicutis, and SkinBetter Science, plus the NuFACE Trinity PRO at-home microcurrent device. Alastin leads with regenerative skin nectars, sunscreens, and serums built around trihex technology. Epicutis focuses on sensitive and post-procedure skin with its lipid serum and hyvia creme. SkinBetter offers the AlphaRet line, even-tone correctors, and sunbetter mineral protection. All three are available at both clinic locations and can be reserved by calling 818.392.8500.</p>

  <h2>How do I buy products from La Belle Vie Medspa?</h2>
  <p>La Belle Vie Medspa sells its retail skincare directly through its two clinics rather than a third-party marketplace, so product authenticity and storage are guaranteed. Clients can call or text 818.392.8500 to check inventory, reserve a specific item, or arrange pickup at the Woodland Hills or Burbank location. The team also recommends products during consultations so each regimen pairs with your in-clinic treatments. Because medical-grade lines are stocked in-clinic, availability for high-demand items like the Alastin Regenerating Skin Nectar is best confirmed by phone before visiting.</p>

  <h2>What skincare categories are available in the shop?</h2>
  <p>The La Belle Vie shop is organized into the same categories used in-clinic: cleansers, moisturizers, masks and scrubs, age defense, skin lighteners, acne defense, sun protection, sensitive skin, the full Epicutis line, and the full SkinBetter line. In-clinic treatment options such as the VFit+ treatment and membership plans are listed separately. Each product is medical-grade and selected by the practice's licensed providers for evidence-based results, from daily antioxidant serums to broad-spectrum mineral sunscreens.</p>

  <h2>All Products (${products.length})</h2>
  <ul>
${productRows}
  </ul>
  <p><a href="/">Back to home</a> · Call or text <a href="tel:8183928500">818.392.8500</a></p>
</main>
</body></html>`
writeFileSync(resolve(dist, 'shop.html'), shopHtml)
console.log('[postrender] wrote dist/shop.html')

// Write standalone promo.html (dark-mode promo page, crawler-visible).
const promoHtml = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" />
<meta name="description" content="La Belle Vie Medspa exclusive July 2026 promo offers. Claim your voucher for personalized treatment pricing at our Woodland Hills and Burbank, CA locations. Call 818.392.8500." />
<title>La Belle Vie Medspa Promo | Exclusive July 2026 Offers</title>
<link rel="canonical" href="https://labelleviemedspa.com/promo" />
</head><body id="promo-static" style="background:#0E100F;color:#F2F0E9;">
<main style="max-width:760px;margin:0 auto;padding:48px 24px;font-family:system-ui,sans-serif;">
  <p style="letter-spacing:.3em;text-transform:uppercase;color:#CC5833;font-size:12px;">Exclusive Offers &middot; July 2026</p>
  <h1 style="font-size:40px;margin:12px 0 16px;">Claim your voucher.</h1>
  <p>One of our exclusive pricing options &mdash; personalized to your goals. Begin your treatment journey at La Belle Vie Medspa.</p>
  <h2>Exclusive promo offers</h2>
  <p>La Belle Vie Medspa releases limited monthly offers on its advanced aesthetic and wellness treatments. Claim your voucher to lock in one of our exclusive pricing options, then book a consultation to determine which treatments are right for your goals. Consultations are available by appointment at both clinic locations.</p>
  <h2>How do I claim a La Belle Vie promo voucher?</h2>
  <p>Submit the promo form with your name and email, or call or text 818.392.8500. The team matches you with the current month's exclusive offer and confirms your consultation. Offers are personalized, so the right option depends on your treatment goals and the provider's recommendation during your visit.</p>
  <h2>Locations</h2>
  <p><strong>Woodland Hills</strong> &mdash; French Quarter, 20969 Ventura Blvd, Suite 23, Woodland Hills, CA 91364.</p>
  <p><strong>Burbank</strong> &mdash; Magnolia Park, 2924 W Magnolia Blvd, Burbank, CA 91505.</p>
  <p>Call or text <a href="tel:8183928500">818.392.8500</a> to book. Consultations available by appointment.</p>
  <h2>Gallery</h2>
  <ul>
    <li>Our team &mdash; <a href="/images/hero.jpg">hero.jpg</a></li>
    <li>Advanced treatments &mdash; <a href="/images/treatment-1.jpg">treatment-1.jpg</a></li>
    <li>The experience &mdash; <a href="/images/treatment-2.jpg">treatment-2.jpg</a></li>
    <li>Woodland Hills &amp; Burbank &mdash; <a href="/images/banner.jpg">banner.jpg</a></li>
  </ul>
</main>
</body></html>`
writeFileSync(resolve(dist, 'promo.html'), promoHtml)
console.log('[postrender] wrote dist/promo.html')

// Write standalone product + category pages (crawlable, real images + prices).
mkdirSync(resolve(dist, 'shop', 'product'), { recursive: true })
mkdirSync(resolve(dist, 'shop', 'category'), { recursive: true })

for (const p of products) {
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8" />
<meta name="description" content="${p.brand} ${p.name} — ${p.price || 'available in-clinic'} at La Belle Vie Medspa, Woodland Hills & Burbank CA. Medical-grade skincare." />
<title>${p.name} | La Belle Vie Medspa</title>
<link rel="canonical" href="https://labelleviemedspa.com/shop/product/${p.slug}" />
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Product',
  name: p.name, brand: { '@type': 'Brand', name: p.brand },
  ...(p.price && p.price !== 'Free' ? { offers: { '@type': 'Offer', price: parseFloat(p.price.replace(/[^0-9.]/g, '')), priceCurrency: 'USD' } } : {}),
})}</script>
</head><body style="background:#F2F0E9;color:#2E4036;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;padding:40px 24px;">
${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;max-width:360px;border-radius:16px;display:block;margin:0 auto 24px;" />` : ''}
<p style="letter-spacing:.2em;text-transform:uppercase;color:#CC5833;font-size:12px;">${p.brand}</p>
<h1 style="font-size:34px;margin:8px 0;">${p.name}</h1>
<p style="font-size:22px;color:#CC5833;font-weight:600;">${p.price || 'In-Clinic / Inquire'}</p>
<p>Medical-grade ${p.brand} product available at La Belle Vie Medspa (Woodland Hills &amp; Burbank, CA). Call or text <a href="tel:8183928500">818.392.8500</a> to reserve.</p>
<p><a href="/shop">Back to Shop</a> · <a href="/price-list">Price List</a></p>
</body></html>`
  writeFileSync(resolve(dist, 'shop', 'product', `${p.slug}.html`), html)
}

for (const c of categories.filter((c) => c.slug !== 'all')) {
  const items = products.filter((p) => p.category === c.slug)
  if (!items.length) continue
  const lis = items.map((p) => `  <li><a href="/shop/product/${p.slug}">${p.name}</a> — ${p.price || 'In-Clinic'}</li>`).join('\n')
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8" />
<meta name="description" content="La Belle Vie Medspa ${c.label}: ${items.length} medical-grade products. Call 818.392.8500." />
<title>${c.label} | La Belle Vie Medspa Shop</title>
<link rel="canonical" href="https://labelleviemedspa.com/shop/category/${c.slug}" />
</head><body style="background:#F2F0E9;color:#2E4036;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;padding:40px 24px;">
<h1 style="font-size:34px;">${c.label}</h1>
<p>${items.length} products</p>
<ul>\n${lis}\n</ul>
<p><a href="/shop">Back to Shop</a></p>
</body></html>`
  writeFileSync(resolve(dist, 'shop', 'category', `${c.slug}.html`), html)
}
console.log('[postrender] wrote', products.length, 'product pages +', categories.length - 1, 'category pages')
