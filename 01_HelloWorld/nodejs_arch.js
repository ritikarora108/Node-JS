// Note: Better to write non-blocking code(async), so that client doesn't have to wait much if the
// threads are busy processing some other task                    -> Scalability issues


// By default, 4 threads are available in Thread Pool
// Max? threads : os.cpus.length() -> 8 core cpu -> 8 max threads


/*

Node js architecture:->


Client --------request-->      (Server)    Event Queue |r0 |r1 |r2 | | | | |    <--queue--
                                              ^           
                                             |   
                                            watch
                                            |
                                        Event Loop  |------>|
                                            |        |<------|
                                            |
                                    Process request req1
                                    /         \
                            (sync)blocking    non-blocking(async)
                        Thread Pool                             \
                -check any free thread                          -will start processing the  
                (assign task, and get the result ,          request and respond back to user
                and respond back to client)                  once the exec gets completed



*/



// import os from "os"
// console.log(os.cpus().length);  // 8 core cpu



import fs from "fs"

console.log(1);


// Sync-  Blocking..
// const result = fs.readFileSync('test.txt',"utf-8")
// console.log(result)

// Async- Non-blocking..
fs.readFile('test.txt', "utf-8", (err, result) => {
    if (err) console.log(err);
    else console.log(result)
})

console.log(2);



