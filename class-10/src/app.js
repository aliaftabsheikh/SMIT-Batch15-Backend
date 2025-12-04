const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
const app = express()
app.use(express.json());

const { connectDB } = require('./config/database');
const {User} = require('./model/userSchema');


// const url = 'mongodb+srv://Database:aliaftab321@cluster0.51l7ww2.mongodb.net/'
// const client = new MongoClient(url)


// Database Name
// const dbName = 'SMIT-Batch-15-Backend';

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to Database');
//   const db = client.db(dbName);
//   const collection = db.collection('second-class');

//   // the following code examples can be pasted here...

//   const insertOne = await collection.insertMany(
//     [
//         { name: 'Ali Aftab' },
//         // { name: 'Ali Khan', age: 22, city: 'Lahore' , profession: 'Developer'},
//         // { name: 'John Smith', age: 26, city: 'Islamabad', profession: 'Designer' },
//         // { name: 'Jane Doe', age: 23, city: 'Peshawar', profession: 'Manager' },

//     ]

//   )

//   console.log('Inserted documents =>', insertOne);

// // const findAll = await collection.findOne({_id: new ObjectId("69315a0ca778245422cd1083")})

// // console.log('Found documents =>', findAll);


// // const findById = await collection.findOne({name: 'Ali Aftab'})

// // console.log('Found documents =>', findById);

// // const deleteOne = await collection.deleteOne({_id: new ObjectId("69315a0ca778245422cd1083")})

// // console.log('Deleted document =>', deleteOne);

// // const updateOne = await collection.updateOne(
// //    {_id: new ObjectId("69315ee54bf2d6bfb13fb936")},
// //    {$set: {name: 'Ali Aftab Version 2', age: 20, city: 'Karachi'}}
// //   );

// //   console.log("Document Updated ==>", updateOne);



//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

app.post('/create-user', async (req, res) => {
   try {

    const data = req.body;

    const user = await User(data)

    await user.save()

    res.send({message: 'User created successfully', user})
   } catch (error) {
    res.send({message: 'Error creating user', error})
   }
})

app.get('/get-users', async (req, res) =>{
    try {
        const users = await User.find({})
        res.send({message: 'Users fetched successfully', users})
    } catch (error) {
        res.send({message: 'Error fetching users', error})
    }
}
)


connectDB().then(() => {
    console.log('Connected successfully to Database using Mongoose');


    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    })

}).catch((err) => {
    console.log('Error connecting to Database', err);
})


