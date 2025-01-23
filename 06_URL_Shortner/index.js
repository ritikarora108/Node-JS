import express from "express"
import dotenv from "dotenv"
import connectMongoDB  from "./connection.js";
import urlRouter from "./routes/url.js"

dotenv.config();

connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log(`MongoDB connected`))
    .catch((err) => console.log(`Error: ${err}`));

const app = express();
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/url',urlRouter)

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port: ${port}`));