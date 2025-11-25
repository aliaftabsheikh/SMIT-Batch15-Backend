const express = require('express');
const { UserMiddleware, AdminMiddleware } = require('./middleware');

const cors = require('cors');
const app = express()

app.use(cors())

const products = [
    {id: 1, name: 'Cricket Bat', price: 1200, category: 'cricket'},
    {id: 2, name: 'Football', price: 800, category: 'football'},
    {id: 3, name: 'Basketball', price: 900, category: 'basketball'},
    {id: 4, name: 'Cricket Ball', price: 150, category: 'cricket'},
    {id: 5, name: 'Football Shoes', price: 2000, category: 'football'},
    {id: 6, name: 'Basketball Jersey', price: 700, category: 'basketball'},
    {id: 7, name: 'Cricket Gloves', price: 400, category: 'cricket'},
    {id: 8, name: 'Football Jersey', price: 650, category: 'football'},
    {id: 9, name: 'Basketball Shoes', price: 1800, category: 'basketball'},
    {id: 10, name: 'Cricket Helmet', price: 900, category: 'cricket'},
    {id: 11, name: 'Football Socks', price: 120, category: 'football'},
    {id: 12, name: 'Basketball Shorts', price: 350, category: 'basketball'},
    {id: 13, name: 'Cricket Pads', price: 600, category: 'cricket'},
    {id: 14, name: 'Football Gloves', price: 300, category: 'football'},
    {id: 15, name: 'Basketball Net', price: 500, category: 'basketball'},
    {id: 16, name: 'Cricket Stumps', price: 250, category: 'cricket'},
    {id: 17, name: 'Football Shin Guards', price: 400, category: 'football'},
    {id: 18, name: 'Basketball Bag', price: 450, category: 'basketball'},
    {id: 19, name: 'Cricket Kit Bag', price: 800, category: 'cricket'},
    {id: 20, name: 'Football Training Cone', price: 100, category: 'football'}
];

// app.use('/admin', (req, res, next)=>{
//     // res.send('Hello from Admin Route')
//     console.log('Admin Route Accessed');
//     next();
// })

// app.use('/products', (req, res, next)=>{
//     console.log('Products Route Accessed');
//     res.send('Hello from Products Route')
// })

// app.use('/admin/getAllUsers', (req, res)=>{
//     res.send('Get All Users from Admin Route')
// })


// app.use('/', (req, res)=>{
//     res.send('Hello from Express')
// })



// app.use('/users',

//     (req, res, next) => {
//         console.log('Router Handler 1');
//         next();
//         console.log("Hello from Users Route");

//         res.send('Hello from Users Route');
//     },

//     (req, res, next) => {
//         console.log('Route Handler 2')
//         next()
//         res.send('Hello from Route Handler 2')
//     },

//     (req, res) => {
//         console.log('Router Handler 3');
//     }
// )


// app.use('/getProducts',

//     UserMiddleware,

//     (req, res) => {
//         res.send('Hello from Products Route')
//     }
// )


// app.use('/deleteProducts',

//     UserMiddleware,


//     (req, res) => {
//         res.send(' Delete Products Route')
//     })


//     app.use('/updateProducts',
//         UserMiddleware,
//         (req, res) => {
//         res.send(' Update Products Route')
//     })



// -------------------



// app.use('/admin', AdminMiddleware)


// app.use('/admin/updateAllProducts', (req, res)=>{
//     res.send('Update All Products Route')
// })


// app.use('/admin/updateAllProducts/getAllProducts', (req, res)=>{
//     res.send('Get All Products Route')
// })

// app.use('/admin/deleteAllProducts', (req, res)=>{
//     res.send('Delete All Products Route')
// })



// app.use('/', (req, res)=>{
//     res.send('This is my first api !')
// })



app.use('/products/:id', (req, res)=>{

    const {id} = req.params
    
    const product = products.find((item)=> item.id === parseInt(id))

    if(!product){
        res.status(404).send('Product Not Found')
    }else{
        res.json(product)
    }
})




app.use('/product', (req, res)=>{

    const {name, id,} = req.query

    const product = products.find((item)=> item.id === parseInt(id))
    
    if(!product){
        res.status(404).send('Product Not Found')
    }else{
        res.json({
            message: `Product send to the user ${name}`,
            data: product
        })
    }

})


app.use('/productsWithCategory', (req, res)=>{
    const {category} = req.query


    const filterProducts = products.filter((item)=> item.category === category)

    if(filterProducts.length === 0){
        res.status(404).send('No Products Found in this Category')
    }else{
        res.json(filterProducts)
    }

})




app.listen('3000', () => {
    console.log('Server is running on port 3000')
})

