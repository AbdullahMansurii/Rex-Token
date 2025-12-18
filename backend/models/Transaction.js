const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'Deposit', 'Withdrawal', 'ROI'
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    method: { type: String }, // e.g., 'USDT', 'Internal'
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
