// const http = require("http")  // it will check in built-in packages

// const math_functions = require("./functions") // it will search for functions.js in current directory

/*

// Common Js module syntax
const { add, sub } = require("./functions")

console.log(add(3, 4))
console.log(sub(6,7))

*/

/*
// Coomon js module syntax
const math_functions = require("./functions.js")
console.log(math_functions.add(5,6))

 */



// 'require' won't work as package.json specifies "type": "module"
// import math_functions from "./functions.js"  // New ES module syntax

// ES Module syntax

import math_functions from "./functions.js"

console.log(math_functions.add(4,5))
console.log(math_functions.sub(9,8));

// import cryptography from "crypto"
// console.log(cryptography);