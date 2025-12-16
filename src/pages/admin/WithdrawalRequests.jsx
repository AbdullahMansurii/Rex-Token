import { useState } from "react";
import { DollarSign, CheckCircle, XCircle, Clock, Eye, AlertCircle, Copy } from "lucide-react";
import clsx from "clsx";

const WithdrawalRequests = () => {
    const [filter, setFilter] = useState("pending");

    // Mock Stats
    const stats = [
        { label: "Pending Requests", value: "67", icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
        { label: "Approved Today", value: "45", icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10" },
        { label: "Total Amount", value: "₹234.5K", icon: DollarSign, color: "text-primary", bgColor: "bg-primary/10" },
        { label: "Rejected Today", value: "3", icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
    ];

    // Mock Withdrawal Data
    const requests = [
        {
            id: "#W-7821",
            user: { name: "John Doe", email: "john@email.com" },
            amount: "₹5,200",
            method: "BTC",
            wallet: "bc1qxy...3a8f",
            date: "2024-03-15 14:30",
            status: "pending"
        },
        {
            id: "#W-7822",
            user: { name: "Alice Johnson", email: "alice@email.com" },
            amount: "₹8,400",
            method: "ETH",
            wallet: "0x9e2c...4b1a",
            date: "2024-03-15 12:15",
            status: "pending"
        },
        {
            id: "#W-7820",
            user: { name: "Bob Smith", email: "bob@email.com" },
            amount: "₹3,100",
            method: "USDT",
            wallet: "TX1f5a...7c4e",
            date: "2024-03-14 18:45",
            status: "approved"
        },
        {
            id: "#W-7819",
            user: { name: "Carol Davis", email: "carol@email.com" },
            amount: "₹12,750",
            method: "BTC",
            wallet: "bc1zc8e...2d9b",
            date: "2024-03-14 09:20",
            status: "approved"
        },
        {
            id: "#W-7818",
            user: { name: "David Wilson", email: "david@email.com" },
            amount: "₹2,900",
            method: "ETH",
            wallet: "0x3a7f...8e1c",
            date: "2024-03-13 16:30",
            status: "rejected"
        },
    ];

    const filteredRequests = filter === "all"
        ? requests
        : requests.filter(req => req.status === filter);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Toast notification would go here
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Withdrawal Requests</h1>
                <p className="text-gray-400 text-sm">Process and manage user withdrawal requests</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-zinc-900 border border-white/5 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                                <div className={clsx("p-2 rounded-lg", stat.bgColor, stat.color)}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {["pending", "approved", "rejected", "all"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={clsx(
                            "px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                            filter === tab
                                ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-glow"
                                : "bg-zinc-900 border border-white/5 text-gray-400 hover:text-white"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black/20 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                            <tr>
                                <th className="p-4 font-medium">ID</th>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Method</th>
                                <th className="p-4 font-medium">Wallet Address</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {filteredRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-white/5 transition bg-zinc-900/50">
                                    <td className="p-4 text-primary font-mono font-bold">{req.id}</td>
                                    <td className="p-4">
                                        <p className="text-white font-bold">{req.user.name}</p>
                                        <p className="text-gray-500 text-xs">{req.user.email}</p>
                                    </td>
                                    <td className="p-4 text-green-500 font-bold">{req.amount}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                                            {req.method}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => copyToClipboard(req.wallet)}>
                                            <span className="text-gray-400 text-xs font-mono group-hover:text-primary transition">{req.wallet}</span>
                                            <Copy className="w-3 h-3 text-gray-600 group-hover:text-primary opacity-0 group-hover:opacity-100 transition" />
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400 text-xs">{req.date}</td>
                                    <td className="p-4">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-xs font-bold capitalize",
                                            req.status === 'approved' && "bg-green-500/10 text-green-500",
                                            req.status === 'pending' && "bg-yellow-500/10 text-yellow-500",
                                            req.status === 'rejected' && "bg-red-500/10 text-red-500"
                                        )}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        {req.status === 'pending' ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition shadow-lg shadow-green-500/20">
                                                    Approve
                                                </button>
                                                <button className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition shadow-lg shadow-red-500/20">
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold rounded-lg transition border border-white/5">
                                                View Details
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredRequests.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white">No requests found</h3>
                        <p className="text-gray-500 text-sm mt-1">There are no {filter} withdrawal requests at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WithdrawalRequests;
