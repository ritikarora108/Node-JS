import { Router } from "express";
import USER from "../models/user.js";

const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin');
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await USER.matchPassword(email, password);
        console.log(user);
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('signin', {
            msg: "Incorrect Email or Password!"
        })
    }
})

router.get('/signup', (req, res) => {
    return res.render('signup');
})
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body; 
    await USER.create({
        fullName,
        email,
        password
    })
    return res.redirect('/');
})



export default router;