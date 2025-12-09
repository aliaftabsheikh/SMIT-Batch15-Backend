const mongoose = require('mongoose');
const {Schema} = mongoose

// const person = {
//     name: 'Saad',
//     email: 'waqar123@gmail.com',
//     password: 'waqar321',
    
//     greeting(){
//         return `Hello ${this.name}, welcome to our application`
//     }


// }

// console.log('Outer -->',person.greeting());



// class User {
//     name;
//     email;
//     password;

    
//      constructor(name, email, password){
//         this.name = name;
//         this.email = email;
//         this.password = password;
//     }

//     greeting(){
//         console.log(`Hello ${this.name}, welcome to our application`);
//     }   

// }

// const user = new User('Waqar', 'waqar@gmail.com', 'waqar321');
// const user1 = new User('Ali', 'ali@gmail.com', 'ali321');

// 4 Pillars (P-I-A-E)

// Polymorphism , Inheritance, Abstraction, Encapsulation


// user1.greeting()






const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
        lowercase: true 
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password:{
        type: String,
        required: true,

    },

    gender: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
        min: 18,
        max: 50,
    },

    about: {
        type: String,
    },

    skills : {
        type : [String]
    },

    photoUrl : {
        type: String
    }

}, {
    collection: 'users',
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};