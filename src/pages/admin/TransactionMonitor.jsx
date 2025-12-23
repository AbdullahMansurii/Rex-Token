import { useState, useEffect } from "react";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Repeat, Users, Hash, Calendar, XCircle, CheckCircle, Clock, DollarSign } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const TransactionMonitor = () => {
    const { user } = useAuth();
    const [filter, setFilter] = useState("All");
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/transactions/admin`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setTransactions(data);
                }
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [user]);

    // Calculate Stats
    const stats = [
        { label: "Total Transactions", value: transactions.length, icon: Repeat, color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { label: "Total Volume", value: `₹${transactions.reduce((acc, t) => acc + (t.status.toLowerCase() === 'completed' || t.status.toLowerCase() === 'approved' ? t.amount : 0), 0).toLocaleString()}`, icon: DollarSign, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
        { label: "Pending", value: transactions.filter(t => t.status.toLowerCase() === 'pending').length, icon: Clock, color: "text-orange-500", bgColor: "bg-orange-500/10" },
        { label: "Failed/Rejected", value: transactions.filter(t => ['failed', 'rejected'].includes(t.status.toLowerCase())).length, icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
    ];

    const filteredTransactions = filter === "All"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        onClick={() => setFilter(tab)}
                        className={clsx(
                            "px-6 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap",
                            filter === tab
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
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Method</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Date/Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {isLoading ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-400">Loading transactions...</td></tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-400">No transactions found.</td></tr>
                            ) : (
                                filteredTransactions.map((txn) => (
                                    <tr key={txn._id} className="hover:bg-white/5 transition bg-zinc-900/50">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {txn.type.toLowerCase() === 'deposit' && <ArrowDownLeft className="w-4 h-4 text-green-500" />}
                                                {txn.type.toLowerCase() === 'withdrawal' && <ArrowUpRight className="w-4 h-4 text-red-500" />}
                                                {txn.type.toLowerCase() === 'investment' && <Repeat className="w-4 h-4 text-blue-500" />}
                                                {txn.type.toLowerCase() === 'referral' && <Users className="w-4 h-4 text-purple-500" />}
                                                <span className="font-bold text-white">{txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-white font-bold">{txn.user?.name || 'Unknown'}</p>
                                            <p className="text-gray-500 text-xs">{txn.user?.email || 'N/A'}</p>
                                        </td>
                                        <td className={clsx("p-4 font-bold", txn.type.toLowerCase() === 'withdrawal' ? 'text-red-500' : 'text-green-500')}>
                                            {txn.type.toLowerCase() === 'withdrawal' ? '-' : '+'}₹{txn.amount}
                                        </td>
                                        <td className="p-4 text-gray-400">{txn.method || txn.hash || '-'}</td>
                                        <td className="p-4">
                                            <span className={clsx(
                                                "px-2.5 py-1 rounded-full text-xs font-bold",
                                                ['completed', 'approved'].includes(txn.status.toLowerCase()) ? 'bg-green-500/10 text-green-500' :
                                                    txn.status.toLowerCase() === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                                            )}>
                                                {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right text-gray-500 text-xs">{new Date(txn.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionMonitor;
