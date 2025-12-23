import { useState, useEffect } from "react";
import { DollarSign, XCircle, CheckCircle, Clock, FileText, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const InvestmentApprovals = () => {
    const { user } = useAuth();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Requests
    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/investments/admin`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    // Filter mainly pending, but maybe show all?
                    // For this view, let's focus on pending
                    const pending = data.filter(inv => inv.status === 'pending');
                    setRequests(pending);
                }
            } catch (error) {
                console.error("Failed to fetch investments", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInvestments();
    }, [user]);

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const response = await fetch(`${API_BASE_URL}/api/investments/admin/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                // Remove from list
                setRequests(requests.filter(req => req._id !== id));
                setSelectedRequest(null);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    // Stats
    const totalPendingAmount = requests.reduce((acc, curr) => acc + curr.amount, 0);

    const stats = [
        { label: "Pending Requests", value: requests.length.toString(), icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
        { label: "Pending Value", value: `₹${totalPendingAmount.toLocaleString()}`, icon: DollarSign, color: "text-primary", bgColor: "bg-primary/10" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Investment Approvals</h1>
                <p className="text-gray-400 text-sm">Review and approve user investment requests</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Main Content Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">

                {/* Pending Requests List */}
                <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-white/5">
                        <h3 className="text-lg font-bold text-white">Pending Requests</h3>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {isLoading ? (
                            <p className="text-gray-500 text-center p-4">Loading...</p>
                        ) : requests.length === 0 ? (
                            <p className="text-gray-500 text-center p-4">No pending investments</p>
                        ) : (
                            requests.map((req) => (
                                <button
                                    key={req._id}
                                    onClick={() => setSelectedRequest(req)}
                                    className={clsx(
                                        "w-full flex items-center gap-3 p-3 rounded-lg transition text-left",
                                        selectedRequest?._id === req._id
                                            ? "bg-primary/20 border border-primary/50"
                                            : "hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-white font-bold">
                                        {req.user?.name?.charAt(0) || "U"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium text-sm truncate">{req.user?.name}</p>
                                        <p className="text-gray-500 text-xs truncate">₹{req.amount} • {new Date(req.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <ChevronRight className={clsx("w-4 h-4 ml-auto mt-1", selectedRequest?._id === req._id ? "text-primary" : "text-gray-600")} />
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex flex-col relative">
                    {selectedRequest ? (
                        <div className="h-full flex flex-col overflow-y-auto">
                            {/* User Detail Header */}
                            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-black/20">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-white font-bold text-2xl shadow-glow">
                                    {selectedRequest.user?.name?.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedRequest.user?.name}</h2>
                                    <p className="text-gray-400">{selectedRequest.user?.email}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                            Action Required
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Investment Details */}
                            <div className="flex-1 p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-white/5 rounded-xl space-y-1">
                                        <p className="text-gray-400 text-xs">Investment Amount</p>
                                        <p className="text-2xl font-bold text-white">₹{selectedRequest.amount}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl space-y-1">
                                        <p className="text-gray-400 text-xs">Transaction ID</p>
                                        <p className="text-xl font-mono text-primary">{selectedRequest.transactionId}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-xs mb-2">Payment Slip / Proof</p>
                                    {selectedRequest.paymentSlip ? (
                                        <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                                            <a href={selectedRequest.paymentSlip.startsWith('data:') ? selectedRequest.paymentSlip : `${API_BASE_URL}/${selectedRequest.paymentSlip}`} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={selectedRequest.paymentSlip.startsWith('data:') ? selectedRequest.paymentSlip : `${API_BASE_URL}/${selectedRequest.paymentSlip}`}
                                                    className="w-full max-h-[300px] object-contain hover:opacity-90 transition cursor-zoom-in"
                                                    alt="Payment Slip"
                                                />
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="p-8 bg-white/5 rounded-xl text-center text-gray-500 border border-dashed border-white/10">
                                            No payment slip uploaded
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                    <button
                                        onClick={() => handleStatusUpdate(selectedRequest._id, 'terminated')} // OR 'rejected' depending on model enum
                                        className="py-3 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" /> Reject
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(selectedRequest._id, 'active')}
                                        className="py-3 rounded-xl bg-green-500/10 text-green-500 font-bold hover:bg-green-500 hover:text-white transition flex items-center justify-center gap-2 shadow-glow-hover"
                                    >
                                        <CheckCircle className="w-5 h-5" /> Approve & Activate
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                                <DollarSign className="w-10 h-10 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Investment Selected</h3>
                            <p className="text-gray-400 max-w-xs">Select a pending request from the list to review details and take action.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvestmentApprovals;
