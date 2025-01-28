import cookieParser from "cookie-parser";
import authentication from "../services/authentication.js";

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const cookieValue = req.cookies[cookieName];
        if (!cookieValue) return next();

        try {
            const userPayload = authentication.validateToken(cookieValue);
            req.user = userPayload;
            
        } catch (error) {
            console.log(error);
        }
        return next();

    }
}

export default {checkForAuthenticationCookie};