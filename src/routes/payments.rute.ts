import { AddMoney } from "../controller/payments.controller";
import { Router } from "express";

export const router = Router();
router.post("/payment", AddMoney);
