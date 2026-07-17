import { useState } from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceCategories = [
    {
        name: "Facial Treatments",
        services: [
            { name: "Hydrafacial Elite", price: "$295", duration: "60 min", description: "Deep cleansing, extraction, hydration & antioxidant protection" },
            { name: "Signature Facial", price: "$185", duration: "60 min", description: "Customized treatment for your skin type" },
            { name: "Microneedling", price: "$450", duration: "90 min", description: "Collagen induction therapy for skin renewal" },
            { name: "Chemical Peel", price: "$225", duration: "45 min", description: "Professional grade peel for skin resurfacing" },
            { name: "LED Light Therapy", price: "$150", duration: "30 min", description: "Red/Blue light for anti-aging & acne treatment" },
        ]
    },
    {
        name: "Injectables",
        services: [
            { name: "Botox (per unit)", price: "$18", duration: "15-30 min", description: "Dynamic wrinkle reduction" },
            { name: "Dermal Fillers", price: "$650", duration: "45 min", description: "Volume restoration & contouring" },
            { name: "PRP Facial", price: "$850", duration: "90 min", description: "Platelet-rich plasma for skin rejuvenation" },
            { name: "Sculptra", price: "$900", duration: "60 min", description: "Collagen biostimulator" },
        ]
    },
    {
        name: "Body Treatments",
        services: [
            { name: "CoolSculpting", price: "$750", duration: "60 min", description: "Non-surgical fat reduction" },
            { name: "Cellulite Treatment", price: "$400", duration: "60 min", description: "RF & massage therapy" },
            { name: "Body Wrap", price: "$195", duration: "75 min", description: "Detoxifying & hydrating treatment" },
            { name: "Laser Hair Removal", price: "$150", duration: "30 min", description: "Per area pricing available" },
        ]
    },
    {
        name: "Wellness",
        services: [
            { name: "IV Therapy", price: "$250", duration: "45 min", description: "Custom vitamin infusions" },
            { name: "Vitamin B12 Shot", price: "$45", duration: "5 min", description: "Energy & metabolism support" },
            { name: "Wellness Consultation", price: "$125", duration: "60 min", description: "Personalized health assessment" },
            { name: "Hormone Therapy", price: "$200", duration: "30 min", description: "Bio-identical hormone evaluation" },
        ]
    }
];

export default function Pricing() {
    const [activeCategory, setActiveCategory] = useState(0);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(headerRef.current, {
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            // Cards stagger animation
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="pricing" ref={sectionRef} className="w-full min-h-screen bg-background">
            {/* Hero Header */}
            <div ref={headerRef} className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/images/hero.jpg")',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/30 to-dark/70"></div>
                </div>
                
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <p className="font-mono text-white/70 text-sm tracking-[0.3em] uppercase mb-4">
                        Pricing & Services
                    </p>
                    <h1 className="font-drama font-normal text-5xl md:text-7xl lg:text-8xl text-white italic leading-tight mb-6">
                        Investment in Your{' '}
                        <span className="text-accent">Beauty</span>
                    </h1>
                    <p className="font-serif text-white/80 text-lg md:text-xl italic max-w-2xl mx-auto">
                        Transparent pricing for exceptional results. 
                        Your journey to radiance starts here.
                    </p>
                </div>
            </div>

            {/* Pricing Content */}
            <div className="relative z-10 bg-background -mt-10 pt-16 pb-24 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {serviceCategories.map((category, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCategory(i)}
                                className={`px-6 py-3 rounded-full font-sans font-semibold text-sm tracking-wide transition-all ${
                                    activeCategory === i
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-white text-dark hover:bg-primary/10'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceCategories[activeCategory].services.map((service, i) => (
                            <div
                                key={i}
                                ref={el => cardsRef.current[i] = el}
                                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-black/5 hover:border-accent/30"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-sans font-bold text-lg text-dark group-hover:text-primary transition-colors">
                                            {service.name}
                                        </h3>
                                        <p className="font-mono text-xs text-dark/50 mt-1">
                                            {service.duration}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-sans font-bold text-2xl text-accent">
                                            {service.price}
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="font-serif text-sm text-dark/60 italic leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                <button className="w-full py-3 bg-primary/5 text-primary font-sans font-semibold text-sm rounded-lg hover:bg-primary hover:text-white transition-all">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Membership CTA */}
                    <div className="mt-20 bg-primary rounded-3xl p-8 md:p-12 text-center">
                        <h3 className="font-drama italic text-3xl md:text-4xl text-white font-normal mb-4">
                            Become a Member
                        </h3>
                        <p className="font-serif text-white/80 italic max-w-2xl mx-auto mb-8">
                            Enjoy exclusive benefits, priority booking, and significant savings 
                            with our membership programs tailored to your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-accent text-white font-sans font-bold text-sm tracking-wide rounded-full hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl">
                                View Membership Plans
                            </button>
                            <button className="px-8 py-4 bg-white/10 text-white font-sans font-bold text-sm tracking-wide rounded-full hover:bg-white/20 transition-all">
                                Free Consultation
                            </button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "Complimentary Consultations", desc: "First-time visits include a free skin analysis" },
                            { title: "Flexible Payment Plans", desc: "Interest-free financing available" },
                            { title: "Loyalty Rewards", desc: "Earn points with every visit" }
                        ].map((item, i) => (
                            <div key={i} className="p-6">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="font-sans font-bold text-dark mb-2">{item.title}</h4>
                                <p className="font-serif text-sm text-dark/60 italic">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
