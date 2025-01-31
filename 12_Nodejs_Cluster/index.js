import { configDotenv } from "dotenv";
configDotenv();
import express from "express";

const app = express();
const port = process.env.PORT || 8001;

app.get('/', (req, res) => {
    return res.json({ message: `Hello from Express Server🚀 : ${process.pid}` });
})

app.listen(port, () => {
    console.log(`Server running on : http://localhost:${port}`);
})