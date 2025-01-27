import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";

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
    profileImage: {
        type: String,
        required: true,
        default: "../public/images/default.png"
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    }
}, { timestamps: true });


userSchema.pre('save', function (next) {

    if (!this.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(this.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    next();
})


userSchema.static('matchPassword', async function (input_email, input_password) {
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

    const { password, salt, ...sanitizedUser } = user._doc;
    return sanitizedUser;
})

const USER = model("user", userSchema);

export default USER;

