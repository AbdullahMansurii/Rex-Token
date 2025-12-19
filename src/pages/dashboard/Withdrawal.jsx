import { useState, useEffect } from "react";
import { Wallet, CreditCard, History, Building, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const Withdrawal = () => {
    const { user } = useAuth();
    const [source, setSource] = useState('normal');
    const [method, setMethod] = useState('bank');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [withdrawals, setWithdrawals] = useState([]);
    const [bankDetails, setBankDetails] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    // KYC State
    const [kycBank, setKycBank] = useState(null);
    const [isEditingBank, setIsEditingBank] = useState(true); // Default to true (manual input) until KYC is found

    // Mock Data for Sources
    const sources = {
        normal: { name: "Normal Withdrawal", balance: 24500, symbol: "INR", icon: "N", color: "bg-emerald-600" },
        sos: { name: "SOS Withdrawal", balance: 5000, symbol: "INR", icon: "S", color: "bg-red-600" }
    };

    // Fetch Withdrawal History & KYC Data
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            const token = user.token || JSON.parse(localStorage.getItem('user'))?.token;

            try {
                // 1. Fetch Withdrawals
                const withdrawalsRes = await fetch(`${API_BASE_URL}/api/withdrawals`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (withdrawalsRes.ok) {
                    const data = await withdrawalsRes.json();
                    setWithdrawals(data);
                }

                // 2. Fetch KYC Data
                const kycRes = await fetch(`${API_BASE_URL}/api/kyc/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (kycRes.ok) {
                    const data = await kycRes.json();
                    if (data?.bankAccountNumber) {
                        setKycBank(data.bankAccountNumber);
                        setBankDetails(data.bankAccountNumber);
                        setIsEditingBank(false); // Switch to "Verified" mode
                    }
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, [user]);

    const handleMax = () => {
        setAmount(sources[source].balance);
    };

    const toggleBankEdit = () => {
        if (isEditingBank) {
            // Cancel edit -> Revert to KYC bank
            setBankDetails(kycBank);
            setIsEditingBank(false);
        } else {
            // Start edit -> Clear field for new entry
            setBankDetails('');
            setIsEditingBank(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const payload = {
                source: sources[source].name,
                amount: Number(amount),
                method: method === 'bank' ? 'Bank' : 'Crypto',
                bankDetails: method === 'bank' ? bankDetails : undefined,
                walletAddress: method !== 'bank' ? walletAddress : undefined
            };

            const response = await fetch(`${API_BASE_URL}/api/withdrawals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setWithdrawals([data, ...withdrawals]);
                setAmount('');
                setBankDetails('');
                setWalletAddress('');
                alert("Withdrawal request submitted successfully!");
            } else {
                alert(data.message || "Failed to submit request");
            }
        } catch (error) {
            console.error("Withdrawal error:", error);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Withdrawal Center</h1>
                <p className="text-gray-400">Welcome, <span className="text-primary font-bold">{user?.name || "User"}</span>! Manage your earnings and withdraw funds securely.</p>
            </div>

            {/* Top Stats Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Monthly Income", sub: "Reward Points", val: "12,500", unit: "Points", icon: CreditCard, color: "text-purple-400 border-purple-500/30" },
                    { label: "REX Token", sub: "Mining Tokens", val: "8,500", unit: "REX", icon: Wallet, color: "text-teal-400 border-teal-500/30" },
                    { label: "Annual Bonus", sub: "E-commerce Tokens", val: "3,200", unit: "Tokens", icon: Building, color: "text-pink-400 border-pink-500/30" },
                    { label: "Total Withdrawable", sub: "Available Balance", val: "₹24,200", unit: "INR", icon: CheckCircle, color: "text-blue-400 border-blue-500/30" },
                ].map((stat, i) => (
                    <div key={i} className="bg-surface border border-white/5 rounded-2xl p-4 relative overflow-hidden group hover:border-white/10 transition">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-white font-bold">{stat.label}</p>
                                <p className="text-xs text-gray-500">{stat.sub}</p>
                            </div>
                            <div className={`p-2 rounded-lg bg-white/5 border ${stat.color} ${stat.color.split(' ')[0]}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{stat.val}</span>
                            <span className="text-xs text-gray-500">{stat.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Request Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-surface border border-white/5 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-1">Initial Withdrawal Request</h2>
                        <p className="text-xs text-gray-400 mb-6">Request withdrawal from your available wallets</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Source Selector */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white">Select Source</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(sources).map(([key, data]) => (
                                        <div
                                            key={key}
                                            onClick={() => setSource(key)}
                                            className={`cursor-pointer rounded-xl p-3 border text-center transition ${source === key
                                                ? 'bg-primary/20 border-primary text-primary'
                                                : 'bg-black/20 border-white/5 text-gray-500 hover:bg-white/5'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-full ${data.color} text-white flex items-center justify-center font-bold text-xs mx-auto mb-2`}>{data.icon}</div>
                                            <p className="text-[10px] font-bold truncate">{data.name}</p>
                                            <p className="text-[10px] opacity-70">{data.balance} {data.symbol}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <label className="font-bold text-white">Withdrawal Amount (₹)</label>
                                    <span className="text-primary font-bold text-xs uppercase">MAX: {sources[source].balance}</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-8 pr-16 text-white outline-none focus:border-primary transition"
                                        placeholder="0.00"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleMax}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold px-2 py-1 rounded transition"
                                    >
                                        MAX
                                    </button>
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-500">
                                    <span>Minimum: ₹100</span>
                                    <span>Available: {sources[source].balance}</span>
                                </div>
                            </div>

                            {/* Method Selector */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white">Withdrawal Method</label>
                                <div className="grid grid-cols-1">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20 cursor-default"
                                    >
                                        <Building className="w-4 h-4" /> Bank Transfer
                                    </button>
                                </div>
                            </div>

                            {/* Bank Details Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white">Bank Account Details</label>

                                {kycBank && !isEditingBank ? (
                                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-500/20 text-green-500 rounded-full">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Verified KYC Account</p>
                                                <p className="text-green-400 text-xs font-mono">{kycBank}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={toggleBankEdit}
                                            className="text-gray-400 hover:text-white text-xs underline"
                                        >
                                            Change
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={bankDetails}
                                            onChange={(e) => setBankDetails(e.target.value)}
                                            placeholder="Enter your bank account number"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-primary transition"
                                            required
                                        />
                                        {kycBank && (
                                            <button
                                                type="button"
                                                onClick={toggleBankEdit}
                                                className="text-xs text-primary hover:underline flex items-center gap-1"
                                            >
                                                <CheckCircle className="w-3 h-3" /> Use my saved KYC account
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-glow hover:shadow-primary/50 transition flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Withdrawal Request"}
                            </button>

                            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3">
                                <span className="text-yellow-500">⚡</span>
                                <p className="text-[10px] text-yellow-200/80 leading-tight">
                                    Withdrawal requests are processed within 24-48 hours. A 5% processing fee applies.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column: History */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden min-h-[600px]">
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold text-white">Withdrawal History</h2>
                            <p className="text-xs text-gray-400">Track all your withdrawal requests</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-black/20 text-gray-400">
                                    <tr>
                                        <th className="p-4 font-medium">Source</th>
                                        <th className="p-4 font-medium">Amount</th>
                                        <th className="p-4 font-medium">Date</th>
                                        <th className="p-4 font-medium">Method</th>
                                        <th className="p-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {withdrawals.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-gray-500">No withdrawal history found.</td>
                                        </tr>
                                    ) : (
                                        withdrawals.map((tx, i) => (
                                            <tr key={tx._id || i} className="hover:bg-white/5 transition">
                                                <td className="p-4">
                                                    <span className="text-white font-medium">{tx.source}</span>
                                                </td>
                                                <td className="p-4 text-white font-bold">₹{tx.amount}</td>
                                                <td className="p-4 text-gray-400 text-xs">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                                <td className="p-4">
                                                    <span className="flex items-center gap-1.5 text-gray-300 text-xs">
                                                        {tx.method === 'Bank' ? <Building className="w-3 h-3" /> : <Wallet className="w-3 h-3" />}
                                                        {tx.method === 'Bank' ? 'Bank Transfer' : 'Crypto Wallet'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${tx.status === 'Completed' || tx.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                                                        tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-500'
                                                        }`}>
                                                        {tx.status}
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

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold text-lg">Total Withdrawn</h3>
                        <p className="text-xs text-gray-500">All Time</p>
                    </div>
                    <span className="text-3xl font-bold text-purple-400">₹2,800</span>
                </div>
                <div className="bg-surface border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold text-lg">Pending Withdrawals</h3>
                        <p className="text-xs text-gray-500">Awaiting Processing</p>
                    </div>
                    <span className="text-3xl font-bold text-teal-400">₹1,000</span>
                </div>
                <div className="bg-surface border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold text-lg">Withdrawal Fee</h3>
                        <p className="text-xs text-gray-500">Standard Charge</p>
                    </div>
                    <span className="text-3xl font-bold text-blue-400">5%</span>
                </div>
            </div>
        </div>
    );
};

export default Withdrawal;
