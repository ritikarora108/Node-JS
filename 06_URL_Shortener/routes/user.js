import express from "express";
import userController from "../controllers/user.js";

const { handleUserSignup, handleUserLogin } = userController;

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;
