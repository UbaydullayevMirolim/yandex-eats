"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const jwt_1 = require("../utils/jwt");
const admin_model_1 = __importDefault(require("../models/admin.model"));
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const { id } = (0, jwt_1.verify)(token);
        const admins = await admin_model_1.default.findAll();
        const idAdmins = await admin_model_1.default.findOne({ where: { id } });
        const userAdmin = admins.map((el) => el.dataValues.username);
        const passAdmin = admins.map((el) => el.dataValues.password);
        if (!token) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        const usernamesAdmin = idAdmins?.dataValues.username;
        const passwordAdmin = idAdmins?.dataValues.password;
        console.log(userAdmin.includes(usernamesAdmin));
        if (userAdmin.includes(usernamesAdmin) &&
            passAdmin.includes(passwordAdmin)) {
            return next();
        }
        else {
            res.status(401).json({ message: "Access denied" });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.isAdmin = isAdmin;
