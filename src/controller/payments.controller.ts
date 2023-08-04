import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import User from "../models/user.model";
import stripe from "stripe";
import config from "../../config/config";

const stripeService = new stripe(
  config.PAYMENT_API_KEY,
  { apiVersion: "2022-11-15" }
);




export const AddMoney: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { amount, id, user_id } = req.body;
    
    const verifiedUser = await User.findOne({where: {id: user_id}});

    const payment = await stripeService.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Payment",
      payment_method: id,
      confirm: true,
    });


    const schema = Joi.object({
      amount: Joi.number().required(),
      user_id: Joi.number().required(),
    });

    const { error } = schema.validate({ amount, user_id });
    if (error) {
      return res.status(403).json({ error: error.message });
    }

    await User.update(
      { money: verifiedUser?.dataValues.money + amount },
      {
        where: {
          id: verifiedUser?.dataValues.id,
        },
      }
    );
    res
      .status(200)
      .json({ message: `$${amount} are successfully added to your account` });
  } catch (error: any) {
    next(error);
  }
};
