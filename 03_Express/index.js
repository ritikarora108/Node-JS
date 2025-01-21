/*
    app.METHOD(PATH, HANDLER)
*/



/*
import http from "http"
import url from "url" // to parse url

function requestHandler(req, res) {
    // handle req and send back the res
}

const server = http.createServer(requestHandler)
server.listen(port, () => console.log(`Server started!`));

*/

/*

                |
                |
                |
                V
*/

/*

import http from "http"
import express from "express"
const app = express()


app.get('/', (req, res) => {
    res.end(`Hi from Home Page`)
})
app.get('/about', (req, res) => {
    res.end(`Hey I am Ritik Arora!`)
})
app.get('/hello', (req, res)=>{
    res.end(`Hello ${req.query.name}`)
})

const server = http.createServer(app)
server.listen(8000,()=>console.log(`Server started!`))

*/


/*

                |
                |
                |
                V
*/


import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()


app.get('/', (req, res) => {
    res.send('Home Page');
})
app.get('/hello', (req, res) => {
    res.send(`Hello ${req.query.name}`);
})
const port = process.env.port || 8001;

app.listen(port,()=>console.log(`Server started on port:${port}`))