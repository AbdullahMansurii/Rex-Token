import { useState } from "react";
import { BarChart3, Download, FileText, TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";
import clsx from "clsx";

const ReportsAnalytics = () => {
    const [reportType, setReportType] = useState("revenue");
    const [dateRange, setDateRange] = useState("7days");

    // Mock Stats
    const stats = [
        { label: "Total Revenue", value: "₹234.5K", change: "+12.5%", isPositive: true },
        { label: "Total Deposits", value: "₹405.9K", change: "+8.2%", isPositive: true },
        { label: "Total Withdrawals", value: "₹215.6K", change: "+5.7%", isPositive: true },
        { label: "Net Profit", value: "₹190.3K", change: "+15.3%", isPositive: true },
    ];

    // Mock Trend Data
    const trendData = [
        { date: "2024-03-09", deposits: "₹45,200", withdrawals: "₹23,400", net: "₹21,800" },
        { date: "2024-03-10", deposits: "₹52,100", withdrawals: "₹28,900", net: "₹23,200" },
        { date: "2024-03-11", deposits: "₹48,700", withdrawals: "₹25,600", net: "₹23,100" },
        { date: "2024-03-12", deposits: "₹61,500", withdrawals: "₹32,100", net: "₹29,400" },
        { date: "2024-03-13", deposits: "₹58,900", withdrawals: "₹31,200", net: "₹27,700" },
        { date: "2024-03-14", deposits: "₹67,200", withdrawals: "₹35,800", net: "₹31,400" },
        { date: "2024-03-15", deposits: "₹72,400", withdrawals: "₹38,900", net: "₹33,500" },
    ];

    // Mock Country Data
    const topCountries = [
        { rank: 1, name: "United States", users: "3,420", revenue: "₹456,200", color: "bg-blue-500" },
        { rank: 2, name: "United Kingdom", users: "2,890", revenue: "₹389,100", color: "bg-purple-500" },
        { rank: 3, name: "Germany", users: "2,340", revenue: "₹312,800", color: "bg-yellow-500" },
        { rank: 4, name: "Canada", users: "1,890", revenue: "₹245,600", color: "bg-green-500" },
        { rank: 5, name: "Australia", users: "1,560", revenue: "₹198,400", color: "bg-red-500" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
                    <p className="text-gray-400 text-sm">Detailed insights and performance metrics</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition flex items-center gap-2 border border-white/10">
                        <FileText className="w-4 h-4" /> Export PDF
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-glow text-white font-medium rounded-lg shadow-glow transition flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-gray-500 font-medium">Report Type</label>
                    <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none"
                    >
                        <option value="revenue">Revenue Report</option>
                        <option value="user_growth">User Growth</option>
                        <option value="traffic">Traffic Analysis</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-500 font-medium">Date Range</label>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none"
                    >
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="this_month">This Month</option>
                        <option value="last_month">Last Month</option>
                    </select>
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
                            {trendData.map((row, i) => (
                                <tr key={i} className="hover:bg-white/5 transition bg-zinc-900/50">
                                    <td className="p-4 text-gray-300">{row.date}</td>
                                    <td className="p-4 text-green-500 font-bold">{row.deposits}</td>
                                    <td className="p-4 text-red-500 font-bold">{row.withdrawals}</td>
                                    <td className="p-4 text-right text-purple-400 font-bold">{row.net}</td>
                                </tr>
                            ))}
                            {/* Total Row */}
                            <tr className="bg-white/5 font-bold">
                                <td className="p-4 text-white">Total</td>
                                <td className="p-4 text-green-500">₹406,000</td>
                                <td className="p-4 text-red-500">₹215,900</td>
                                <td className="p-4 text-right text-purple-400">₹190,100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top Countries */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-lg font-bold text-white">Top Countries by Revenue</h3>
                </div>
                <div className="p-6 space-y-4">
                    {topCountries.map((country) => (
                        <div key={country.rank} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-primary/30 transition">
                            <div className="flex items-center gap-4">
                                <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-glow", country.color)}>
                                    {country.rank}
                                </div>
                                <div>
                                    <p className="text-white font-bold">{country.name}</p>
                                    <p className="text-gray-500 text-xs">{country.users} users</p>
                                </div>
                            </div>
                            <p className="text-green-500 font-bold">{country.revenue}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
