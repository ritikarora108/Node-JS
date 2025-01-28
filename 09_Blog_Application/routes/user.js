import { Router } from "express";
import User from "../models/user.js";
import authentication from "../services/authentication.js";
import upload from "../services/fileUpload.js";

import userController from "../controllers/user.js"

const { handleUserSignIn, handleUserSignUp } = userController;

const router = Router();

router.get('/signin', (req, res) => {
    return res.render('signin');
})

router.post('/signin', handleUserSignIn)

router.get('/signup', (req, res) => {
    return res.render('signup');
})
router.post('/signup', upload.single('profileImage'), handleUserSignUp)


router.get('/logout', (req, res) => {
    return res.clearCookie('token').redirect('/');
})


export default router;