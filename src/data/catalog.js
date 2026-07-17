// Real La Belle Vie Medspa catalog — sourced from their live GoDaddy/OLS store.
// Product names, slugs, PRICES, and IMAGES are VERIFIED via CloakBrowser render of
// each live product page (scripts/product_images.json). 41/41 products have real images.

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
  { slug: 'treatments', label: 'In-Clinic Treatments' }
]

export const products = [
  { name: 'A-Team Duo Kit', brand: 'La Belle Vie', category: 'treatments', price: '$185.00', slug: 'a-team-duo-kit', image: '/images/products/a-team-duo-kit.jpg' },
  { name: 'Alastin HA (Hyaluronic Acid) IMMERSE Serum', brand: 'Alastin', category: 'age-defense', price: '$110.00', slug: 'alastin-ha-hyaluronic-acid-immerse-serum', image: '/images/products/alastin-ha-hyaluronic-acid-immerse-serum.jpg' },
  { name: 'Alastin HydraTint Pro Mineral Broad Spectrum Sunscreen SPF 36', brand: 'Alastin', category: 'moisturizers', price: '$60.00', slug: 'alastin-hydratint-pro-mineral-broad-spectrum-sunscreen-spf-36', image: '/images/products/alastin-hydratint-pro-mineral-broad-spectrum-sunscreen-spf-36.jpg' },
  { name: 'Alastin Regenerating Skin Nectar', brand: 'Alastin', category: 'age-defense', price: '$199.00', slug: 'alastin-regenerating-skin-nectar', image: '/images/products/alastin-regenerating-skin-nectar.jpg' },
  { name: 'Alastin Renewal Retinol', brand: 'Alastin', category: 'age-defense', price: '$64.00', slug: 'alastin-renewal-retinol', image: '/images/products/alastin-renewal-retinol.png' },
  { name: 'Alastin Restorative Skin Complex', brand: 'Alastin', category: 'age-defense', price: '$199.00', slug: 'alastin-restorative-skin-complex', image: '/images/products/alastin-restorative-skin-complex.jpg' },
  { name: 'Alastin SilkSHEILD All Mineral Sunscreen SPF 30', brand: 'Alastin', category: 'sun-protection', price: '$55.00', slug: 'alastin-silksheild-all-mineral-sunscreen-spf-30', image: '/images/products/alastin-silksheild-all-mineral-sunscreen-spf-30.png' },
  { name: 'Alastin Ultra Calm Cleansing Cream', brand: 'Alastin', category: 'cleansers', price: '$45.00', slug: 'alastin-ultra-calm-cleansing-cream', image: '/images/products/alastin-ultra-calm-cleansing-cream.png' },
  { name: 'Alastin Ultra Light Moisturizer', brand: 'Alastin', category: 'moisturizers', price: '$72.00', slug: 'alastin-ultra-light-moisturizer', image: '/images/products/alastin-ultra-light-moisturizer.png' },
  { name: 'AlphaRet Clearing Serum', brand: 'SkinBetter', category: 'acne-defense', price: '$140.00', slug: 'alpharet-clearing-serum', image: '/images/products/alpharet-clearing-serum.jpg' },
  { name: 'AlphaRet Exfoliating Peel Pads', brand: 'SkinBetter', category: 'age-defense', price: '$120.00', slug: 'alpharet-exfoliating-peel-pads', image: '/images/products/alpharet-exfoliating-peel-pads.jpg' },
  { name: 'AlphaRet Overnight Cream 30 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$140.00', slug: 'alpharet-overnight-cream-30-ml', image: '/images/products/alpharet-overnight-cream-30-ml.jpg' },
  { name: 'Alto Advanced Defense and Repair Serum 30 mL', brand: 'SkinBetter', category: 'age-defense', price: '$195.00', slug: 'alto-advanced-defense-and-repair-serum-30-ml', image: '/images/products/alto-advanced-defense-and-repair-serum-30-ml.jpg' },
  { name: 'Alto Advanced Defense and Repair Serum 50 mL', brand: 'SkinBetter', category: 'age-defense', price: '$275.00', slug: 'alto-advanced-defense-and-repair-serum-50-ml', image: '/images/products/alto-advanced-defense-and-repair-serum-50-ml.jpg' },
  { name: 'Alto Defense Serum 30 mL', brand: 'SkinBetter', category: 'age-defense', price: '$170.00', slug: 'alto-defense-serum-30-ml', image: '/images/products/alto-defense-serum-30-ml.jpg' },
  { name: 'Cleansing Gel 8 fl. oz', brand: 'SkinBetter', category: 'cleansers', price: '$50.00', slug: 'cleansing-gel-8-fl-oz', image: '/images/products/cleansing-gel-8-fl-oz.jpg' },
  { name: 'Detoxifying Scrub Mask', brand: 'SkinBetter', category: 'masks-and-scrubs', price: '$60.00', slug: 'detoxifying-scrub-mask', image: '/images/products/detoxifying-scrub-mask.jpg' },
  { name: 'Epicutis Hyvia Creme', brand: 'Epicutis', category: 'epicutis', price: '$195.00', slug: 'epicutis-hyvia-creme', image: '/images/products/epicutis-hyvia-creme.jpg' },
  { name: 'Epicutis Lipid Recovery Mask', brand: 'Epicutis', category: 'epicutis', price: '$25.00', slug: 'epicutis-lipid-recovery-mask', image: '/images/products/epicutis-lipid-recovery-mask.jpg' },
  { name: 'Epicutis - Lipid Recovery Mask x5', brand: 'Epicutis', category: 'epicutis', price: '$125.00', slug: 'epicutis-lipid-recovery-mask-x5', image: '/images/products/epicutis-lipid-recovery-mask-x5.jpg' },
  { name: 'Epicutis Lipid Serum', brand: 'Epicutis', category: 'epicutis', price: '$250.00', slug: 'epicutis-lipid-serum', image: '/images/products/epicutis-lipid-serum.jpg' },
  { name: 'Epicutis Oil Cleanser', brand: 'Epicutis', category: 'epicutis', price: '$85.00', slug: 'epicutis-oil-cleanser', image: '/images/products/epicutis-oil-cleanser.jpg' },
  { name: 'Epicutis Post-procedure Kit', brand: 'Epicutis', category: 'epicutis', price: '$75.00', slug: 'epicutis-post-procedure-kit', image: '/images/products/epicutis-post-procedure-kit.jpg' },
  { name: 'Even Tone Correcting Serum 50 mL', brand: 'SkinBetter', category: 'skin-lighteners', price: '$160.00', slug: 'even-tone-correcting-serum-50-ml', image: '/images/products/even-tone-correcting-serum-50-ml.jpg' },
  { name: 'EyeMax AlphaRet Overnight Cream', brand: 'SkinBetter', category: 'moisturizers', price: '$125.00', slug: 'eyemax-alpharet-overnight-cream', image: '/images/products/eyemax-alpharet-overnight-cream.jpg' },
  { name: 'FREE Rapid Covid Testing', brand: 'La Belle Vie', category: 'treatments', price: 'Free', slug: 'free-rapid-covid-testing', image: '/images/products/free-rapid-covid-testing.jpg' },
  { name: 'Hydration Boosting Cream 50 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$100.00', slug: 'hydration-boosting-cream-50-ml', image: '/images/products/hydration-boosting-cream-50-ml.jpg' },
  { name: 'Instant Effect Gel EYE', brand: 'SkinBetter', category: 'age-defense', price: '$110.00', slug: 'instant-effect-gel-eye', image: '/images/products/instant-effect-gel-eye.jpg' },
  { name: 'Intensive AlphaRet Overnight Cream 30 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$140.00', slug: 'intensive-alpharet-overnight-cream-30-ml', image: '/images/products/intensive-alpharet-overnight-cream-30-ml.jpg' },
  { name: 'Intensive AlphaRet Overnight Cream 50 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$200.00', slug: 'intensive-alpharet-overnight-cream-50-ml', image: '/images/products/intensive-alpharet-overnight-cream-50-ml.jpg' },
  { name: 'Mystro Active Balance Serum', brand: 'SkinBetter', category: 'age-defense', price: '$225.00', slug: 'mystro-active-balance-serum', image: '/images/products/mystro-active-balance-serum.jpg' },
  { name: 'NuFACE Trinity PRO Facial Toning Device', brand: 'NuFACE', category: 'age-defense', price: '$345.00', slug: 'nuface-trinity-pro-facial-toning-device', image: '/images/products/nuface-trinity-pro-facial-toning-device.jpg' },
  { name: 'Refining Foam Cleanser 5 fl. oz', brand: 'SkinBetter', category: 'cleansers', price: '$48.00', slug: 'refining-foam-cleanser-5-fl-oz', image: '/images/products/refining-foam-cleanser-5-fl-oz.jpg' },
  { name: 'Sunbetter SHEER SPF 56 Sunscreen Stick', brand: 'SkinBetter', category: 'sun-protection', price: '$55.00', slug: 'sunbetter-sheer-spf-56-sunscreen-stick', image: '/images/products/sunbetter-sheer-spf-56-sunscreen-stick.jpg' },
  { name: 'Sunbetter SHEER SPF 70 Sunscreen Lotion', brand: 'SkinBetter', category: 'sun-protection', price: '$75.00', slug: 'sunbetter-sheer-spf-70-sunscreen-lotion', image: '/images/products/sunbetter-sheer-spf-70-sunscreen-lotion.jpg' },
  { name: 'Sunbetter TONE SMART SPF 68 Sunscreen Compact', brand: 'SkinBetter', category: 'sun-protection', price: '$65.00', slug: 'sunbetter-tone-smart-spf-68-sunscreen-compact', image: '/images/products/sunbetter-tone-smart-spf-68-sunscreen-compact.jpg' },
  { name: 'Sunbetter TONE SMART SPF 75 Sunscreen Lotion', brand: 'SkinBetter', category: 'sun-protection', price: '$75.00', slug: 'sunbetter-tone-smart-spf-75-sunscreen-lotion', image: '/images/products/sunbetter-tone-smart-spf-75-sunscreen-lotion.jpg' },
  { name: 'Techno Neck Perfecting Cream 50 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$150.00', slug: 'techno-neck-perfecting-cream-50-ml', image: '/images/products/techno-neck-perfecting-cream-50-ml.jpg' },
  { name: 'Trio Luxe Moisture Treatment', brand: 'SkinBetter', category: 'moisturizers', price: '$175.00', slug: 'trio-luxe-moisture-treatment', image: '/images/products/trio-luxe-moisture-treatment.jpg' },
  { name: 'Trio Rebalancing Moisture Treatment 50 mL', brand: 'SkinBetter', category: 'moisturizers', price: '$155.00', slug: 'trio-rebalancing-moisture-treatment-50-ml', image: '/images/products/trio-rebalancing-moisture-treatment-50-ml.jpg' },
  { name: 'vFITplus', brand: 'La Belle Vie', category: 'treatments', price: '$495.00', slug: 'vfitplus', image: '/images/products/vfitplus.jpg' },
]

export const featuredSlugs = [
  'Alastin Regenerating Skin Nectar',,
  'AlphaRet Overnight Cream 30 mL',,
  'Epicutis Lipid Serum',,
  'NuFACE Trinity PRO Facial Toning Device',,
  'Alastin SilkSHEILD All Mineral Sunscreen SPF 30',,
  'Even Tone Correcting Serum 50 mL',]

export function getFeatured() {
  return featuredSlugs
    .map((n) => products.find((p) => p.name === n))
    .filter(Boolean)
}
