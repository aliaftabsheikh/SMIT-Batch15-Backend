const express = require('express');
const { connectDb } = require('./config/database');
const {User} = require('./model/user');

const app = express();
app.use(express.json());


app.post('/users', async (req, res)=>{
    try {

        const data = req.body;

        const user = await User(data);

        await user.save();

        res.status(201).send({
            message: "User created successfully",
            user: user
        })


        
    } catch (error) {
        res.status(400).json({
            message: "Error creating user",
            error: error.message
        })
    }
})




connectDb().then(() => {
    console.log("Database connected successfully");


    app.listen(3000, () => {
        console.log("Server is running on port 3000 ");
    })

}).catch((err) => {
    console.log("Database connection failed", err);
});
