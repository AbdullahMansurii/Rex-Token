import { useState } from "react";
import { Upload, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Packages = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Mock Form Data
    const [formData, setFormData] = useState({
        amount: "",
        txId: "",
        userId: user?.id || ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API Key
        setTimeout(() => {
            setIsLoading(false);
            setSuccess(true);
            setFormData({ amount: "", txId: "", userId: user?.id || "" });

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

            {/* Form Card */}
            <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Top Border Gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600"></div>

                <h2 className="text-xl font-bold text-white mb-2">Package Purchase Request</h2>
                <p className="text-gray-400 text-sm mb-8">Fill the form below to purchase a package</p>

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
                                    { amount: "₹1,000", date: "2024-01-10", txId: "TXN00123457", status: "Pending", approved: "-", inv: "INV-002" },
                                    { amount: "₹1,000", date: "2024-01-05", txId: "TXN00123458", status: "Completed", approved: "2024-01-06", inv: "INV-003" },
                                    { amount: "₹5,000", date: "2024-01-01", txId: "TXN00123459", status: "Completed", approved: "2024-01-02", inv: "INV-004" },
                                    { amount: "₹300", date: "2023-12-28", txId: "TXN00123460", status: "Rejected", approved: "-", inv: "INV-005" },
                                ].map((item, index) => (
                                    <tr key={index} className="hover:bg-white/5 transition">
                                        <td className="p-4 font-bold text-primary">{item.amount}</td>
                                        <td className="p-4 text-gray-300">{item.date}</td>
                                        <td className="p-4 text-gray-400 font-mono text-xs">{item.txId}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                item.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                                }`}>
                                                {item.status === 'Completed' && '✓ '}
                                                {item.status === 'Pending' && '⟳ '}
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-300">{item.approved}</td>
                                        <td className="p-4">
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition border border-white/5">
                                                <span className="opacity-70">📄</span>
                                                {item.inv}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between p-4 border-t border-white/5 text-sm">
                        <span className="text-gray-500">Showing 5 purchases</span>
                        <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition disabled:opacity-50">
                                Previous
                            </button>
                            <button className="w-8 h-8 rounded-lg bg-primary text-white font-medium flex items-center justify-center">
                                1
                            </button>
                            <button className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Packages;
