import authService from "../service/auth.js";


function restrictToLoggedInUserOnly(req, res, next) {
    try {
        // const token = req.cookies?.jwtToken;

        // Request Headers
        //  "Authorization" : "Bearer u4234sdffsd37582374"
        const token = req.headers["Authorization"]?.split("Bearer ")[1];
        if (!token) {
            return res.redirect("/login");
        }

        const user = authService.verifyJwtToken(token);
        if (!user) {
            return res.redirect("/login");
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
    
};

function checkAuth(req, res, next) {
    // const token = req.cookies?.jwtToken;
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split("Bearer ")[1];
    const user = authService.verifyJwtToken(token);
    req.user = user;
    next();
}

export default { restrictToLoggedInUserOnly, checkAuth };