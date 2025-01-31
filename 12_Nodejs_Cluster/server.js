import cluster from "cluster";
import os from "os";
import express from "express";
import { configDotenv } from "dotenv";
configDotenv();

const totalCpus = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary: ${process.pid} is running`);

    for (let worker = 0; worker < totalCpus; worker++){
        cluster.fork();
    }

} else {
    const app = express();
    const port = process.env.PORT || 8001;
    
    app.get('/', (req, res) => {
        return res.json({ message: `Hello from Express Server🚀 : Worker - ${process.pid}` });
    })
    
    app.listen(port, () => {
        console.log(`Server running on : http://localhost:${port}`);
    })
}