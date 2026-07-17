// Real La Belle Vie Medspa catalog — sourced from their live GoDaddy/OLS
// store sitemap (sitemap.ols.xml). Product names + categories are VERIFIED
// from the live store. PRICES are intentionally omitted: the live price-list
// page is uploaded JPG images (not scrapeable text), so adding numbers here
// would be fabrication. Each item uses an "Inquire" CTA instead.
//
// Categories mirror their store taxonomy exactly.

export const brands = ['Alastin', 'Epicutis', 'SkinBetter', 'NuFACE', 'La Belle Vie']

export const categories = [
  { slug: 'all', label: 'All Products' },
  { slug: 'cleansers', label: 'Cleansers' },
  { slug: 'moisturizers', label: 'Moisturizers' },
  { slug: 'masks-and-scrubs', label: 'Masks & Scrubs' },
  { slug: 'age-defense', label: 'Age Defense' },
  { slug: 'skin-lighteners', label: 'Skin Lighteners' },
  { slug: 'acne-defense', label: 'Acne Defense' },
  { slug: 'sun-protection', label: 'Sun Protection' },
  { slug: 'sensitive-skin', label: 'Sensitive Skin' },
  { slug: 'epicutis', label: 'Epicutis' },
  { slug: 'skinbetter', label: 'SkinBetter' },
  { slug: 'membership', label: 'Membership' },
  { slug: 'treatments', label: 'In-Clinic Treatments' },
]

// Product list — name + brand + category slug. category 'treatments' holds the
// non-retail services from the sitemap.
export const products = [
  // Alastin — cleansers / moisturizers
  { name: 'Alastin Ultra Calm Cleansing Cream', brand: 'Alastin', category: 'cleansers' },
  { name: 'Alastin HA (Hyaluronic Acid) Immerse Serum', brand: 'Alastin', category: 'moisturizers' },
  { name: 'Alastin Restorative Skin Complex', brand: 'Alastin', category: 'moisturizers' },
  { name: 'Alastin Regenerating Skin Nectar', brand: 'Alastin', category: 'age-defense' },
  { name: 'Alastin Renewal Retinol', brand: 'Alastin', category: 'age-defense' },
  { name: 'Alastin SilkSHIELD All-Mineral Sunscreen SPF 30', brand: 'Alastin', category: 'sun-protection' },
  { name: 'Alastin HydraTint Pro Mineral Broad-Spectrum Sunscreen SPF 36', brand: 'Alastin', category: 'sun-protection' },
  { name: 'Alastin TransFORM Body Treatment', brand: 'Alastin', category: 'age-defense' },

  // SkinBetter — age / acne / lighteners / sun
  { name: 'SkinBetter Alto Defense Serum 30 ml', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter Alto Advanced Defense and Repair Serum 30 ml', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter Alto Advanced Defense and Repair Serum 50 ml', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter Even Tone Correcting Serum 50 ml', brand: 'SkinBetter', category: 'skin-lighteners' },
  { name: 'SkinBetter AlphaRet Overnight Cream 30 ml', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter Intensive AlphaRet Overnight Cream 30 ml', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter Intensive AlphaRet Overnight Cream 50 ml', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter AlphaRet Clearing Serum', brand: 'SkinBetter', category: 'acne-defense' },
  { name: 'SkinBetter AlphaRet Exfoliating Peel Pads', brand: 'SkinBetter', category: 'acne-defense' },
  { name: 'SkinBetter Mystro Active Balance Serum', brand: 'SkinBetter', category: 'skin-lighteners' },
  { name: 'SkinBetter Trio Luxe Moisture Treatment', brand: 'SkinBetter', category: 'moisturizers' },
  { name: 'SkinBetter Trio Rebalancing Moisture Treatment 50 ml', brand: 'SkinBetter', category: 'moisturizers' },
  { name: 'SkinBetter Hydration Boosting Cream 50 ml', brand: 'SkinBetter', category: 'moisturizers' },
  { name: 'SkinBetter Techno Neck Perfecting Cream 50 ml', brand: 'SkinBetter', category: 'moisturizers' },
  { name: 'SkinBetter Cleansing Gel 8 fl oz', brand: 'SkinBetter', category: 'cleansers' },
  { name: 'SkinBetter Refining Foam Cleanser 5 fl oz', brand: 'SkinBetter', category: 'cleansers' },
  { name: 'SkinBetter EyeMax AlphaRet Overnight Cream', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter Instant Effect Gel Eye', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter A-Team Duo Kit', brand: 'SkinBetter', category: 'age-defense' },
  { name: 'SkinBetter sunbetter Tone Smart SPF 68 Sunscreen Compact', brand: 'SkinBetter', category: 'sun-protection' },
  { name: 'SkinBetter sunbetter Tone Smart SPF 75 Sunscreen Lotion', brand: 'SkinBetter', category: 'sun-protection' },
  { name: 'SkinBetter sunbetter Sheer SPF 70 Sunscreen Lotion', brand: 'SkinBetter', category: 'sun-protection' },
  { name: 'SkinBetter sunbetter Sheer SPF 56 Sunscreen Stick', brand: 'SkinBetter', category: 'sun-protection' },
  { name: 'SkinBetter Detoxifying Scrub Mask', brand: 'SkinBetter', category: 'masks-and-scrubs' },

  // Epicutis — sensitive / epicutis line
  { name: 'Epicutis Lipid Serum', brand: 'Epicutis', category: 'epicutis' },
  { name: 'Epicutis Oil Cleanser', brand: 'Epicutis', category: 'cleansers' },
  { name: 'Epicutis Post-Procedure Kit', brand: 'Epicutis', category: 'epicutis' },
  { name: 'Epicutis Hyvia Creme', brand: 'Epicutis', category: 'moisturizers' },
  { name: 'Epicutis Lipid Recovery Mask', brand: 'Epicutis', category: 'masks-and-scrubs' },
  { name: 'Epicutis Lipid Recovery Mask x5', brand: 'Epicutis', category: 'masks-and-scrubs' },

  // NuFACE
  { name: 'NuFACE Trinity PRO Facial Toning Device', brand: 'NuFACE', category: 'age-defense' },

  // Treatments / services (from sitemap products)
  { name: 'VFit+ In-Clinic Treatment', brand: 'La Belle Vie', category: 'treatments' },
  { name: 'Free Rapid COVID Testing', brand: 'La Belle Vie', category: 'treatments' },
  { name: 'Membership — Monthly Treatment Plan', brand: 'La Belle Vie', category: 'membership' },
]

// A curated subset shown as "Featured" on the landing page (matches their
// "Featured Products" strip). Picks recognizable hero SKUs across brands.
export const featuredSlugs = [
  'Alastin Regenerating Skin Nectar',
  'SkinBetter AlphaRet Overnight Cream 30 ml',
  'Epicutis Lipid Serum',
  'NuFACE Trinity PRO Facial Toning Device',
  'Alastin SilkSHIELD All-Mineral Sunscreen SPF 30',
  'SkinBetter Even Tone Correcting Serum 50 ml',
]

export function getFeatured() {
  return featuredSlugs
    .map((n) => products.find((p) => p.name === n))
    .filter(Boolean)
}
