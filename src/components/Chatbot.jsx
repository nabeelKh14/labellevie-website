import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to La Belle Vie Medspa. How can we assist with your protocol today?", sender: "bot" }
    ]);
    const [input, setInput] = useState('');
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(chatWindowRef.current,
                { y: 20, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
            );
        }
    }, [isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: "Our concierge will review your inquiry shortly. Would you like to schedule a consultation?",
                sender: "bot"
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">

            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatWindowRef}
                    className="pointer-events-auto bg-background rounded-3xl shadow-[0_20px_60px_rgba(46,64,54,0.15)] border border-primary/10 w-80 sm:w-96 mb-4 flex flex-col overflow-hidden origin-bottom-right"
                >
                    {/* Header */}
                    <div className="bg-primary px-6 py-4 flex justify-between items-center text-background">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h4 className="font-sans font-bold text-sm leading-tight">Concierge</h4>
                                <p className="font-mono text-[10px] text-background/70 tracking-widest uppercase">System Online</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-white/80" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-6 flex flex-col gap-4 max-h-[400px] overflow-y-auto bg-background">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.sender === 'user'
                                        ? 'bg-accent text-white rounded-tr-sm self-end font-sans'
                                        : 'bg-primary/5 text-primary rounded-tl-sm self-start font-serif italic'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-primary/5 bg-white">
                        <form onSubmit={handleSend} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full bg-background rounded-full pl-5 pr-12 py-3 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-accent border border-primary/10 text-dark placeholder:text-dark/40"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 p-2 bg-primary text-background rounded-full hover:bg-accent transition-colors"
                            >
                                <Send className="w-4 h-4 -ml-0.5 mt-0.5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto magnetic-btn w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-dark text-white' : 'bg-primary text-background hover:bg-accent'
                    }`}
            >
                <span className="magnetic-btn-bg"></span>
                <span className="relative z-10">
                    {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                </span>
            </button>

        </div>
    );
}
