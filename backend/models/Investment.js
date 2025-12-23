const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    dailyReturn: {
        type: Number, // Percentage
        required: true,
    },
    dailyReturnAmount: {
        type: Number, // Actual amount
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'terminated'],
        default: 'active',
    },
    lastroiDate: {
        type: Date,
        default: Date.now,
    },
    transactionId: {
        type: String,
        required: true,
    },
    sponsorId: {
        type: String,
        default: "",
    },
    paymentSlip: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Investment', investmentSchema);
