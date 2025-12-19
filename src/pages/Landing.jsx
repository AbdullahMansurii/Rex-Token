import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe, ChevronRight, Play, CheckCircle, Database, Lock, Server, Menu, X } from "lucide-react";
import Logo from "../components/Logo";

// Navbar Component for Landing Page
// Navbar Component for Landing Page
const LandingNavbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Logo className="w-10 h-10" />
                    <span className="text-xl md:text-2xl font-bold text-white tracking-wider">REX <span className="text-primary">TOKEN</span></span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <a href="#features" className="hover:text-white transition">Features</a>
                    <a href="#mission" className="hover:text-white transition">Mission</a>
                    <a href="#roadmap" className="hover:text-white transition">Roadmap</a>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link to="/login" className="text-gray-300 hover:text-white font-medium transition">Login</Link>
                    <Link to="/register" className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white rounded-full font-bold shadow-glow transition hover:scale-105">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 h-screen">
                    <a href="#features" className="text-lg font-medium text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Features</a>
                    <a href="#mission" className="text-lg font-medium text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Mission</a>
                    <a href="#roadmap" className="text-lg font-medium text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Roadmap</a>
                    <div className="h-px bg-white/10 w-full" />
                    <Link to="/login" className="text-lg font-medium text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Login</Link>
                    <Link to="/register" className="w-full py-3 bg-primary text-center text-white rounded-xl font-bold shadow-glow" onClick={() => setIsOpen(false)}>
                        Get Started
                    </Link>
                </div>
            )}
        </nav>
    );
};

// Typewriter Effect Component
const TypewriterText = ({ text, className }) => {
    const [displayText, setDisplayText] = React.useState('');
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[index]);
                setIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
};

