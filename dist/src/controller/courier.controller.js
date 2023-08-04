"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdCourier = exports.destroyCourier = exports.updatedCourier = exports.getCourier = exports.loginCourier = exports.createCouriers = void 0;
const courier_model_1 = __importDefault(require("../models/courier.model"));
const jwt_1 = require("../utils/jwt");
// CREATE
const createCouriers = async (req, res, next) => {
    try {
        const { username, phoneNumber } = req.body;
        const courier = await courier_model_1.default.create({
            username,
            phoneNumber,
        });
        const token = (0, jwt_1.sign)({ id: courier.dataValues.id });
        res.status(201).json({ message: "Successfully Created", token });
    }
    catch (error) {
        next(error);
    }
};
exports.createCouriers = createCouriers;
// LOGIN
const loginCourier = async (req, res, next) => {
    try {
        const { username, phoneNumber } = req.body;
        const userEmail = await courier_model_1.default.findOne({ where: { phoneNumber } });
        if (userEmail?.dataValues.username !== username &&
            userEmail?.dataValues.phoneNumber !== phoneNumber) {
            return res.status(403).json({ message: "Invalid email or password" });
        }
        const id = userEmail?.dataValues.id;
        await courier_model_1.default.create({
            username,
            phoneNumber,
        });
        const token = (0, jwt_1.sign)({ id: id });
        res.status(201).json({ message: "Successfully Created", token });
    }
    catch (error) {
        next(error);
    }
};
exports.loginCourier = loginCourier;
const getCourier = async (req, res, next) => {
    try {
        const couriers = await courier_model_1.default.findAll();
        res.status(200).json({ message: "success", couriers });
    }
    catch (error) {
        next(error);
    }
};
exports.getCourier = getCourier;
// UPDATED
const updatedCourier = async (req, res, next) => {
    try {
        const { username, phoneNumber } = req.body;
        const { id } = req.params;
        await courier_model_1.default.update({ username, phoneNumber }, { where: { id } });
        res.status(201).json({ message: "Updated Courier success" });
    }
    catch (error) {
        next(error);
    }
};
exports.updatedCourier = updatedCourier;
// DELETE
const destroyCourier = async (req, res, next) => {
    try {
        const { id } = req.params;
        await courier_model_1.default.destroy({ where: { id } });
        res.status(201).json({ message: "Deleted Courier" });
    }
    catch (error) {
        next(error);
    }
};
exports.destroyCourier = destroyCourier;
const getByIdCourier = async (req, res, next) => {
    try {
        const { id } = req.params;
        const courier = await courier_model_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "success", courier });
    }
    catch (error) {
        next(error);
    }
};
exports.getByIdCourier = getByIdCourier;
