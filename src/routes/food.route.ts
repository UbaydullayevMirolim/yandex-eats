import { Router } from "express";

import { isAdmin } from "../middlewares/isAdmin.middleware";
import { destroyFoods, foodPosts, getByIdFood, getFoods, updateFoods } from "../controller/food.controller";

export const router = Router();

router.post("/post/food", foodPosts);
router.get("/get/food", getFoods);
router.get("/get/food/:id", getByIdFood);
router.put("/put/food/:id",isAdmin, updateFoods);
router.delete("/delete/food/:id",isAdmin, destroyFoods);
