import { useState, useEffect } from "react";
import { History, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const Transactions = () => {
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
                    setTransactions(data);
                }
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchTransactions();
    }, [user]);

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
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Date/Time</th>
                                <th className="p-4 font-medium">Method</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr><td colSpan="6" className="p-4 text-center text-gray-500">Loading transactions...</td></tr>
                            ) : transactions.length === 0 ? (
                                <tr><td colSpan="6" className="p-4 text-center text-gray-500">No transactions found.</td></tr>
                            ) : (
                                transactions.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-white/5 transition">
                                        <td className="p-4">
                                            <span className="flex items-center gap-2 text-white font-medium">
                                                {tx.type === 'Withdrawal' ? (
                                                    <ArrowUpRight className="w-4 h-4 text-red-400" />
                                                ) : (
                                                    <ArrowDownLeft className="w-4 h-4 text-green-400" />
                                                )}
                                                {tx.type} ({tx.description})
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400">{new Date(tx.createdAt).toLocaleString()}</td>
                                        <td className="p-4 text-gray-300">{tx.method}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                                                tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                                                    'bg-red-500/10 text-red-400'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className={`p-4 text-right font-bold ${tx.type === 'Withdrawal' ? 'text-red-400' : 'text-green-400'}`}>
                                            {tx.type === 'Withdrawal' ? '-' : '+'}₹{tx.amount}
                                        </td>
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

export default Transactions;
