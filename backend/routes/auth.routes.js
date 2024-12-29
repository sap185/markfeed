import express from "express";
import { SignUp, Login, checkUser } from "../handlers/handlers.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
// router.get("/refresh-token", RefreshToken);
router.post("/checkUser", checkUser)


export default router;