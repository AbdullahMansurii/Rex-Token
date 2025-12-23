const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { submitKYC, getKYCRequests, updateKYCStatus, getUserKYC, upload } = require('../controllers/kycController');

// Helper middleware for admin check
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

// Submit KYC (User)
router.post('/', protect, (req, res, next) => {
    upload.fields([
        { name: 'profilePhoto', maxCount: 1 },
        { name: 'aadharFront', maxCount: 1 },
        { name: 'aadharBack', maxCount: 1 },
        { name: 'panImage', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) {
            // Multer error (e.g., file size, wrong type)
            return res.status(400).json({ message: err.message || 'File upload error' });
        }
        next();
    });
}, submitKYC);

// Get My KYC
router.get('/me', protect, getUserKYC);

// Admin Routes
router.get('/admin', protect, admin, getKYCRequests);
router.put('/admin/:id', protect, admin, updateKYCStatus);

module.exports = router;
