const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getDashboardStats,
    getAllUsers,
    updateUser,
    deleteUser,
    getTokenPrice,
    updateTokenPrice,
    recoverWallet
} = require('../controllers/adminController');

// Helper middleware for admin check
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

router.get('/stats', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

// System Settings Routes
router.get('/settings/price', protect, admin, getTokenPrice);
router.put('/settings/price', protect, admin, updateTokenPrice);
router.post('/users/recover', protect, admin, recoverWallet);

module.exports = router;
