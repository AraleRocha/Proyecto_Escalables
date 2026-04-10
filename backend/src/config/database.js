const mongoose = require('mongoose');

const connectDB = async () => {
    const connsting = process.env.MONGO_STRING;
    const dbName = process.env.MONGO_DB_NAME;
    try {
        await mongoose.connect(connsting, {
            dbName: dbName
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;