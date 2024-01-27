import express from "express";
import * as UserController from "../../controllers/user.js";

const router = express.Router();
router.route("/signup").post(UserController.addUser);

export default router;
