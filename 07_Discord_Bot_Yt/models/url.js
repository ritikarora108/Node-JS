import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique:true,
    }
}, { timestamps: true });

const URL = mongoose.model("url", urlSchema);

export default URL;