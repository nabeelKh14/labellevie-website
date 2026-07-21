import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pressHero = [
  {
    img: '/images/about-inner.jpg',
    name: 'PARIS HILTON x LA BELLE VIE MEDSPA x PARIVIE',
    text: 'In the news: September 2025 — Thank you Paris for having us at Sliving Spa! #ThatsHot',
  },
  {
    img: '/images/about-team-1.jpg',
    alt: 'Khloé Kardashian at La Belle Vie Medspa',
    name: 'Khloé Kardashian x La Belle Vie Medspa',
    text: 'Thank you Queen for allowing us to provide you with care.',
  },
  {
    img: '/images/about-team-2.jpg',
    alt: 'Kim Kardashian in La Belle Vie Medspa scrubs',
    name: 'Kim Kardashian x La Belle Vie Medpsa',
    text: "At Kim Kardashian's Oasis Spa Day providing treatments.",
  },
];

const pressLogos = [
  { img: '/images/about/press-kourtney.png', alt: 'Kourtney Kardashian Poosh feature', name: 'Kourtney Kardashian', text: "As seen in Kourtney Kardashian's Poosh: Would you microneedle your vagina?" },
  { img: '/images/about/press-poosh.png', alt: 'Poosh logo', name: 'Poosh', text: '"Votive helps tighten the pelvic floor, alleviate urinary incontinence, improve sensation, and reshape the labia all without surgery"' },
  { img: '/images/about/press-services.png', alt: 'Our Services — vaginal health', name: 'Our Services', text: 'Improve vaginal health' },
  { img: '/images/about/press-usweekly.jpg', alt: 'US Weekly feature', name: 'US WEEKLY', text: 'As seen in US Weekly' },
  { img: '/images/about/press-forbes.jpg', alt: 'Forbes feature', name: 'FORBES', text: 'As seen in Forbes' },
  { img: '/images/about/press-bestmedspa.png', alt: 'Awarded Best Medspa', name: 'Awarded Best Medspa', text: 'Thank you for recognizing La Belle Vie Medspa as Best Medspa! xoxox' },
];

const team = [
  { name: 'Andre Yousefia, MD', role: 'Medical Director', img: '/images/about/team-2.jpg' },
  { name: 'Samantha Ralica, RN', role: 'Aesthetic Injector', img: '/images/about/team-3.jpg' },
  { name: 'Genesse Arriaga, RN', role: 'Aesthetic Injector', img: '/images/about/team-4.jpg' },
  { name: 'Rosa Jovel', role: 'Back Office Manager', img: '/images/about/team-1.jpg' },
  { name: 'Jade Riley, MA', role: 'Medical Assistant / Back Office', img: '/images/about/team-5.jpg' },
  { name: 'Isabel Rincon, LE', role: 'Esthetician' },
];

export default function About() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        y: '30%', ease: 'none',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Hero — kept as you liked it */}
      <div ref={heroRef} className="relative w-full h-[80vh] md:h-[90vh]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/banner.jpg")' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark/60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="font-drama font-normal text-5xl md:text-7xl lg:text-8xl text-white text-center italic leading-tight">
            About Us
          </h1>
          <p className="font-mono text-white/80 text-sm md:text-base mt-6 tracking-widest uppercase">
            La Belle Vie Medspa & Wellness
          </p>
        </div>
      </div>

      {/* Press Hero — 3 blocks: Paris, Khloé, Kim */}
      <div className="bg-dark py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {pressHero.map((p) => (
            <div key={p.name} className="grid md:grid-cols-2 gap-6 items-center">
              <div className="overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.alt} className="w-full h-72 md:h-80 object-cover" loading="lazy" />
              </div>
              <div>
                <h3 className="font-drama italic text-2xl md:text-3xl text-white leading-tight">{p.name}</h3>
                <p className="font-serif text-white/60 italic mt-3 text-lg leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In the Press — logos grid (Kourtney, Poosh, Services, USWeekly, Forbes, BestMedspa) */}
      <div className="bg-background py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2 text-center">In the Press</p>
          <h2 className="font-drama italic text-3xl md:text-4xl text-dark font-normal text-center mb-10">As Seen In</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {pressLogos.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl p-5 text-center shadow-md border border-dark/5 hover:shadow-lg transition-shadow">
                <img src={p.img} alt={p.alt} className="w-24 h-24 mx-auto object-contain mb-4" loading="lazy" />
                <h3 className="font-sans font-semibold text-sm text-dark">{p.name}</h3>
                <p className="font-serif text-dark/60 italic text-xs mt-1 leading-snug">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About La Belle Vie — Mission section */}
      <div className="bg-background pb-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img src="/images/about-inner.jpg" alt="La Belle Vie team" className="w-full h-96 object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-primary/30 rounded-2xl -z-10"></div>
          </div>
          <div>
            <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">About La Belle Vie</p>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-dark leading-tight mb-6">Our Mission</h2>
            <p className="font-serif text-dark/70 leading-relaxed italic text-lg">
              At La Belle Vie Medspa and Wellness Center, our mission is to provide the highest quality
              medical spa services to help you look and feel your best. We are committed to using the
              latest technology and techniques to achieve outstanding results for our clients.
            </p>
            <a href="tel:8183928500" className="inline-block mt-8 px-8 py-4 bg-primary text-white font-sans font-bold text-sm tracking-wide rounded-full hover:bg-primary/90 transition-all shadow-lg">
              Book Your Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="bg-dark py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2 text-center">Our Team</p>
          <h2 className="font-drama italic text-3xl md:text-4xl text-white font-normal text-center mb-10">Meet the Experts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map((m) => (
              <div key={m.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all flex flex-col items-center">
                {m.img ? (
                  <img src={m.img} alt={m.name} className="w-24 h-24 rounded-full object-cover mb-3 ring-2 ring-accent/30" loading="lazy" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <span className="font-drama italic text-2xl text-accent">
                      {m.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                    </span>
                  </div>
                )}
                <h3 className="font-sans font-semibold text-sm text-white leading-snug">{m.name}</h3>
                <p className="font-mono text-[10px] uppercase tracking-wider text-accent mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
