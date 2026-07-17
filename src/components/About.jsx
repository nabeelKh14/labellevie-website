import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero parallax
            gsap.to(heroRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
                y: '30%',
                ease: 'none'
            });

            // Content fade in
            gsap.from(contentRef.current, {
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            // Image reveal
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top 80%',
                },
                x: 50,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-background overflow-hidden">
            {/* Hero Section with Parallax */}
            <div 
                ref={heroRef}
                className="relative w-full h-[80vh] md:h-[90vh]"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/images/banner.jpg")',
                    }}
                >
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

            {/* Content Section */}
            <div ref={contentRef} className="relative z-10 bg-background -mt-20 pt-24 pb-24 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <div ref={imageRef} className="relative">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img 
                                    src="/images/hero.jpg" 
                                    alt="Luxury Medspa Interior" 
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent"></div>
                            </div>
                            {/* Decorative frame */}
                            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-2xl -z-10"></div>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col gap-8">
                            <div>
                                <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">
                                    Welcome to La Belle Vie
                                </p>
                                <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark leading-tight mb-6">
                                    Experience the Art of{' '}
                                    <span className="font-drama italic text-primary font-normal">
                                        Rejuvenation
                                    </span>
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <p className="font-serif text-lg text-dark/70 leading-relaxed italic">
                                    At La Belle Vie Medspa & Wellness Center, we believe that true beauty 
                                    emerges from the harmony of mind, body, and spirit. Our philosophy is 
                                    built on delivering personalized, results-driven treatments that enhance 
                                    your natural radiance.
                                </p>
                                <p className="font-serif text-lg text-dark/70 leading-relaxed italic">
                                    Founded with a vision to create a sanctuary for wellness, our team of 
                                    experts combines cutting-edge technology with time-honored techniques to 
                                    provide you with an unparalleled spa experience.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                                    <p className="font-sans font-bold text-4xl text-accent">15+</p>
                                    <p className="font-mono text-sm text-dark/60 mt-2">Years Experience</p>
                                </div>
                                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                                    <p className="font-sans font-bold text-4xl text-accent">5000+</p>
                                    <p className="font-mono text-sm text-dark/60 mt-2">Happy Clients</p>
                                </div>
                            </div>

                            <button className="self-start mt-4 px-8 py-4 bg-primary text-white font-sans font-bold text-sm tracking-wide rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Book Your Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-primary py-24 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="font-mono text-white/60 text-sm tracking-widest uppercase mb-4">
                            Our Philosophy
                        </p>
                        <h2 className="font-drama italic text-4xl md:text-5xl text-white font-normal">
                            Core Values That Guide Us
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Excellence",
                                description: "We commit to delivering exceptional results through continuous education and premium treatments."
                            },
                            {
                                title: "Authenticity", 
                                description: "We celebrate your unique beauty with personalized approaches tailored to your individual needs."
                            },
                            {
                                title: "Wellness",
                                description: "We holistic approach ensures complete rejuvenation of body, mind, and spirit."
                            }
                        ].map((value, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                                    <span className="font-drama italic text-3xl text-white">{i + 1}</span>
                                </div>
                                <h3 className="font-sans font-bold text-xl text-white mb-4">{value.title}</h3>
                                <p className="font-serif text-white/70 italic leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
