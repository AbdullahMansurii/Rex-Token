import { useState } from "react";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Repeat, Users, Hash, Calendar, XCircle, CheckCircle, Clock, DollarSign } from "lucide-react";
import clsx from "clsx";

const TransactionMonitor = () => {
    const [filter, setFilter] = useState("all");

    // Mock Stats
    const stats = [
        { label: "Total Transactions", value: "45,234", icon: Repeat, color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { label: "Total Volume", value: "₹12.4M", icon: DollarSign, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
        { label: "Pending", value: "23", icon: Clock, color: "text-orange-500", bgColor: "bg-orange-500/10" },
        { label: "Failed", value: "5", icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
        { label: "Today", value: "1,234", icon: Calendar, color: "text-purple-500", bgColor: "bg-purple-500/10" },
    ];

    // Mock Transaction Data
    const transactions = [
        {
            id: "#TXN-89012",
            type: "Deposit",
            user: "John Doe",
            amount: "₹5,000",
            crypto: "USDT",
            hash: "0x78a...92b1",
            status: "Completed",
            date: "2024-03-16 14:30"
        },
        {
            id: "#TXN-89011",
            type: "Withdrawal",
            user: "Alice Smith",
            amount: "₹2,500",
            crypto: "BTC",
            hash: "0x9c2...4e1f",
            status: "Pending",
            date: "2024-03-16 14:15"
        },
        {
            id: "#TXN-89010",
            type: "Investment",
            user: "Robert Fox",
            amount: "₹10,000",
            crypto: "Wallet",
            hash: "—",
            status: "Completed",
            date: "2024-03-16 13:45"
        },
        {
            id: "#TXN-89009",
            type: "Referral",
            user: "Emma Wilson",
            amount: "₹500",
            crypto: "System",
            hash: "—",
            status: "Completed",
            date: "2024-03-16 13:30"
        },
        {
            id: "#TXN-89008",
            type: "Deposit",
            user: "David Liu",
            amount: "₹15,000",
            crypto: "ETH",
            hash: "0x3a1...8f2d",
            status: "Failed",
            date: "2024-03-16 12:10"
        },
    ];

    const filteredTransactions = filter === "all"
        ? transactions
        : transactions.filter(txn => txn.type.toLowerCase() === filter.toLowerCase());

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Transaction Monitor</h1>
                <p className="text-gray-400 text-sm">Real-time monitoring of all platform transactions</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-zinc-900 border border-white/5 rounded-xl p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className={clsx("p-2 rounded-lg", stat.bgColor, stat.color)}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-gray-400 text-xs">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Filter Tabs */}
            <div className="border-b border-white/5 flex gap-1 overflow-x-auto pb-1 md:pb-0">
                {["All", "Deposit", "Withdrawal", "Investment", "Referral"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab.toLowerCase())}
                        className={clsx(
                            "px-6 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap",
                            filter === tab.toLowerCase()
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-400 hover:text-white"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Transaction Table */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black/20 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                            <tr>
                                <th className="p-4 font-medium">Transaction ID</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Crypto/Method</th>
                                <th className="p-4 font-medium">Hash</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Date/Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {filteredTransactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-white/5 transition bg-zinc-900/50">
                                    <td className="p-4 font-mono text-gray-300 text-xs">{txn.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {txn.type === 'Deposit' && <ArrowDownLeft className="w-4 h-4 text-green-500" />}
                                            {txn.type === 'Withdrawal' && <ArrowUpRight className="w-4 h-4 text-red-500" />}
                                            {txn.type === 'Investment' && <Repeat className="w-4 h-4 text-blue-500" />}
                                            {txn.type === 'Referral' && <Users className="w-4 h-4 text-purple-500" />}
                                            <span className="font-bold text-white">{txn.type}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-white">{txn.user}</td>
                                    <td className={clsx("p-4 font-bold", txn.type === 'Withdrawal' ? 'text-red-500' : 'text-green-500')}>
                                        {txn.type === 'Withdrawal' ? '-' : '+'}{txn.amount}
                                    </td>
                                    <td className="p-4 text-gray-400">{txn.crypto}</td>
                                    <td className="p-4 text-gray-500 font-mono text-xs">{txn.hash}</td>
                                    <td className="p-4">
                                        <span className={clsx(
                                            "px-2.5 py-1 rounded-full text-xs font-bold",
                                            txn.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                                txn.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                                        )}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right text-gray-500 text-xs">{txn.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionMonitor;
