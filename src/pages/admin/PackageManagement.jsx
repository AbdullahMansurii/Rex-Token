import { useState } from "react";
import { Package, Users, DollarSign, Activity, Plus, Edit2, Trash2, X, CheckCircle } from "lucide-react";
import clsx from "clsx";

const PackageManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [packages, setPackages] = useState([
        { id: 1, name: "Starter", min: "100", max: "999", roi: "0.5", duration: "30", status: "Active" },
        { id: 2, name: "Advanced", min: "1000", max: "4999", roi: "1.0", duration: "60", status: "Active" },
        { id: 3, name: "Pro", min: "5000", max: "9999", roi: "1.5", duration: "90", status: "Active" },
        { id: 4, name: "Elite", min: "10000", max: "50000", roi: "2.0", duration: "120", status: "Active" },
        { id: 5, name: "VIP", min: "50000", max: "100000", roi: "2.5", duration: "180", status: "Inactive" },
    ]);

    // Mock Stats
    const stats = [
        { label: "Active Packages", value: "6", icon: Package, color: "text-purple-500", bgColor: "bg-purple-500/10" },
        { label: "Total Subscribers", value: "8,140", icon: Users, color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { label: "Total Invested", value: "₹12.4M", icon: DollarSign, color: "text-green-500", bgColor: "bg-green-500/10" },
        { label: "Daily Payouts", value: "₹34.2K", icon: Activity, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
    ];

    return (
        <div className="space-y-6 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Package Management</h1>
                    <p className="text-gray-400 text-sm">Create and manage investment packages</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2.5 bg-primary hover:bg-primary-glow text-white font-bold rounded-xl shadow-glow transition flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Create New Package
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-zinc-900 border border-white/5 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                                <div className={clsx("p-2 rounded-lg", stat.bgColor, stat.color)}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-zinc-900 border border-white/5 rounded-xl p-6 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600 opacity-50 group-hover:opacity-100 transition"></div>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                                <span className={clsx(
                                    "text-xs font-bold px-2 py-0.5 rounded-full border",
                                    pkg.status === "Active" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                )}>
                                    {pkg.status}
                                </span>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-red-500/10 hover:bg-red-500 rounded-lg text-red-500 hover:text-white transition">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investment Range</span>
                                <span className="text-white font-mono">₹{pkg.min} - ₹{pkg.max}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Daily Return</span>
                                <span className="text-green-400 font-bold">{pkg.roi}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Duration</span>
                                <span className="text-white">{pkg.duration} Days</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Package Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Create New Package</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 font-medium uppercase">Package Name</label>
                                    <input type="text" placeholder="e.g., Elite" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 font-medium uppercase">Status</label>
                                    <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 font-medium uppercase">Min Investment</label>
                                    <input type="number" placeholder="1000" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 font-medium uppercase">Max Investment</label>
                                    <input type="number" placeholder="5000" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 font-medium uppercase">Daily Return %</label>
                                    <input type="number" step="0.1" placeholder="4.5" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 font-medium uppercase">Duration (days)</label>
                                    <input type="number" placeholder="365" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 font-medium uppercase">Description</label>
                                <textarea rows="3" placeholder="Enter package description..." className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none resize-none"></textarea>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/10 flex gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 py-3 bg-primary hover:bg-primary-glow text-white font-bold rounded-xl shadow-glow transition">
                                Create Package
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackageManagement;
