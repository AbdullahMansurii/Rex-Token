const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    profilePhoto: { type: String },
    aadharNumber: { type: String },
    aadharFront: { type: String },
    aadharBack: { type: String },
    panNumber: { type: String },
    panImage: { type: String },
    bankAccountHolder: { type: String },
    bankAccountNumber: { type: String },
    bankName: { type: String },
    ifscCode: { type: String },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    adminComments: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('KYC', kycSchema);
