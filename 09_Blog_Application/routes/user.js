import { Router } from "express";
import User from "../models/user.js";
import authentication from "../services/authentication.js";

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
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body; 
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect('/');
})


router.get('/logout', (req, res) => {
    return res.clearCookie('token').redirect('/');
})


export default router;