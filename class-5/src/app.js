const express = require('express');
const app = express();

app.use(express.json())

const products = []


// app.get('/', (req, res) => {
//     res.send("This is the home route");
// })

// app.get('/products', (req, res) => {
//     res.json(products);
// });

// app.post('/products', (req, res) => {
//     const data = req.body;
  
//     products.push(data)

//     res.send(
//         {
//             message: "Product added successfully",
//             product: data
//         }
// )
//     ;
// })


// app.use('/products', (req, res) => {
//     console.log("API REQUEST -->", req.method);

//     if(req.method === "GET"){
//          res.json(products);
//     }

//     if(req.method === "POST"){
//         const data = req.body;
//         products.push(data);
//         res.send({
//             message: "Product added successfully",
//             product: data
//         });
//     }
// })





// app.use('/hello', (req, res)=>{
//     res.send("Hello World !");
// })

 

// app.use('/hello/245/678', (req, res)=>{
//     res.send("Hello World 245 / 678 !");
// })


// app.use('/hello/245', (req, res)=>{
//     res.send("Hello World 245 !");
// })    


// app.use('/test', (req, res) => {
//     res.send("This is the test route");
// })

// app.use('/hello/123', (req, res)=>{
//     res.send("Hello World 123 !");
// })


// app.use('/', (req, res)=>{
//     res.send("This is the home route");
// })

// app.use('/products', (req, res, next)=>{
//     console.log("This is Product 1 route")
    
//     // res.send("This is the product 1 route");
//     next()
// },

// (req, res, next)=>{
//     console.log("This is Product 2 route")
    
//     // res.send("This is the product 2 route");

//     next()
// },

// (req, res, next)=>{


//     next()
//     console.log("This is Product 3 route")


//     // res.send("This is the product 3 route");
// }

// )

const token = 123


app.use('/products',
    (req, res, next)=>{
        const isAuthenticated = token === 12;

        if(!isAuthenticated){
            res.status(401).send("Unauthorized Access");
        }else{
            next()
        }
    },
    
    (req, res)=>{
    res.send("This is all products route");
})





app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

