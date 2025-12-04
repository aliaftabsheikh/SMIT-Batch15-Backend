const mongoose = require('mongoose');

const uri = 'mongodb+srv://Database:aliaftab321@cluster0.51l7ww2.mongodb.net/SMIT-Batch-15-Backend';

const connectDB = async ()=>{
    await mongoose.connect(uri)
}

module.exports = {
    connectDB
};




