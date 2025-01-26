import express from "express";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Handles form data

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'uploads/')
    },
    filename: (req, file, cb) => { 
        return cb(null, `${Date.now()} - ${ file.originalname }`);
    },
})
const upload = multer({ storage });

app.get("/", (req, res) => {
    res.render("homepage");
})

// app.post('/upload', upload.single('profileImage'), (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
//     res.redirect('/');
// })

// app.post('/upload', upload.fields([{ name: "profileImage"}, { name: "coverImage" }]), (req,res) => {
//     console.log(req.file);
//     res.redirect('/');
// });

app.post('/upload', upload.array('profileImage'), (req, res) => {
    res.redirect('/');
})

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on PORt: ${port}`));