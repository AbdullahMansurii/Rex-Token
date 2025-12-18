const KYC = require('../models/KYC');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, `${req.user._id}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Check File Type
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: fileFilter
});

// @desc    Submit KYC
// @route   POST /api/kyc
// @access  Private
const submitKYC = async (req, res) => {
    try {
        const {
            aadharNumber,
            panNumber,
            bankAccountHolder,
            bankAccountNumber,
            bankName,
            ifscCode
        } = req.body;

        const files = req.files;

        // Check if user already submitted
        const existingKYC = await KYC.findOne({ user: req.user._id });
        if (existingKYC) {
            return res.status(400).json({ message: 'KYC already submitted' });
        }

        const kyc = await KYC.create({
            user: req.user._id,
            aadharNumber,
            panNumber,
            bankAccountHolder,
            bankAccountNumber,
            bankName,
            ifscCode,
            profilePhoto: files.profilePhoto ? files.profilePhoto[0].path : null,
            aadharFront: files.aadharFront ? files.aadharFront[0].path : null,
            aadharBack: files.aadharBack ? files.aadharBack[0].path : null,
            panImage: files.panImage ? files.panImage[0].path : null,
            status: 'pending'
        });

        // Update User KYC Status
        await User.findByIdAndUpdate(req.user._id, { kycStatus: 'pending' });

        res.status(201).json(kyc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all KYC requests (Admin)
// @route   GET /api/kyc/admin
// @access  Private/Admin
const getKYCRequests = async (req, res) => {
    try {
        const kycRequests = await KYC.find({ status: 'pending' }).populate('user', 'name email');
        res.json(kycRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update KYC Status (Admin)
// @route   PUT /api/kyc/admin/:id
// @access  Private/Admin
const updateKYCStatus = async (req, res) => {
    try {
        const { status, adminComments } = req.body;
        const kyc = await KYC.findById(req.params.id);

        if (!kyc) {
            return res.status(404).json({ message: 'KYC not found' });
        }

        kyc.status = status;
        kyc.adminComments = adminComments;
        await kyc.save();

        // Update User Status
        if (status === 'verified') {
            await User.findByIdAndUpdate(kyc.user, { kycStatus: 'verified' });
        } else if (status === 'rejected') {
            await User.findByIdAndUpdate(kyc.user, { kycStatus: 'rejected' });
        }

        res.json(kyc);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get Current User KYC
// @route   GET /api/kyc/me
// @access  Private
const getUserKYC = async (req, res) => {
    try {
        const kyc = await KYC.findOne({ user: req.user._id });
        if (!kyc) {
            return res.status(404).json({ message: 'KYC not found' });
        }
        res.json(kyc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    submitKYC,
    getKYCRequests,
    updateKYCStatus,
    getUserKYC,
    upload
};
