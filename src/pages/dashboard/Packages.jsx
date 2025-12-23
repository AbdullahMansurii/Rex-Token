import { useState, useEffect } from "react";
import { Upload, Loader2, FileText, Download, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const Packages = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [investments, setInvestments] = useState([]);
    const [notification, setNotification] = useState({ type: null, message: null });

    const [formData, setFormData] = useState({
        amount: "",
        transactionId: "",
        paymentSlip: null
    });

    // Fetch Investment History
    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/investments/my`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setInvestments(data);
                }
            } catch (error) {
                console.error("Failed to fetch investments", error);
            }
        };

        fetchInvestments();
    }, []);

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification({ type: null, message: null }), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setNotification({ type: null, message: null });

        try {
            const data = new FormData();
            data.append('amount', formData.amount);
            data.append('transactionId', formData.transactionId);
            data.append('sponsorId', user?.sponsorId || ""); // Assuming sponsorId is in user object
            if (formData.paymentSlip) {
                data.append('paymentSlip', formData.paymentSlip);
            }

            const response = await fetch(`${API_BASE_URL}/api/investments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: data
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Investment failed');
            }

            showNotification('success', "Investment request submitted successfully!");

            // Reset form
            setFormData({ amount: "", transactionId: "", paymentSlip: null });

            // Refresh history
            // In a real app, we might just add the new item to state or refetch
            // For now, let's refetch
            const historyRes = await fetch(`${API_BASE_URL}/api/investments/my`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (historyRes.ok) {
                setInvestments(await historyRes.json());
            }

        } catch (error) {
            showNotification('error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Investment Plans</h1>
                <p className="text-gray-400">Submit your investment request</p>
            </div>

            {/* Investment Request Form */}
            <div className="bg-[#110c1d] border border-white/5 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-1">Investment Request</h2>
                <p className="text-gray-400 text-sm mb-8">Fill the form below to make an investment</p>

                {notification.message && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-pulse border ${notification.type === 'success'
                        ? 'bg-green-500/10 border-green-500/20 text-green-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                        {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span>{notification.message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Amount */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Investment Amount (₹)</label>
                        <input
                            type="number"
                            placeholder="Enter investment amount (Min: ₹500)"
                            className="w-full bg-[#0b0b14] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                            required
                            min="500"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                        <p className="text-xs text-gray-500">Minimum investment amount: ₹500</p>
                    </div>

                    {/* Transaction ID */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Transaction ID</label>
                        <input
                            type="text"
                            placeholder="Enter your transaction ID"
                            className="w-full bg-[#0b0b14] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                            required
                            value={formData.transactionId}
                            onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                        />
                    </div>

                    {/* Payment Slip */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Payment Slip</label>
                        <div className="relative group cursor-pointer bg-[#0b0b14] border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && file.size > 2 * 1024 * 1024) {
                                        showNotification('error', "File size must be less than 2MB");
                                        e.target.value = null;
                                        return;
                                    }
                                    setFormData({ ...formData, paymentSlip: file });
                                }}
                            />
                            <div className="flex items-center justify-between text-gray-400">
                                <span className={formData.paymentSlip ? "text-white" : ""}>
                                    {formData.paymentSlip ? formData.paymentSlip.name : "Choose file"}
                                </span>
                                <span className="text-gray-600">{formData.paymentSlip ? "Change" : "No file chosen"}</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">Upload your payment receipt/screenshot</p>
                    </div>

                    {/* Sponsor ID */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white">Sponsor ID</label>
                        <input
                            type="text"
                            placeholder="Loading sponsor ID..."
                            className="w-full bg-[#0b0b14] border border-white/10 rounded-xl p-4 text-gray-400 cursor-not-allowed outline-none"
                            readOnly
                            value={user?.sponsorId || ""}
                        />
                        <p className="text-xs text-gray-500">Your sponsor ID is automatically fetched from your profile</p>
                    </div>

                    {/* Buttons */}
                    <div className="grid md:grid-cols-2 gap-4 pt-4">
                        <button type="button" className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold rounded-xl transition shadow-lg">
                            Connect Wallet
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-90 text-white font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Investment Request"}
                        </button>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2">
                        Note: Your investment request will be processed within 24 hours after verification
                    </p>
                </form>
            </div>

            {/* Investment History */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Investment History</h2>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-lg">
                        Export CSV
                    </button>
                </div>

                <div className="bg-[#110c1d] border border-white/5 rounded-2xl overflow-hidden min-h-[300px]">
                    {investments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[300px] text-center p-8">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Investment History</h3>
                            <p className="text-gray-400 text-sm mb-6">Your investment history will appear here once you make your first investment</p>
                            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition">
                                Explore Investments
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#1a1429] border-b border-white/5 text-gray-300 text-sm font-bold uppercase tracking-wider">
                                        <th className="p-5">Amount</th>
                                        <th className="p-5">Purchase Date</th>
                                        <th className="p-5">Transaction ID</th>
                                        <th className="p-5">Status</th>
                                        <th className="p-5">Approved Date</th>
                                        <th className="p-5">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {investments.map((inv) => (
                                        <tr key={inv._id} className="hover:bg-white/5 transition">
                                            <td className="p-5 font-bold text-white">₹{inv.amount}</td>
                                            <td className="p-5 text-gray-400">{new Date(inv.createdAt).toLocaleDateString()}</td>
                                            <td className="p-5 text-gray-400 font-mono">{inv.transactionId}</td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${inv.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                    inv.status === 'completed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-5 text-gray-400">{inv.approvedDate ? new Date(inv.approvedDate).toLocaleDateString() : '-'}</td>
                                            <td className="p-5">
                                                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Packages;
