import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => {
    return (
        <div className="bg-surface border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 shadow-glow-sm hover:shadow-glow">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500 group-hover:bg-${color}-500/20 transition`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className={`flex items-center gap-1 font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {change}
                </span>
                <span className="text-gray-500">vs last week</span>
            </div>
        </div>
    );
};

export default StatCard;
