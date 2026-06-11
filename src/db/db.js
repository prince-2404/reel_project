const mongoose = require('mongoose')


async function connectDB(){

    try {

        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected");
        
        
    } catch (error) {
        console.log("MongoDB connection error")
        process.exit(1)
    }

}

module.exports = connectDB


