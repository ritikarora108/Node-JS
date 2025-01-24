import express from "express"
import URL from "../models/url.js"

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const urlEntries = await URL.find({});
        res.render("home.ejs", {
            urlEntries: urlEntries,
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
})

export default router;