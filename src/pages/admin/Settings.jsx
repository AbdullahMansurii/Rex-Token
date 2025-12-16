import { useState } from "react";
import { Save, AlertTriangle, Power, CreditCard, Lock } from "lucide-react";

const Settings = () => {
    // Mock Settings State
    const [settings, setSettings] = useState({
        siteName: "REX Token",
        maintenanceMode: false,
        withdrawalsEnabled: true,
        withdrawalFee: 5,
        minWithdrawal: 100,
        kycRequired: true
    });

    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value
        });
        setIsSaved(false);
    };

    const handleSave = () => {
        // Here we would save to backend
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000); // Hide success message after 3s
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">System Settings</h1>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {isSaved ? "Saved!" : "Save Changes"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                            <Power className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">General</h2>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Site Name</label>
                        <input
                            type="text"
                            name="siteName"
                            value={settings.siteName}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
                        <div>
                            <p className="text-white font-medium">Maintenance Mode</p>
                            <p className="text-gray-500 text-xs">Disable the site for visitors</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
                        <div>
                            <p className="text-white font-medium">Enable Withdrawals</p>
                            <p className="text-gray-500 text-xs">Allow users to request withdrawals</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="withdrawalsEnabled" checked={settings.withdrawalsEnabled} onChange={handleChange} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>
                </div>

                {/* Finance Settings */}
                <div className="p-6 bg-zinc-900 border border-white/5 rounded-xl space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Finance</h2>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Withdrawal Fee (%)</label>
                        <input
                            type="number"
                            name="withdrawalFee"
                            value={settings.withdrawalFee}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Minimum Withdrawal (REX)</label>
                        <input
                            type="number"
                            name="minWithdrawal"
                            value={settings.minWithdrawal}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-red-500 outline-none"
                        />
                    </div>
                </div>

                {/* Security Settings */}
                <div className="md:col-span-2 p-6 bg-zinc-900 border border-white/5 rounded-xl space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                            <Lock className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Advanced Security</h2>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
                        <div>
                            <p className="text-white font-medium">Require KYC for Withdrawals</p>
                            <p className="text-gray-500 text-xs">Users must have 'Verified' status to withdraw funds</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="kycRequired" checked={settings.kycRequired} onChange={handleChange} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                        </label>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-4">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                        <div>
                            <h4 className="text-red-500 font-bold">Emergency Stop</h4>
                            <p className="text-red-400/70 text-sm">This action will immediately pause all transactions and logins. Use with caution.</p>
                        </div>
                        <button className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition">
                            STOP SYSTEM
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
