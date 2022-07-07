import { Router } from "express";
import { signIn, signOut } from "../controllers/auth.controller";
const router = Router();

router.route("/signin").post(signIn);
router.route("/signout").get(signOut);

export default router;
