const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Database:aliaftab321@cluster0.51l7ww2.mongodb.net/SMIT-Batch-15-Backend')
}


module.exports = connectDB;