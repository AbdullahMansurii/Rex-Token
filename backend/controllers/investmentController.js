const Investment = require('../models/Investment');
const Package = require('../models/Package');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Create new investment
// @route   POST /api/investments
// @access  Private
const createInvestment = async (req, res) => {
    try {
        const { amount, transactionId, sponsorId } = req.body;
        let paymentSlip = null;
        if (req.file) {
            // Convert to Base64 for Vercel/MongoDB storage (No disk write)
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const mimeType = req.file.mimetype;
            paymentSlip = `data:${mimeType};base64,${b64}`;
        }

        if (!amount || !transactionId) {
            return res.status(400).json({ message: 'Please provide amount and transaction ID' });
        }

        if (amount < 500) {
            return res.status(400).json({ message: 'Minimum investment amount is 500' });
        }

        // Default Logic (Since Packages are removed)
        // Example: 0.5% Daily for 400 Days (200% Total)
        const dailyReturn = 0.5;
        const dailyReturnAmount = (amount * dailyReturn) / 100;
        const duration = 400; // days (can be changed later or moved to settings)

        // Calculate expected endDate (will be reset on approval)
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + duration);

        const investment = await Investment.create({
            user: req.user._id,
            // package: null, // No package
            amount,
            dailyReturn,
            dailyReturnAmount,
            // startDate: Date.now(), // Admin will set this on approval
            endDate,
            status: 'pending', // Default to pending
            transactionId,
            sponsorId: sponsorId || "",
            paymentSlip
        });

        // Create corresponding Transaction
        await Transaction.create({
            user: req.user._id,
            type: 'investment',
            amount: amount,
            status: 'pending',
            hash: transactionId,
            description: `Investment Request for ₹${amount}`
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
        const investment = await Investment.findById(req.params.id); // No need to populate package

        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }

        investment.status = status;

        // If activating, set start and end dates
        if (status === 'active' && !investment.startDate) {
            investment.startDate = Date.now();

            // Calculate End Date: Default 400 days logic
            const duration = 400; // Hardcoded logic for now
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + duration);
            investment.endDate = endDate;
        }

        await investment.save();

        // Sync Transaction Status
        let txnStatus = 'pending';
        if (status === 'active') txnStatus = 'completed';
        if (status === 'terminated' || status === 'rejected') txnStatus = 'rejected';

        await Transaction.findOneAndUpdate(
            { hash: investment.transactionId, type: 'investment' },
            { status: txnStatus }
        );
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
