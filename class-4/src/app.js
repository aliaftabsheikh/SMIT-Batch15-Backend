const express = require('express')
const app = express()

// const data = require('./data.json')

app.use(express.json())

const products = [
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
   
  },
  {
    "id": 3,
    "title": "Mens Cotton Jacket",
    "price": 55.99,
   
  },
  

]

app.get('/', (req, res)=>{
    res.send('Hello from Express Server')
})

app.get('/test', (req, res)=>{
    res.send('This is test route')
})

app.get('/products', (req, res)=>{
    res.json(products)
})

app.post('/addProduct', (req, res)=>{
    const data = req.body;
    products.push(data)
    
    res.send({
        message: 'Product added successfully',
        product : data
    })
})

app.delete('/deleteProduct', (req, res)=>{

})

app.put('/updateProduct', (req, res)=>{

})


app.listen(4000, ()=>{
    console.log('Server is running on port 4000');
})

