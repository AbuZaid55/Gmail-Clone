import express from "express"; 
import { createEmail, deleteEmail, getAllEmail } from "../controllers/email.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createEmail);
router.route("/:id").delete(isAuthenticated, deleteEmail);
router.route("/getallemails").get(isAuthenticated, getAllEmail);


export default router;
