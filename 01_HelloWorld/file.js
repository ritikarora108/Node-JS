import fs from "fs";

// will create (if file not present), and write/override the data

// Sync....Blocking request
// fs.writeFileSync('test.txt','Hey there, this is a test file -> Sync')

// Async......Non-blocking request
// fs.writeFile('test.txt', 'Hey there, this is a test file -> Async', (err) => { })


// const result = fs.readFileSync('./functions.js',"utf-8");
// console.log(result)

// fs.readFile('./hello.js', "utf-8", (err, result) => {
//     if (err) console.log(`Error: ${err}`)
//     else console.log(`Result below:\n ${result}`)
// })

// let date = new Date();
// const currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n`
// fs.appendFileSync('./test.txt', currentTime);


// fs.cpSync('test.txt','copy_test.txt')
// fs.unlinkSync('copy_test.txt')

// console.log(fs.statSync('./test.txt'))
// console.log(fs.statSync('./script.js').isFile())

fs.mkdirSync('./dir_fs')
fs.mkdirSync('./dir_fs_new/a/b/c',{recursive:true})