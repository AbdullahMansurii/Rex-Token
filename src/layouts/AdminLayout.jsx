import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Settings, LogOut, Menu, ShieldCheck, DollarSign, Package, CreditCard, BarChart3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import clsx from "clsx";
import Logo from "../components/Logo";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { label: "User Management", path: "/admin/users", icon: Users },
        { label: "KYC Approvals", path: "/admin/kyc-approvals", icon: ShieldCheck },
        { label: "Withdrawal Requests", path: "/admin/withdrawals", icon: DollarSign },
        { label: "Package Management", path: "/admin/packages", icon: Package },
        { label: "Transaction Monitor", path: "/admin/transactions", icon: CreditCard },
        { label: "Reports & Analytics", path: "/admin/reports", icon: BarChart3 },
        { label: "Tokens & Wallets", path: "/admin/tokens", icon: DollarSign },
        { label: "System Settings", path: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-black text-text flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={clsx(
                "fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-white/10 z-50 transition-transform duration-300 transform lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center shadow-glow">
                        <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <h1 className="text-lg font-bold text-white tracking-wider">REX <span className="text-primary">ADMIN</span></h1>
                </div>
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive ? "bg-red-500/10 text-red-500" : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
                <div className="absolute bottom-4 left-4 right-4">
                    <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-2 border border-white/10 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </aside>

            <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
                <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-zinc-900 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-bold text-primary hidden md:block">REX Token Admin</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-medium text-green-500">System Online</span>
                        </div>

                        <div className="w-px h-6 bg-white/10 hidden md:block" />

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-white">Admin User</p>
                                <p className="text-xs text-gray-500">admin@rextoken.com</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-glow">
                                A
                            </div>
                        </div>
                    </div>
                </header>
                <main className="p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
