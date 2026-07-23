import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Service data sourced from labelleviemedspa.com (live). Images verified via qwen3-vl:4b.
const categories = [
  {
    name: 'Injectables & Microneedling',
    services: [
      { name: 'Neurotoxin: Botox, Dysport or Jeuveau', duration: '30 mins', price: '$14', desc: 'Experience the transformative power of neurotoxin injections such as Botox, Dysport, and Jeuveau at our medical spa. Achieve a refreshed, youthful appearance.', img: '/images/services/IMG_2623.jpeg' },
      { name: 'Morpheus8; RF Microneedling', duration: '1 hr 30 mins', price: '$550 - $1275', desc: 'Experience the transformative power of Morpheus8 RF Microneedling at our medical spa. Achieve smoother, tighter skin with this advanced treatment.', img: '/images/services/IMG_2621.jpeg' },
      { name: 'SkinPen Microneedling, per area', duration: '1 hr', price: '$450', desc: 'Experience the rejuvenating benefits of SkinPen Microneedling at our medical spa. Transform your skin with targeted treatments for a radiant, youthful look.', img: '/images/services/IMG_1124.jpeg' },
      { name: 'Filler + Facial Balancing', duration: '45 mins', price: '$750 - $850 per syringe', desc: 'Experience our Filler + Facial Balancing service for a rejuvenated, balanced appearance. Achieve smooth, glowing skin and enhance your natural features.', img: '/images/services/IMG_1683.jpeg' },
      { name: 'Sculptra biostimulator', duration: '1 hr', price: '$750 - $1400', desc: 'Experience Sculptra rejuvenation. Sculptra is a biostimulator — it does not provide filling material but rather prompts your body to stimulate collagen.', img: '/images/services/IMG_2449.jpeg' },
      { name: 'Lip filler', duration: '1 hr', price: '$299 - $695', desc: 'Enhance your natural beauty with our lip filler service at our medical spa. Our expert staff provides professional cosmetic injections for fuller, more defined lips.', img: '/images/services/IMG_1268.jpeg' },
      { name: 'PDGF Rejuvenation Topical - one area', duration: '1 hr', price: '$850', desc: 'PDGF is Platelet Derived Growth Factors to rejuvenate, perfect for undereyes and hair restoration. Can be up to 300,000x more growth factors than PRP.', img: '/images/services/IMG_2375.jpeg' },
      { name: 'Smooth Collagen Threads, one area', duration: '1 hr', price: '$650', desc: 'Experience the rejuvenating effects of our Smooth Collagen Threads service. Enhance skin firmness and smoothness for a more youthful appearance.', img: '/images/services/IMG_8129.jpeg' },
    ],
  },
  {
    name: 'Facial',
    services: [
      { name: 'Hydrafacial', duration: '45 mins', price: '$250-$350', desc: 'HydraFacial MD treatment improves the appearance of fine lines, wrinkles, congested and enlarged pores, oily or acne-prone skin, hyperpigmentation and more.', img: '/images/services/IMG_1123.jpeg' },
      { name: 'Neurotris Microcurrent Facial: Tone + Lifting', duration: '45 mins', price: '$250', desc: 'Experience the ultimate in anti-aging technology with our Neurotris Microcurrent Facial. Achieve toned, lifted skin with advanced microcurrent science.', img: '/images/services/IMG_7169.jpeg' },
      { name: 'LightStim Anti-aging', duration: '20 mins', price: '$75', desc: 'This 20-minute treatment stimulates collagen production, minimizes the appearance of pores, fine lines, and wrinkles as well as tones the skin.', img: '/images/services/IMG_7639-fe032bc.jpeg' },
      { name: 'VI PEEL - Chemical Peel, Face or Body', duration: '45 mins', price: '$350 - $375', desc: 'Experience the transformative effects of our VI Peel chemical peel treatment for your face or body. Renew and rejuvenate your skin today.', img: '/images/services/IMG_1130.jpeg' },
    ],
  },
  {
    name: 'Laser',
    services: [
      { name: 'Forma Facial, 1 area: Full Face OR Full Neck', duration: '1 hr', price: 'Partial $250 - Full $550', desc: "What wrinkles? La Belle Vie has the secret to youthful looking skin. Forma utilizes radio frequency heating technology to tighten and contour.", img: '/images/services/IMG_0487.jpeg' },
      { name: 'Lumecca IPL Photofacial', duration: '30 mins', price: '$250 - $350', desc: 'Lumecca is the mecca of IPL treatments. The intense pulsed light delivered by Lumecca is capable of washing away everything from freckles to rosacea.', img: '/images/services/IMG_0487.jpeg' },
      { name: 'Laser Hair Removal - per area', duration: '30 mins', price: '$35 - $750', desc: 'Experience the latest in laser hair removal technology at our medical spa. Our per area treatments provide safe and effective results for smooth, hair-free skin.', img: '/images/services/IMG_1107-4529902.jpeg' },
      { name: 'Laser Facial: Melasma, Hyperpigmentation + Skin Rejuvenation', duration: '30 mins', price: '$200-$350', desc: 'Experience our cutting-edge Laser Facial service for treating melasma, hyperpigmentation, and skin rejuvenation. Achieve radiant, even-toned skin.', img: '/images/services/IMG_5102.jpeg' },
      { name: 'Laser Tattoo Removal', duration: '1 hr 20 mins', price: '$100 - $650', desc: 'Our Laser Tattoo Removal service at the medical spa effectively eliminates unwanted tattoos using advanced technology, providing safe and efficient results.', img: '/images/services/IMG_1130.jpeg' },
      { name: 'Vasculaze: Vascular lesions + Spider veins', duration: '15 mins', price: '$175', desc: 'Vasculaze can treat a variety of vascular lesions including spider veins, port wine stains, and leg veins.', img: '/images/services/IMG_7627.jpeg' },
      { name: 'Underarm Hyperpigmentation Laser', duration: '30 mins', price: '$350', desc: 'Address underarm discoloration with our Picoway laser.', img: '/images/services/IMG_5509.jpeg' },
      { name: 'Clear + Brilliant Laser', duration: '1 hr', price: '$550', desc: 'Experience the transformative power of our Clear + Brilliant Laser treatment at our medical spa. Achieve radiant, youthful skin with minimal downtime.', img: '/images/services/IMG_7639-fe032bc.jpeg' },
    ],
  },
  {
    name: 'Body Contouring',
    services: [
      { name: 'Slim + Tone: Evolve Body Contouring', duration: '1 hr', price: '$198 - $350', desc: 'Evolve Body Contouring: Tighten Skin, Tone Muscles and Target Fat using advanced technology to help you achieve a more sculpted physique.', img: '/images/services/IMG_9812-6869fce.jpeg' },
    ],
  },
  {
    name: 'Wellness',
    services: [
      { name: 'Consult, complimentary', duration: '15 mins', price: 'Free', desc: 'Book your complimentary good faith exam with our team to create a treatment plan to address your areas of concern.', img: '/images/services/IMG_4702.jpeg' },
      { name: 'Vitamin Shots: B12 Energy, Skinny Shot, Vitamin C', duration: '10 mins', price: '$35', desc: 'B12 helps keep the body’s nerves and blood cells healthy. It also helps in making human DNA, the genetic material present in all cells.', img: '/images/services/IMG_0493.jpeg' },
      { name: 'Weight Loss, medically supervised', duration: '10 mins', price: '$125-$550', desc: 'Our medically supervised weight loss service offers customized treatment plans, including injections, to help you achieve your goals safely and effectively.', img: '/images/services/IMG_7541.jpeg' },
      { name: 'LightStim LED BED - Package of 3 sessions, 40min', duration: '40 mins', price: '$225', desc: 'Get more from your proactive approach to health and wellness with advanced technology that works to maximize the benefits of good habits.', img: '/images/services/IMG_0493.jpeg' },
      { name: 'IV Therapy', duration: '45 mins', price: '$225', desc: 'Experience the rejuvenating benefits of IV Therapy. Relax in a comfortable setting as you receive hydration and/or essential nutrients to boost your health.', img: '/images/services/IMG_0493.jpeg' },
      { name: "Women’s Intimate Wellness - SUI + Tightening", duration: '1 hr', price: '$350 - $1275', desc: "Experience Women's Intimate Wellness services at La Belle Vie MedSpa, specializing in SUI treatment and tightening procedures which help prevent and resolve concerns.", img: '/images/services/IMG_1153.jpeg' },
      { name: 'Intimate Depigmentation Peel', duration: '1 hr', price: '$495', desc: 'A depigmentation treatment for intimate areas.', img: '/images/services/IMG_5509.jpeg' },
      { name: 'Icoone, Body - lymphatic, 60 min', duration: '1 hr', price: '$190', desc: 'Icoone depuffs your body, helps with lymphatic drainage and overall wellness. Add targeted focuses for aesthetic benefits.', img: '/images/services/IMG_4702.jpeg' },
    ],
  },
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: 'power3.out', clearProps: 'opacity,transform' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Services</p>
          <h2 className="font-drama italic text-4xl md:text-6xl text-primary leading-tight">
            Treatments &amp; Wellness
          </h2>
        </div>

        {categories.map((cat) => (
          <div key={cat.name} className="mb-16">
            <h3 className="font-sans font-bold text-2xl md:text-3xl text-dark mb-8 pb-3 border-b-2 border-accent/30">
              {cat.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.services.map((s) => (
                <div key={s.name} className="service-card group bg-white rounded-2xl overflow-hidden shadow-md border border-dark/5 hover:shadow-xl hover:border-accent/40 transition-all flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden bg-dark/5">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-sans font-semibold text-lg text-dark leading-snug">{s.name}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-mono text-primary/70 mb-3">
                      <span>{s.duration}</span>
                      <span className="text-accent font-bold">{s.price}</span>
                    </div>
                    <p className="font-serif text-dark/60 text-sm leading-relaxed line-clamp-3 mb-4">{s.desc}</p>
                    <a
                      href="https://labelleviemedspa.com/book"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block text-center px-5 py-2.5 bg-primary text-white font-sans font-semibold text-sm rounded-full hover:bg-accent transition-colors"
                    >
                      BOOK
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
