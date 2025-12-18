const mongoose = require('mongoose');

let isConnected = false; // Track connection status

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "RexToken",
        });

        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Do not exit process in serverless env, just throw or log
        // process.exit(1); 
    }
};

module.exports = connectDB;
