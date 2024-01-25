import express from "express";

import * as UserController from "../../controllers/user.js";

//import authentication from "../../middlewares/authentication.js";
//import authorisation from "../../middlewares/agent/authorisation.js";

const router = express.Router();

router.route("/login").get(UserController.getUser);
//.put(UserController.updateUser)
//.delete(UserController.deleteUser);

export default router;
