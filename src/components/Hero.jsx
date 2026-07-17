import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef(null);
    const vantaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-anim', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2
            });
        }, containerRef);

        // Vanta subtle mesh behind the hero image (low opacity so photo reads)
        let vanta;
        import('vanta/dist/vanta.net.min').then((mod) => {
            const NET = mod.default || mod;
            if (!containerRef.current || vantaRef.current || !NET) return;
            vanta = NET({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 1,
                color: 0x2e4036,
                backgroundColor: 0x1a1a1a,
                points: 10,
                maxDistance: 22,
                spacing: 18,
            });
            vantaRef.current._vanta = vanta;
        }).catch(() => {/* vanta optional */});

        return () => {
            ctx.revert();
            if (vantaRef.current && vantaRef.current._vanta) vantaRef.current._vanta.destroy();
        };
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-16">
            {/* Vanta animated mesh (behind image, low opacity) */}
            <div ref={vantaRef} className="absolute inset-0 z-0 opacity-40" />
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 bg-dark">
                <img
                    src="/hero.jpg"
                    alt="La Belle Vie Medspa Team"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl text-background">
                <h1 className="leading-[1.1] mb-6 flex flex-col">
                    <span className="hero-anim font-sans font-bold text-4xl md:text-6xl tracking-tight text-background/90">
                        Vitality is the
                    </span>
                    <span className="hero-anim font-drama italic text-7xl md:text-9xl text-background mt-[-0.1em]">
                        Masterpiece.
                    </span>
                </h1>

                <p className="hero-anim font-mono text-sm md:text-base text-background/80 max-w-md mb-10 leading-relaxed">
                    Revitalize your beauty and wellness. Experience precision longevity driven by biological harmony.
                </p>

                <button className="hero-anim magnetic-btn w-fit bg-accent text-background px-8 py-4 rounded-full font-sans font-bold text-lg tracking-wide shadow-xl flex items-center gap-3">
                    <span className="magnetic-btn-bg"></span>
                    <span className="relative z-10 flex items-center gap-2">
                        Book an appointment
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </span>
                </button>
            </div>
        </section>
    );
}
