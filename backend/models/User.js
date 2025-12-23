const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    phone: {
        type: String,
        default: "",
    },
    referralCode: {
        type: String,
        unique: true,
        sparse: true, // Allow multiple null values if optional
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false, // Don't return password by default
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    wallet: {
        type: String,
        default: '0x0000000000000000000000000000000000000000',
    },
    balance: {
        type: Number,
        default: 0,
    },
    loyaltyPoints: {
        type: Number,
        default: 0,
    },
    rexToken: {
        type: Number,
        default: 0,
    },
    shoppingPoints: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'inactive'],
        default: 'active',
    },
    kycStatus: {
        type: String,
        enum: ['verification_needed', 'pending', 'verified', 'rejected'],
        default: 'verification_needed',
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },
    // Income Tracking
    income: {
        roi: { type: Number, default: 0 },
        level: { type: Number, default: 0 },
        sponsor: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    },
    // Team Tracking
    team: {
        directs: { type: Number, default: 0 },
        totalLines: { type: Number, default: 0 }
    }
}, {
    timestamps: true,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
