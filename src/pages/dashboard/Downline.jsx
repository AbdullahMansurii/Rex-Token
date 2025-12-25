import { User, Mail, Users, Calculator, TrendingUp, Award, ChevronRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";

const Downline = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalNetwork: 0,
        networkGrowth: "0%",
        overallBusiness: "₹0",
        totalCommission: "₹0"
    });
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDownline = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/users/downline`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();

                if (response.ok) {
                    setStats(data.stats);
                    setLevels(data.levels || []);
                }
            } catch (error) {
                console.error("Failed to fetch downline", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchDownline();
    }, [user]);

    // Helper to get selected level data safely
    const currentLevelData = levels.find(l => l.level === selectedLevel) || { members: [] };

    return (
        <div className="space-y-8">
            {/* Header Text */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Referral Network</h1>
                <p className="text-gray-400">Manage and track your referral network growth. View all levels of your downline team and their performance.</p>
            </div>

            {/* Profile Information Card */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Your Profile Information</h2>
                <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {/* User ID */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                                    <Award className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-gray-400">User ID</span>
                            </div>
                            <p className="text-lg font-bold text-white uppercase">{user?._id?.slice(-8) || "UNKNOWN"}</p>
                        </div>

                        {/* Full Name */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 col-span-1 lg:col-span-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-gray-400">Full Name</span>
                            </div>
                            <p className="text-lg font-bold text-white truncate">{user?.name || "Unknown User"}</p>
                        </div>

                        {/* Email */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 col-span-1 lg:col-span-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-gray-400">Email Address</span>
                            </div>
                            <p className="text-lg font-bold text-white truncate">{user?.email || "unknown@example.com"}</p>
                        </div>

                        {/* Total Network */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-pink-500/20 text-pink-400 rounded-lg">
                                    <Users className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-gray-400">Total Network</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-lg font-bold text-white">{stats.totalNetwork}</p>
                                <span className="text-xs text-green-400">{stats.networkGrowth}</span>
                            </div>
                        </div>

                        {/* Overall Business */}
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                                    <Calculator className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-gray-400">Overall Business</span>
                            </div>
                            <p className="text-lg font-bold text-white">{stats.overallBusiness}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Network Performance Table */}
            <div>
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-white">Your Network Performance</h2>
                        <p className="text-sm text-gray-400">Detailed breakdown of your network by levels. Click a row to view members.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Active Levels:</span>
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white text-sm">
                            {levels.filter(l => l.stats.count > 0).length}
                        </div>
                    </div>
                </div>

                <div className="bg-surface border border-white/5 rounded-t-2xl overflow-hidden overflow-x-auto">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-5 bg-black/20 border-b border-white/5 text-xs font-bold text-white uppercase tracking-wider min-w-[800px]">
                        <div className="col-span-3">Level</div>
                        <div className="col-span-2">Members</div>
                        <div className="col-span-3">Business Volume</div>
                        <div className="col-span-2">Your Commission</div>
                        <div className="col-span-2">Performance</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-white/5">
                        {isLoading ? (
                            <div className="p-8 text-center text-gray-500">Loading network data...</div>
                        ) : levels.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No network data available yet.</div>
                        ) : (
                            levels.map((lvl) => (
                                <div
                                    key={lvl.level}
                                    onClick={() => setSelectedLevel(lvl.level)}
                                    className={`grid grid-cols-12 gap-4 p-5 cursor-pointer transition items-center group min-w-[800px] border-l-4 ${selectedLevel === lvl.level ? "bg-white/5 border-primary" : "border-transparent hover:bg-white/5"}`}
                                >
                                    {/* Level */}
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white bg-gradient-to-br from-primary to-purple-600 shadow-glow`}>
                                                L{lvl.level}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Level {lvl.level}</p>
                                                <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                                                    {/* Activity bar relative to total network size or just arbitrary if network is small */}
                                                    <div className="h-full bg-primary" style={{ width: `${stats.totalNetwork > 0 ? (lvl.stats.count / stats.totalNetwork) * 100 : 0}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Members */}
                                    <div className="col-span-2">
                                        <p className="text-lg font-bold text-white">{lvl.stats.count} <span className="text-xs text-gray-500 font-normal">members</span></p>
                                    </div>

                                    {/* Business Volume */}
                                    <div className="col-span-3">
                                        <p className="text-lg font-bold text-white">₹{lvl.stats.volume.toLocaleString()}</p>
                                        <p className="text-xs text-green-400 flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> {lvl.stats.activeCount || 0} active
                                        </p>
                                    </div>

                                    {/* Commission */}
                                    <div className="col-span-2">
                                        <p className="text-lg font-bold text-teal-400">₹{lvl.stats.commission.toLocaleString()}</p>
                                        <p className="text-[10px] text-gray-500">{(lvl.stats.rate * 100)}% commission rate</p>
                                    </div>

                                    {/* Performance (Activity) */}
                                    <div className="col-span-2">
                                        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                                            <span>Activity</span>
                                            <span className="text-white font-bold">{stats.totalNetwork > 0 ? Math.round((lvl.stats.count / stats.totalNetwork) * 100) : 0}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-teal-400 rounded-full transition-all duration-1000" style={{ width: `${stats.totalNetwork > 0 ? (lvl.stats.count / stats.totalNetwork) * 100 : 0}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Summary Footer */}
                <div className="bg-[#1a1a2e] border border-t-0 border-white/5 rounded-b-2xl p-6 md:p-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 text-center md:divide-x divide-white/10">
                        <div className="pb-6 md:pb-0 border-b md:border-b-0 border-white/10">
                            <p className="text-gray-500 text-sm mb-1">Total Members</p>
                            <p className="text-3xl font-bold text-white">{stats.totalNetwork}</p>
                        </div>
                        <div className="py-6 md:py-0 border-b md:border-b-0 border-white/10">
                            <p className="text-gray-500 text-sm mb-1">Total Business Volume</p>
                            <p className="text-2xl md:text-3xl font-bold text-white">{stats.overallBusiness}</p>
                        </div>
                        <div className="pt-6 md:pt-0">
                            <p className="text-gray-500 text-sm mb-1">Total Commission</p>
                            <p className="text-2xl md:text-3xl font-bold text-teal-400">{stats.totalCommission}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Level Members List Table */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Level {selectedLevel} Members</h2>
                <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#1a1a2e] text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 border-b border-white/5">User</th>
                                    <th className="p-4 border-b border-white/5">Joined Date</th>
                                    <th className="p-4 border-b border-white/5">Team Count</th>
                                    <th className="p-4 border-b border-white/5">Investment</th>
                                    <th className="p-4 border-b border-white/5">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {currentLevelData.members.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">
                                            No members in Level {selectedLevel}.
                                        </td>
                                    </tr>
                                ) : (
                                    currentLevelData.members.map((member) => (
                                        <tr key={member._id} className="hover:bg-white/5 transition">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                                                        {member.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold">{member.name}</p>
                                                        <p className="text-gray-500 text-xs">{member.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-400">
                                                {new Date(member.joinedDate).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-white font-bold">
                                                {member.teamCount}
                                            </td>
                                            <td className="p-4 text-teal-400 font-bold">
                                                ₹{member.totalInvestment ? member.totalInvestment.toLocaleString() : 0}
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase border border-green-500/20">
                                                    {member.status}
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

export default Downline;
