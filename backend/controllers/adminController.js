const User = require('../models/User');
const KYC = require('../models/KYC');
const Withdrawal = require('../models/Withdrawal');
const Transaction = require('../models/Transaction');
const Package = require('../models/Package');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        // Parallel execution for better performance
        const [
            totalUsers,
            usersLast24h,
            pendingKYC,
            pendingWithdrawals,
            totalWithdrawals,
            totalTransactions,
            activePackages
        ] = await Promise.all([
            User.countDocuments({ role: 'user' }),
            User.countDocuments({ role: 'user', createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
            KYC.countDocuments({ status: 'pending' }),
            Withdrawal.countDocuments({ status: 'Pending' }),
            Withdrawal.aggregate([
                { $match: { status: 'Completed' } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            Transaction.countDocuments({}),
            Package.countDocuments({ status: 'Active' })
        ]);

        res.json({
            totalUsers,
            newUsersToday: usersLast24h,
            pendingKYC,
            pendingWithdrawals,
            totalWithdrawn: totalWithdrawals[0]?.total || 0,
            totalTransactions,
            activePackages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.wallet = req.body.wallet || user.wallet;
            user.balance = req.body.balance !== undefined ? req.body.balance : user.balance;

            // Only admin can promote/demote (optional safety)
            if (req.body.role) {
                user.role = req.body.role;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                wallet: updatedUser.wallet,
                balance: updatedUser.balance
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    updateUser,
    deleteUser
};
