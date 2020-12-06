const mongoose = require('mongoose');
const config = require('./default.json');

const db = config.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connect to MongoDB successfully!")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}


module.exports = connectDB;

