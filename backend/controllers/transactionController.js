const Transaction = require('../models/Transaction');

// @desc    Get user transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all transactions (Admin)
// @route   GET /api/transactions/admin
// @access  Private/Admin
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getTransactions,
    getAllTransactions
};
