const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    minInvestment: { type: Number, required: true },
    maxInvestment: { type: Number, required: true },
    roi: { type: Number, required: true }, // Daily Return %
    duration: { type: Number, required: true }, // Days
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
