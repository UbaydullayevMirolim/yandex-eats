import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { addAdmin, getAdmins, superAdmin } from "../controller/admin.controller";

export const router = Router();

router.post("/admin", isAdmin, superAdmin);
router.post("/addAdmin",  addAdmin);
router.get("/getAdmins", isAdmin, getAdmins);
