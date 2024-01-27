import express from "express";
import SignUpAPI from "./signup.js";
import LoginAPI from "./login.js";

const router = express.Router();

router.use(SignUpAPI);
router.use(LoginAPI);

export default router;
