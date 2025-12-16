import {
    Users,
    DollarSign,
    Zap,
    Package,
    CreditCard,
    RefreshCcw,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Clock,
    Settings,
    FileText
} from "lucide-react";
import clsx from "clsx";

const AdminDashboard = () => {
    // Stats Data
    const stats = [
        {
            label: "Total Users",
            value: "12,450",
            change: "12%",
            trend: "up",
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            label: "Total Revenue",
            value: "₹1.2M",
            change: "8%",
            trend: "up",
            icon: DollarSign,
            color: "text-green-500",
            bgColor: "bg-green-500/10"
        },
        {
            label: "Pending KYC",
            value: "145",
            change: "-5%",
            trend: "down",
            icon: Clock,
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10"
        },
        {
            label: "Active Packages",
            value: "8,234",
            change: "15%",
            trend: "up",
            icon: Package,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        {
            label: "Pending Withdrawals",
            value: "67",
            change: "3%",
            trend: "up",
            icon: CreditCard,
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
        {
            label: "Total Transactions",
            value: "45.2K",
            change: "22%",
            trend: "up",
            icon: RefreshCcw,
            color: "text-pink-500",
            bgColor: "bg-pink-500/10"
        },
    ];

    // Recent Activity Data
    const activities = [
        { type: "registration", user: "john.doe@email.com", time: "2 mins ago", status: "success", title: "New user registration" },
        { type: "kyc", user: "jane.smith@email.com", time: "5 mins ago", status: "pending", title: "KYC verification pending" },
        { type: "withdrawal", user: "mike.wilson@email.com", time: "12 mins ago", status: "pending", title: "Withdrawal request" },
        { type: "package", user: "sarah.jones@email.com", time: "18 mins ago", status: "success", title: "Package purchased" },
        { type: "transaction", user: "alex.brown@email.com", time: "25 mins ago", status: "success", title: "Transaction completed" },
    ];

    // Top Investors Data
    const investors = [
        { rank: 1, name: "Alice Johnson", tier: "Diamond", investment: "₹45,200", color: "bg-purple-500" },
        { rank: 2, name: "Bob Smith", tier: "Platinum", investment: "₹38,900", color: "bg-blue-500" },
        { rank: 3, name: "Carol Davis", tier: "Gold", investment: "₹32,500", color: "bg-yellow-500" },
        { rank: 4, name: "David Wilson", tier: "Gold", investment: "₹28,100", color: "bg-yellow-500" },
        { rank: 5, name: "Emma Brown", tier: "Silver", investment: "₹24,800", color: "bg-gray-400" },
    ];

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-gray-400 text-sm">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex bg-zinc-900 border border-white/5 rounded-lg p-1">
                    {["24h", "7d", "30d", "All"].map((period, i) => (
                        <button
                            key={period}
                            className={clsx(
                                "px-4 py-1.5 rounded-md text-sm font-medium transition",
                                i === 0 ? "bg-primary text-white shadow-glow" : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, i) => {
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
                                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                                    {stat.trend === "up" ? "+" : ""}{stat.change}
                                </span>
                                <span className="text-gray-500">from last period</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Middle Section: Activity & Investors */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-zinc-900 border border-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                        <button className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {activities.map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-black/40 rounded-xl hover:bg-black/60 transition border border-white/5 hover:border-white/10">
                                <div className={clsx(
                                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                    activity.type === "registration" && "bg-green-500/10 text-green-500",
                                    activity.type === "kyc" || activity.type === "withdrawal" && "bg-yellow-500/10 text-yellow-500",
                                    (activity.type === "package" || activity.type === "transaction") && "bg-blue-500/10 text-blue-500",
                                )}>
                                    {activity.type === "registration" && <CheckCircle className="w-5 h-5" />}
                                    {(activity.type === "kyc" || activity.type === "withdrawal") && <Clock className="w-5 h-5" />}
                                    {(activity.type === "package" || activity.type === "transaction") && <CheckCircle className="w-5 h-5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium text-sm truncate">{activity.title}</p>
                                    <p className="text-gray-500 text-xs truncate">{activity.user}</p>
                                </div>
                                <span className="text-gray-600 text-xs whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Investors */}
                <div className="bg-zinc-900 border border-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Top Investors</h3>
                        <button className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {investors.map((investor, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
                                <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm", investor.color)}>
                                    {investor.rank}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-medium text-sm">{investor.name}</p>
                                    <p className="text-gray-500 text-xs">{investor.tier}</p>
                                </div>
                                <span className="text-green-500 font-bold text-sm">{investor.investment}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Approve KYC", count: "145 pending", icon: CheckCircle, color: "bg-green-500" },
                        { label: "Process Withdrawals", count: "67 pending", icon: DollarSign, color: "bg-yellow-500" },
                        { label: "Review Tickets", count: "23 pending", icon: FileText, color: "bg-orange-500" },
                        { label: "System Settings", count: "— pending", icon: Settings, color: "bg-gray-400" },
                    ].map((action, i) => (
                        <button key={i} className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition group">
                            <div className={clsx("mb-3 p-3 rounded-full text-white shadow-lg group-hover:scale-110 transition", action.color)}>
                                <action.icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-white font-bold">{action.label}</h4>
                            <span className="text-gray-400 text-xs mt-1">{action.count}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
