const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getTransactions,
    getAllTransactions
} = require('../controllers/transactionController');

// Helper middleware for admin check
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

router.route('/')
    .get(protect, getTransactions);

router.route('/admin')
    .get(protect, admin, getAllTransactions);

module.exports = router;
