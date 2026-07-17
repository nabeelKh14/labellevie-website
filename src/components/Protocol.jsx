import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: "01",
        title: "Discovery",
        desc: "Precise biological mapping of your skin and cellular health baseline.",
        Anim: () => (
            <svg className="w-48 h-48 md:w-64 md:h-64 opacity-20 text-accent animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="30" />
                <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" opacity="0.5" />
            </svg>
        )
    },
    {
        num: "02",
        title: "Regeneration",
        desc: "Targeted treatments integrating avant-garde clinical science and organic repair.",
        Anim: () => (
            <div className="relative w-48 h-48 md:w-64 md:h-64 bg-dark/5 rounded-full border border-dark/10 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 border-b border-accent/50 animate-[scan_3s_ease-in-out_infinite]" style={{ boxShadow: '0 4px 10px rgba(204,88,51,0.2)' }}></div>
                <div className="grid grid-cols-6 grid-rows-6 gap-2 w-3/4 h-3/4 opacity-20">
                    {[...Array(36)].map((_, i) => <div key={i} className="bg-dark/20 rounded-full w-1 h-1 m-auto"></div>)}
                </div>
            </div>
        )
    },
    {
        num: "03",
        title: "Vitality",
        desc: "Sustained optimization for longevity and timeless aesthetics.",
        Anim: () => (
            <svg className="w-48 h-48 md:w-64 md:h-64 opacity-40 text-accent" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0 25 L30 25 L40 5 L50 45 L60 25 L100 25" style={{
                    strokeDasharray: '200',
                    strokeDashoffset: '200',
                    animation: 'dash 2s cubic-bezier(0.4, 0, 0.2, 1) infinite'
                }} />
                <style>{`
          @keyframes dash {
            0% { stroke-dashoffset: 200; }
            50% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -200; }
          }
          @keyframes scan {
            0% { transform: translateY(-100%); }
            50% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }
        `}</style>
            </svg>
        )
    }
];

export default function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, i) => {
                if (i === cards.length - 1) return; // Skip last card for stacking logic

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    endTrigger: containerRef.current,
                    end: 'bottom bottom',
                    pin: true,
                    pinSpacing: false,
                });

                const nextCard = cards[i + 1];
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: nextCard,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                    },
                    scale: 0.9,
                    opacity: 0.5,
                    filter: 'blur(20px)',
                    ease: 'none'
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="protocol" ref={containerRef} className="relative w-full bg-background pt-24">
            <div className="text-center mb-16 px-6 relative z-50">
                <h2 className="font-sans font-bold text-4xl text-dark tracking-tight">The Protocol</h2>
                <p className="font-mono text-sm text-primary/60 mt-4 uppercase tracking-widest leading-relaxed">Systematic refinement.<br />Bespoke longevity.</p>
            </div>

            <div className="relative">
                {steps.map((step, i) => (
                    <div key={i} className="protocol-card min-h-screen w-full flex items-center justify-center p-6 bg-background">
                        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 flex-col-reverse gap-12 items-center">

                            {/* Content Box */}
                            <div className="bg-white/50 backdrop-blur-3xl rounded-[3rem] p-12 md:p-16 shadow-[0_20px_60px_rgb(0,0,0,0.03)] border border-white/40 flex flex-col justify-center h-full relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 font-mono text-6xl text-primary/5 select-none leading-none">
                                    {step.num}
                                </div>
                                <div className="font-mono text-sm text-accent mb-6 flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                                    Phase {step.num}
                                </div>
                                <h3 className="font-sans font-bold text-4xl text-primary mb-6">{step.title}</h3>
                                <p className="font-serif italic text-xl text-primary/80 leading-relaxed max-w-sm">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Graphic Box */}
                            <div className="flex items-center justify-center md:h-[500px]">
                                <step.Anim />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
