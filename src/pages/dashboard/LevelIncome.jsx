import { Network, Filter, Users, Layers, DollarSign, ChevronDown, Check, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const LevelIncome = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/transactions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setTransactions(data.filter(tx => tx.type === 'level_income'));
                }
            } catch (error) {
                console.error("Failed to fetch level income", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchTransactions();
    }, [user]);

    // Calculate Stats
    const totalIncome = transactions.reduce((acc, t) => acc + t.amount, 0);
    // Unique members who triggered level income (mock proxy: count transactions)
    const totalMembers = transactions.length;
    const activeLevels = [...new Set(transactions.map(t => t.description?.match(/Level (\d+)/)?.[1] || "1"))].length;

    // Filter Logic
    const filteredData = selectedLevel === "all"
        ? transactions
        : transactions.filter(t => t.description?.includes(`Level ${selectedLevel}`));

    return (
        <div className="space-y-8" onClick={() => setIsDropdownOpen(false)}>
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Level Income</h1>
                    <p className="text-gray-400">View your income from network levels.</p>
                </div>

                {/* Custom Styling Dropdown */}
                <div className="relative z-50">
                    <label className="text-xs text-gray-400 mb-1 block">Select Level:</label>
                    <div className="relative min-w-[180px]">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDropdownOpen(!isDropdownOpen);
                            }}
                            className="w-full flex items-center justify-between bg-black/40 border border-purple-500/30 text-white px-4 py-3 rounded-xl hover:border-purple-500 transition-colors"
                        >
                            <span className="text-sm font-medium">
                                {selectedLevel === "all" ? "All Levels" : `Level ${selectedLevel}`}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full right-0 mt-2 w-full bg-[#1a1a24] border border-white/10 rounded-xl shadow-xl max-h-[300px] overflow-y-auto no-scrollbar z-50 backdrop-blur-xl">
                                <div
                                    onClick={() => setSelectedLevel("all")}
                                    className={`px-4 py-3 text-sm cursor-pointer hover:bg-white/5 flex items-center justify-between ${selectedLevel === "all" ? 'text-purple-400 font-bold bg-purple-500/10' : 'text-gray-300'}`}
                                >
                                    All Levels
                                    {selectedLevel === "all" && <Check className="w-3 h-3" />}
                                </div>
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedLevel(i + 1)}
                                        className={`px-4 py-3 text-sm cursor-pointer hover:bg-white/5 flex items-center justify-between ${parseInt(selectedLevel) === (i + 1) ? 'text-purple-400 font-bold bg-purple-500/10' : 'text-gray-300'}`}
                                    >
                                        Level {i + 1}
                                        {parseInt(selectedLevel) === (i + 1) && <Check className="w-3 h-3" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Level Income */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <DollarSign className="w-24 h-24 text-purple-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Level Income</p>
                        <h2 className="text-4xl font-bold text-purple-500">₹{totalIncome.toLocaleString()}</h2>
                    </div>
                </div>

                {/* Total Transactions */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Users className="w-24 h-24 text-blue-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Transactions</p>
                        <h2 className="text-4xl font-bold text-blue-500">{totalMembers}</h2>
                    </div>
                </div>

                {/* Active Levels */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Layers className="w-24 h-24 text-green-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Active Levels Earnings</p>
                        <h2 className="text-4xl font-bold text-green-500">{activeLevels}</h2>
                    </div>
                </div>
            </div>

            {/* Breakdown Table */}
            <div>
                <h2 className="text-xl font-bold text-purple-400 mb-6">Level Income History</h2>
                <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden min-h-[500px]">
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
                                ) : filteredData.length > 0 ? (
                                    filteredData.map((row) => (
                                        <tr key={row._id} className="hover:bg-white/5 transition group animate-fadeIn">
                                            <td className="p-5 text-white font-medium">{row.description || "Level Income"}</td>
                                            <td className="p-5 text-gray-300">{new Date(row.createdAt).toLocaleDateString()}</td>
                                            <td className="p-5 text-purple-400 font-bold">₹{row.amount}</td>
                                            <td className="p-5 text-gray-400">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${['completed', 'paid'].includes(row.status.toLowerCase())
                                                    ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                    }`}>
                                                    {['completed', 'paid'].includes(row.status.toLowerCase()) ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-10 text-center text-gray-500">
                                            No level income records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelIncome;