// New Premium Crypto Dashboard Visual
const CryptoDashboardVisual = () => (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center perspective-1000 my-10 md:my-0">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

        {/* Main Dashboard Card */}
        <div className="relative z-10 w-full max-w-[420px] bg-surface/90 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl transform md:rotate-y-12 md:rotate-x-6 hover:rotate-0 transition-all duration-700 ease-out group scale-90 md:scale-100 origin-center">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Logo className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">REX Dashboard</h3>
                        <p className="text-xs text-gray-400">Live Market Data</p>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-40 w-full bg-gradient-to-b from-primary/5 to-transparent rounded-xl border border-white/5 p-4 overflow-hidden mb-6">
                {/* Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/5" />
                    ))}
                </div>

                <svg className="absolute inset-0 w-full h-full overflow-visible p-2" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path
                        d="M0 40 Q 20 45, 40 25 T 80 15 T 100 5 L 100 50 L 0 50 Z"
                        fill="url(#gradient)"
                        opacity="0.2"
                    />
                    <path
                        d="M0 40 Q 20 45, 40 25 T 80 15 T 100 5"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        className="animate-dash"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Floating Tooltip */}
                <div className="absolute top-[20%] left-[60%] bg-black/80 border border-white/10 px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md animate-float z-10">
                    <p className="text-[10px] text-gray-400">REX/USD</p>
                    <p className="text-sm font-bold text-white">$14.50</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition cursor-default">
                    <p className="text-xs text-gray-400 mb-1">Total Volume</p>
                    <p className="text-lg font-bold text-white">$142.5M</p>
                    <p className="text-[10px] text-green-400">+12.4%</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition cursor-default">
                    <p className="text-xs text-gray-400 mb-1">Staking APY</p>
                    <p className="text-lg font-bold text-white">18.2%</p>
                    <p className="text-[10px] text-green-400">Fixed Rate</p>
                </div>
            </div>

            {/* Recent Activity Mini List */}
            <div className="space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Activity</p>
                {[
                    { type: 'Buy', amount: '2,500 REX', time: '2m ago', color: 'text-green-400' },
                    { type: 'Stake', amount: '10,000 REX', time: '5m ago', color: 'text-blue-400' }
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${item.color} bg-opacity-10`}>
                                <div className={`w-2 h-2 rounded-full bg-current`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white">{item.type}</p>
                                <p className="text-xs text-gray-500">{item.time}</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-white">{item.amount}</span>
                    </div>
                ))}
            </div>

            {/* Shimmer Overlay */}
            <div className="shimmer pointer-events-none" />
        </div>
    </div>
);

// Hero Section
const Hero = () => (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Elements */}
        <div className="absolute top-0 center w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mx-auto lg:mx-0">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-400">Live on Mainnet</span>
                </div>
                <div className="min-h-[140px] md:min-h-[220px]"> {/* Fixed height container to prevent layout shift */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
                        The Future of <br />
                        <TypewriterText text="Decentralized Trading" className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400" />
                    </h1>
                </div>
                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
                    Experience lightning-fast swaps, deep liquidity, and minimal fees.
                    Join over 2 million users on the world's most advanced crypto dashboard.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/register" className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-glow hover:bg-primary-glow transition transform hover:-translate-y-1 flex items-center justify-center gap-2">
                        Start Trading Now <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition flex items-center justify-center gap-2 backdrop-blur-sm">
                        <Play className="w-5 h-5 fill-current" /> Watch Demo
                    </button>
                </div>

                <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-gray-500">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">2.5M+</span>
                        <span className="text-sm">Active Users</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">₹80B+</span>
                        <span className="text-sm">Quarterly Volume</span>
                    </div>
                </div>
            </div>

            {/* New Animated Visual */}
            <div className="relative block h-full order-1 lg:order-2">
                <CryptoDashboardVisual />
            </div>
        </div>
    </section>
);

// Mission Section
const Mission = () => (
    <section id="mission" className="py-24 bg-surface/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-primary font-bold tracking-wider text-sm uppercase">Our Mission</span>
                    <h2 className="text-4xl font-bold text-white mt-2 mb-6">Democratizing Financial Freedom for Everyone</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        We believe that financial markets should be accessible, transparent, and fair. REX Token was built to bridge the gap between traditional finance and the decentralized future.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Zero hidden fees on all transactions",
                            "Bank-grade security protocols",
                            "Community-driven governance",
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                <div className="p-1 rounded-full bg-primary/20 text-primary">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Uptime", value: "99.99%", icon: Server },
                        { label: "Countries", value: "150+", icon: Globe },
                        { label: "Assets", value: "500+", icon: Database },
                        { label: "Security", value: "Audited", icon: Lock },
                    ].map((stat, i) => (
                        <div key={i} className="bg-background border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:border-primary/50 transition duration-300 hover:-translate-y-1">
                            <stat.icon className="w-8 h-8 text-primary mb-3" />
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// Partners Section
const Partners = () => (
    <section className="py-12 border-y border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest">Trusted by Industry Leaders</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Mock Logos - Text for now */}
                {['Binance', 'Ethereum Foundation', 'Chainlink', 'Polygon', 'Aave'].map((partner, i) => (
                    <span key={i} className="text-xl font-bold text-white/40 hover:text-white transition cursor-default">{partner}</span>
                ))}
            </div>
        </div>
    </section>
);

// Features Section
const Features = () => (
    <section id="features" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-wider text-sm uppercase">Why Choose Us</span>
                <h2 className="text-4xl font-bold text-white mt-2">Platform Features</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: Shield, title: "Bank-Grade Security", desc: "Cold storage wallets and multi-signature security protocols keep your funds safe." },
                    { icon: Zap, title: "Instant Execution", desc: "Our matching engine handles up to 100,000 transactions per second with <5ms latency." },
                    { icon: Globe, title: "Global Access", desc: "Trade from anywhere in the world with 24/7 multilingual support." }
                ].map((feature, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-primary/50 transition duration-300 group hover:-translate-y-2">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition">
                            <feature.icon className="w-7 h-7 text-white group-hover:text-primary transition" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Roadmap
const Roadmap = () => (
    <section id="roadmap" className="py-24 bg-gradient-to-b from-black to-zinc-900 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-wider text-sm uppercase">Our Journey</span>
                <h2 className="text-4xl font-bold text-white mt-2">Strategic Roadmap</h2>
            </div>

            <div className="space-y-12 relative">
                <div className="absolute left-4 md:left-1/2 h-full w-px bg-white/10 -translate-x-1/2" />

                {[
                    { phase: "Phase 1", title: "Project Launch", items: ["Core Platform Development", "Private Sale Round", "Smart Contract Audit"], done: true },
                    { phase: "Phase 2", title: "Ecosystem Growth", items: ["Public Exchange Listing", "Staking Launch", "Mobile App Beta"], done: false },
                    { phase: "Phase 3", title: "Global Expansion", items: ["Cross-chain Bridge", "NFT Marketplace", "Global Marketing Campaign"], done: false }
                ].map((phase, i) => (
                    <div key={i} className={`flex flex-col md:flex-row gap-8 relative ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        <div className="md:w-1/2 p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition shadow-lg relative z-10 bg-black/80">
                            <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">{phase.phase}</span>
                            <h3 className="text-xl font-bold text-white mb-4">{phase.title}</h3>
                            <ul className="space-y-2">
                                {phase.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                                        <CheckCircle className={`w-4 h-4 ${phase.done ? 'text-green-500' : 'text-gray-600'}`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-primary shadow-glow z-20 mt-6" />
                        <div className="md:w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// CTA Section
const CTASection = () => (
    <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden bg-primary/20 border border-primary/30 text-center p-12 md:p-20">
            {/* Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/30 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to start your crypto journey?</h2>
                <p className="text-xl text-gray-300">Join thousands of users who trust REX Token for their digital asset management.</p>
                <div className="flex justify-center gap-4">
                    <Link to="/register" className="px-10 py-4 bg-white text-primary font-bold rounded-xl shadow-xl hover:bg-gray-100 transition transform hover:-translate-y-1">
                        Create Free Account
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

// Footer
const Footer = () => (
    <footer className="bg-black border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
                <div className="flex items-center gap-2 mb-6">
                    <Logo className="w-8 h-8 rounded-lg" />
                    <span className="text-xl font-bold text-white tracking-wider">REX <span className="text-primary">TOKEN</span></span>
                </div>
                <p className="text-gray-400 text-sm max-w-sm">
                    The most trusted crypto dashboard for managing your assets, tracking performance, and earning passive income.
                </p>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4">Platform</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-primary transition">Markets</a></li>
                    <li><a href="#" className="hover:text-primary transition">Exchange</a></li>
                    <li><a href="#" className="hover:text-primary transition">Earn</a></li>
                    <li><a href="#" className="hover:text-primary transition">Wallet</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
                    <li><a href="#" className="hover:text-primary transition">API Documentation</a></li>
                    <li><a href="#" className="hover:text-primary transition">Fees</a></li>
                    <li><a href="#" className="hover:text-primary transition">Security</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2024 REX Token. All rights reserved.</p>
            <div className="flex gap-4">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
        </div>
    </footer>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
            <LandingNavbar />
            <Hero />
            <Partners />
            <Mission />
            <Features />
            <Roadmap />
            <CTASection />
            <Footer />
        </div>
    );
};

export default LandingPage;
