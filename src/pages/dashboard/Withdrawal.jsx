import { useState } from "react";
import { Wallet, CreditCard, History, Building, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Withdrawal = () => {
    const { user } = useAuth();
    const [source, setSource] = useState('loyalty');
    const [method, setMethod] = useState('bank');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mock Data for Sources
    const sources = {
        loyalty: { name: "Loyalty Points", balance: 12500, symbol: "Pts", icon: "L", color: "bg-purple-600" },
        rex: { name: "REX Token", balance: 8500, symbol: "REX", icon: "R", color: "bg-teal-500" },
        shopping: { name: "Shopping Tokens", balance: 3200, symbol: "Tokens", icon: "S", color: "bg-pink-600" }
    };

    const handleMax = () => {
        setAmount(sources[source].balance);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setAmount('');
            // Show toast/success message here
        }, 1500);
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
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${stat.color.split('-')[1]}-500 to-transparent opacity-50`}></div>
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
                                <div className="grid grid-cols-3 gap-2">
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
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setMethod('bank')}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition ${method === 'bank' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20' : 'bg-black/20 border-white/10 text-gray-400'
                                            }`}
                                    >
                                        <Building className="w-4 h-4" /> Bank Transfer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMethod('crypto')}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition ${method === 'crypto' ? 'bg-yellow-600 border-yellow-500 text-white shadow-lg shadow-yellow-900/20' : 'bg-black/20 border-white/10 text-gray-400'
                                            }`}
                                    >
                                        <Wallet className="w-4 h-4" /> Crypto Wallet
                                    </button>
                                </div>
                            </div>

                            {/* Dynamic Fields */}
                            {method === 'bank' ? (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white">Bank Account Details</label>
                                    <input type="text" placeholder="Enter your bank account number" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-primary transition" />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white">Wallet Address (BEP-20)</label>
                                    <input type="text" placeholder="0x..." className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-primary transition" />
                                </div>
                            )}

                            <button className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-glow hover:shadow-primary/50 transition flex items-center justify-center gap-2">
                                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Submit Withdrawal Request"}
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
                                        <th className="p-4 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { s: 'loyalty', amt: '₹500', date: '2024-01-15', m: 'bank', st: 'Completed' },
                                        { s: 'rex', amt: '₹250', date: '2024-01-10', m: 'crypto', st: 'Completed' },
                                        { s: 'shopping', amt: '₹1000', date: '2024-01-08', m: 'bank', st: 'Pending' },
                                        { s: 'loyalty', amt: '₹750', date: '2024-01-05', m: 'crypto', st: 'Completed' },
                                        { s: 'rex', amt: '₹300', date: '2024-01-03', m: 'bank', st: 'Completed' },
                                    ].map((Tx, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition">
                                            <td className="p-4 flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg ${sources[Tx.s].color} flex items-center justify-center text-white font-bold text-xs`}>
                                                    {sources[Tx.s].icon}
                                                </div>
                                                <span className="text-white font-medium">{sources[Tx.s].name}</span>
                                            </td>
                                            <td className="p-4 text-white font-bold">{Tx.amt}</td>
                                            <td className="p-4 text-gray-400 text-xs">{Tx.date}</td>
                                            <td className="p-4">
                                                <span className="flex items-center gap-1.5 text-gray-300 text-xs">
                                                    {Tx.m === 'bank' ? <Building className="w-3 h-3" /> : <Wallet className="w-3 h-3" />}
                                                    {Tx.m === 'bank' ? 'Bank Transfer' : 'Crypto Wallet'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${Tx.st === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                                    }`}>
                                                    {Tx.st === 'Completed' ? '✓ Completed' : '⟳ Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
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
