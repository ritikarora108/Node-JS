import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import path from "path";
import connectMongoDB from "./connection.js";
import cookieParser from "cookie-parser";
// import logReqRes from "./middlewares/serverLog.js";
import authentication from "./middlewares/authentication.js"
import userRouter from "./routes/user.js" 
import blogRouter from "./routes/blog.js"
import Blog from "./models/blog.js"


connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log(`MongoDb Connected!`))
    .catch(err => console.log(err));


    
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
    
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(logReqRes(process.env.SERVER_LOG_FILE));
app.use(express.static(path.resolve('public')));

app.use(authentication.checkForAuthenticationCookie("token"));



const port = process.env.PORT || 8000;
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    // console.log(allBlogs)
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
})


app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));