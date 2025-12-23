const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc    Create a new withdrawal request
// @route   POST /api/withdrawals
// @access  Private
const createWithdrawal = async (req, res) => {
    try {
        const { amount, source, method, bankDetails, walletAddress } = req.body;

        // Basic Validation
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        // Check sufficient balance (mock check - in real app, check distinct wallet balances)
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Logic to check specific wallet balance based on 'source' would go here.
        // For now, we assume user has balance or we skip check for the mock.

        const withdrawal = await Transaction.create({
            user: req.user._id,
            type: 'withdrawal',
            amount,
            status: 'pending',
            description: `Withdrawal from ${source} via ${method}`,
            // Saving method details in description or we could extend schema if strictly needed, 
            // but schema provided didn't have specific bank field, so sticking to description/hash.
            // We can put bank details in description for admin review.
            hash: method === 'Crypto' ? walletAddress : JSON.stringify(bankDetails)
        });

        res.status(201).json(withdrawal);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get my withdrawals
// @route   GET /api/withdrawals
// @access  Private
const getMyWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Transaction.find({
            user: req.user._id,
            type: 'withdrawal'
        }).sort({ createdAt: -1 });

        res.json(withdrawals);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all withdrawals (Admin)
// @route   GET /api/withdrawals/admin
// @access  Private/Admin
const getAllWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Transaction.find({ type: 'withdrawal' })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.json(withdrawals);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update withdrawal status (Admin)
// @route   PUT /api/withdrawals/:id
// @access  Private/Admin
const updateWithdrawalStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const withdrawal = await Transaction.findById(req.params.id);

        if (!withdrawal) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }

        withdrawal.status = status;
        await withdrawal.save();

        res.json(withdrawal);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createWithdrawal,
    getMyWithdrawals,
    getAllWithdrawals,
    updateWithdrawalStatus
};
