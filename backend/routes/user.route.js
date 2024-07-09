import express from "express";
import { getUser, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getuser").get(isAuthenticated,getUser);
router.route("/logout").get(logout);

export default router;
