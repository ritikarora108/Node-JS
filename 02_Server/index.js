// GET,POST,PUT,PATCH,DELETE - HTTP Headers


import http from "http";
import fs from "fs"
import dotenv from "dotenv";
// Load environment variables from a .env file
dotenv.config();

import url from "url";
// parse url effectively: host, path,query

const myServer = http.createServer((req, res) => {
    try {
        if (req.url === '/favicon.ico') {
            res.end();
            return;
        }
        let date = new Date();
        const logText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - Request receieved from url : ${req.url} Method: ${req.method} \n`;
        fs.appendFile('log.txt', logText, (err, res) => {
            if (err) {
                console.log(`Error: ${err}`);
            } else {
                console.log(`Log added to the log.txt file`);
            }
        })
        // console.log(req);

        const myUrl = url.parse(req.url,true);
        // console.log(myUrl.pathname);
        console.log(myUrl.pathname);

        switch (myUrl.pathname) {
            case '/': res.end('Hello from Node-Js server');
                break;
            case '/about': 
                console.log(myUrl.query)
                res.end('Hey, I am Ritik Arora');
                break;
            case '/hello':
                const name = myUrl.query.name ?? "Guest";
                res.end(`Hi, ${name}`);
                break;
            case '/search':
                console.log(myUrl.query)
                const text = myUrl.query.search_query;
                res.end(`Below are the results for your query: ${text}`);
                break;

            default: res.end('404 not found')
        }
        // console.log(res.statusCode);
    } catch (error) {
        console.log(`Error: {error}`);
    }
})

const port = process.env.PORT || 8001;
myServer.listen(port, () => console.log(`Server started successfully on ${port}`))

myServer.on('error', (error) => {
    console.log('Server error:' + err);
})