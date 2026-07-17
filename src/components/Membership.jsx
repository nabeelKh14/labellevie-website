const tiers = [
    {
        name: "Vitality",
        price: "$290",
        period: "/month",
        features: ["Bimonthly cellular analysis", "1 Signature facial mapping", "Priority booking window"],
        cta: "Begin Journey",
        popular: false
    },
    {
        name: "Longevity",
        price: "$850",
        period: "/month",
        features: ["Comprehensive biological panel", "Unlimited regenerative IVs", "24/7 Concierge diagnostic line", "2 Signature aesthetic protocols"],
        cta: "Optimize Now",
        popular: true
    },
    {
        name: "Aesthetics",
        price: "$1,400+",
        period: "/quarter",
        features: ["Annual full-body genomic scan", "Quarterly avant-garde treatments", "Private after-hours access"],
        cta: "Inquire Privately",
        popular: false
    }
];

export default function Membership() {
    return (
        <section id="membership" className="py-32 px-6 md:px-16 bg-background">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark tracking-tight mb-4 text-center">
                    Invest in your <span className="font-drama italic text-primary font-normal">Architecture.</span>
                </h2>
                <p className="font-mono text-sm text-primary/70 max-w-lg text-center mb-16 leading-relaxed">
                    Our protocol memberships ensure sustained optimization, precision aesthetics, and uninterrupted biological harmony.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center">
                    {tiers.map((tier, i) => (
                        <div
                            key={i}
                            className={`rounded-[2rem] p-8 md:p-10 flex flex-col h-full shadow-[0_10px_40px_rgb(0,0,0,0.05)] transition-transform duration-500 hover:-translate-y-2 ${tier.popular
                                    ? 'bg-primary text-background md:scale-105 shadow-[0_20px_60px_rgba(46,64,54,0.2)] border-2 border-primary'
                                    : 'bg-white text-dark border border-black/5'
                                }`}
                        >
                            <div className="mb-8">
                                {tier.popular && <span className="inline-block px-3 py-1 bg-accent/20 text-accent font-mono text-[10px] uppercase font-bold tracking-widest rounded-full mb-4 ring-1 ring-accent/30 shadow-[0_0_15px_rgba(204,88,51,0.2)] animate-pulse">Standard</span>}
                                <h3 className={`font-sans font-bold text-2xl ${tier.popular ? 'text-white' : 'text-primary'}`}>{tier.name}</h3>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className={`font-sans font-bold text-4xl tracking-tighter ${tier.popular ? 'text-white' : 'text-dark'}`}>{tier.price}</span>
                                    <span className={`font-mono text-xs ${tier.popular ? 'text-white/60' : 'text-dark/40'}`}>{tier.period}</span>
                                </div>
                            </div>

                            <ul className="flex flex-col gap-4 mb-10 flex-1">
                                {tier.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <svg className={`w-5 h-5 mt-0.5 shrink-0 ${tier.popular ? 'text-accent' : 'text-primary/60'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span className={`font-serif text-[15px] leading-snug ${tier.popular ? 'text-white/90 font-medium' : 'text-dark/80 italic'}`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`magnetic-btn w-full py-4 rounded-full font-sans font-bold text-sm tracking-wide transition-all ${tier.popular
                                    ? 'bg-accent text-white hover:shadow-[0_0_30px_rgba(204,88,51,0.4)]'
                                    : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                                }`}>
                                <span className="magnetic-btn-bg"></span>
                                <span className="relative z-10">{tier.cta}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
