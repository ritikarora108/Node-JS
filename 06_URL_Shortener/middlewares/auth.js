import authService from "../service/auth.js";

function restrictToLoggedInUserOnly(req, res, next) {
    try {
        const userUid = req.cookies.uid;
        if (!userUid) {
            return res.render("login.ejs");
        }

        const user = authService.getUser(userUid);
        if (!user) {
            return res.render("login.ejs");
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
    
};

function checkAuth(req, res, next) {
    const userUid = req.cookies.uid;
    const user = authService.getUser(userUid);
    req.user = user;
    next();
}

export default { restrictToLoggedInUserOnly, checkAuth };