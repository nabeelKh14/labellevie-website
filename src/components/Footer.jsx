export default function Footer() {
    return (
        <footer className="bg-dark text-background rounded-t-[4rem] px-6 md:px-16 pt-24 pb-8 w-full mt-10">
            <div className="max-w-6xl mx-auto flex flex-col">

                {/* Top Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="max-w-sm">
                        <h2 className="font-sans font-bold text-3xl md:text-4xl text-background tracking-tight">La belle vie <span className="font-drama italic text-accent font-normal">medspa</span></h2>
                        <p className="font-mono text-sm text-background/50 mt-4 leading-relaxed tracking-wider uppercase">
                            Revitalize Your Beauty <br />and Wellness
                        </p>
                    </div>

                    <button className="magnetic-btn border border-background/20 px-8 py-3 rounded-full font-mono text-xs hover:border-accent hover:bg-accent/10 transition-colors">
                        Book Appointment
                    </button>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mb-24 border-t border-background/10 pt-16">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-background/40">Treatment</h4>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">Regenerative Care</a>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">Facial Mapping</a>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">IV Therapy</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-background/40">Philosophy</h4>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">Our Approach</a>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">Clinical Lab</a>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">Journal</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-background/40">Connect</h4>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">818.392.8500</a>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">Concierge</a>
                        <a href="#" className="font-serif italic text-sm text-background/80 hover:text-accent transition-colors">Instagram</a>
                    </div>

                    <div className="flex flex-col gap-4 items-start md:items-end mt-8 md:mt-0 col-span-2 md:col-span-1">
                        <div className="p-4 bg-background/5 rounded-2xl border border-background/10 font-mono text-xs flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                            <span className="text-background/80 uppercase tracking-widest">Protocol online<br />System optimal</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs font-mono text-background/40 border-t border-background/5 pt-8">
                    <span>&copy; {new Date().getFullYear()} La Belle Vie Medspa. All rights reserved.</span>
                    <div className="flex gap-6 uppercase">
                        <a href="#" className="hover:text-background transition-colors">Privacy</a>
                        <a href="#" className="hover:text-background transition-colors">Terms</a>
                        <a href="#" className="hover:text-background transition-colors">HIPAA</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
