import { useState, useEffect } from "react";
import { Search, Eye, Edit2, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

const UserManagement = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setUsers(data);
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchUsers();
    }, [user]);

    const filteredUsers = users.filter(u => {
        const matchesSearch =
            (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()));

        // Simple filter logic - can be expanded based on specific status fields if added to User model
        const matchesFilter = filter === "All" || u.role === filter; // Placeholder logic

        return matchesSearch;
    });

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
                const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    setUsers(users.filter(u => u._id !== userId));
                } else {
                    alert("Failed to delete user");
                }
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    // Edit State
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", email: "", role: "user", balance: 0 });

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            balance: user.balance
        });
    };

    const handleSaveEdit = async () => {
        try {
            const token = user?.token || JSON.parse(localStorage.getItem('user'))?.token;
            const response = await fetch(`${API_BASE_URL}/api/admin/users/${editingUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editFormData)
            });

            const updatedUser = await response.json();

            if (response.ok) {
                setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
                setEditingUser(null);
            } else {
                alert(updatedUser.message || "Failed to update user");
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">User Management</h1>
                    <p className="text-gray-400 text-sm">Manage and monitor all platform users</p>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-900 border border-white/5 rounded-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-primary outline-none transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-right text-gray-400 text-sm flex items-center justify-end">
                    Total Users: {users.length}
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black/20 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                            <tr>
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Email</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Joined</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {isLoading ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading users...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-400">No users found.</td></tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u._id} className="hover:bg-white/5 transition bg-zinc-900/50">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                                                    {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <p className="text-white font-bold">{u.name || 'Unknown'}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-400">{u.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditClick(u)}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-white/10 rounded-lg transition"
                                                    title="Edit User"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(u._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/10 rounded-lg transition"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit User Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6">Edit User</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Role</label>
                                    <select
                                        value={editFormData.role}
                                        onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs mb-1">Wallet Balance</label>
                                    <input
                                        type="number"
                                        value={editFormData.balance}
                                        onChange={(e) => setEditFormData({ ...editFormData, balance: Number(e.target.value) })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="flex-1 py-2.5 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="flex-1 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary-glow shadow-glow transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
