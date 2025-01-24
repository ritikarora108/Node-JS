import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./connection.js";
import staticRoute from "./routes/staticRouter.js"
import urlRouter from "./routes/url.js"
import path from "path"
import logReqRes from "./middlewares/index.js"


dotenv.config();

connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log(`MongoDB connected`))
    .catch((err) => console.log(`Error: ${err}`));



const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(logReqRes("./log.txt"));


app.use('/',staticRoute)
app.use('/url', urlRouter)

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port: ${port}`));