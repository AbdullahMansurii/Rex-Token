import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight, Shield, Zap, Globe, ChevronRight, Play, CheckCircle, Database, Lock, Server, Menu, X,
    TrendingUp, Coins, Users, ShieldCheck, BarChart3, CircleDollarSign, Hourglass, Scale, FileText, ChevronDown
} from "lucide-react";
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

// How It Works Section
const HowItWorks = () => (
    <section className="py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex justify-center mb-16">
                <div className="px-6 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider">
                    How it Works
                </div>
            </div>

            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Start Earning in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">3 Simple Steps</span>
                </h2>
                <p className="text-gray-400 text-lg">
                    Our platform makes it incredibly easy to start earning passive income. Follow these three simple steps to begin your journey with REX Token.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: TrendingUp, title: "Invest", text: "Purchase REX tokens using BNB or other supported cryptocurrencies. Secure your position in the ecosystem.", color: "bg-purple-500", border: 'from-purple-500' },
                    { icon: Coins, title: "Stake", text: "Lock your REX tokens in our staking contract to start earning monthly passive income automatically.", color: "bg-yellow-500", border: 'from-yellow-500' },
                    { icon: Users, title: "Earn", text: "Earn 5% monthly returns and build your referral network across 10 levels for additional income.", color: "bg-green-500", border: 'from-green-500' }
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-surface/50 border border-white/5 hover:border-primary/50 transition duration-300 group">
                        <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                            <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                        <p className="text-gray-400">{item.text}</p>
                        <div className={`h-1 w-full mt-8 rounded-full bg-gradient-to-r ${item.border} to-transparent opacity-50`} />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Why Choose Us Section
