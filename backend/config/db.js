const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Mongo DB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error.message)
        process.exit(1)
    }
}

module.exports = connectDB


// ZVQgs5ph3vQcZZov