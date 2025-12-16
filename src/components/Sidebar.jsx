import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShieldCheck,
    ArrowDownToLine,
    Users,
    DollarSign,
    Network,
    History,
    UserCircle
} from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";

const SidebarItem = ({ icon: Icon, label, path, isActive }) => {
    return (
        <Link
            to={path}
            className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(176,38,255,0.2)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
        >
            <Icon className={clsx("w-5 h-5", isActive && "drop-shadow-[0_0_8px_rgba(176,38,255,0.6)]")} />
            <span className="font-medium text-sm tracking-wide">{label}</span>
            {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(176,38,255,1)]" />
            )}
        </Link>
    );
};

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const menuItems = [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Packages", path: "/dashboard/packages", icon: Package },
        { label: "KYC Verification", path: "/dashboard/kyc", icon: ShieldCheck },
        { label: "Withdrawal", path: "/dashboard/withdrawal", icon: ArrowDownToLine },
        { label: "Downline", path: "/dashboard/downline", icon: Users },
        { label: "Referral Income", path: "/dashboard/referral-income", icon: DollarSign },
        { label: "Level Income", path: "/dashboard/level-income", icon: Network },
        { label: "Transactions", path: "/dashboard/transactions", icon: History },
        { label: "Profile", path: "/dashboard/profile", icon: UserCircle },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside
                className={clsx(
                    "fixed top-0 left-0 h-full w-64 bg-surface/95 backdrop-blur-xl border-r border-white/10 z-50 transition-transform duration-300 transform lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 flex items-center gap-3 border-b border-white/5">
                    <Logo className="w-8 h-8 rounded-lg" />
                    <h1 className="text-xl font-bold text-white tracking-wider">REX <span className="text-primary">TOKEN</span></h1>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)] scrollbar-hide">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                            isActive={location.pathname === item.path}
                        />
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
