import express from "express";
import { SignIn, Login, getUserDetails } from "./handlers.js";
import verifyToken from "./middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", SignIn);
router.post("/login", Login);
router.get("/user", verifyToken, getUserDetails);

export default router;