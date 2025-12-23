import { useState, useEffect } from "react";
import { DollarSign, Users, Clock, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const ReferralIncome = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/transactions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setTransactions(data.filter(tx => tx.type === 'referral'));
                }
            } catch (error) {
                console.error("Failed to fetch referral transactions", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchTransactions();
    }, [user]);

    // Calculate Stats
    const totalIncome = transactions
        .filter(t => t.status === 'completed')
        .reduce((acc, t) => acc + t.amount, 0);

    const pendingIncome = transactions
        .filter(t => t.status === 'pending')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalReferrals = transactions.length; // Approximate, distinct users logic would be better but this is simplified

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Referral Income</h1>
                <p className="text-gray-400">Track your referral earnings and transaction history.</p>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Referral Income */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <DollarSign className="w-24 h-24 text-purple-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Referral Income</p>
                        <h2 className="text-4xl font-bold text-purple-500">₹{totalIncome.toLocaleString()}</h2>
                    </div>
                </div>

                {/* Pending Income */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Clock className="w-24 h-24 text-yellow-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Pending Income</p>
                        <h2 className="text-4xl font-bold text-yellow-500">₹{pendingIncome.toLocaleString()}</h2>
                    </div>
                </div>

                {/* Total Transactions Count */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Users className="w-24 h-24 text-green-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Transactions</p>
                        <h2 className="text-4xl font-bold text-green-500">{totalReferrals}</h2>
                    </div>
                </div>
            </div>

            {/* Transaction History Section */}
            <div>
                <h2 className="text-xl font-bold text-purple-400 mb-6">Referral Transaction History</h2>

                <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#0f0f13] text-gray-400 border-b border-white/5">
                                <tr>
                                    <th className="p-5 font-medium text-sm">Description</th>
                                    <th className="p-5 font-medium text-sm">Date</th>
                                    <th className="p-5 font-medium text-sm">Amount</th>
                                    <th className="p-5 font-medium text-sm">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    <tr><td colSpan="4" className="p-8 text-center text-gray-400">Loading data...</td></tr>
                                ) : transactions.length === 0 ? (
                                    <tr><td colSpan="4" className="p-8 text-center text-gray-400">No referral transactions found.</td></tr>
                                ) : (
                                    transactions.map((tx) => (
                                        <tr key={tx._id} className="hover:bg-white/5 transition group">
                                            <td className="p-5">
                                                <span className="text-white font-medium group-hover:text-purple-400 transition">{tx.description || "Referral Bonus"}</span>
                                            </td>
                                            <td className="p-5 text-gray-400 text-sm flex items-center gap-2">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-5 text-white font-bold">
                                                ₹{tx.amount}
                                            </td>
                                            <td className="p-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${['completed', 'paid'].includes(tx.status.toLowerCase())
                                                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                    }`}>
                                                    {['completed', 'paid'].includes(tx.status.toLowerCase()) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                    {tx.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralIncome;
