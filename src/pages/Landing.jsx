import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe, ChevronRight, Play, CheckCircle, Database, Lock, Server } from "lucide-react";
import Logo from "../components/Logo";

// Navbar Component for Landing Page
const LandingNavbar = () => (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Logo className="w-10 h-10" />
                <span className="text-2xl font-bold text-white tracking-wider">REX <span className="text-primary">TOKEN</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                <a href="#features" className="hover:text-white transition">Features</a>
                <a href="#mission" className="hover:text-white transition">Mission</a>
                <a href="#roadmap" className="hover:text-white transition">Roadmap</a>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white font-medium transition">Login</Link>
                <Link to="/login" className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white rounded-full font-bold shadow-glow transition hover:scale-105">
                    Get Started
                </Link>
            </div>
        </div>
    </nav>
);

// Animated Ecosystem Visual
const EcosystemVisual = () => (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
        {/* Core */}
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-purple-500 blur-sm animate-pulse-glow z-20 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-black/90 flex items-center justify-center">
                <Globe className="w-12 h-12 text-primary animate-spin-slow" />
            </div>
        </div>

        {/* Orbit Rings */}
        <div className="absolute w-[300px] h-[300px] border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

        {/* Floating Elements on Orbits */}
        <div className="absolute w-full h-full animate-[spin_20s_linear_infinite]">
            <div className="absolute top-1/2 left-[85%] -translate-y-1/2 p-4 bg-surface border border-white/10 rounded-2xl shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '0s' }}>
                <Shield className="w-6 h-6 text-green-400 mb-2" />
                <p className="text-white font-bold text-xs">Secure</p>
            </div>
        </div>

        <div className="absolute w-full h-full animate-[spin_25s_linear_infinite_reverse]">
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 p-4 bg-surface border border-white/10 rounded-2xl shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '1s' }}>
                <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                <p className="text-white font-bold text-xs">Fast</p>
            </div>
        </div>

        <div className="absolute w-full h-full animate-[spin_30s_linear_infinite]">
            <div className="absolute bottom-[20%] left-[20%] p-4 bg-surface border border-white/10 rounded-2xl shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '2s' }}>
                <Database className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-white font-bold text-xs">Storage</p>
            </div>
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
            <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mx-auto lg:mx-0">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-400">Live on Mainnet</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    The Future of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Decentralized</span> Trading
                </h1>
                <p className="text-lg text-gray-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
                    Experience lightning-fast swaps, deep liquidity, and minimal fees.
                    Join over 2 million users on the world's most advanced crypto dashboard.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/login" className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-glow hover:bg-primary-glow transition transform hover:-translate-y-1 flex items-center justify-center gap-2">
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
            <div className="relative animate-float block h-full">
                <EcosystemVisual />
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
                    <Link to="/login" className="px-10 py-4 bg-white text-primary font-bold rounded-xl shadow-xl hover:bg-gray-100 transition transform hover:-translate-y-1">
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
