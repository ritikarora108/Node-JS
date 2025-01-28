import { Router } from "express";
import User from "../models/user.js";
import authentication from "../services/authentication.js";
import upload from "../services/fileUpload.js";

const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin');
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        if(!token) throw new Error('JWT malformed')
        res.cookie("token", token);

        console.log(token);
        
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('signin', {
            error: "Incorrect Email or Password!"
        })
    }
})

router.get('/signup', (req, res) => {
    return res.render('signup');
})
router.post('/signup', upload.single('profileImage'), async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Prepare the data to be inserted
        const userData = {
            fullName,
            email,
            password,
            profileImageURL: req.file ? `/uploads/${req.file.filename}` : undefined  // If file exists, use the path
        };

        // Create the user with the prepared data
        await User.create(userData);

        return res.redirect('/user/signin');
    } catch (error) {
        console.log(error);
    }

})


router.get('/logout', (req, res) => {
    return res.clearCookie('token').redirect('/');
})


export default router;