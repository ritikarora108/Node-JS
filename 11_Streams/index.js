import exp from "constants";
import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import fs from "fs";
import statusMonitor from 'express-status-monitor';
import zlib from "zlib";

const app = express();
app.use(statusMonitor());




app.get('/', (req, res) => {
    // fs.readFile(path.resolve('./big.txt'), 'utf8', (err, data) => {
    //     res.send(data);
    // });

    const stream = fs.createReadStream('./big.txt', 'utf-8');
    stream.on('data', (chunk) => {
        res.write(chunk);
    })
    stream.on('end', () => res.end());
})

app.get('/createZip', (req, res) => {

    // Stream Read (big.txt) ==> Zipper ==> fs Write Stream

    fs.createReadStream('./big.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('./big.zip'));
})

const port = process.env.port || 8001;

app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
    console.log(`http://localhost:${port}`);
})
