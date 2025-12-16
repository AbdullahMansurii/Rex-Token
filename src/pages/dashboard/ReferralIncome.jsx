import { DollarSign, Users, Clock, Calendar, CheckCircle, AlertCircle } from "lucide-react";

const ReferralIncome = () => {
    // Mock Data matching the reference image
    const stats = {
        totalIncome: "₹255.00",
        pendingIncome: "₹75.00",
        totalReferrals: 4
    };

    const transactions = [
        { id: 1, name: "Alice Johnson", date: "2024-01-01", amount: "₹50", status: "Paid" },
        { id: 2, name: "Bob Smith", date: "2024-01-05", amount: "₹100", status: "Paid" },
        { id: 3, name: "Carol Davis", date: "2024-01-10", amount: "₹30", status: "Paid" },
        { id: 4, name: "David Wilson", date: "2024-01-12", amount: "₹75", status: "Pending" },
    ];

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
                        <h2 className="text-4xl font-bold text-purple-500">{stats.totalIncome}</h2>
                    </div>
                </div>

                {/* Pending Income */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Clock className="w-24 h-24 text-yellow-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Pending Income</p>
                        <h2 className="text-4xl font-bold text-yellow-500">{stats.pendingIncome}</h2>
                    </div>
                </div>

                {/* Total Referrals */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Users className="w-24 h-24 text-green-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Referrals</p>
                        <h2 className="text-4xl font-bold text-green-500">{stats.totalReferrals}</h2>
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
                                    <th className="p-5 font-medium text-sm">Referral Name</th>
                                    <th className="p-5 font-medium text-sm">Date</th>
                                    <th className="p-5 font-medium text-sm">Amount</th>
                                    <th className="p-5 font-medium text-sm">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-white/5 transition group">
                                        <td className="p-5">
                                            <span className="text-white font-medium group-hover:text-purple-400 transition">{tx.name}</span>
                                        </td>
                                        <td className="p-5 text-gray-400 text-sm flex items-center gap-2">
                                            {tx.date}
                                        </td>
                                        <td className="p-5 text-white font-bold">
                                            {tx.amount}
                                        </td>
                                        <td className="p-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tx.status === 'Paid'
                                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                }`}>
                                                {tx.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralIncome;
