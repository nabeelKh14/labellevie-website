// One-off: rebuild src/data/catalog.js products FROM the scraped prices.json
// (slug, title, price) + derive brand/category from title. Verified real data.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const prices = JSON.parse(readFileSync(resolve('scripts/prices.json'), 'utf8'))

function brandOf(title) {
  const t = title.toLowerCase()
  if (t.includes('alastin')) return 'Alastin'
  if (t.includes('epicutis')) return 'Epicutis'
  if (t.includes('skinbetter') || t.includes('alpharet') || t.includes('alto') || t.includes('sunbetter') || t.includes('even tone') || t.includes('mystro') || t.includes('trio') || t.includes('hydration') || t.includes('instant effect') || t.includes('techno') || t.includes('cleansing gel') || t.includes('refining foam') || t.includes('detoxifying') || t.includes('eyemax')) return 'SkinBetter'
  if (t.includes('nuface')) return 'NuFACE'
  return 'La Belle Vie'
}

const catMap = {
  'Alastin': 'age-defense',
  'Epicutis': 'epicutis',
  'SkinBetter': 'age-defense',
  'NuFACE': 'age-defense',
  'La Belle Vie': 'treatments',
}
// refine SkinBetter by keyword
function categoryOf(title, brand) {
  const t = title.toLowerCase()
  if (brand === 'Epicutis') return 'epicutis'
  if (brand === 'La Belle Vie') {
    if (t.includes('covid')) return 'treatments'
    if (t.includes('vfit')) return 'treatments'
    if (t.includes('membership')) return 'membership'
    return 'treatments'
  }
  if (t.includes('cleans')) return 'cleansers'
  if (t.includes('moistur') || t.includes('cream') || t.includes('hydrat') || t.includes('hyvia') || t.includes('luxe') || t.includes('rebalancing') || t.includes('trio')) return 'moisturizers'
  if (t.includes('mask') || t.includes('scrub')) return 'masks-and-scrubs'
  if (t.includes('sun') || t.includes('spf')) return 'sun-protection'
  if (t.includes('sensitive')) return 'sensitive-skin'
  if (t.includes('acne') || t.includes('clearing')) return 'acne-defense'
  if (t.includes('tone') || t.includes('light')) return 'skin-lighteners'
  return 'age-defense'
}

const products = prices.map((p) => {
  let price = p.prices && p.prices[0]
  if (p.slug === 'free-rapid-covid-testing') price = 'Free'
  else if (p.slug === 'vfitplus') price = '$495.00'
  const brand = brandOf(p.title)
  const category = categoryOf(p.title, brand)
  return { name: p.title, brand, category, price: price || null, slug: p.slug }
})

// Build the products array text
const prodLines = products.map((p) => {
  const slug = p.slug ? `, slug: '${p.slug}'` : ''
  const price = p.price ? `, price: '${p.price}'` : ''
  return `  { name: '${p.name.replace(/'/g, "\\'")}', brand: '${p.brand}', category: '${p.category}'${price}${slug} },`
}).join('\n')

const file = `// Real La Belle Vie Medspa catalog — sourced from their live GoDaddy/OLS store.
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
${prodLines}
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
`

writeFileSync(resolve('src/data/catalog.js'), file)
console.log('catalog.js rebuilt with', products.length, 'products,', products.filter(p=>p.price).length, 'with prices')
