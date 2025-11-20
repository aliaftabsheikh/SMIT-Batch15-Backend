const express = require('express');
const app = express();
const {AdminAuthMiddleware, UserAuthMiddleware} = require('./middleware/middleware')


// app.use('/test', (req, res)=>{
//    res.send('This is a test route');
// })



// app.use('/', (req, res)=>{
//     res.send('Hello World');
// });



// app.use('/product', (req, res)=>{
//     res.send('This is product route');
// });


// app.use('/user', 

// (req,res, next)=>{
//     console.log("This is User route ");
//     next()

//     console.log("START RESPONSE  !");

//     // res.send('User Route');
// },
// (req, res, next)=>{
//     console.log('This is User route 1');
//     next()
//     res.send('Response from User Route 1');
// },
// (req, res, next)=>{
//     console.log('This is User route 2');
//     next()
// }
// )


// app.use('/user', (req, res, next)=>{
//    console.log("This is user Middleware");
//    next()
// });


// app.use('/user', (req, res)=>{
//     res.send('This is User Route');
// });


app.use('/admin', AdminAuthMiddleware)

app.use('/user', UserAuthMiddleware);



app.use('/user/profile', (req, res, next) => {
    res.send("This is User Route !");

})



app.use('/admin/getAllData', (req, res) => {
        res.send('Get All Data Route');
    }

)


app.use('/admin/deleteAllData',(req, res) => {
        res.send('Delete All Data Route');
})


app.use('/admin/updateData', (req, res) => {
    res.send('Update Data Route');
});



app.use('/getProduct', UserAuthMiddleware,

(req, res) => {
    res.send('Get Product Route');
})


app.use('/buyProduct', UserAuthMiddleware, (req, res)=>{
    res.send('Buy Product Route');
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})