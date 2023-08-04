import { isAdmin } from "../middlewares/isAdmin.middleware";
import { isCourier } from "../middlewares/isCourier.middleware";
import { getStory } from "../controller/dostaka.controller";


import { Router } from "express";
import { createCouriers, destroyCourier, getByIdCourier, getCourier, loginCourier, updatedCourier } from "../controller/courier.controller";

export const router = Router();
router.post("/courier", isAdmin, createCouriers);
router.get("/courier", getCourier);
router.post("/courier/login", loginCourier);
router.delete("/courier/:id", isAdmin, destroyCourier);
router.put("/courier/:id", isAdmin, updatedCourier);
router.get("/courier/:id", getByIdCourier);
