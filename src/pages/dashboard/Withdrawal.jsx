import { useState, useEffect } from "react";
import { Wallet, Building, CheckCircle, AlertTriangle, Lock, DollarSign, Clock, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
// Toast removed as custom notification is used

// Stats Card Component
const StatCard = ({ title, subtitle, value, icon: Icon, colorClass, borderClass, width = "full" }) => (
    <div className={`bg-[#0f0f0f] border ${borderClass} rounded-2xl p-6 flex flex-col justify-between h-32 relative group overflow-hidden`}>
        <div className="flex justify-between items-start z-10">
            <div>
                <h3 className="text-white font-bold text-md">{title}</h3>
                <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
            <div className={`p-2 rounded-lg bg-white/5 ${colorClass}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <div className="z-10">
            <h2 className="text-3xl font-bold text-white">₹{value}</h2>
        </div>
        {/* Simple progress bar visual at bottom */}
        <div className="absolute bottom-4 left-6 right-6 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className={`h-full w-1/3 ${colorClass.replace('text-', 'bg-')}`}></div>
        </div>
    </div>
);

const Withdrawal = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [withdrawHistory, setWithdrawHistory] = useState([]);
    const [source, setSource] = useState('total_income'); // 'total_income' or 'sos'
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('bank');
    const [accountNumber, setAccountNumber] = useState('');

    // Notification State
    const [notification, setNotification] = useState({ type: null, message: null });

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification({ type: null, message: null }), 5000);
    };


    // Fetch History
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/withdrawals`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setWithdrawHistory(data);
                }
            } catch (error) {
                console.error("Failed to fetch withdrawals", error);
            }
        };
        fetchHistory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setNotification({ type: null, message: null });

        try {
            const payload = {
                source: source === 'total_income' ? 'Total Income' : 'SOS Withdrawal',
                amount: Number(amount),
                method: 'Bank', // Only bank supported in UI for now
                bankDetails: { accountNumber }, // Sending as obj, controller converts to string hash
                walletAddress: ""
            };

            const response = await fetch(`${API_BASE_URL}/api/withdrawals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Submission failed');
            }

            showNotification('success', "Withdrawal request submitted successfully!");
            setAmount('');
            setAccountNumber('');

            // Refetch history
            const historyRes = await fetch(`${API_BASE_URL}/api/withdrawals`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (historyRes.ok) {
                setWithdrawHistory(await historyRes.json());
            }

        } catch (error) {
            showNotification('error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Withdrawal Center</h1>
                    <p className="text-gray-400">Welcome, <span className="text-purple-400 font-bold">{user?.name || "User"}</span>! Manage your earnings and withdraw funds securely.</p>
                </div>
                <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-500 text-sm font-bold">Available Balance</span>
                </div>
            </div>

            {/* Stats Grid 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Monthly ROI" subtitle="Return on Investment" value="0" icon={DollarSign} colorClass="text-purple-500" borderClass="border-purple-500/20" />
                <StatCard title="Level Income ROI" subtitle="Level Earnings" value="0" icon={CheckCircle} colorClass="text-cyan-500" borderClass="border-cyan-500/20" />
                <StatCard title="SOS Withdrawal" subtitle="Emergency Fund" value="0" icon={AlertTriangle} colorClass="text-red-500" borderClass="border-red-500/20" />
                <StatCard title="Total Withdrawal" subtitle="Lifetime Withdrawn" value="0" icon={CheckCircle} colorClass="text-blue-500" borderClass="border-blue-500/20" />
            </div>

            {/* Stats Grid 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Income" subtitle="Total Earnings" value="0" icon={DollarSign} colorClass="text-yellow-500" borderClass="border-yellow-500/20" />
                <StatCard title="Stake ROI" subtitle="Staking Returns" value="0" icon={Wallet} colorClass="text-green-500" borderClass="border-green-500/20" />
                <StatCard title="Stake Token" subtitle="Staked Balance" value="0" icon={Lock} colorClass="text-pink-500" borderClass="border-pink-500/20" />
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Withdrawal Form */}
                <div className="lg:col-span-1 bg-[#110c1d] border border-white/5 rounded-3xl p-6 h-fit">
                    <h2 className="text-xl font-bold text-white mb-1">Initial Withdrawal Request</h2>
                    <p className="text-gray-400 text-xs mb-6">Request withdrawal from your available wallets</p>

                    {notification.message && (
                        <div className={`mb-4 p-3 rounded-lg text-xs flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                            <span>{notification.message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Source Select */}
                        <div>
                            <label className="text-sm font-bold text-white mb-2 block">Select Source</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div
                                    className={`p-4 rounded-xl border cursor-pointer transition flex flex-col items-center gap-2 text-center ${source === 'total_income' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-[#0f0f0f] border-white/5 text-gray-500 hover:bg-[#151515]'}`}
                                    onClick={() => setSource('total_income')}
                                >
                                    <div className={`p-2 rounded-full ${source === 'total_income' ? 'bg-teal-500 text-white' : 'bg-gray-800'}`}>
                                        <Wallet className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">Total Income</p>
                                        <p className="text-[10px] opacity-70">₹0</p>
                                    </div>
                                </div>
                                <div
                                    className={`p-4 rounded-xl border cursor-pointer transition flex flex-col items-center gap-2 text-center ${source === 'sos' ? 'bg-red-500/10 border-red-500 text-white' : 'bg-[#0f0f0f] border-white/5 text-gray-500 hover:bg-[#151515]'}`}
                                    onClick={() => setSource('sos')}
                                >
                                    <div className={`p-2 rounded-full ${source === 'sos' ? 'bg-red-500 text-white' : 'bg-gray-800'}`}>
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">SOS Withdrawal</p>
                                        <p className="text-[10px] opacity-70">₹0</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amount */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-white">Withdrawal Amount (₹)</label>
                                <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded border border-purple-500/30">MAX: 0</span>
                            </div>
                            <input
                                type="number"
                                placeholder="₹ 0.00"
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-purple-500 transition"
                                required
                                min="100"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                <span>Minimum: ₹100</span>
                                <span>Available: 0</span>
                            </div>
                        </div>

                        {/* Method */}
                        <div>
                            <label className="text-sm font-bold text-white mb-2 block">Withdrawal Method</label>
                            <button type="button" className="w-full flex items-center justify-center gap-2 py-3 bg-[#151b2e] border border-blue-500/50 text-blue-400 font-bold text-sm rounded-xl">
                                <Building className="w-4 h-4" /> Bank Transfer
                            </button>
                        </div>

                        {/* Account Number */}
                        <div>
                            <label className="text-sm font-bold text-white mb-2 block">Account Number</label>
                            <input
                                type="text"
                                placeholder="Enter account number"
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-purple-500 transition"
                                required
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                            <p className="text-[10px] text-gray-500 mt-1">Please provide complete bank details for withdrawal to a different account.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Withdrawal Request"}
                        </button>

                        <div className="bg-[#1a1520] border border-orange-500/20 rounded-xl p-3 flex gap-3 items-start">
                            <span className="text-orange-500 text-lg">⚡</span>
                            <p className="text-[10px] text-gray-400 leading-relaxed">
                                Withdrawal requests are processed within 24-48 hours. <br /> A 1% processing fee applies.
                            </p>
                        </div>
                    </form>
                </div>

                {/* History Table */}
                <div className="lg:col-span-2">
                    <div className="bg-[#110c1d] border border-white/5 rounded-3xl overflow-hidden min-h-[600px]">
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold text-white">Withdrawal History</h2>
                            <p className="text-xs text-gray-400">Track all your withdrawal requests</p>
                        </div>

                        {withdrawHistory.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                                <div className="w-16 h-16 bg-[#1a1429] rounded-full flex items-center justify-center mb-4">
                                    <DollarSign className="w-8 h-8 text-purple-500" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">No Withdrawal History</h3>
                                <p className="text-gray-500 text-sm">Your withdrawal requests will appear here</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#0a0a0a] text-gray-400 text-xs uppercase font-bold">
                                        <tr>
                                            <th className="p-5">Source</th>
                                            <th className="p-5">Amount</th>
                                            <th className="p-5">Date</th>
                                            <th className="p-5">Method</th>
                                            <th className="p-5">Status</th>
                                            <th className="p-5">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm">
                                        {withdrawHistory.map((tx) => (
                                            <tr key={tx._id} className="hover:bg-white/5 transition">
                                                <td className="p-5 text-white font-medium">Source</td>
                                                {/* 'Source' isn't explicitly in Transaction schema, using placeholder or derived */}
                                                <td className="p-5 font-bold text-white">₹{tx.amount}</td>
                                                <td className="p-5 text-gray-400">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                                <td className="p-5 text-gray-400">Bank</td>
                                                <td className="p-5">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                                        tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                            'bg-red-500/10 text-red-500'
                                                        }`}>
                                                        {tx.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="p-5">
                                                    <button className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white transition">View</button>
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

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-bold text-lg">Total Withdrawn</h3>
                        <p className="text-xs text-gray-500">All Time</p>
                    </div>
                    <span className="text-3xl font-bold text-purple-500">₹0</span>
                </div>
                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-bold text-lg">Pending Withdrawals</h3>
                        <p className="text-xs text-gray-500">Awaiting Processing</p>
                    </div>
                    <span className="text-3xl font-bold text-teal-500">₹0</span>
                </div>
                <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-white font-bold text-lg">Withdrawal Fee</h3>
                        <p className="text-xs text-gray-500">Standard Charge</p>
                    </div>
                    <span className="text-3xl font-bold text-blue-500">5%</span>
                </div>
            </div>
        </div>
    );
};

export default Withdrawal;
