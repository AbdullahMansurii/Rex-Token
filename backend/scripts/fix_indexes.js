const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        // Use the same connection logic as the app
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "RexToken",
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Access the native MongoDB driver collection
        const collection = conn.connection.db.collection('users');

        // List indexes before
        const indexes = await collection.indexes();
        console.log('Current Indexes:', indexes);

        // Drop the problematic index
        try {
            await collection.dropIndex('username_1');
            console.log('SUCCESS: Dropped index "username_1"');
        } catch (error) {
            console.log(`INFO: Could not drop index "username_1". It might not exist. Error: ${error.message}`);
        }

        // Drop referralCode index if it's not sparse (just in case, though schema says sparse)
        // Check if referralCode index exists and is unique but not sparse? 
        // For now, focus on the reported error.

        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
