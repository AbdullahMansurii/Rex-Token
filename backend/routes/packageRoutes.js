const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getPackages,
    getAllPackages,
    createPackage,
    updatePackage,
    deletePackage
} = require('../controllers/packageController');

// Helper middleware for admin check
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

router.route('/')
    .get(getPackages)
    .post(protect, admin, createPackage);

router.route('/admin')
    .get(protect, admin, getAllPackages);

router.route('/:id')
    .put(protect, admin, updatePackage)
    .delete(protect, admin, deletePackage);

module.exports = router;
