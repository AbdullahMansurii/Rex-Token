import { useState, useEffect } from "react";
import { Upload, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const Packages = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Packages State
    const [availablePackages, setAvailablePackages] = useState([]);
    const [selectedPkg, setSelectedPkg] = useState(null); // Initialize as null for safety

    // Fetch Packages
    useEffect(() => {
        let isMounted = true;
        const fetchPackages = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/packages`);
                const data = await response.json();

                if (isMounted) {
                    if (response.ok && Array.isArray(data)) {
                        setAvailablePackages(data);
                    } else {
                        console.error("Invalid packages data received:", data);
                        setAvailablePackages([]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch packages", error);
                if (isMounted) setAvailablePackages([]);
            }
        };

        fetchPackages();
        return () => { isMounted = false; };
    }, []);

    // Mock Form Data
    const [formData, setFormData] = useState({
        amount: "",
        txId: "",
        userId: user?.id || user?._id || "" // Handle both id formats
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API Key
        setTimeout(() => {
            setIsLoading(false);
            setSuccess(true);
            setFormData({ amount: "", txId: "", userId: user?.id || user?._id || "" });

            // Hide success message after 3s
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Investment Packages</h1>
                <p className="text-gray-400 mb-6">Submit your package purchase request</p>

                <button className="bg-primary text-white font-bold py-2 px-6 rounded-lg shadow-glow hover:bg-primary-glow transition">
                    Buy Package
                </button>
            </div>

            {/* Available Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(!availablePackages || availablePackages.length === 0) ? (
                    <div className="col-span-full text-center p-8 bg-zinc-900 rounded-xl border border-white/5">
                        <p className="text-gray-400">No active investment packages available at the moment.</p>
                        <p className="text-xs text-gray-600 mt-2">Please check back later or contact support.</p>
                    </div>
                ) : (
                    availablePackages.map((pkg) => (
                        <div
                            key={pkg._id || Math.random()} // Fallback key
                            className={`bg-zinc-900 border rounded-xl overflow-hidden p-6 cursor-pointer transition relative ${selectedPkg?._id === pkg._id ? 'border-primary shadow-glow' : 'border-white/5 hover:border-white/20'}`}
                            onClick={() => {
                                setSelectedPkg(pkg);
                                setFormData(prev => ({ ...prev, amount: pkg.minInvestment || "" }));
                            }}
                        >
                            {selectedPkg?._id === pkg._id && (
                                <div className="absolute top-2 right-2 text-primary">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-white mb-2">{pkg.name || "Unnamed Package"}</h3>
                            <p className="text-gray-400 text-sm h-10 line-clamp-2 mb-4">{pkg.description || "No description"}</p>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Min Invest</span>
                                    <span className="text-white font-mono">₹{pkg.minInvestment || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Max Invest</span>
                                    <span className="text-white font-mono">₹{pkg.maxInvestment || "Unlimited"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Daily Return</span>
                                    <span className="text-green-400 font-bold">{pkg.roi || 0}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="text-white">{pkg.duration || 0} Days</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form Card */}
            <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Top Border Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>

                <h2 className="text-xl font-bold text-white mb-2">
                    {selectedPkg ? `Purchase ${selectedPkg.name}` : "Package Purchase Request"}
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                    {selectedPkg ? `Selected Package: ${selectedPkg.name} (Min: ₹${selectedPkg.minInvestment})` : "Select a package above and fill the form"}
                </p>

                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400 animate-pulse">
                        <CheckCircle className="w-5 h-5" />
                        <span>Request submitted successfully! It will be processed within 24 hours.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Package Amount */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Package Amount (₹)</label>
                        <input
                            type="number"
                            placeholder="Enter package amount"
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                            required
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>

                    {/* Transaction ID */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Transaction ID</label>
                        <input
                            type="text"
                            placeholder="Enter your transaction ID"
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                            required
                            value={formData.txId}
                            onChange={(e) => setFormData({ ...formData, txId: e.target.value })}
                        />
                    </div>

                    {/* Payment Slip */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Payment Slip</label>
                        <div className="relative group cursor-pointer">
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" />
                            <div className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-gray-500 flex items-center justify-between group-hover:border-primary/50 transition">
                                <span>Choose file No file chosen</span>
                                <Upload className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Upload your payment receipt/screenshot</p>
                    </div>

                    {/* User ID */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white">User ID</label>
                        <input
                            type="text"
                            placeholder="Enter your user ID"
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary-glow hover:to-purple-500 text-white font-bold rounded-xl shadow-glow transition transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Purchase Request"}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Note: Your request will be processed within 24 hours after verification
                    </p>
                </form>
            </div>

            {/* Purchase History Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Purchase History</h2>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                        Export CSV
                    </button>
                </div>

                <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/40 border-b border-white/5 text-gray-400 text-sm">
                                    <th className="p-4 font-semibold">Amount</th>
                                    <th className="p-4 font-semibold">Purchase Date</th>
                                    <th className="p-4 font-semibold">Transaction ID</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Approved Date</th>
                                    <th className="p-4 font-semibold">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {[
                                    { amount: "₹100", date: "2024-01-15", txId: "TXN00123456", status: "Completed", approved: "2024-01-15", inv: "INV-001" },
                                ].map((item, index) => (
                                    <tr key={index} className="hover:bg-white/5 transition">
                                        <td className="p-4 font-bold text-primary">{item.amount}</td>
                                        <td className="p-4 text-gray-300">{item.date}</td>
                                        <td className="p-4 text-gray-400 font-mono text-xs">{item.txId}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-300">{item.approved}</td>
                                        <td className="p-4">
                                            <button className="px-3 py-1.5 bg-white/5 rounded-lg text-xs">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Packages;
