"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStory = exports.getByIdDostavka = exports.destroyDostavka = exports.updateddostavka = exports.getDostavka = exports.createDostavka = void 0;
const dostavka_model_1 = __importDefault(require("../models/dostavka.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
// POST
const createDostavka = async (req, res, next) => {
    try {
        const { status, courier_id, order_id } = req.body;
        const orders = await order_model_1.default.findOne({ where: { id: order_id } });
        const statusOrder = orders?.dataValues.status !== "pending";
        if (statusOrder) {
            return res.status(200).json({ message: "Bu buyurtma olib borilyapti" });
        }
        else {
            await dostavka_model_1.default.create({
                status,
                courier_id,
                order_id,
            });
            if (status == "accept") {
                await order_model_1.default.update({ status: "delivering" }, { where: { id: order_id } });
            }
            res.status(201).json({ message: "Successfully Created" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.createDostavka = createDostavka;
// GET
const getDostavka = async (req, res, next) => {
    try {
        const data = await dostavka_model_1.default.findAll();
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getDostavka = getDostavka;
//  PUT
const updateddostavka = async (req, res, next) => {
    try {
        const { status, courier_id, order_id } = req.body;
        const { id } = req.params;
        if (status === "cancel") {
            await order_model_1.default.update({ status: "pending" }, { where: { id: id } });
        }
        else if (status === "success") {
            await order_model_1.default.update({ status: "delivered" }, { where: { id: id } });
        }
        await dostavka_model_1.default.update({ status, courier_id, order_id }, { where: { id } });
        res.status(201).json({ message: "Updated Delivery" });
    }
    catch (error) {
        next(error);
    }
};
exports.updateddostavka = updateddostavka;
//  DELETE
const destroyDostavka = async (req, res, next) => {
    try {
        const { id } = req.params;
        await dostavka_model_1.default.destroy({ where: { id } });
        res.status(201).json({ message: "Destroyed dostavka" });
    }
    catch (error) {
        next(error);
    }
};
exports.destroyDostavka = destroyDostavka;
//  GET STORY AND BY ID
const getByIdDostavka = async (req, res, next) => {
    try {
        const { id } = req.params;
        const dostvka = await dostavka_model_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "success", dostvka });
    }
    catch (error) {
        next(error);
    }
};
exports.getByIdDostavka = getByIdDostavka;
const getStory = async (req, res, next) => {
    try {
        const id = req.verifyCourier;
        const courierOne = await dostavka_model_1.default.findOne({
            where: { courier_id: id },
        });
        console.log(courierOne);
        if (courierOne == "null") {
            return res
                .status(404)
                .json({ message: "You are not ordered for delivery" });
        }
        res.status(200).json({ courierOne });
    }
    catch (error) {
        next(error);
    }
};
exports.getStory = getStory;
