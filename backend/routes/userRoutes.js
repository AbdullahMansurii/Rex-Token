const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getDownline } = require('../controllers/userController');

router.get('/downline', protect, getDownline);

module.exports = router;
