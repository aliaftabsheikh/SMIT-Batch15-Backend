var a = 10;

var b = 20;


function sum(x, y) {
    return x + y;
}

console.log("Sum:", sum(a, b));


// setTimeout(()=>{
//     console.log("This message is displayed after 2 seconds");
// }, 2000);

// setInterval(()=>{
//     console.log("This message is displayed every 2 seconds");
// }, 2000);



console.log("GLOBAL ", this);
console.log("GLOBAL", globalThis);
