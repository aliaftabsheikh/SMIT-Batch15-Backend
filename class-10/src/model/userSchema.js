const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true,
       
    },

    city: {
        type: String,
        required: true
    },
},
{
    collection: 'users'
}
)

const User = mongoose.model('User', userSchema);


module.exports = {
    User
};