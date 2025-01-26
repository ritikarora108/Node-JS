import express from "express";
import urlControllers from "../controllers/url.js"

const { handleCreateShortId, handleRedirectURL } = urlControllers;

const router = express.Router();

router.get('/:shortId', handleRedirectURL);
router.post('/', handleCreateShortId);

export default router;