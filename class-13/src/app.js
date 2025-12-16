const connectDB = require("./config/database");
const express = require("express");
const { User } = require("./model/user");
const validator = require("validator");
const bcrypt = require("bcrypt")

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is working !");
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        
    }
})


app.post('/signup', async (req, res)=>{
    try {
       const {name, email, password, age, gender} =  req.body


    //    Step 1

       if(!name){
        throw new Error("Name is required")
       }
       else if(!validator.isEmail(email)){
        throw new Error("Invalid Email Address")
       }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough")
    }

    // Step 2 

    const hashedPassword = await bcrypt.hash(password, 10);



    const user = await User({
        name,
        email,
        password: hashedPassword,
        age,
        gender

    })

    await user.save();



                

    res.json({message: "User registered successfully !", user});


    } catch (error) {
        res.status(400).json({error: error.message});
    }
} )

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!validator.isEmail(email)){
            throw new Error("Invalid Email Address")
        }else if(!validator.isStrongPassword(password)){
            throw new Error("Password is not strong enough")
        }

        const user = await User.findOne({email})

        if(!user){
            throw new Error("Invalid email or password")
        }


        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            throw new Error("Invalid email or password")
        }
        

        res.send({
            message: "User logged in successfully !",
            user
        })



    } catch (error) {
        res.status(400).json({error: error.message});
    }
})


connectDB().then(() => {
    console.log("Database connected successfully !");

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
}).catch((err) => {
    console.log("Database connection failed", err);
});
