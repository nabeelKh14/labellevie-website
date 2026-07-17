import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(bgRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
                y: '20%',
                ease: 'none'
            });

            // Simple Text Reveal using lines without split-type to keep deps minimal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                }
            });

            tl.from(text1Ref.current, {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            }).from(text2Ref.current, {
                y: 60,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out'
            }, '-=0.8');

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="philosophy" ref={sectionRef} className="relative w-full py-32 md:py-48 bg-dark overflow-hidden flex items-center justify-center">
            {/* Background Parallax */}
            <div
                ref={bgRef}
                className="absolute inset-[auto_auto_-20%_auto] top-[-20%] left-0 w-full h-[140%] opacity-[0.15] pointer-events-none mix-blend-luminosity"
                style={{
                    backgroundImage: 'url("/philosophy-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl px-6 md:px-16 w-full flex flex-col gap-8 md:gap-12">
                <p ref={text1Ref} className="font-mono text-background/60 text-sm md:text-lg tracking-wide max-w-xl self-start">
                    Most medical spas focus on: <span className="text-background">surface-level corrections</span>.
                </p>

                <h2 ref={text2Ref} className="font-sans font-bold text-4xl md:text-6xl text-background leading-[1.1] max-w-4xl self-end text-right">
                    We focus on: <br />
                    <span className="font-drama italic text-6xl md:text-8xl text-accent font-normal mt-2 block">
                        biological harmony.
                    </span>
                </h2>
            </div>
        </section>
    );
}
