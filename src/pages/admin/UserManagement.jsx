import { useState } from "react";
import { Search, Eye, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [kycFilter, setKycFilter] = useState("all");

    // Mock User Data matching reference
    const [users] = useState([
        {
            id: 1,
            name: "Sahil Miyawala",
            email: "chhipasahil163@gmail.com",
            wallet: "0x0000000000000000000000000000000000000000",
            investment: "—",
            status: "active",
            kyc: "verification_needed",
            joined: "—",
            initial: "S",
            color: "bg-purple-500"
        },
        {
            id: 2,
            name: "John Doe",
            email: "rextoken@gmail.com",
            wallet: "0x0000000000000000000000000000000000000000",
            investment: "—",
            status: "active",
            kyc: "verification_needed",
            joined: "—",
            initial: "J",
            color: "bg-purple-500"
        },
        // Adding more mock data for display
        {
            id: 3,
            name: "Alice Smith",
            email: "alice@example.com",
            wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            investment: "₹5,000",
            status: "blocked",
            kyc: "verified",
            joined: "12 Oct 2024",
            initial: "A",
            color: "bg-blue-500"
        },
        {
            id: 4,
            name: "Robert Fox",
            email: "robert@test.com",
            wallet: "0x123d35Cc6634C0532925a3b844Bc454e4438f44e",
            investment: "₹12,500",
            status: "active",
            kyc: "verified",
            joined: "15 Oct 2024",
            initial: "R",
            color: "bg-green-500"
        },
        {
            id: 5,
            name: "Emma Wilson",
            email: "emma@demo.com",
            wallet: "0x987d35Cc6634C0532925a3b844Bc454e4438f44e",
            investment: "—",
            status: "pending",
            kyc: "rejected",
            joined: "20 Oct 2024",
            initial: "E",
            color: "bg-yellow-500"
        }
    ]);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.wallet.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filter === "all" || user.status === filter;
        const matchesKyc = kycFilter === "all" || user.kyc === kycFilter;
        return matchesSearch && matchesStatus && matchesKyc;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">User Management</h1>
                    <p className="text-gray-400 text-sm">Manage and monitor all platform users</p>
                </div>
                <button className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white font-bold rounded-xl shadow-glow transition flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add New User
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-zinc-900 border border-white/5 rounded-xl">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search users by name, email, or wallet..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-primary outline-none transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="blocked">Blocked</option>
                </select>
                <select
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary outline-none"
                    value={kycFilter}
                    onChange={(e) => setKycFilter(e.target.value)}
                >
                    <option value="all">KYC Status</option>
                    <option value="verified">Verified</option>
                    <option value="verification_needed">Verification Needed</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Data Table */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black/20 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                            <tr>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Wallet Address</th>
                                <th className="p-4 font-medium">Investment</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">KYC</th>
                                <th className="p-4 font-medium">Join Date</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition bg-zinc-900/50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center text-white font-bold", user.color)}>
                                                {user.initial}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold">{user.name}</p>
                                                <p className="text-gray-500 text-xs">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-purple-400 text-xs font-mono">{user.wallet.substring(0, 42)}...</p>
                                    </td>
                                    <td className="p-4 text-white font-medium">{user.investment}</td>
                                    <td className="p-4">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-xs font-bold",
                                            user.status === 'active' ? 'bg-green-500/10 text-green-500' :
                                                user.status === 'blocked' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                                        )}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-xs font-bold",
                                            user.kyc === 'verified' ? 'bg-green-500/10 text-green-500' :
                                                user.kyc === 'rejected' ? 'bg-red-500/10 text-red-500' : 'bg-red-900/40 text-red-400'
                                        )}>
                                            {user.kyc}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400">{user.joined}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"><Eye className="w-4 h-4" /></button>
                                            <button className="p-2 text-gray-400 hover:text-primary hover:bg-white/10 rounded-lg transition"><Edit2 className="w-4 h-4" /></button>
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/10 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-gray-500">Showing 1 to {filteredUsers.length} of 12,450 users</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-white/10 rounded-lg text-white hover:bg-white/5 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1.5 bg-primary text-white rounded-lg shadow-glow">1</button>
                        <button className="px-3 py-1.5 border border-white/10 rounded-lg text-white hover:bg-white/5">2</button>
                        <button className="px-3 py-1.5 border border-white/10 rounded-lg text-white hover:bg-white/5">3</button>
                        <button className="px-3 py-1.5 border border-white/10 rounded-lg text-white hover:bg-white/5">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
