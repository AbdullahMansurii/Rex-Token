import { Menu, Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();

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
                    <span className="hover:text-primary cursor-pointer transition">Overview</span>
                    <span>/</span>
                    <span className="text-white">Dashboard</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Search - Hidden on small mobile */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/5 focus-within:border-primary/50 transition w-64">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-600"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(176,38,255,0.8)]" />
                    </button>

                    <div className="h-8 w-px bg-white/10 mx-1" />

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
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
