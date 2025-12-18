import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu, Bell, Search, LogOut, TrendingUp, Zap, User } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Notification State
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);
    const notifications = [
        { id: 1, title: "Welcome to REX Token!", message: "Your account has been successfully verified.", time: "2 mins ago", read: false, icon: <Bell className="w-3 h-3" /> },
        { id: 2, title: "Investment Confirmed", message: "Your deposit of ₹25,500 has been received.", time: "1 hour ago", read: false, icon: <TrendingUp className="w-3 h-3" /> },
        { id: 3, title: "New Feature Alert", message: "Check out the new Mining Center dashboard.", time: "1 day ago", read: false, icon: <Zap className="w-3 h-3" /> },
        { id: 4, title: "Profile Update", message: "Your profile details were updated successfully.", time: "2 days ago", read: true, icon: <User className="w-3 h-3" /> },
    ];

    const searchOptions = [
        { title: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
        { title: "Packages", path: "/dashboard/packages", icon: "Package" },
        { title: "KYC Verification", path: "/dashboard/kyc", icon: "ShieldCheck" },
        { title: "Withdrawal", path: "/dashboard/withdrawal", icon: "Download" },
        { title: "Transactions", path: "/dashboard/transactions", icon: "History" },
        { title: "Downline", path: "/dashboard/downline", icon: "Users" },
        { title: "Referral Income", path: "/dashboard/referral-income", icon: "DollarSign" },
        { title: "Level Income", path: "/dashboard/level-income", icon: "TrendingUp" },
        { title: "Profile", path: "/dashboard/profile", icon: "User" },
        // Admin Routes
        ...(user?.role === 'admin' ? [
            { title: "Admin Dashboard", path: "/admin", icon: "LayoutDashboard" },
            { title: "User Management", path: "/admin/users", icon: "Users" },
            { title: "KYC Approvals", path: "/admin/kyc-approvals", icon: "ShieldCheck" },
            { title: "Withdrawal Requests", path: "/admin/withdrawals", icon: "FileText" },
            { title: "Transaction Monitor", path: "/admin/transactions", icon: "Activity" },
            { title: "Package Management", path: "/admin/packages", icon: "Box" },
            { title: "Reports & Analytics", path: "/admin/reports", icon: "BarChart" },
            { title: "Settings", path: "/admin/settings", icon: "Settings" },
        ] : [])
    ];

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const filtered = searchOptions.filter(option =>
            option.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setShowResults(true);
    }, [searchQuery, user]);

    const handleNavigate = (path) => {
        navigate(path);
        setSearchQuery("");
        setShowResults(false);
    };

    return (
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-surface/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                    <span className="hover:text-primary cursor-pointer transition" onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')}>Overview</span>
                    <span>/</span>
                    <span className="text-white">Dashboard</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Search - Hidden on small mobile */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/5 focus-within:border-primary/50 transition w-64 relative">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search pages..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => setTimeout(() => setShowResults(false), 200)} // Delay to allow click
                        onFocus={() => searchQuery && setShowResults(true)}
                    />

                    {/* Search Results Dropdown */}
                    {showResults && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                            {searchResults.map((result, index) => (
                                <button
                                    key={index}
                                    onMouseDown={(e) => {
                                        e.preventDefault(); // Prevent input blur
                                        handleNavigate(result.path);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-white/5 text-sm text-gray-300 hover:text-white transition flex items-center gap-2"
                                >
                                    <span>{result.title}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition"
                        >
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(176,38,255,0.8)]" />
                            )}
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div className="absolute top-full right-0 mt-2 w-80 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
                                    <h3 className="font-bold text-white text-sm">Notifications</h3>
                                    <button
                                        onClick={() => setUnreadCount(0)}
                                        className="text-xs text-primary hover:text-primary-glow"
                                    >
                                        Mark all as read
                                    </button>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map((note) => (
                                        <div key={note.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition group cursor-pointer">
                                            <div className="flex gap-3">
                                                <div className={`mt-1 p-1.5 rounded-full ${note.read ? 'bg-gray-800 text-gray-400' : 'bg-primary/20 text-primary'}`}>
                                                    {note.icon}
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${note.read ? 'text-gray-400' : 'text-white font-medium'}`}>
                                                        {note.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">{note.message}</p>
                                                    <p className="text-[10px] text-gray-600 mt-2">{note.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t border-white/5 bg-black/20">
                                    <button className="text-xs text-gray-400 hover:text-white transition">
                                        View All History
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-8 w-px bg-white/10 mx-1" />

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-white">{user?.username || user?.name || 'User'}</p>
                            <p className="text-xs text-primary">{user?.role || 'Member'}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 border border-white/10" />

                        <button
                            onClick={logout}
                            className="p-2 text-gray-400 hover:text-red-400 transition"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
