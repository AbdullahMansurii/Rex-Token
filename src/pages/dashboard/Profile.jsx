import { User, Mail, Phone, Lock, Copy, Check, ShieldCheck, Wallet, Share2, Edit2, Save, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const Profile = () => {
    const { user, login } = useAuth(); // login function can act as 'updateUser' if it sets state
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || user.username || "",
                email: user.email || "",
                phone: user.phone || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                // Update local auth context
                login({ ...data, token: token }); // Keep existing token if not returned, though backend returns new one
                localStorage.setItem('user', JSON.stringify({ ...data, token: data.token || token }));
                setIsEditing(false);
            } else {
                alert(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update failed", error);
            alert("Network error");
        } finally {
            setIsLoading(false);
        }
    };

    // Utils
    const [copiedWallet, setCopiedWallet] = useState(false);
    const [copiedRef, setCopiedRef] = useState(false);
    const walletAddress = user?.wallet || "0x0000000000000000000000000000000000000000";
    const referralCode = user?.referralCode || "Unknown";

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'wallet') {
            setCopiedWallet(true);
            setTimeout(() => setCopiedWallet(false), 2000);
        } else {
            setCopiedRef(true);
            setTimeout(() => setCopiedRef(false), 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="bg-surface border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/20">
                    {formData.name.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="text-center md:text-left flex-1">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-1">
                        <h1 className="text-3xl font-bold text-white">{formData.name || "User"}</h1>
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                    </div>
                    <p className="text-gray-400">{formData.email}</p>
                </div>

                {/* Edit Toggle */}
                <button
                    onClick={() => {
                        if (isEditing) handleSave();
                        else setIsEditing(true);
                    }}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${isEditing ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {isLoading ? "Saving..." : isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
                </button>
                {isEditing && (
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            // Reset form
                            setFormData({
                                name: user.name || user.username || "",
                                email: user.email || "",
                                phone: user.phone || ""
                            });
                        }}
                        className="px-4 py-2 rounded-xl font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                    >
                        <X className="w-4 h-4" /> Cancel
                    </button>
                )}
            </div>

            {/* Personal Information */}
            <div className="bg-surface border border-white/5 rounded-2xl p-6">
                <h3 className="text-purple-400 font-bold mb-6 text-sm uppercase tracking-wider">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Full Name</label>
                        <div className={`rounded-xl p-4 text-white font-medium flex items-center gap-3 ${isEditing ? 'bg-black/40 border border-primary/50' : 'bg-black/20 border border-white/10'}`}>
                            <User className="w-4 h-4 text-gray-500 shrink-0" />
                            {isEditing ? (
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-transparent outline-none w-full"
                                />
                            ) : (
                                <span>{formData.name}</span>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Email Address</label>
                        <div className={`rounded-xl p-4 text-white font-medium flex items-center gap-3 ${isEditing ? 'bg-black/40 border border-primary/50' : 'bg-black/20 border border-white/10'}`}>
                            <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                            {isEditing ? (
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-transparent outline-none w-full"
                                />
                            ) : (
                                <span>{formData.email}</span>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Phone Number</label>
                        <div className={`rounded-xl p-4 text-white font-medium flex items-center gap-3 ${isEditing ? 'bg-black/40 border border-primary/50' : 'bg-black/20 border border-white/10'}`}>
                            <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                            {isEditing ? (
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 8900"
                                    className="bg-transparent outline-none w-full"
                                />
                            ) : (
                                <span>{formData.phone || "Not set"}</span>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-medium">Member Since</label>
                        <div className="bg-black/20 border border-white/10 rounded-xl p-4 text-white font-medium flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4 text-gray-500" />
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "2024-01-01"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Wallet Information */}
            <div className="bg-surface border border-white/5 rounded-2xl p-6">
                <h3 className="text-purple-400 font-bold mb-6 text-sm uppercase tracking-wider">Wallet Information</h3>
                <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-medium">Wallet Address (BEP-20)</label>
                    <div className="bg-black/20 border border-white/10 rounded-xl p-2 pl-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <Wallet className="w-4 h-4 text-gray-500 shrink-0" />
                            <span className="text-white font-mono text-sm truncate">{walletAddress}</span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(walletAddress, 'wallet')}
                            className={`px-4 py-2 rounded-lg font-bold text-xs transition flex items-center gap-2 ${copiedWallet ? 'bg-green-500 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
                        >
                            {copiedWallet ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedWallet ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Referral Code */}
            <div className="bg-surface border border-white/5 rounded-2xl p-6">
                <h3 className="text-purple-400 font-bold mb-6 text-sm uppercase tracking-wider">Referral Code</h3>
                <div className="space-y-2">
                    <div className="bg-black/20 border border-white/10 rounded-xl p-2 pl-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <Share2 className="w-4 h-4 text-gray-500" />
                            <span className="text-white font-bold tracking-widest">{referralCode}</span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(referralCode, 'ref')}
                            className={`px-4 py-2 rounded-lg font-bold text-xs transition flex items-center gap-2 ${copiedRef ? 'bg-green-500 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
                        >
                            {copiedRef ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedRef ? 'Copied' : 'Copy Code'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Change Password Button (Modal Trigger Placeholder) */}
            <div className="flex justify-end">
                <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default Profile;
