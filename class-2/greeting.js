
console.log('This is greeting file ');


let message = 'Welcome to the Nodejs world!';


function greet(name){
    console.log('Hello, ' + name + '!');
}

module.exports = {
    message,
    greet
}