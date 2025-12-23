const express = require("express");
const connectDB = require("./config/database");
const { User } = require("./model/user");
const { validateSignup, validateLogin } = require("./lib/utils");
const bcrypt = require('bcrypt');
const app = express()
require('dotenv').config()
const cookieParser =  require('cookie-parser');

app.use(cookieParser());

app.use(express.json())

const port = process.env.PORT || 3000


app.get('/profile', async (req, res) => {
   try {
     const {id} = req.cookies;

    if(!id){
        throw new Error("Unauthorized Access! Please login to access profile")
    }

    const user = await User.findById(id);
    
    res.status(200).json({ message: "User profile data", user })
   } catch (error) {
    res.status(400).json({ message: "Bad Request", error: error.message })
   }
})

app.post('/signup', async (req, res) => {
    try {

        // Step 1: Validate the incoming data
        const { name, password, email, age, gender } = req.body;

        validateSignup(req)


        // Step 2: Hashed Password 

        const hashedPassword = await bcrypt.hash(password, 10)

        // Step 3: Store the user in the database

        const user = await User({
            name,
            email,
            password: hashedPassword,
            age,
            gender
        })

        await user.save()



        res.status(201).json({ message: "User signed up successfully", data: user })


    } catch (error) {
        res.status(400).json({ message: "Bad Request", error: error.message })
    }
})


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // STEP 1: Validate the incoming data
        validateLogin(req)

        // STEP 2: Check if the user exists in the database

        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("Invalid email or password")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            throw new Error("Invalid email or password")
        }

        res.cookie("id", user._id, {
                expires: new Date(Date.now() + 60 * 10000), // 1 minute
         })

        res.status(200).json({ message: "User logged in successfully", data: user })

    } catch (error) {
        res.status(400).json({ message: "Bad Request", error: error.message })
    }
})


app.post('/logout', (req, res) => {
    res.cookie("id", "", {
        expires: new Date(Date.now() * 0), // Expire the cookie immediately
    })
    res.send("Logout Succuessful")
})




connectDB().then(() => {
    console.log("Database connected successfully !");

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);

    })

}).catch((err) => {
    console.log("Database connection failed", err);
});
