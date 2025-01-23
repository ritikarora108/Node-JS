import express from "express"
import urlControllers from "../controllers/url.js"

const { handleGenerateNewShortURL,handleRedirectURL,handleGetAnalytics } = urlControllers;

const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/:shortId', handleRedirectURL);
router.get('/analytics/:shortId',handleGetAnalytics)

export default router;