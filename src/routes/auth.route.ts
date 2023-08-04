import { Router } from "express";
import { getUser, loginUser, putUser, registerUser, verifyEmail } from "../controller/auth.controller";


export const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/verify", verifyEmail);
router.post("/auth/login", loginUser);
router.put("/:id", putUser);
router.get("/user", getUser);
