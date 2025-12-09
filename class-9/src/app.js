const express = require('express');
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://Database:aliaftab321@cluster0.51l7ww2.mongodb.net/'
const client = new MongoClient(url, {
  tls: true,
  tlsInsecure: true, // ⚠️ ONLY for development/debugging
});

const dbName = 'SMIT-Batch-15-Backend';

async function main(){
    console.log("START CONNECTING....");
    
    await client.connect();
    console.log('Connected successfully to Database');

    const db = client.db(dbName);

    const collection = db.collection('first-class')

    // const insertOne = await collection.insertOne({name: 'Abbas', age: 19, city: 'Karachi'})

    // console.log('Inserted documents =>', insertOne);


    const findResult = await collection.find({name: 'Abbas'}).toArray();
console.log('Found documents =>', findResult);


    return 'done.';

}

main()


const app = express();


app.listen(3000, () => {  
    console.log("Server is listening on port 3000");
})