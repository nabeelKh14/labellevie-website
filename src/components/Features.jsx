import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Shuffler Card
const ShufflerCard = () => {
    const [items, setItems] = useState([
        { id: 1, title: 'Direct Access', text: 'Call/Text: 818.392.8500' },
        { id: 2, title: 'Two Locations', text: 'Woodland Hills & Burbank, CA' },
        { id: 3, title: 'Mon–Sat Hours', text: '9am–6pm, by appointment' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const newItems = [...prev];
                const last = newItems.pop();
                newItems.unshift(last);
                return newItems;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-background rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 h-64 relative overflow-hidden flex flex-col justify-end overflow-context">
            <div className="absolute top-6 left-8 font-sans font-bold text-xl text-primary z-10">Connect</div>
            <div className="absolute top-7 right-8 flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="font-mono text-xs text-primary/60 uppercase tracking-widest">Live</span>
            </div>

            <div className="relative w-full h-32 flex justify-center items-end">
                {items.map((item, i) => {
                    const isTop = i === 0;
                    return (
                        <div
                            key={item.id}
                            className="absolute w-full rounded-xl p-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] border"
                            style={{
                                backgroundColor: i === 0 ? '#1A1A1A' : i === 1 ? '#2E4036' : '#F2F0E9',
                                color: i < 2 ? '#F2F0E9' : '#1A1A1A',
                                zIndex: 3 - i,
                                transform: `translateY(${i * 12}px) scale(${1 - i * 0.05})`,
                                opacity: 1 - i * 0.2,
                                borderColor: i === 2 ? 'rgba(46,64,54,0.1)' : 'transparent'
                            }}
                        >
                            <div className="font-mono text-[10px] uppercase opacity-70 mb-1">{item.title}</div>
                            <div className="font-sans font-semibold">{item.text}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Typewriter Card
const TypewriterCard = () => {
    const [text, setText] = useState('');
    const fullText = "> Revitalize Your Beauty and Wellness.\n> Precision longevity protocol active.\n> System monitoring cellular harmony...";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;
            if (index > fullText.length) index = 0;
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-dark text-background rounded-[2rem] p-8 shadow-xl h-64 relative flex flex-col justify-between overflow-context">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-sans font-bold text-xl text-background">Telemetry</h3>
                <span className="bg-accent/20 text-accent font-mono text-[10px] uppercase px-2 py-1 rounded-sm tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                    Data Stream
                </span>
            </div>
            <div className="font-mono text-sm leading-relaxed text-background/80 flex-1 whitespace-pre-line opacity-90">
                {text}<span className="inline-block w-2.5 h-4 bg-accent ml-1 align-middle animate-pulse"></span>
            </div>
        </div>
    );
};

// Scheduler Card
const SchedulerCard = () => {
    const cursorRef = useRef(null);
    const containerRef = useRef(null);
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const [activeDay, setActiveDay] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Initial pos outside
            tl.set(cursorRef.current, { x: 50, y: 150, opacity: 0 });

            // Move in
            tl.to(cursorRef.current, { x: 140, y: 85, opacity: 1, duration: 1, ease: "power2.inOut" });

            // Click simulation
            tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
            tl.call(() => setActiveDay(4)); // Highlight Thursday
            tl.to(cursorRef.current, { scale: 1, duration: 0.1 });

            // Move to save
            tl.to(cursorRef.current, { x: 230, y: 160, duration: 0.8, ease: "power2.inOut", delay: 0.2 });

            // Click save
            tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
            tl.call(() => setActiveDay(null)); // Reset
            tl.to(cursorRef.current, { scale: 1, duration: 0.1 });

            // Fade out
            tl.to(cursorRef.current, { x: 280, y: 200, opacity: 0, duration: 0.6 });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-background rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 h-64 relative overflow-context flex flex-col justify-between">
            <div>
                <h3 className="font-sans font-bold text-xl text-primary mb-2">Protocol</h3>
                <p className="font-serif italic text-primary/70 text-sm">Experience rejuvenating treatments at our Medspa.</p>
            </div>

            <div className="relative mt-4">
                {/* Days Grid */}
                <div className="flex justify-between w-full mb-6">
                    {days.map((d, i) => (
                        <div
                            key={i}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold transition-colors duration-300 ${activeDay === i ? 'bg-accent text-background' : 'bg-primary/5 text-primary/50'
                                }`}
                        >
                            {d}
                        </div>
                    ))}
                </div>

                {/* Save Box */}
                <div className="flex justify-end pr-2">
                    <div className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold transition-colors ${activeDay !== null ? 'bg-primary text-background' : 'bg-primary/10 text-primary/40'
                        }`}>
                        SCHEDULE
                    </div>
                </div>

                {/* Cursor */}
                <div
                    ref={cursorRef}
                    className="absolute top-0 left-0 w-6 h-6 z-20 pointer-events-none drop-shadow-md"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23111' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolygon points='3 3 10.42 21 13.9 13.9 21 10.42 3 3'/%3E%3C/svg%3E")`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="features" ref={containerRef} className="py-24 px-6 md:px-16 bg-background">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="feature-card">
                    <ShufflerCard />
                </div>
                <div className="feature-card">
                    <TypewriterCard />
                </div>
                <div className="feature-card">
                    <SchedulerCard />
                </div>
            </div>
        </section>
    );
}
