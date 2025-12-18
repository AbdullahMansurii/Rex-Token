const Package = require('../models/Package');

// @desc    Get all active packages (Public)
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find({ status: 'Active' });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all packages (Admin)
// @route   GET /api/packages/admin
// @access  Private/Admin
const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({});
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new package
// @route   POST /api/packages
// @access  Private/Admin
const createPackage = async (req, res) => {
    try {
        const { name, minInvestment, maxInvestment, roi, duration, description, status } = req.body;

        const pkg = await Package.create({
            name,
            minInvestment,
            maxInvestment,
            roi,
            duration,
            description,
            status
        });

        res.status(201).json(pkg);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
const updatePackage = async (req, res) => {
    try {
        const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pkg) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(pkg);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
const deletePackage = async (req, res) => {
    try {
        const pkg = await Package.findByIdAndDelete(req.params.id);
        if (!pkg) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json({ message: 'Package removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getPackages,
    getAllPackages,
    createPackage,
    updatePackage,
    deletePackage
};
