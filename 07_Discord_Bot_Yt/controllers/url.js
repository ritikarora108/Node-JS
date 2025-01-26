import URL from "../models/url.js";
import { nanoid } from 'nanoid'

async function handleCreateShortId(req,res) {
    try {
        const { url } = req.body;
        const shortId = nanoid(6);
        await URL.create({
            url,
            shortId
        });
        return res.status(200).json({ shortId: shortId, msg: "This is the shortId generated for your requested URL" });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
}

async function handleRedirectURL(req,res) {
    try {
        const shortId = req.params.shortId;
        const urlEntry = await URL.findOne({ shortId });
        if (urlEntry) {
            const url = urlEntry.url;
            return res.status(200).json({ url });
        }
        return res.status(400).json({ "msg": "url not found" });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export default { handleCreateShortId, handleRedirectURL };