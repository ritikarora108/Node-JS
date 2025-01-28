import User from "../models/user.js"

async function handleUserSignIn(req, res) {
    try {
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        if (!token) throw new Error('JWT malformed')
        res.cookie("token", token);

        console.log(token);

        return res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('signin', {
            error: "Incorrect Email or Password!"
        })
    } 
}

async function handleUserSignUp(req,res) {
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
    
}


export default {handleUserSignIn, handleUserSignUp}