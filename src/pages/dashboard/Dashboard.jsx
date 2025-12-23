import React, { useState, useEffect } from "react";
import {
    Wallet,
    Copy,
    Zap,
    TrendingUp,
    Activity,
    Award,
    Layers,
    Cpu,
    User,
    Users,
    Loader2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

const DashboardHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    const userName = stats?.user?.name || user?.username || "User";

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[500px]">
                <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* 1. Welcome Section & Wallet Card */}
            <div className="bg-[#1a0b2e] rounded-3xl p-8 relative overflow-hidden border border-purple-500/20">
                {/* Background Glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/40 to-transparent pointer-events-none" />

                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="space-y-4 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Welcome back, <span className="text-purple-400">{userName}!</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Track your earnings, manage your tokens, and grow your network all in one place.
                        </p>
                        <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition transform hover:-translate-y-1">
                            Connect Wallet
                        </button>
                    </div>

                    {/* Wallet Balance Card */}
                    <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 w-full lg:w-[400px] shadow-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-white font-bold text-lg">Wallet Balance</h3>
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Wallet className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-xs text-gray-500 mb-1">Available Balance</p>
                            <h2 className="text-4xl font-bold text-purple-400">₹{stats?.user?.walletBalance?.toFixed(2) || "0.00"}</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg hover:opacity-90 transition">
                                Connect Wallet
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(stats?.user?.walletBalance || "")}
                                className="py-2.5 border border-white/20 text-gray-400 text-sm font-bold rounded-lg hover:bg-white/5 transition flex items-center justify-center gap-2"
                            >
                                <Copy className="w-4 h-4" /> Copy Address
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Token Overview */}
            <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Token Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0f0f0f] border border-white/5 border-l-4 border-l-green-500 rounded-xl p-6 relative overflow-hidden group hover:bg-[#151515] transition">
                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm mb-1">REX Token</p>
                            <h2 className="text-3xl font-bold text-white">{stats?.token?.holding?.toLocaleString() || "0"}</h2>
                        </div>
                    </div>
                    <div className="bg-[#0f0f0f] border border-white/5 border-l-4 border-l-yellow-500 rounded-xl p-6 relative overflow-hidden group hover:bg-[#151515] transition">
                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm mb-1">REX Rate</p>
                            <h2 className="text-3xl font-bold text-white">₹{stats?.token?.rate || "2.5"}</h2>
                        </div>
                    </div>
                    <div className="bg-[#0f0f0f] border border-white/5 border-l-4 border-l-purple-500 rounded-xl p-6 relative overflow-hidden group hover:bg-[#151515] transition">
                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm mb-1">Current Phase</p>
                            <h2 className="text-3xl font-bold text-white">{stats?.token?.phase || "Phase 3"}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Grid: Income Breakdown & Mining Center */}
            <div className="grid lg:grid-cols-2 gap-8">

                {/* Income Breakdown */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-purple-400">Income Breakdown</h3>
                        <button
                            onClick={() => navigate('/dashboard/transactions')}
                            className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition border border-white/10"
                        >
                            Earnings Analytics
                        </button>
                    </div>
                    <div className="bg-[#111] border border-white/5 rounded-3xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'ROI', val: `₹${stats?.income?.roi?.toFixed(2) || "0.00"}`, color: 'border-l-purple-500' },
                                { label: 'Yearly Bonus', val: `₹${stats?.income?.yearly?.toFixed(2) || "0.00"}`, color: 'border-l-cyan-500' },
                                { label: 'Sponsor Income', val: `₹${stats?.income?.sponsor?.toFixed(2) || "0.00"}`, color: 'border-l-yellow-500' },
                                { label: 'Total Income', val: `₹${stats?.income?.total?.toFixed(2) || "0.00"}`, color: 'border-l-pink-500' }
                            ].map((item, i) => (
                                <div key={i} className={`bg-[#0a0a0a] p-4 rounded-xl border border-white/5 border-l-4 ${item.color}`}>
                                    <p className="text-gray-400 text-sm mb-1">{item.label}</p>
                                    <h3 className="text-2xl font-bold text-white">{item.val}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mining Center */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-purple-400">Mining Center</h3>
                        <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition shadow-lg">
                            Claim ROI
                        </button>
                    </div>
                    <div className="bg-[#111] border border-white/5 rounded-3xl p-6 h-[calc(100%-2.5rem)]">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white">Status: <span className={stats?.mining?.status === 'Active' ? "text-green-500" : "text-gray-500"}>{stats?.mining?.status || "Inactive"}</span></span>
                            </div>
                            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">{stats?.mining?.uptime || "0%"} Uptime</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-8">{stats?.mining?.status === 'Active' ? "Your mining operations are running smoothly" : "Start investing to activate mining"}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-400 text-xs mb-1">Monthly Percentage</p>
                                <h3 className="text-xl font-bold text-white">{stats?.mining?.monthlyPercentage || "0%"}</h3>
                            </div>
                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-400 text-xs mb-1">Total Invested</p>
                                <h3 className="text-xl font-bold text-purple-400">₹{stats?.mining?.totalInvested?.toFixed(2) || "0.00"}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Bottom Grid: Current Phase & Referral Program */}
            <div className="grid lg:grid-cols-2 gap-8">

                {/* Current Phase */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-purple-400">Current Phase</h3>
                    <div className="bg-[#13131f] border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-[250px]">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-2">{stats?.token?.phase || "Phase 3"}</h3>
                            <p className="text-gray-400">Current Token Sale Phase</p>
                        </div>

                        <div className="flex justify-between items-end">
                            <span className="text-gray-400">Phase Rate:</span>
                            <span className="text-4xl font-bold text-purple-500">{stats?.token?.rate || "4.8"}</span>
                        </div>
                    </div>
                </div>

                {/* Referral Program */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-purple-400">Referral Program</h3>
                    <div className="bg-[#131118] border border-white/5 rounded-3xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-500 text-xs mb-1">Your Referral ID</p>
                                <h3 className="text-lg font-bold text-white">{stats?.user?.referralCode || "N/A"}</h3>
                            </div>
                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-500 text-xs mb-1">Your Sponsor</p>
                                <h3 className="text-lg font-bold text-white">{stats?.user?.sponsor || "System"}</h3>
                            </div>
                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-500 text-xs mb-1">Total Direct Team</p>
                                <h3 className="text-xl font-bold text-purple-500">{stats?.team?.directs || 0}</h3>
                            </div>
                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-500 text-xs mb-1">Level Income Earned</p>
                                <h3 className="text-xl font-bold text-green-500">₹{stats?.income?.level?.toFixed(2) || "0.00"}</h3>
                            </div>
                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-500 text-xs mb-1">Sponsor Income Earned</p>
                                <h3 className="text-xl font-bold text-blue-400">₹{stats?.income?.sponsor?.toFixed(2) || "0.00"}</h3>
                            </div>
                            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                                <p className="text-gray-500 text-xs mb-1">Total Earned Income</p>
                                <h3 className="text-xl font-bold text-red-500">₹{stats?.income?.total?.toFixed(2) || "0.00"}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
