import { useState, useEffect } from "react";
import { BarChart3, Download, FileText, TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const ReportsAnalytics = () => {
    const { user } = useAuth();
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

        if (user) fetchTransactions();
    }, [user]);

    // Calculate Real Stats
    const totalDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'completed').reduce((acc, t) => acc + t.amount, 0);
    const totalWithdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'completed').reduce((acc, t) => acc + t.amount, 0);
    const totalRevenue = totalDeposits; // Simplistic revenue model
    const netProfit = totalDeposits - totalWithdrawals;

    const stats = [
        { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, change: "Lifetime", isPositive: true },
        { label: "Total Deposits", value: `₹${totalDeposits.toLocaleString()}`, change: "Lifetime", isPositive: true },
        { label: "Total Withdrawals", value: `₹${totalWithdrawals.toLocaleString()}`, change: "Lifetime", isPositive: true }, // Withdrawals usually negative flow but showing total processed
        { label: "Net Profit", value: `₹${netProfit.toLocaleString()}`, change: "Lifetime", isPositive: netProfit >= 0 },
    ];

    // Calculate Trend Data (Last 7 Days)
    const getTrendData = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }

        return days.map(date => {
            const dayTxns = transactions.filter(t => t.createdAt.startsWith(date));
            const deposits = dayTxns.filter(t => t.type === 'deposit' && t.status === 'completed').reduce((acc, t) => acc + t.amount, 0);
            const withdrawals = dayTxns.filter(t => t.type === 'withdrawal' && t.status === 'completed').reduce((acc, t) => acc + t.amount, 0);
            return {
                date,
                deposits: `₹${deposits}`,
                withdrawals: `₹${withdrawals}`,
                net: `₹${deposits - withdrawals}`
            };
        });
    };

    const trendData = getTrendData();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
                    <p className="text-gray-400 text-sm">Detailed insights and performance metrics</p>
                </div>
                <div className="flex gap-3">
                    {/* Export buttons mock functionality for now */}
                    <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition flex items-center gap-2 border border-white/10 opacity-50 cursor-not-allowed">
                        <FileText className="w-4 h-4" /> Export PDF
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-glow text-white font-medium rounded-lg shadow-glow transition flex items-center gap-2 opacity-50 cursor-not-allowed">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-zinc-900 border border-white/5 rounded-xl p-6">
                        <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                        <div className={clsx("text-xs font-bold flex items-center gap-1", stat.isPositive ? "text-green-500" : "text-red-500")}>
                            {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Trend Table */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-lg font-bold text-white">Revenue Trend (Last 7 Days)</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black/20 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                            <tr>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Deposits</th>
                                <th className="p-4 font-medium">Withdrawals</th>
                                <th className="p-4 font-medium text-right">Net Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {isLoading ? (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-400">Loading data...</td></tr>
                            ) : trendData.map((row, i) => (
                                <tr key={i} className="hover:bg-white/5 transition bg-zinc-900/50">
                                    <td className="p-4 text-gray-300">{row.date}</td>
                                    <td className="p-4 text-green-500 font-bold">{row.deposits}</td>
                                    <td className="p-4 text-red-500 font-bold">{row.withdrawals}</td>
                                    <td className="p-4 text-right text-purple-400 font-bold">{row.net}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
