import { createDostavka, destroyDostavka, getByIdDostavka, getDostavka, getStory, updateddostavka } from "../controller/dostaka.controller";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { isCourier } from "../middlewares/isCourier.middleware";

import { Router } from "express";

export const router = Router();
router.post("/delivery",  createDostavka);
router.get("/delivery", getDostavka);
router.get("/delivery/story", isCourier, getStory);
router.delete("/delivery/:id", isAdmin, destroyDostavka);
router.put("/delivery/:id",  updateddostavka);
router.get("/delivery/:id", getByIdDostavka);
