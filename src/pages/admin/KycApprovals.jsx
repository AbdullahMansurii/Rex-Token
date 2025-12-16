import { useState } from "react";
import { ShieldCheck, XCircle, CheckCircle, Clock, FileText, ChevronRight, User } from "lucide-react";
import clsx from "clsx";

const KycApprovals = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Mock Stats
    const stats = [
        { label: "Pending Review", value: "145", icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
        { label: "Approved Today", value: "89", icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10" },
        { label: "Rejected Today", value: "12", icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
        { label: "Total Verified", value: "8,234", icon: ShieldCheck, color: "text-primary", bgColor: "bg-primary/10" },
    ];

    // Mock Requests Data
    const requests = [
        { id: 1, name: "Sahil Miyawala", email: "chhipasahil163@gmail.com", date: "Today, 10:23 AM", status: "pending", avatar: "S", color: "bg-purple-500" },
        { id: 2, name: "John Doe", email: "john.doe@example.com", date: "Today, 09:45 AM", status: "pending", avatar: "J", color: "bg-blue-500" },
        { id: 3, name: "Alice Smith", email: "alice.smith@test.com", date: "Yesterday, 11:30 PM", status: "pending", avatar: "A", color: "bg-green-500" },
        { id: 4, name: "Robert Fox", email: "robert.fox@demo.com", date: "Yesterday, 08:15 PM", status: "pending", avatar: "R", color: "bg-yellow-500" },
        { id: 5, name: "Emma Wilson", email: "emma.wilson@email.com", date: "Yesterday, 06:00 PM", status: "pending", avatar: "E", color: "bg-pink-500" },
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
                        {requests.map((req) => (
                            <button
                                key={req.id}
                                onClick={() => setSelectedRequest(req)}
                                className={clsx(
                                    "w-full flex items-center gap-3 p-3 rounded-lg transition text-left",
                                    selectedRequest?.id === req.id
                                        ? "bg-primary/20 border border-primary/50"
                                        : "hover:bg-white/5 border border-transparent"
                                )}
                            >
                                <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold", req.color)}>
                                    {req.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium text-sm truncate">{req.name}</p>
                                    <p className="text-gray-500 text-xs truncate">{req.email}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-gray-400 block">{req.date.split(",")[0]}</span>
                                    <ChevronRight className={clsx("w-4 h-4 ml-auto mt-1", selectedRequest?.id === req.id ? "text-primary" : "text-gray-600")} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden flex flex-col relative">
                    {selectedRequest ? (
                        <div className="h-full flex flex-col">
                            {/* User Detail Header */}
                            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-black/20">
                                <div className={clsx("w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-glow", selectedRequest.color)}>
                                    {selectedRequest.avatar}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedRequest.name}</h2>
                                    <p className="text-gray-400">{selectedRequest.email}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                            Verification Pending
                                        </span>
                                        <span className="text-gray-500 text-xs">Submitted: {selectedRequest.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Document Preview Area (Mock) */}
                            <div className="flex-1 p-8 grid place-items-center">
                                <div className="text-center">
                                    <div className="w-full max-w-md aspect-video bg-black/40 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary/50 transition">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition">
                                            <FileText className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-400 text-sm">National ID / Passport Preview</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
                                        <button className="py-3 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2">
                                            <XCircle className="w-5 h-5" /> Reject KYC
                                        </button>
                                        <button className="py-3 rounded-xl bg-green-500/10 text-green-500 font-bold hover:bg-green-500 hover:text-white transition flex items-center justify-center gap-2 shadow-glow-hover">
                                            <CheckCircle className="w-5 h-5" /> Approve KYC
                                        </button>
                                    </div>
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