const WhyChooseUs = () => (
    <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Choose <span className="text-purple-500">REX Token</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-16">
                We combine cutting-edge technology with sustainable tokenomics to create the perfect platform for passive income generation.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: ShieldCheck, title: "Secure Smart Contract", text: "Audited & verified contract with zero vulnerabilities", iconColor: "text-purple-400", bg: "bg-purple-500/10" },
                    { icon: Zap, title: "Instant Withdrawals", text: "24/7 instant withdrawals with minimal gas fees", iconColor: "text-purple-400", bg: "bg-purple-500/10" },
                    { icon: BarChart3, title: "Real-time Analytics", text: "Live dashboard with earnings tracking and analytics", iconColor: "text-purple-400", bg: "bg-purple-500/10" }
                ].map((item, i) => (
                    <div key={i} className="p-10 rounded-3xl bg-surface/30 border border-white/5 hover:bg-surface/50 transition duration-300 group">
                        <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition`}>
                            <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Platform Features Section
const PlatformFeatures = () => {
    const [activeTab, setActiveTab] = useState('staking');

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Platform <span className="text-yellow-500">Features</span></h2>
                    <p className="text-gray-400">Explore our comprehensive features designed to maximize your earnings</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {[
                        { id: 'staking', label: 'Staking', icon: '🔥' },
                        { id: 'referral', label: 'Referral', icon: '👥' },
                        { id: 'tokenomics', label: 'Tokenomics', icon: '📊' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-purple-600 to-yellow-500 text-white shadow-glow'
                                : 'bg-surface border border-white/10 text-gray-400 hover:text-white'
                                }`}
                        >
                            <span>{tab.icon}</span> {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'staking' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[
                                { label: 'Daily Rates', value: '5%', sub: 'Per day on weekdays', icon: TrendingUp },
                                { label: 'Max Rewards', value: '2x', sub: 'Maximum profit potential', icon: CircleDollarSign },
                                { label: 'Duration', value: '365 Days', sub: 'Lock period for bonus', icon: Hourglass },
                                { label: 'Min Stake', value: '100 REX', sub: 'Minimum investment', icon: Scale },
                            ].map((stat, i) => (
                                <div key={i} className="bg-surface/50 border border-white/5 p-8 rounded-2xl text-center hover:border-white/10 transition group">
                                    <div className="mb-4 flex justify-center">
                                        <stat.icon className="w-10 h-10 text-blue-200 group-hover:text-blue-400 transition" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-yellow-500 mb-2">{stat.value}</h3>
                                    <p className="text-white font-bold mb-1">{stat.label}</p>
                                    <p className="text-xs text-gray-500">{stat.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#111] rounded-3xl p-8 lg:p-12 border border-white/5 grid md:grid-cols-3 gap-12">
                            <div>
                                <h4 className="text-yellow-500 font-bold text-lg mb-6">Withdrawal Policy</h4>
                                <ul className="space-y-4">
                                    {[
                                        ['Minimum Withdrawal:', '100 REX'],
                                        ['Withdrawal Fee:', '5%'],
                                        ['Amount Credited:', '95%']
                                    ].map(([label, val], i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                            {label} <span className="font-bold text-white">{val}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-purple-400 font-bold text-lg mb-6 flex items-center gap-2">
                                    <span className="text-xl">📅</span> Weekday Returns
                                </h4>
                                <div className="space-y-3">
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                                        <div key={day} className="flex justify-between text-sm border-b border-white/5 pb-2 last:border-0">
                                            <span className="text-gray-300">{day}</span>
                                            <span className="text-yellow-500 font-bold">5%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-purple-400 font-bold text-lg mb-6 flex items-center gap-2">
                                    <span className="text-xl">🎯</span> Holding Bonus
                                </h4>
                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center border border-white/5">
                                        <span className="text-white text-sm">12 Months</span>
                                        <span className="text-yellow-500 font-bold">+6% Bonus</span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center border border-white/5">
                                        <span className="text-white text-sm">24 Months</span>
                                        <span className="text-yellow-500 font-bold">+12% Bonus</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'referral' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold text-white mb-2">10-Level Referral System</h3>
                            <p className="text-gray-400">Earn commissions from your entire network tree automatically</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                            {[
                                { level: 'L1', comm: '5%', color: 'bg-purple-500' },
                                { level: 'L2', comm: '2%', color: 'bg-blue-500' },
                                { level: 'L3', comm: '1.5%', color: 'bg-green-500' },
                                { level: 'L4', comm: '1%', color: 'bg-orange-500' },
                                { level: 'L5', comm: '1%', color: 'bg-pink-500' },
                                { level: 'L6', comm: '1%', color: 'bg-indigo-500' },
                                { level: 'L7', comm: '0.75%', color: 'bg-cyan-500' },
                                { level: 'L8', comm: '0.50%', color: 'bg-red-500' },
                                { level: 'L9', comm: '0.25%', color: 'bg-amber-500' },
                                { level: 'L10', comm: '0.25%', color: 'bg-lime-500' },
                            ].map((item, i) => (
                                <div key={i} className={`${item.color} rounded-2xl p-6 text-center transform hover:scale-105 transition shadow-lg`}>
                                    <h4 className="text-xl font-bold text-white mb-1">{item.level}</h4>
                                    <p className="text-2xl font-bold text-white mb-1">{item.comm}</p>
                                    <p className="text-[10px] font-bold text-white/80 uppercase">Comm</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
                            <div className="flex items-center gap-2 mb-6 justify-center">
                                <BarChart3 className="w-5 h-5 text-gray-400" />
                                <h4 className="text-lg font-bold text-white">Earnings Realization</h4>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { label: 'Direct (Level 1)', val: '5% Reward', color: 'text-purple-400' },
                                    { label: 'Level 2 Network', val: '2% Reward', color: 'text-blue-400' },
                                    { label: 'Level 3-5 Network', val: 'Up to 1.5%', color: 'text-green-400' },
                                    { label: 'Level 6-10 Network', val: 'Up to 0.75%', color: 'text-orange-400' },
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                                        <span className="text-gray-400 text-sm flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${row.color.replace('text', 'bg')}`} />
                                            {row.label}
                                        </span>
                                        <span className="font-bold text-yellow-500 text-sm">{row.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'tokenomics' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid lg:grid-cols-2 gap-8">
                        {/* Left Column - Stats & Graph */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl">💰</span>
                                <h3 className="text-xl font-bold text-white">Price Statistics</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#111] p-6 rounded-2xl border border-white/5 text-center">
                                    <p className="text-2xl font-bold text-yellow-500 mb-1">5 INR</p>
                                    <p className="text-[10px] text-green-500 font-bold mb-2">+5% on 20 lacs INR</p>
                                    <p className="text-xs text-gray-400">Initial Price</p>
                                </div>
                                <div className="bg-[#111] p-6 rounded-2xl border border-white/5 text-center">
                                    <p className="text-xl font-bold text-yellow-500 mb-1">+5% / 20 Lakh</p>
                                    <p className="text-xs text-gray-400 mt-3">Price Increase</p>
                                </div>
                                <div className="bg-[#111] p-6 rounded-2xl border border-white/5 text-center">
                                    <p className="text-2xl font-bold text-white mb-1">21M</p>
                                    <p className="text-xs text-gray-400">Total Supply<br /><span className="scale-75 inline-block opacity-50">REX Tokens</span></p>
                                </div>
                                <div className="bg-[#111] p-6 rounded-2xl border border-white/5 text-center">
                                    <p className="text-2xl font-bold text-white mb-1">21</p>
                                    <p className="text-xs text-gray-400 mt-3">Total Phases</p>
                                </div>
                            </div>

                            <div className="bg-[#111] p-6 rounded-2xl border border-white/5 relative overflow-hidden h-48">
                                <div className="flex justify-between items-center mb-4 relative z-10">
                                    <h4 className="text-white font-bold text-sm flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-purple-400" /> Price Curve
                                    </h4>
                                    <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">+5% Growth</span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-purple-500/20 to-transparent" />
                                <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                                    <path d="M0 50 C 30 40, 60 30, 100 10 L 100 50 L 0 50 Z" fill="url(#purpleGrad)" opacity="0.3" />
                                    <path d="M0 50 C 30 40, 60 30, 100 10" stroke="#a855f7" strokeWidth="2" fill="none" />
                                    <defs>
                                        <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#a855f7" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* Right Column - Distribution & Specs */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-xl">📊</span>
                                    <h3 className="text-xl font-bold text-white">Distribution</h3>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Community & Staking', val: '40%', color: 'bg-purple-500' },
                                        { label: 'Team & Development', val: '20%', color: 'bg-yellow-500' },
                                        { label: 'Liquidity Pool', val: '25%', color: 'bg-green-500' },
                                        { label: 'Marketing', val: '15%', color: 'bg-blue-500' },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs text-gray-300 mb-2">
                                                <span>{item.label}</span>
                                                <span className="font-bold text-white">{item.val}</span>
                                            </div>
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                                <h4 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-orange-400" /> TOKEN SPECS
                                </h4>
                                <div className="space-y-4 text-sm">
                                    {[
                                        ['Token Name', 'REX Token'],
                                        ['Symbol', 'REX'],
                                        ['Network', 'BSC (BEP-20)'],
                                        ['Contract', 'Verified ✅']
                                    ].map(([label, val], i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-white/5 last:border-0 pb-3 last:pb-0">
                                            <span className="text-gray-500">{label}</span>
                                            <span className={`font-bold ${val.includes('Verified') ? 'text-green-400' : 'text-white'}`}>{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab !== 'staking' && activeTab !== 'referral' && activeTab !== 'tokenomics' && (
                    <div className="text-center py-20 text-gray-500">
                        Content for {activeTab} coming soon...
                    </div>
                )}
            </div>
        </section>
    );
};

// FAQ Section
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const questions = [
        "What is REX Token and how does it work?",
        "How much can I earn monthly with staking?",
        "What is the minimum investment required?",
        "How does the 10-level referral system work?",
        "When can I withdraw my earnings?",
        "Is my investment secure?"
    ];

    return (
        <section className="py-24">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Frequently Asked <span className="text-purple-500">Questions</span>
                    </h2>
                    <p className="text-gray-400 mt-4">
                        Find answers to common questions about REX Token staking, referrals, and platform features.
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((q, i) => (
                        <div key={i} className="bg-surface/30 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition"
                            >
                                <span className="font-bold text-white pr-8">{q}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Updated CTA Section
const CTASection = () => (
    <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="bg-[#111] rounded-3xl p-12 md:p-20 border border-white/5 text-center relative overflow-hidden mb-12">
                {/* Inner Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
                    Ready to Start <span className="text-yellow-500">Earning</span>?
                </h2>
                <p className="text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
                    Join thousands of investors who are already earning passive income with REX Token. Get started in minutes with our easy-to-use platform.
                </p>
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                    <button className="px-8 py-3.5 rounded-xl border border-purple-500/50 text-white font-bold hover:bg-purple-500/10 transition flex items-center gap-2">
                        <FileText className="w-4 h-4" /> View Contract
                    </button>
                    <button className="px-8 py-3.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition shadow-lg shadow-yellow-500/20 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Scan Audit
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {[
                    { label: '1% Monthly', sub: 'ROI (Up to 1L)', desc: 'For investments ≤ ₹1,00,000', icon: TrendingUp },
                    { label: '1.5% Monthly', sub: 'ROI (Above 1L)', desc: 'For investments > ₹1,00,000', icon: Zap },
                    { label: '+6%', sub: 'Holding Bonus', desc: 'After 12 months staking', icon: CheckCircle },
                    { label: '100 REX', sub: 'Minimum Stake', desc: 'Minimum investment required', icon: ShieldCheck }
                ].map((item, i) => (
                    <div key={i} className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:border-purple-500/30 transition group">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-yellow-500 mb-1">{item.label}</h3>
                        <p className="text-white font-bold text-sm mb-1">{item.sub}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                ))}
            </div>


        </div>
    </section>
);

// Footer Section
const Footer = () => (
    <footer className="border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 relative z-10 mb-16">
            <div className="col-span-1">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-orange-100 rounded-lg flex items-center justify-center text-black font-bold text-xl">R</div>
                    <span className="text-xl font-bold text-white tracking-wider">REX <span className="text-yellow-400">TOKEN</span></span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Revolutionizing passive income generation through blockchain technology. Join the future of decentralized finance today.
                </p>
                <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition cursor-pointer border border-white/5">
                            <div className="w-4 h-4 bg-gray-500/50 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" /> Features
                </h4>
                <ul className="space-y-4 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-yellow-400 transition block">Staking Platform</a></li>
                    <li><a href="#" className="hover:text-yellow-400 transition block">Referral System</a></li>
                    <li><a href="#" className="hover:text-yellow-400 transition block">Token Analytics</a></li>
                    <li><a href="#" className="hover:text-yellow-400 transition block">Security Audit</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" /> Resources
                </h4>
                <ul className="space-y-4 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-yellow-400 transition block">Whitepaper</a></li>
                    <li><a href="#" className="hover:text-yellow-400 transition block">Documentation</a></li>
                    <li><a href="#" className="hover:text-yellow-400 transition block">API Docs</a></li>
                    <li><a href="#" className="hover:text-yellow-400 transition block">Community</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" /> Subscribe
                </h4>
                <p className="text-gray-400 text-sm mb-4">Stay updated with the latest news and announcements from REX.</p>
                <div className="relative mb-6">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-[#111] border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-purple-500 transition"
                    />
                    <button className="absolute right-1 top-1 bg-gradient-to-r from-purple-500 to-yellow-500 text-black font-bold text-xs px-4 py-2 rounded-md hover:opacity-90 transition">
                        Join
                    </button>
                </div>
                <div className="space-y-2 text-sm text-gray-500 text-xs">
                    <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" /> support@rextoken.com
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3" /> Audited & Verified Contract
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-600">© 2024 REX Token Ecosystem. Building the next-gen DeFi.</p>

            <div className="flex gap-6 text-xs text-gray-500">
                <a href="#" className="hover:text-white transition">Privacy</a>
                <a href="#" className="hover:text-white transition">Terms</a>
                <a href="#" className="hover:text-white transition">Cookies</a>
                <a href="#" className="hover:text-white transition">Disclaimer</a>
            </div>

            <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-green-900/20 border border-green-500/20 text-green-500 text-[10px] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Network: BSC Mainnet
                </div>
            </div>
        </div>

        <div className="flex justify-center gap-4 mt-8 opacity-50">
            {['SSL SECURED', 'VERIFIED', 'SECURE', 'AUDITED'].map((badge, i) => (
                <div key={i} className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400 border border-white/5 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {badge}
                </div>
            ))}
        </div>
    </footer>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 relative">
            <div className="fixed inset-0 top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black -z-50 pointer-events-none" />
            <LandingNavbar />
            <Hero />
            <HowItWorks />
            <WhyChooseUs />
            <PlatformFeatures />
            <FAQ />
            <CTASection />
            <Footer />
        </div>
    );
};

export default LandingPage;
