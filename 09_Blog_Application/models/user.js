import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import authentication from "../services/authentication.js";

const userSchema = new Schema({
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        required: true,
        default: "/images/default_user.png"
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    }
}, { timestamps: true });


userSchema.pre('save', function (next) {

    try {
        if (!this.isModified("password")) return;
        const salt = randomBytes(16).toString();
        const hashedPassword = createHmac('sha256', salt)
            .update(this.password)
            .digest('hex');

        this.salt = salt;
        this.password = hashedPassword;
        return next();
    } catch (error) {
        console.log(error);
    }
})


userSchema.static('matchPasswordAndGenerateToken', async function (input_email, input_password) {
    try {
        const user = await this.findOne({ email: input_email });
        if (!user) {
            throw new Error("User not found!");
        }


        const hashedPassword = user.password;
        const newGeneratedHashedPassword = createHmac('sha256', user.salt)
            .update(input_password)
            .digest('hex');

        if (hashedPassword !== newGeneratedHashedPassword) {
            throw new Error("Incorrect Password!");
        }
        const token = authentication.createTokenForUser(user);
        return token;
    } catch (error) {
        console.log(error);
    }
})

const User = model("user", userSchema);

export default User;

