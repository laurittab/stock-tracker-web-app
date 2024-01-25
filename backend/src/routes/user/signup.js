import express from "express";

import * as UserController from "../../controllers/user.js";

//import authentication from "../../middlewares/authentication.js";
//import authorisation from "../../middlewares/agent/authorisation.js";

const router = express.Router();

router.route("/signup").post(UserController.addUser);

export default router;
