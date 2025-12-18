import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Check, Loader2, Package as PackageIcon } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";

const PackageManagement = () => {
    const { user } = useAuth();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [packages, setPackages] = useState([]);

    // New Package Form State
    const [newPackage, setNewPackage] = useState({
        name: "",
        minInvestment: "",
        maxInvestment: "",
        roi: "",
        duration: "",
        description: "",
        status: "Active"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Packages
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch('http://localhost:5000/api/packages/admin', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setPackages(data);
                }
            } catch (error) {
                console.error("Failed to fetch packages", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackages();
    }, [user]);

    const handleCreatePackage = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const response = await fetch('http://localhost:5000/api/packages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newPackage)
            });
            const data = await response.json();

            if (response.ok) {
                setPackages([...packages, data]);
                setIsCreateModalOpen(false);
                setNewPackage({
                    name: "", minInvestment: "", maxInvestment: "", roi: "", duration: "", description: "", status: "Active"
                });
            }
        } catch (error) {
            console.error("Failed to create package", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeletePackage = async (id) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;

        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const response = await fetch(`http://localhost:5000/api/packages/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setPackages(packages.filter(pkg => pkg._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete package", error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-white">Package Management</h1>
                    <p className="text-gray-400 text-sm">Create and manage investment packages</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-glow text-white px-4 py-2 rounded-lg transition shadow-glow"
                >
                    <Plus className="w-4 h-4" />
                    Create Package
                </button>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    <p className="text-gray-500">Loading packages...</p>
                ) : packages.length === 0 ? (
                    <p className="text-gray-500">No packages found.</p>
                ) : (
                    packages.map((pkg) => (
                        <div key={pkg._id} className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden group hover:border-primary/50 transition relative">
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                                        <PackageIcon className="w-6 h-6" />
                                    </div>
                                    <span className={clsx("px-2 py-1 rounded text-xs font-bold border",
                                        pkg.status === 'Active' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                    )}>
                                        {pkg.status}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 h-10">{pkg.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5 border-b">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider">Min Invest</p>
                                        <p className="text-white font-mono font-bold">₹{pkg.minInvestment}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider">Max Invest</p>
                                        <p className="text-white font-mono font-bold">₹{pkg.maxInvestment}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider">Daily ROI</p>
                                        <p className="text-green-400 font-mono font-bold">{pkg.roi}%</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider">Duration</p>
                                        <p className="text-white font-mono font-bold">{pkg.duration} Days</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDeletePackage(pkg._id)}
                                        className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-500 hovering:bg-red-500 hover:text-white transition flex items-center justify-center gap-2 text-sm font-bold"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-zinc-900">
                            <h2 className="text-xl font-bold text-white">Create New Package</h2>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePackage} className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Package Name</label>
                                    <input
                                        required
                                        value={newPackage.name}
                                        onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Status</label>
                                    <select
                                        value={newPackage.status}
                                        onChange={(e) => setNewPackage({ ...newPackage, status: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Min Investment (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newPackage.minInvestment}
                                        onChange={(e) => setNewPackage({ ...newPackage, minInvestment: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Max Investment (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newPackage.maxInvestment}
                                        onChange={(e) => setNewPackage({ ...newPackage, maxInvestment: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Daily Return %</label>
                                    <input
                                        type="number" step="0.1"
                                        required
                                        value={newPackage.roi}
                                        onChange={(e) => setNewPackage({ ...newPackage, roi: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400">Duration (days)</label>
                                    <input
                                        type="number"
                                        required
                                        value={newPackage.duration}
                                        onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">Description</label>
                                <textarea
                                    rows="3"
                                    value={newPackage.description}
                                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-6 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-glow text-white font-bold shadow-glow transition flex items-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Package"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackageManagement;
