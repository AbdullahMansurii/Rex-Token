const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Request a withdrawal
// @route   POST /api/withdrawals
// @access  Private
const requestWithdrawal = async (req, res) => {
    try {
        const { source, amount, method, walletAddress, bankDetails } = req.body;

        const user = await User.findById(req.user._id);

        // Check sufficient balance (Mock check - in real app would check specific wallet based on source)
        // For now, assume user has balance or just process request
        if (user.balance < amount) {
            // return res.status(400).json({ message: 'Insufficient balance' });
        }

        const withdrawal = await Withdrawal.create({
            user: req.user._id,
            source,
            amount,
            method,
            walletAddress: method === 'Crypto' ? walletAddress : undefined,
            bankDetails: method === 'Bank' ? bankDetails : undefined,
            status: 'Pending'
        });

        res.status(201).json(withdrawal);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user withdrawals
// @route   GET /api/withdrawals
// @access  Private
const getWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Withdrawal.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(withdrawals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all withdrawals (Admin)
// @route   GET /api/withdrawals/admin
// @access  Private/Admin
const getAllWithdrawals = async (req, res) => {
    try {
        const withdrawals = await Withdrawal.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(withdrawals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update withdrawal status
// @route   PUT /api/withdrawals/:id
// @access  Private/Admin
const updateWithdrawalStatus = async (req, res) => {
    try {
        const { status, transactionId } = req.body;
        const withdrawal = await Withdrawal.findById(req.params.id);

        if (!withdrawal) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }

        withdrawal.status = status;
        if (transactionId) withdrawal.transactionId = transactionId;
        await withdrawal.save();

        // If approved, create a Transaction record for history
        if (status === 'Approved' || status === 'Completed') {
            await Transaction.create({
                user: withdrawal.user,
                type: 'Withdrawal',
                amount: withdrawal.amount,
                status: 'Completed',
                method: withdrawal.method,
                description: `Withdrawal from ${withdrawal.source}`
            });
        }

        res.json(withdrawal);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    requestWithdrawal,
    getWithdrawals,
    getAllWithdrawals,
    updateWithdrawalStatus
};
