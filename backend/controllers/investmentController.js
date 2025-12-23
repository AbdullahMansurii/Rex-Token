const Investment = require('../models/Investment');
const Package = require('../models/Package');
const User = require('../models/User');

// @desc    Create new investment
// @route   POST /api/investments
// @access  Private
const createInvestment = async (req, res) => {
    try {
        const { amount, transactionId, sponsorId } = req.body;
        const paymentSlip = req.file ? req.file.path : null;

        if (!amount || !transactionId) {
            return res.status(400).json({ message: 'Please provide amount and transaction ID' });
        }

        // Find applicable package
        const pkg = await Package.findOne({
            minInvestment: { $lte: amount },
            maxInvestment: { $gte: amount },
            status: 'Active'
        });

        if (!pkg) {
            return res.status(400).json({ message: 'No active package found for this amount' });
        }

        // Calculate returns
        const dailyReturn = pkg.roi;
        const dailyReturnAmount = (amount * dailyReturn) / 100;
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + pkg.duration);

        const investment = await Investment.create({
            user: req.user._id,
            package: pkg._id,
            amount,
            dailyReturn,
            dailyReturnAmount,
            // startDate: Date.now(), // Admin will set this on approval
            endDate, // This might need recalculation on approval
            status: 'pending', // Default to pending
            transactionId,
            sponsorId: sponsorId || "",
            paymentSlip
        });

        res.status(201).json(investment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user investments
// @route   GET /api/investments/my
// @access  Private
const getMyInvestments = async (req, res) => {
    try {
        const investments = await Investment.find({ user: req.user._id })
            .populate('package', 'name')
            .sort({ createdAt: -1 });
        res.json(investments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get All Investments (Admin)
// @route   GET /api/investments/admin
// @access  Private/Admin
const getAllInvestments = async (req, res) => {
    try {
        const investments = await Investment.find({})
            .populate('user', 'name email')
            .populate('package', 'name duration')
            .sort({ createdAt: -1 });
        res.json(investments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update Investment Status (Admin)
// @route   PUT /api/investments/admin/:id
// @access  Private/Admin
const updateInvestmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const investment = await Investment.findById(req.params.id).populate('package');

        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }

        investment.status = status;

        // If activating, set start and end dates
        if (status === 'active' && !investment.startDate) {
            investment.startDate = Date.now();
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + investment.package.duration);
            investment.endDate = endDate;
        }

        await investment.save();
        res.json(investment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createInvestment,
    getMyInvestments,
    getAllInvestments,
    updateInvestmentStatus
};
