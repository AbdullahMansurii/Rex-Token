import { Network, Filter, Users, Layers, DollarSign, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

const LevelIncome = () => {
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Mock Data (Expanded to 10 Levels)
    const stats = {
        totalIncome: "₹393.45",
        totalMembers: "68",
        activeLevels: "10"
    };

    const breakdown = [
        { level: 1, members: 5, investment: "₹2,500", comm: "5%", income: "₹125.00" },
        { level: 2, members: 12, investment: "₹6,800", comm: "3%", income: "₹204.00" },
        { level: 3, members: 8, investment: "₹4,200", comm: "1%", income: "₹42.00" },
        { level: 4, members: 3, investment: "₹1,500", comm: "0.5%", income: "₹7.50" },
        { level: 5, members: 7, investment: "₹3,500", comm: "0.3%", income: "₹10.50" },
        { level: 6, members: 2, investment: "₹1,000", comm: "0.2%", income: "₹2.00" },
        { level: 7, members: 4, investment: "₹2,200", comm: "0.1%", income: "₹2.20" },
        { level: 8, members: 1, investment: "₹500", comm: "0.05%", income: "₹0.25" },
        { level: 9, members: 3, investment: "₹1,200", comm: "0.05%", income: "₹0.60" },
        { level: 10, members: 5, investment: "₹2,000", comm: "0.05%", income: "₹1.00" },
    ];

    // Filter Logic
    const filteredData = selectedLevel === "all"
        ? breakdown
        : breakdown.filter(item => item.level === parseInt(selectedLevel));

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
                        <h2 className="text-4xl font-bold text-purple-500">{stats.totalIncome}</h2>
                    </div>
                </div>

                {/* Total Network Members */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Users className="w-24 h-24 text-blue-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Total Network Members</p>
                        <h2 className="text-4xl font-bold text-blue-500">{stats.totalMembers}</h2>
                    </div>
                </div>

                {/* Active Levels */}
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                        <Layers className="w-24 h-24 text-green-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-1">Active Levels</p>
                        <h2 className="text-4xl font-bold text-green-500">{stats.activeLevels}</h2>
                    </div>
                </div>
            </div>

            {/* Breakdown Table */}
            <div>
                <h2 className="text-xl font-bold text-purple-400 mb-6">Level Income Breakdown</h2>
                <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden min-h-[500px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#0f0f13] text-gray-400 border-b border-white/5">
                                <tr>
                                    <th className="p-5 font-medium text-sm">Level</th>
                                    <th className="p-5 font-medium text-sm">Members</th>
                                    <th className="p-5 font-medium text-sm">Total Investment</th>
                                    <th className="p-5 font-medium text-sm">Commission %</th>
                                    <th className="p-5 font-medium text-sm">Income</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredData.length > 0 ? (
                                    filteredData.map((row) => (
                                        <tr key={row.level} className="hover:bg-white/5 transition group animate-fadeIn">
                                            <td className="p-5">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs group-hover:bg-primary group-hover:text-white transition shadow-[0_0_10px_rgba(124,58,237,0.1)] group-hover:shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                                                    {row.level}
                                                </div>
                                            </td>
                                            <td className="p-5 text-white font-medium">{row.members}</td>
                                            <td className="p-5 text-gray-300">{row.investment}</td>
                                            <td className="p-5 text-gray-400">{row.comm}</td>
                                            <td className="p-5 text-purple-400 font-bold">{row.income}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-10 text-center text-gray-500">
                                            No data found for this level.
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
