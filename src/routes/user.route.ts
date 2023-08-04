import { Router } from "express";
import { loginUser, registerUser, verifyEmail, putUser, getUser } from '../controller/auth.controller';


export const router = Router();

router.post("/api/register", registerUser);
router.post("/api/verify", verifyEmail);
router.post("/api/login", loginUser);
router.put("/api/:id", putUser);
router.get("/api/user", getUser);
