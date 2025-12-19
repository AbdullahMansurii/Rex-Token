import { useState, useEffect } from "react";
import { ShieldCheck, XCircle, CheckCircle, Clock, FileText, ChevronRight, User } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const KycApprovals = () => {
    const { user } = useAuth();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/kyc/admin`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setRequests(data);
                }
            } catch (error) {
                console.error("Failed to fetch KYC requests", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, [user]);

    const handleStatusUpdate = async (id, status, comments = "") => {
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const response = await fetch(`${API_BASE_URL}/api/kyc/admin/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status, adminComments: comments })
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

    // Mock Stats (Dynamic in real app, keeping static for now or calculating)
    const stats = [
        { label: "Pending Review", value: requests.length.toString(), icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
        { label: "Active Users", value: "8,234", icon: ShieldCheck, color: "text-primary", bgColor: "bg-primary/10" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">KYC Approvals</h1>
                <p className="text-gray-400 text-sm">Review and approve user verification requests</p>
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
                            <p className="text-gray-500 text-center p-4">No pending requests</p>
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
                                        <p className="text-gray-500 text-xs truncate">{req.user?.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400 block">{new Date(req.createdAt).toLocaleDateString()}</span>
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
                                            Verification Pending
                                        </span>
                                        <span className="text-gray-500 text-xs">Aadhar: {selectedRequest.aadharNumber}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Document Preview Area */}
                            <div className="flex-1 p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 text-xs mb-2">Profile Photo</p>
                                        {selectedRequest.profilePhoto ? (
                                            <img src={`${API_BASE_URL}/${selectedRequest.profilePhoto}`} className="w-full rounded-lg border border-white/10" alt="Profile" />
                                        ) : <p className="text-gray-600 text-sm">Not uploaded</p>}
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-2">PAN Card</p>
                                        {selectedRequest.panImage ? (
                                            <img src={`${API_BASE_URL}/${selectedRequest.panImage}`} className="w-full rounded-lg border border-white/10" alt="PAN" />
                                        ) : <p className="text-gray-600 text-sm">Not uploaded</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-400 text-xs mb-2">Aadhar Front</p>
                                        {selectedRequest.aadharFront ? (
                                            <img src={`${API_BASE_URL}/${selectedRequest.aadharFront}`} className="w-full rounded-lg border border-white/10" alt="Aadhar Front" />
                                        ) : <p className="text-gray-600 text-sm">Not uploaded</p>}
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-2">Aadhar Back</p>
                                        {selectedRequest.aadharBack ? (
                                            <img src={`${API_BASE_URL}/${selectedRequest.aadharBack}`} className="w-full rounded-lg border border-white/10" alt="Aadhar Back" />
                                        ) : <p className="text-gray-600 text-sm">Not uploaded</p>}
                                    </div>
                                </div>

                                <div className="p-4 bg-white/5 rounded-xl space-y-2">
                                    <p className="text-white font-bold text-sm">Bank Details</p>
                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div>
                                            <span className="text-gray-500 block">Bank Name</span>
                                            <span className="text-white">{selectedRequest.bankName}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block">Account Number</span>
                                            <span className="text-white">{selectedRequest.bankAccountNumber}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block">IFSC</span>
                                            <span className="text-white">{selectedRequest.ifscCode}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block">Holder Name</span>
                                            <span className="text-white">{selectedRequest.bankAccountHolder}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                    <button
                                        onClick={() => handleStatusUpdate(selectedRequest._id, 'rejected')}
                                        className="py-3 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" /> Reject KYC
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(selectedRequest._id, 'verified')}
                                        className="py-3 rounded-xl bg-green-500/10 text-green-500 font-bold hover:bg-green-500 hover:text-white transition flex items-center justify-center gap-2 shadow-glow-hover"
                                    >
                                        <CheckCircle className="w-5 h-5" /> Approve KYC
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                                <FileText className="w-10 h-10 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No KYC Selected</h3>
                            <p className="text-gray-400 max-w-xs">Select a pending KYC request from the list on the left to review details and take action.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KycApprovals;
