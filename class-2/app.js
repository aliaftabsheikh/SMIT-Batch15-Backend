require('./greeting.js');

const data = require('./data.json');


// // const { multiply } = require('./calculate/multiply.js');
// // const {add} = require('./calculate/add.js');
// // const {divide} = require('./calculate/index.js');


const {add, divide, multiply} = require('./calculate');

// // console.log(add);

// a = 10;


// let b = 20;

// a = 10;


// // function sum(x, y) {
// //     return x + y;
// // }

// // console.log(sum(a, b));

// // greet('Ali')
// // console.log(message);

// // console.log(multiply(a, b));

// // console.log(a, b);


// // console.log(data);


// console.log("DIVIDE --->",divide(100, 5)
// );

// console.log('Multiply ---->', multiply(10, 5));


// console.log('Add--->', add(10,10));



(
    function (module, require) {

        console.log('This is Addition file');

        let a = 20
        let b = 10

        function add(x, y) {
            return x + y;
        }

        add(a, b);


    }
)(module, require)




const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    res.send(data)
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})