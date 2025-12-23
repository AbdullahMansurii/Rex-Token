const User = require('../models/User');
const Investment = require('../models/Investment');
const SystemSetting = require('../models/SystemSetting');
const Transaction = require('../models/Transaction');

// @desc    Get User Dashboard Stats
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Fetch User Data with populated fields if necessary (like sponsor)
        const user = await User.findById(userId).populate('referredBy', 'name referralCode');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 2. Fetch System Settings (Token Rate, Phase)
        // We assume keys: 'token_rate', 'current_phase'
        const settings = await SystemSetting.find({ key: { $in: ['token_rate', 'current_phase'] } });

        let tokenRate = 2.5; // Default
        let currentPhase = 'Phase 3'; // Default

        settings.forEach(setting => {
            if (setting.key === 'token_rate') tokenRate = setting.value;
            if (setting.key === 'current_phase') currentPhase = setting.value;
        });

        // 3. Fetch Investments (Mining Status)
        // Check if user has any active investments
        const activeInvestments = await Investment.find({ user: userId, status: 'active' });
        const totalInvestmentAmount = activeInvestments.reduce((acc, inv) => acc + inv.amount, 0);
        const isMiningActive = activeInvestments.length > 0;

        // 4. Calculate Mining/ROI Stats (real-time calculation or from user.income)
        // For uptime, we can mock or calc based on start date.
        // For now, we take from user.income which should be updated by cron jobs.

        // 5. Team Stats
        // We use the fields we just added to the User model.
        // If they are 0, it means the cron/hooks haven't run, but we return them as is.

        // Response Object
        const response = {
            user: {
                name: user.name,
                username: user.email.split('@')[0], // Fallback if no username
                referralCode: user.referralCode,
                sponsor: user.referredBy ? user.referredBy.name : 'System',
                sponsorId: user.referredBy ? user.referredBy.referralCode : 'N/A',
                walletBalance: user.balance || 0,
                rexTokenConfirm: user.rexToken || 0,
                kycStatus: user.kycStatus
            },
            token: {
                rate: tokenRate,
                phase: currentPhase,
                holding: user.rexToken || 0 // Assuming this is REX balance
            },
            income: {
                roi: user.income?.roi || 0,
                level: user.income?.level || 0,
                sponsor: user.income?.sponsor || 0,
                yearly: 0, // Not verified field yet
                total: user.income?.total || 0,
                totalWithdrawable: user.balance // Using balance as withdrawable for now
            },
            mining: {
                status: isMiningActive ? 'Active' : 'Inactive',
                uptime: isMiningActive ? '99.8%' : '0%',
                monthlyPercentage: '10-15%', // Static or dynamic based on package
                totalInvested: totalInvestmentAmount
            },
            team: {
                directs: user.team?.directs || 0,
                totalLines: user.team?.totalLines || 0, // Using totalLines as proxy for total team or level income
                totalEarned: user.income?.total || 0
            }
        };

        res.json(response);

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getDashboardStats
};
