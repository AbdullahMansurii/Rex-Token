import { useState, useEffect } from "react";
import {
    Users,
    DollarSign,
    Package,
    CreditCard,
    RefreshCcw,
    CheckCircle,
    Clock
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        newUsersToday: 0,
        pendingKYC: 0,
        pendingWithdrawals: 0,
        totalWithdrawn: 0,
        totalTransactions: 0,
        activePackages: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchStats();
    }, [user]);

    // Derived Stats Data
    const statCards = [
        {
            label: "Total Users",
            value: stats.totalUsers,
            sub: `+${stats.newUsersToday} today`,
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            label: "Total Withdrawn",
            value: `₹${stats.totalWithdrawn.toLocaleString()}`,
            sub: "Lifetime",
            icon: DollarSign,
            color: "text-green-500",
            bgColor: "bg-green-500/10"
        },
        {
            label: "Pending KYC",
            value: stats.pendingKYC,
            sub: "Action Needed",
            icon: CheckCircle,
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10"
        },
        {
            label: "Active Packages",
            value: stats.activePackages,
            sub: "Investments",
            icon: Package,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        {
            label: "Pending Withdrawals",
            value: stats.pendingWithdrawals,
            sub: "Action Needed",
            icon: CreditCard,
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
        {
            label: "Total Transactions",
            value: stats.totalTransactions,
            sub: "All Time",
            icon: RefreshCcw,
            color: "text-pink-500",
            bgColor: "bg-pink-500/10"
        },
    ];

    if (isLoading) {
        return <div className="text-white text-center p-20">Loading Dashboard...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-gray-400 text-sm">Welcome back! Here's what's happening today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-zinc-900 border border-white/5 rounded-xl p-6 hover:border-primary/20 transition group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-white group-hover:text-primary transition">{stat.value}</h3>
                                </div>
                                <div className={clsx("p-3 rounded-xl", stat.bgColor, stat.color)}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500">{stat.sub}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* System Health / Quick Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                            <span className="text-gray-400">Database Connection</span>
                            <span className="text-green-500 font-bold text-sm">Connected</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                            <span className="text-gray-400">Server Time</span>
                            <span className="text-white font-mono text-sm">{new Date().toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                            <span className="text-gray-400">Version</span>
                            <span className="text-blue-400 font-bold text-sm">v1.0.0 (Beta)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                    <Clock className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold text-white">Real-Time Monitoring</h3>
                    <p className="text-gray-400 text-sm mt-2">
                        Admin dashboard data is updated in real-time based on database activity.
                        Use the sidebar to manage specific modules.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
