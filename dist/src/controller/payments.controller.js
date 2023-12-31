"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMoney = void 0;
const joi_1 = __importDefault(require("joi"));
const user_model_1 = __importDefault(require("../models/user.model"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config/config"));
const stripeService = new stripe_1.default(config_1.default.PAYMENT_API_KEY, { apiVersion: "2022-11-15" });
const AddMoney = async (req, res, next) => {
    try {
        let { amount, id, user_id } = req.body;
        const verifiedUser = await user_model_1.default.findOne({ where: { id: user_id } });
        const payment = await stripeService.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Payment",
            payment_method: id,
            confirm: true,
        });
        const schema = joi_1.default.object({
            amount: joi_1.default.number().required(),
            user_id: joi_1.default.number().required(),
        });
        const { error } = schema.validate({ amount, user_id });
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        await user_model_1.default.update({ money: verifiedUser?.dataValues.money + amount }, {
            where: {
                id: verifiedUser?.dataValues.id,
            },
        });
        res
            .status(200)
            .json({ message: `$${amount} are successfully added to your account` });
    }
    catch (error) {
        next(error);
    }
};
exports.AddMoney = AddMoney;
