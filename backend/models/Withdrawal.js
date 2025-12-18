const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, enum: ['loyalty', 'rex', 'shopping'], required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['bank', 'crypto'], required: true },
    walletAddress: { type: String }, // For crypto
    bankDetails: {
        accountNumber: String,
        ifsc: String,
        bankName: String
    }, // Snapshot for bank transfer
    status: { type: String, enum: ['Pending', 'Completed', 'Rejected'], default: 'Pending' },
    transactionId: { type: String }, // Generated upon completion
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
