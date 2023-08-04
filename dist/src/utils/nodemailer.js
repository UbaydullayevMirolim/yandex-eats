"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "umirolim2004@gmail.com",
        pass: "mirolim123456789",
    },
    secure: true,
});
const send = async (mailData) => {
    const data = await exports.transporter.sendMail(mailData);
    return { message: "Success", data: data };
};
exports.send = send;
