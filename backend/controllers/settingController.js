const SystemSetting = require('../models/SystemSetting');

// @desc    Get all system settings
// @route   GET /api/settings
// @access  Private/Admin
const getSettings = async (req, res) => {
    try {
        const settings = await SystemSetting.find({});
        const settingsMap = settings.reduce((acc, output) => {
            acc[output.key] = output.value;
            return acc;
        }, {});

        // Default values if not found
        const defaults = {
            siteName: "REX Token",
            maintenanceMode: false,
            withdrawalsEnabled: true,
            withdrawalFee: 5,
            minWithdrawal: 100,
            kycRequired: true
        };

        res.json({ ...defaults, ...settingsMap });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update system settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
    try {
        const updates = req.body;
        const keys = Object.keys(updates);

        const promises = keys.map(key =>
            SystemSetting.findOneAndUpdate(
                { key },
                { key, value: updates[key] },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            )
        );

        await Promise.all(promises);

        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getSettings, updateSettings };
