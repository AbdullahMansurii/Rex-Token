const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    relatedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'investment', 'referral', 'payout', 'level_income', 'referral_income', 'purchase'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'INR',
    },
    crypto: {
        type: String,
        enum: ['BTC', 'ETH', 'USDT', 'None'],
        default: 'None',
    },
    hash: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'rejected'],
        default: 'pending',
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Transaction', transactionSchema);
