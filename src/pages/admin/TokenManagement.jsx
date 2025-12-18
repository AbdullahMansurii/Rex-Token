import { useState, useEffect } from "react";
import { TrendingUp, Wallet } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const TokenManagement = () => {
    const { user } = useAuth();

    // Token Price State
    const [tokenPrice, setTokenPrice] = useState("");
    const [priceLoading, setPriceLoading] = useState(false);

    // Wallet Recovery State
    const [recoveryEmail, setRecoveryEmail] = useState("");
    const [newWalletAddress, setNewWalletAddress] = useState("");
    const [recoveryLoading, setRecoveryLoading] = useState(false);

    // Fetch initial token price
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const res = await fetch('http://localhost:5000/api/admin/settings/price', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) setTokenPrice(data.price);
            } catch (err) {
                console.error("Failed to fetch price");
            }
        };
        fetchPrice();
    }, [user]);

    const handleUpdatePrice = async () => {
        setPriceLoading(true);
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const res = await fetch('http://localhost:5000/api/admin/settings/price', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ price: tokenPrice })
            });
            if (res.ok) {
                alert("Token Price Updated Successfully!");
            } else {
                alert("Failed to update price.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPriceLoading(false);
        }
    };

    const handleRecoverWallet = async () => {
        if (!recoveryEmail || !newWalletAddress) {
            alert("Please fill in all fields.");
            return;
        }
        if (!window.confirm(`Are you sure you want to change the wallet for ${recoveryEmail}? This is sensitive.`)) return;

        setRecoveryLoading(true);
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const res = await fetch('http://localhost:5000/api/admin/users/recover', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: recoveryEmail, newWallet: newWalletAddress })
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                setRecoveryEmail("");
                setNewWalletAddress("");
            } else {
                alert(data.message || "Recovery failed.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRecoveryLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Token & Wallet Management</h1>
            <p className="text-gray-400">Manage global token pricing and emergency wallet operations.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. Phase/Price Change */}
                <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Token Phase & Price</h2>
                            <p className="text-gray-400 text-xs">Manually update the current token price.</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Current Token Price (USD)</label>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                step="0.0001"
                                value={tokenPrice}
                                onChange={(e) => setTokenPrice(e.target.value)}
                                className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none"
                                placeholder="0.00"
                            />
                            <button
                                onClick={handleUpdatePrice}
                                disabled={priceLoading}
                                className="px-6 py-2 bg-primary hover:bg-primary-glow text-white font-bold rounded-lg transition disabled:opacity-50"
                            >
                                {priceLoading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Wallet Recovery */}
                <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Emergency Wallet Recovery</h2>
                            <p className="text-gray-400 text-xs">Recover assets for lost accounts.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">User Email</label>
                            <input
                                type="email"
                                value={recoveryEmail}
                                onChange={(e) => setRecoveryEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                                placeholder="user@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">New Wallet Address</label>
                            <input
                                type="text"
                                value={newWalletAddress}
                                onChange={(e) => setNewWalletAddress(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                                placeholder="0x..."
                            />
                        </div>
                        <button
                            onClick={handleRecoverWallet}
                            disabled={recoveryLoading}
                            className="w-full py-3 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white font-bold rounded-lg transition border border-red-600/50 disabled:opacity-50"
                        >
                            {recoveryLoading ? "Recovering..." : "Recover & Transfer Assets"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenManagement;
