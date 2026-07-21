import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const press = [
  { name: 'Paris Hilton', note: 'Sliving Spa — September 2025. Thank you Paris for having us! #ThatsHot' },
  { name: 'Khloé Kardashian', note: 'Thank you Queen for allowing us to provide you with care.' },
  { name: 'Kim Kardashian', note: "At Kim Kardashian's Oasis Spa Day providing treatments." },
  { name: 'Kourtney Kardashian', note: "As seen in Kourtney Kardashian's Poosh — Votive pelvic-floor feature." },
  { name: 'US Weekly', note: 'As seen in US Weekly' },
  { name: 'Forbes', note: 'As seen in Forbes. Awarded Best Medspa.' },
];

const team = [
  { name: 'Andre Yousefia, MD', role: 'Medical Director' },
  { name: 'Samantha Ralica, RN', role: 'Aesthetic Injector' },
  { name: 'Genesse Arriaga, RN', role: 'Aesthetic Injector' },
  { name: 'Liat Yeyni, NP', role: 'Aesthetic Injector' },
  { name: 'Rosa Jovel', role: 'Back Office Manager' },
  { name: 'Jade Riley, MA', role: 'Medical Assistant / Back Office' },
  { name: 'Isabel Rincon, LE', role: 'Esthetician' },
];

export default function About() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        y: '30%', ease: 'none',
      });
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      });
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
        x: 50, opacity: 0, duration: 1.2, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <div ref={heroRef} className="relative w-full h-[80vh] md:h-[90vh]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/banner.jpg")' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark/60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="font-drama font-normal text-5xl md:text-7xl lg:text-8xl text-white text-center italic leading-tight">
            Our Story
          </h1>
          <p className="font-mono text-white/80 text-sm md:text-base mt-6 tracking-widest uppercase">
            La Belle Vie Medspa & Wellness
          </p>
        </div>
      </div>

      {/* In the press — real content from their site */}
      <div className="bg-dark py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="relative overflow-hidden rounded-2xl">
              <img src="/images/about-inner.jpg" alt="Paris Hilton x La Belle Vie Medspa" className="w-full object-cover h-[400px]" loading="lazy" />
            </div>
            <div>
              <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">In the Press</p>
              <h2 className="font-drama italic text-4xl md:text-5xl text-white font-normal leading-tight">
                PARIS HILTON x LA BELLE VIE MEDSPA x PARIVIE
              </h2>
              <p className="font-serif text-white/60 italic mt-4 text-lg">
                In the news: September 2025 — Thank you Paris for having us at Sliving Spa! #ThatsHot
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {press.map((p) => (
              <div key={p.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                <h3 className="font-sans font-bold text-lg text-white">{p.name}</h3>
                <p className="font-serif text-white/60 italic text-sm mt-2 leading-snug">{p.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="https://www.forbes.com" target="_blank" rel="noopener noreferrer" className="inline-block font-mono text-accent text-sm underline hover:text-accent/80">
              Awarded Best Medspa — Forbes
            </a>
          </div>
        </div>
      </div>

      {/* About + Mission */}
      <div ref={contentRef} className="relative z-10 bg-background pt-20 pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={imageRef} className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img src="/images/about-2.jpg" alt="La Belle Vie Medspa" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-2xl -z-10"></div>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">About La Belle Vie</p>
                <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark leading-tight mb-6">Our Mission</h2>
              </div>
              <div className="space-y-6">
                <p className="font-serif text-lg text-dark/70 leading-relaxed italic">
                  At La Belle Vie Medspa and Wellness Center, our mission is to provide the highest quality
                  medical spa services to help you look and feel your best. We are committed to using the
                  latest technology and techniques to achieve outstanding results for our clients.
                </p>
              </div>
              <a href="tel:8183928500" className="self-start mt-4 px-8 py-4 bg-primary text-white font-sans font-bold text-sm tracking-wide rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Book Your Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-background pb-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">Our Team</p>
              <h2 className="font-drama italic text-4xl md:text-5xl text-dark font-normal">Meet the Experts</h2>
              <p className="font-serif text-dark/60 italic mt-4 text-lg">
                Dedicated professionals committed to your wellness journey.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/about-team-1.jpg" alt="Team" className="rounded-2xl w-full h-48 object-cover" loading="lazy" />
              <img src="/images/about-team-2.jpg" alt="Team" className="rounded-2xl w-full h-48 object-cover" loading="lazy" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.map((m) => (
              <div key={m.name} className="bg-dark text-background rounded-2xl p-6 text-center hover:-translate-y-1 hover:border-accent/50 border border-white/5 transition-all">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-drama italic text-xl text-accent">
                    {m.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                  </span>
                </div>
                <h3 className="font-sans font-semibold text-sm text-background leading-snug">{m.name}</h3>
                <p className="font-mono text-xs uppercase tracking-wider text-accent mt-2">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
