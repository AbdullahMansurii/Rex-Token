const User = require('../models/User');

// @desc    Get User Downline
// @route   GET /api/users/downline
// @access  Private
const getDownline = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        // Fetch Directs (Level 1)
        const directs = await User.find({ referredBy: req.user._id })
            .select('name email joinedDate team income')
            .sort({ joinedDate: -1 });

        // Calculate basic stats from directs if totalLines is not fully accurate yet
        // In a real MLM system, totalLines should be updated via hooks/events.
        // For now, we rely on user.team properties.

        res.json({
            stats: {
                totalNetwork: user.team.totalLines || directs.length,
                networkGrowth: "0%", // Placeholder as we don't track daily growth yet
                overallBusiness: "₹0", // Requires summing investment value of downline
                totalCommission: `₹${user.income.level || 0}`
            },
            level1: directs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getDownline };
