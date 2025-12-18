import {
    Wallet,
    Copy,
    Zap,
    TrendingUp,
    Activity,
    Award,
    Layers,
    Cpu
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, children, className = "" }) => (
    <div className={`bg-surface border border-white/5 rounded-2xl p-6 shadow-glow-sm hover:border-primary/20 transition group ${className}`}>
        <h3 className="text-gray-400 font-medium mb-4 flex items-center gap-2">
            {title}
        </h3>
        {children}
    </div>
);

const DashboardHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const userName = user?.username || user?.name || "John Doe";

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Welcome back, {userName}!</h1>
                    <p className="text-gray-400">Track your earnings, manage your tokens, and grow your network all in one place.</p>
                </div>
                <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-glow shadow-glow flex items-center gap-2 transition transform hover:scale-105">
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Wallet Balance Card (Wide) */}
                <div className="lg:col-span-3 bg-gradient-to-r from-surface to-surface/50 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <p className="text-gray-400 font-medium mb-1 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-primary" /> Available Balance
                            </p>
                            <h2 className="text-5xl font-bold text-white tracking-tight mb-4">₹ 25,500.50</h2>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 transition">
                                    Connect Wallet
                                </button>
                                <button className="px-4 py-2 border border-white/10 text-gray-400 text-sm font-semibold rounded-lg hover:text-white hover:border-white/20 transition flex items-center gap-2">
                                    <Copy className="w-3 h-3" /> Copy Address
                                </button>
                            </div>
                        </div>
                        {/* Visual element or chart could go here, kept simple per reference text */}
                    </div>
                </div>

                {/* Token Overview */}
                <DashboardCard title="Token Overview">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                                    <Award className="w-5 h-5" />
                                </div>
                                <span className="text-gray-300 text-sm">Loyalty Points</span>
                            </div>
                            <span className="text-white font-bold">1,250</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <span className="text-gray-300 text-sm">REX Token</span>
                            </div>
                            <span className="text-white font-bold">850</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-center">
                                <p className="text-xs text-gray-500 mb-1">SGN Rate</p>
                                <p className="text-white font-bold">₹2.5</p>
                            </div>
                            <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-center">
                                <p className="text-xs text-gray-500 mb-1">Current Phase</p>
                                <p className="text-green-400 font-bold">Phase 3</p>
                            </div>
                        </div>
                    </div>
                </DashboardCard>

                {/* Income Breakdown */}
                <DashboardCard title="Income Breakdown">
                    <div className="space-y-4">
                        <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl hover:bg-green-500/10 transition">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-gray-400 text-sm">ROI Income</span>
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            </div>
                            <h4 className="text-2xl font-bold text-white">₹ 1,200.50</h4>
                        </div>

                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl hover:bg-blue-500/10 transition">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-gray-400 text-sm">Yearly Bonus</span>
                                <Zap className="w-4 h-4 text-blue-500" />
                            </div>
                            <h4 className="text-2xl font-bold text-white">₹ 800.00</h4>
                        </div>

                        <button
                            onClick={() => navigate('/dashboard/transactions')}
                            className="w-full py-2.5 text-sm font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/10 transition"
                        >
                            View Earnings Analytics
                        </button>
                    </div>
                </DashboardCard>

                {/* Mining Center */}
                <DashboardCard title="Mining Center">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-green-400 font-bold text-sm">Active & Running</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">Your mining operations are running smoothly with maximum efficiency.</p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-1">Uptime</p>
                                    <p className="text-white font-bold flex items-center gap-1">
                                        <Activity className="w-4 h-4 text-primary" /> 99.8%
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-1">Hashrate</p>
                                    <p className="text-white font-bold flex items-center gap-1">
                                        <Cpu className="w-4 h-4 text-primary" /> 145 TH/s
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-glow hover:opacity-90 transition">
                            Claim ROI
                        </button>
                    </div>
                </DashboardCard>

            </div>

            {/* Referral Program Section (From Image) */}
            <div>
                <h2 className="text-xl font-bold text-primary mb-4">Referral Program</h2>
                <div className="bg-surface/50 border border-white/5 rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {/* Row 1 */}
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <p className="text-gray-400 text-sm mb-1">Your Referral ID</p>
                            <h3 className="text-xl font-bold text-white">REF123456</h3>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <p className="text-gray-400 text-sm mb-1">Your Sponsor</p>
                            <h3 className="text-xl font-bold text-white">Alice Smith</h3>
                        </div>

                        {/* Row 2 */}
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <p className="text-gray-400 text-sm mb-1">Total Direct Team</p>
                            <h3 className="text-2xl font-bold text-purple-500">24</h3>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <p className="text-gray-400 text-sm mb-1">Level Income Earned</p>
                            <h3 className="text-2xl font-bold text-green-500">₹1200.50</h3>
                        </div>

                        {/* Row 3 */}
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <p className="text-gray-400 text-sm mb-1">Sponsor Income Earned</p>
                            <h3 className="text-2xl font-bold text-blue-400">₹650.75</h3>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <p className="text-gray-400 text-sm mb-1">Total Earned Income</p>
                            <h3 className="text-2xl font-bold text-red-500">₹1851.25</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
