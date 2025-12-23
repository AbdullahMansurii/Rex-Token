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

        // Calculate Level 1 Business Volume & Commission (Dynamic)
        // 1. Get IDs of Level 1 users
        const level1Ids = directs.map(d => d._id);

        // 2. Fetch their approved investments
        /* 
           Using 'completed' and 'active' statuses. 
           'active' = currently earning ROI
           'completed' = principal returned or finished
           Excluding 'pending' or 'rejected'.
        */
        const Investment = require('../models/Investment'); // Import inline or top-level

        const level1Investments = await Investment.find({
            user: { $in: level1Ids },
            status: { $in: ['active', 'completed'] }
        });

        // 3. Sum total amount
        const level1Volume = level1Investments.reduce((acc, curr) => acc + curr.amount, 0);

        // 4. Calculate Commission (10% for Level 1 - hardcoded rule for display)
        const level1Commission = level1Volume * 0.10;

        // 5. Update Stats Object
        // For totalNetwork, we might want recursive count later, but for now specific level 1 logic helps

        res.json({
            stats: {
                totalNetwork: user.team.totalLines || directs.length, // Fallback to direct count
                networkGrowth: "100%", // Placeholder
                overallBusiness: `₹${level1Volume}`, // Real Level 1 Volume
                totalCommission: `₹${level1Commission}` // Real Level 1 Commission (Potential/Earned)
            },
            level1: directs,
            level1Stats: {
                volume: level1Volume,
                commission: level1Commission
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getDownline };
