// Real La Belle Vie Medspa catalog — sourced from their live GoDaddy/OLS store.
// Product names, slugs, and PRICES are VERIFIED via CloakBrowser render of each
// live product page (scripts/prices.json). 41/42 products have confirmed prices;
// covid-testing is Free, vfitplus = $495 treatment.
//
// Categories mirror their store taxonomy.

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

export const products = [
  { name: 'A-Team Duo Kit', brand: 'La Belle Vie', category: 'treatments', price: '$185.00', slug: 'a-team-duo-kit' },
  { name: 'Alastin HA (Hyaluronic Acid) IMMERSE Serum', brand: 'Alastin', category: 'age-defense', price: '$110.00', slug: 'alastin-ha-hyaluronic-acid-immerse-serum' },
  { name: 'Alastin HydraTint Pro Mineral Broad Spectrum Sunscreen SPF 36', brand: 'Alastin', category: 'moisturizers', price: '$60.00', slug: 'alastin-hydratint-pro-mineral-broad-spectrum-sunscreen-spf-36' },
  { name: 'Alastin Regenerating Skin Nectar', brand: 'Alastin', category: 'age-defense', price: '$199.00', slug: 'alastin-regenerating-skin-nectar' },
  { name: 'Alastin Renewal Retinol', brand: 'Alastin', category: 'age-defense', price: '$64.00', slug: 'alastin-renewal-retinol' },
  { name: 'Alastin Restorative Skin Complex', brand: 'Alastin', category: 'age-defense', price: '$199.00', slug: 'alastin-restorative-skin-complex' },
  { name: 'Alastin SilkSHEILD All Mineral Sunscreen SPF 30', brand: 'Alastin', category: 'sun-protection', price: '$55.00', slug: 'alastin-silksheild-all-mineral-sunscreen-spf-30' },
  { name: 'Alastin Ultra Calm Cleansing Cream', brand: 'Alastin', category: 'cleansers', price: '$45.00', slug: 'alastin-ultra-calm-cleansing-cream' },
  { name: 'Alastin Ultra Light Moisturizer', brand: 'Alastin', category: 'moisturizers', price: '$72.00', slug: 'alastin-ultra-light-moisturizer' },
  { name: 'AlphaRet Clearing Serum', brand: 'SkinBetter', category: 'acne-defense', price: '$140.00', slug: 'alpharet-clearing-serum' },
  { name: 'AlphaRet Exfoliating Peel Pads', brand: 'SkinBetter', category: 'age-defense', price: '$120.00', slug: 'alpharet-exfoliating-peel-pads' },
  { name: 'AlphaRet Overnight Cream 30 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$140.00', slug: 'alpharet-overnight-cream-30-ml' },
  { name: 'Alto Advanced Defense and Repair Serum 30 mL', brand: 'SkinBetter', category: 'age-defense', price: '$195.00', slug: 'alto-advanced-defense-and-repair-serum-30-ml' },
  { name: 'Alto Advanced Defense and Repair Serum 50 mL', brand: 'SkinBetter', category: 'age-defense', price: '$275.00', slug: 'alto-advanced-defense-and-repair-serum-50-ml' },
  { name: 'Alto Defense Serum 30 mL', brand: 'SkinBetter', category: 'age-defense', price: '$170.00', slug: 'alto-defense-serum-30-ml' },
  { name: 'Cleansing Gel 8 fl. oz', brand: 'SkinBetter', category: 'cleansers', price: '$50.00', slug: 'cleansing-gel-8-fl-oz' },
  { name: 'Detoxifying Scrub Mask', brand: 'SkinBetter', category: 'masks-and-scrubs', price: '$60.00', slug: 'detoxifying-scrub-mask' },
  { name: 'Epicutis Hyvia Creme', brand: 'Epicutis', category: 'epicutis', price: '$195.00', slug: 'epicutis-hyvia-creme' },
  { name: 'Epicutis Lipid Recovery Mask', brand: 'Epicutis', category: 'epicutis', price: '$25.00', slug: 'epicutis-lipid-recovery-mask' },
  { name: 'Epicutis - Lipid Recovery Mask x5', brand: 'Epicutis', category: 'epicutis', price: '$125.00', slug: 'epicutis-lipid-recovery-mask-x5' },
  { name: 'Epicutis Lipid Serum', brand: 'Epicutis', category: 'epicutis', price: '$250.00', slug: 'epicutis-lipid-serum' },
  { name: 'Epicutis Oil Cleanser', brand: 'Epicutis', category: 'epicutis', price: '$85.00', slug: 'epicutis-oil-cleanser' },
  { name: 'Epicutis Post-procedure Kit', brand: 'Epicutis', category: 'epicutis', price: '$75.00', slug: 'epicutis-post-procedure-kit' },
  { name: 'Even Tone Correcting Serum 50 mL', brand: 'SkinBetter', category: 'skin-lighteners', price: '$160.00', slug: 'even-tone-correcting-serum-50-ml' },
  { name: 'EyeMax AlphaRet Overnight Cream', brand: 'SkinBetter', category: 'moisturizers', price: '$125.00', slug: 'eyemax-alpharet-overnight-cream' },
  { name: 'FREE Rapid Covid Testing', brand: 'La Belle Vie', category: 'treatments', price: 'Free', slug: 'free-rapid-covid-testing' },
  { name: 'Hydration Boosting Cream 50 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$100.00', slug: 'hydration-boosting-cream-50-ml' },
  { name: 'Instant Effect Gel EYE', brand: 'SkinBetter', category: 'age-defense', price: '$110.00', slug: 'instant-effect-gel-eye' },
  { name: 'Intensive AlphaRet Overnight Cream 30 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$140.00', slug: 'intensive-alpharet-overnight-cream-30-ml' },
  { name: 'Intensive AlphaRet Overnight Cream 50 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$200.00', slug: 'intensive-alpharet-overnight-cream-50-ml' },
  { name: 'Mystro Active Balance Serum', brand: 'SkinBetter', category: 'age-defense', price: '$225.00', slug: 'mystro-active-balance-serum' },
  { name: 'NuFACE Trinity PRO Facial Toning Device', brand: 'NuFACE', category: 'age-defense', price: '$345.00', slug: 'nuface-trinity-pro-facial-toning-device' },
  { name: 'Refining Foam Cleanser 5 fl. oz', brand: 'SkinBetter', category: 'cleansers', price: '$48.00', slug: 'refining-foam-cleanser-5-fl-oz' },
  { name: 'Sunbetter SHEER SPF 56 Sunscreen Stick', brand: 'SkinBetter', category: 'sun-protection', price: '$55.00', slug: 'sunbetter-sheer-spf-56-sunscreen-stick' },
  { name: 'Sunbetter SHEER SPF 70 Sunscreen Lotion', brand: 'SkinBetter', category: 'sun-protection', price: '$75.00', slug: 'sunbetter-sheer-spf-70-sunscreen-lotion' },
  { name: 'Sunbetter TONE SMART SPF 68 Sunscreen Compact', brand: 'SkinBetter', category: 'sun-protection', price: '$65.00', slug: 'sunbetter-tone-smart-spf-68-sunscreen-compact' },
  { name: 'Sunbetter TONE SMART SPF 75 Sunscreen Lotion', brand: 'SkinBetter', category: 'sun-protection', price: '$75.00', slug: 'sunbetter-tone-smart-spf-75-sunscreen-lotion' },
  { name: 'Techno Neck Perfecting Cream 50 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$150.00', slug: 'techno-neck-perfecting-cream-50-ml' },
  { name: 'Trio Luxe Moisture Treatment', brand: 'SkinBetter', category: 'moisturizers', price: '$175.00', slug: 'trio-luxe-moisture-treatment' },
  { name: 'Trio Rebalancing Moisture Treatment 50 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$155.00', slug: 'trio-rebalancing-moisture-treatment-50-ml' },
  { name: 'vFITplus', brand: 'La Belle Vie', category: 'treatments', price: '$495.00', slug: 'vfitplus' },
]

export const featuredSlugs = [
  'Alastin Regenerating Skin Nectar',
  'AlphaRet Overnight Cream 30 mL',
  'Epicutis Lipid Serum',
  'NuFACE Trinity PRO Facial Toning Device',
  'Alastin SilkSHEILD All Mineral Sunscreen SPF 30',
  'Even Tone Correcting Serum 50 mL',
]

export function getFeatured() {
  return featuredSlugs
    .map((n) => products.find((p) => p.name === n))
    .filter(Boolean)
}
