const User = require('../models/User');
const KYC = require('../models/KYC');
const Withdrawal = require('../models/Withdrawal');
const Transaction = require('../models/Transaction');
const Investment = require('../models/Investment');
const SystemSetting = require('../models/SystemSetting');

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
            activeInvestments
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
            Investment.countDocuments({ status: 'active' })
        ]);

        res.json({
            totalUsers,
            newUsersToday: usersLast24h,
            pendingKYC,
            pendingWithdrawals,
            totalWithdrawn: totalWithdrawals[0]?.total || 0,
            totalTransactions,
            activePackages: activeInvestments // Keep 'activePackages' key for frontend compatibility
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

// @desc    Get Token Price
// @route   GET /api/admin/settings/price
// @access  Private/Admin
const getTokenPrice = async (req, res) => {
    try {
        let setting = await SystemSetting.findOne({ key: 'tokenPrice' });
        if (!setting) {
            // Default price if not set
            setting = await SystemSetting.create({ key: 'tokenPrice', value: 0.10, description: 'Current Token Price in USDT' });
        }
        res.json({ price: setting.value });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update Token Price
// @route   PUT /api/admin/settings/price
// @access  Private/Admin
const updateTokenPrice = async (req, res) => {
    try {
        const { price } = req.body;
        const setting = await SystemSetting.findOneAndUpdate(
            { key: 'tokenPrice' },
            { value: price },
            { new: true, upsert: true }
        );
        res.json({ price: setting.value });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Recover User Wallet
// @route   POST /api/admin/users/recover
// @access  Private/Admin
const recoverWallet = async (req, res) => {
    try {
        const { email, newWallet } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this email' });
        }

        user.wallet = newWallet;
        await user.save();

        res.json({
            message: `Wallet recovered successfully for ${user.name}`,
            newWallet: user.wallet
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    updateUser,
    deleteUser,
    getTokenPrice,
    updateTokenPrice,
    recoverWallet
};
