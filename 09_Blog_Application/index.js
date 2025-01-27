import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import userRouter from "./routes/user.js" 
import connectMongoDB from "./connection.js";
configDotenv();

connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log(`MongoDb Connected!`))
    .catch(err => console.log(err));

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const port = process.env.PORT;
app.get('/', (req, res) => {
    res.render('home')
})


app.use('/user', userRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));