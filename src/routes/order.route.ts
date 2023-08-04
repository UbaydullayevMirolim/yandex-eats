import { isAdmin } from "../middlewares/isAdmin.middleware";

import { Router } from "express";
import { createOrder, destroyOrder, getByIdOrder, getDay, getDelivered, getDenied, getOrder, getPending, getSameDayOrders, updatedOrder } from "../controller/order.controller";

export const router = Router();
router.post("/order", createOrder);
router.get("/order", getOrder);
router.get("/order/delivering", getDelivered);
router.get("/order/denied", getDenied);
router.get("/order/delivered", getDelivered);
router.get("/order/day", getDay);
router.get("/order/same_day", getSameDayOrders);
router.get("/order/pending", getPending);
router.delete("/order/:id", isAdmin, destroyOrder);
router.put("/order/:id", updatedOrder);
router.get("/order/:id", getByIdOrder);
