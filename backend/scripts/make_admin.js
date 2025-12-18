const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "RexToken",
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const makeAdmin = async () => {
    await connectDB();

    const email = process.argv[2];

    if (!email) {
        console.log('Please provide an email address as an argument.');
        console.log('Usage: node backend/scripts/make_admin.js <user_email>');
        process.exit(1);
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`SUCCESS: User ${user.name} (${user.email}) is now an ADMIN.`);
        } else {
            console.log(`User not found with email: ${email}`);
        }
    } catch (error) {
        console.error(error);
    }

    process.exit();
};

makeAdmin();
