import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const secret = process.env.JWT_SECRET;

function createTokenForUser(user) {
    try {
        const payload = {
            _id: user._id,
            email: user.email,
            profileImageURL: user.profileImageURL,
            role: user.role,
            fullName: user.fullName
        };
        const token = jwt.sign(payload, secret);
        return token;
    } catch (error) {
        console.log(error);
    }
}

function validateToken(token) {
    try {
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        console.log(error);
    }
}

export default { createTokenForUser, validateToken };