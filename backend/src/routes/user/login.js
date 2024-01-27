import express from "express";

import * as UserController from "../../controllers/user.js";

const router = express.Router();
router.route("/login").get(UserController.getUser);

export default router;
