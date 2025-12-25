const User = require('../models/User');
const Investment = require('../models/Investment');
const COMMISSION_RATES = require('../config/commission');

// @desc    Get User Downline
// @route   GET /api/users/downline
// @access  Private
const getDownline = async (req, res) => {
    try {
        const userId = req.user._id;

        // Initialize response structure
        const levelsData = [];
        let totalNetwork = 0;
        let overallBusiness = 0;
        let totalCommission = 0;

        // Start with direct referrals (Level 1 candidates)
        let currentLevelUserIds = [userId];

        // We need to keep track of processed users to prevent duplicates/cycles if the graph isn't a strict tree
        // Although logical structure implies tree, safety first.
        const allDownlineIds = new Set([userId.toString()]);

        // Loop for 10 Levels
        for (let level = 1; level <= 10; level++) {
            // Find users who were referred by anyone in the 'currentLevelUserIds' (which are the uplines for this new level)
            // For Level 1: referredBy is the current user.
            // For Level 2: referredBy is anyone in Level 1.
            const levelMembers = await User.find({
                referredBy: { $in: currentLevelUserIds },
                _id: { $nin: Array.from(allDownlineIds) } // Prevent circular/duplicate counting
            }).select('name email joinedDate team income');

            // If no members at this level, we can technically stop further queries for members, 
            // but we still want to output the empty levels for the UI consistency.
            if (levelMembers.length === 0) {
                levelsData.push({
                    level,
                    members: [],
                    stats: {
                        count: 0,
                        volume: 0,
                        commission: 0,
                        rate: COMMISSION_RATES[level],
                        growth: "0%" // Placeholder
                    }
                });
                // Update currentLevelUserIds to empty so next iteration finds nothing
                currentLevelUserIds = [];
                continue;
            }

            // Update IDs for next iteration
            const levelMemberIds = levelMembers.map(m => m._id);
            currentLevelUserIds = levelMemberIds;
            levelMemberIds.forEach(id => allDownlineIds.add(id.toString()));

            // Fetch Investments for these members
            const investments = await Investment.find({
                user: { $in: levelMemberIds },
                status: { $in: ['active', 'completed'] }
            });

            // specific member investment map for the list view
            const memberInvestmentMap = {};
            investments.forEach(inv => {
                if (!memberInvestmentMap[inv.user]) memberInvestmentMap[inv.user] = 0;
                memberInvestmentMap[inv.user] += inv.amount;
            });

            // Calculate Volume & Commission for this level
            const levelVolume = investments.reduce((sum, inv) => sum + inv.amount, 0);
            const levelRate = COMMISSION_RATES[level] || 0;
            const levelCommission = levelVolume * levelRate;

            // Update Totals
            totalNetwork += levelMembers.length;
            overallBusiness += levelVolume;
            totalCommission += levelCommission;

            // Format members list with investment info
            const formattedMembers = levelMembers.map(m => ({
                _id: m._id,
                name: m.name,
                email: m.email,
                joinedDate: m.joinedDate,
                teamCount: m.team?.totalLines || 0,
                totalInvestment: memberInvestmentMap[m._id] || 0,
                status: 'Active' // Simplification, could be based on actual STATUS field
            }));

            levelsData.push({
                level,
                members: formattedMembers,
                stats: {
                    count: levelMembers.length,
                    volume: levelVolume,
                    commission: levelCommission,
                    rate: levelRate,
                    growth: "0%" // Placeholder
                }
            });
        }

        res.json({
            stats: {
                totalNetwork,
                networkGrowth: "100%", // Placeholder or calculate based on time
                overallBusiness: `₹${overallBusiness.toLocaleString()}`,
                totalCommission: `₹${totalCommission.toLocaleString()}`
            },
            levels: levelsData
        });

    } catch (error) {
        console.error("Downline Fetch Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getDownline };
