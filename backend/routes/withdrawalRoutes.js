const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createWithdrawal,
    getMyWithdrawals,
    getAllWithdrawals,
    updateWithdrawalStatus
} = require('../controllers/withdrawalController');

// Helper middleware for admin check
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

router.route('/')
    .post(protect, createWithdrawal)
    .get(protect, getMyWithdrawals);

router.route('/admin')
    .get(protect, admin, getAllWithdrawals);

router.route('/:id')
    .put(protect, admin, updateWithdrawalStatus);

module.exports = router;
