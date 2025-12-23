const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const { createInvestment, getMyInvestments, getAllInvestments, updateInvestmentStatus } = require('../controllers/investmentController');

// Multer config
// Multer config
const storage = multer.memoryStorage();

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images and PDFs only!');
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB Limit for Vercel Serverless
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Admin Middleware
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

router.route('/')
    .post(protect, upload.single('paymentSlip'), createInvestment);

router.route('/my')
    .get(protect, getMyInvestments);

// Admin Routes
router.get('/admin', protect, admin, getAllInvestments);
router.put('/admin/:id', protect, admin, updateInvestmentStatus);

module.exports = router;
