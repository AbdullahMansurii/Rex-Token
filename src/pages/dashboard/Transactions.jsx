import { History, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const Transactions = () => {
    const transactions = [
        { id: "TX123456789", type: "Deposit", amount: "₹500.00", status: "Completed", date: "2024-03-15 14:30", method: "USDT (TRC20)" },
        { id: "TX987654321", type: "Withdrawal", amount: "₹50.00", status: "Pending", date: "2024-03-14 09:15", method: "USDT (TRC20)" },
        { id: "TX456123789", type: "ROI Income", amount: "₹12.50", status: "Completed", date: "2024-03-13 10:00", method: "Internal" },
        { id: "TX789123456", type: "Deposit", amount: "₹1000.00", status: "Completed", date: "2024-03-10 16:45", method: "BTC" },
        { id: "TX321654987", type: "Ref Bonus", amount: "₹50.00", status: "Completed", date: "2024-03-09 11:20", method: "Internal" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                    <History className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Transactions</h1>
                    <p className="text-gray-400">Your recent financial activity.</p>
                </div>
            </div>

            <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-gray-400">
                            <tr>
                                <th className="p-4 font-medium">Tx ID</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Date/Time</th>
                                <th className="p-4 font-medium">Method</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-white/5 transition">
                                    <td className="p-4 text-gray-500 font-mono text-xs">{tx.id}</td>
                                    <td className="p-4">
                                        <span className="flex items-center gap-2 text-white font-medium">
                                            {tx.type === 'Withdrawal' ? (
                                                <ArrowUpRight className="w-4 h-4 text-red-400" />
                                            ) : (
                                                <ArrowDownLeft className="w-4 h-4 text-green-400" />
                                            )}
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400">{tx.date}</td>
                                    <td className="p-4 text-gray-300">{tx.method}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                                            'bg-yellow-500/10 text-yellow-400'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-right font-bold ${tx.type === 'Withdrawal' ? 'text-red-400' : 'text-green-400'}`}>
                                        {tx.type === 'Withdrawal' ? '-' : '+'}{tx.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
