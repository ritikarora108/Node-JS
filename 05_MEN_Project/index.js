import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./connection.js"
import userRouter from "./routes/user.js"
import logReqRes from "./middlewares/index.js"

dotenv.config();

// Db connection
connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log(`MongoDb Connected successfully`))
    .catch(err => console.log(`Mongo Error: ${err}`));

const app = express();

// MiddleWares
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes("log.txt"));

// Routes
app.use('/api/users', userRouter);

const port = process.env.PORT || 8001;

app.listen(port,()=> console.log(`Server started on port: ${port}`))

