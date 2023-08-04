"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const payments_controller_1 = require("../controller/payments.controller");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.post("/payment", payments_controller_1.AddMoney);
