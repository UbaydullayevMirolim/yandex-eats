import { isAdmin } from "../middlewares/isAdmin.middleware";
import { createRestaurant, destroyRestaurant, getByIdRestaurant, getLocationRestaurant, getRestaurant, updateRestaurant } from '../controller/restaurant.controller';

import { Router } from "express";

export const router = Router();
router.get("/restaurant", getRestaurant);
router.post("/restaurant", createRestaurant);
router.get("/restaurant/location", getLocationRestaurant);
router.delete("/restaurant/:id", isAdmin, destroyRestaurant);
router.put("/restaurant/:id", isAdmin, updateRestaurant);
router.get("/restaurant/:id", getByIdRestaurant);
