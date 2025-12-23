import { useState, useEffect } from "react";
import { DollarSign, CheckCircle, XCircle, Clock, Eye, AlertCircle, Copy, Loader2 } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const WithdrawalRequests = () => {
    const { user } = useAuth();
    const [filter, setFilter] = useState("Pending");
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/withdrawals/admin`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setRequests(data);
                }
            } catch (error) {
                console.error("Failed to fetch requests", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, [user]);

    const handleStatusUpdate = async (id, action) => {
        const statusMap = {
            'Approve': 'completed',
            'Reject': 'rejected'
        };
        const newStatus = statusMap[action];

        if (!window.confirm(`Are you sure you want to ${action.toLowerCase()} this request?`)) return;

        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const response = await fetch(`${API_BASE_URL}/api/withdrawals/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                const updatedRequest = await response.json();
                setRequests(requests.map(req => req._id === id ? updatedRequest : req));
                alert(`Request ${action.toLowerCase()}d successfully`);
            } else {
                const error = await response.json();
                alert(`Failed to update: ${error.message}`);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const filteredRequests = filter === "All"
        ? requests
        : requests.filter(req => {
            const status = req.status.toLowerCase();
            if (filter === "Pending") return status === 'pending';
            if (filter === "Approved") return status === 'completed' || status === 'approved';
            if (filter === "Rejected") return status === 'rejected' || status === 'failed';
            return status === filter.toLowerCase();
        });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Toast notification would go here
    };

    // Calculate Stats
    const stats = [
        { label: "Pending Requests", value: requests.filter(r => r.status.toLowerCase() === 'pending').length, icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
        { label: "Approved Total", value: requests.filter(r => r.status.toLowerCase() === 'completed' || r.status.toLowerCase() === 'approved').length, icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10" },
        { label: "Total Amount", value: `₹${requests.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, icon: DollarSign, color: "text-primary", bgColor: "bg-primary/10" },
        { label: "Rejected Total", value: requests.filter(r => r.status.toLowerCase() === 'rejected' || r.status.toLowerCase() === 'failed').length, icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Withdrawal Requests</h1>
                <p className="text-gray-400 text-sm">Process and manage user withdrawal requests</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-zinc-900 border border-white/5 rounded-xl p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                                <div className={clsx("p-2 rounded-lg", stat.bgColor, stat.color)}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {["Pending", "Approved", "Rejected", "All"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={clsx(
                            "px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                            filter === tab
                                ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-glow"
                                : "bg-zinc-900 border border-white/5 text-gray-400 hover:text-white"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black/20 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                            <tr>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Method</th>
                                <th className="p-4 font-medium">Details</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {isLoading ? (
                                <tr><td colSpan="7" className="p-8 text-center text-gray-400">Loading requests...</td></tr>
                            ) : filteredRequests.length === 0 ? (
                                <tr><td colSpan="7" className="p-8 text-center text-gray-400">No requests found.</td></tr>
                            ) : (
                                filteredRequests.map((req) => (
                                    <tr key={req._id} className="hover:bg-white/5 transition bg-zinc-900/50">
                                        <td className="p-4">
                                            <p className="text-white font-bold">{req.user?.name || 'Unknown'}</p>
                                            <p className="text-gray-500 text-xs">{req.user?.email || 'N/A'}</p>
                                        </td>
                                        <td className="p-4 text-green-500 font-bold">₹{req.amount}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                                                {req.method}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {req.method === 'Crypto' ? (
                                                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => copyToClipboard(req.hash || req.walletAddress)}>
                                                    <span className="text-gray-400 text-xs font-mono group-hover:text-primary transition truncate max-w-[150px] inline-block">{req.hash || req.walletAddress || '-'}</span>
                                                    <Copy className="w-3 h-3 text-gray-600 group-hover:text-primary opacity-0 group-hover:opacity-100 transition" />
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs">{req.hash || req.bankDetails || '-'}</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-400 text-xs">{new Date(req.createdAt).toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={clsx(
                                                "px-3 py-1 rounded-full text-xs font-bold capitalize",
                                                ['completed', 'approved'].includes(req.status.toLowerCase()) && "bg-green-500/10 text-green-500",
                                                req.status.toLowerCase() === 'pending' && "bg-yellow-500/10 text-yellow-500",
                                                ['rejected', 'failed'].includes(req.status.toLowerCase()) && "bg-red-500/10 text-red-500"
                                            )}>
                                                {req.status === 'completed' ? 'Approved' : req.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            {req.status.toLowerCase() === 'pending' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(req._id, 'Approve')}
                                                        className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition shadow-lg shadow-green-500/20"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(req._id, 'Reject')}
                                                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition shadow-lg shadow-red-500/20"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalRequests;
