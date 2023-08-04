import { NextFunction, Request, Response } from "express";
import Delivery from "../models/dostavka.model";
import Order from "../models/order.model";

// POST

export const createDostavka = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, courier_id, order_id } = req.body;

    const orders = await Order.findOne({ where: { id: order_id } });
    const statusOrder = orders?.dataValues.status !== "pending";

    if (statusOrder) {
      return res.status(200).json({ message: "Bu buyurtma olib borilyapti" });
    } else {
      await Delivery.create({
        status,
        courier_id,
        order_id,
      });
      if (status == "accept") {
        await Order.update(
          { status: "delivering" },
          { where: { id: order_id } }
        );
      }

      res.status(201).json({ message: "Successfully Created" });
    }
  } catch (error) {
    next(error);
  }
};

// GET

export const getDostavka = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Delivery.findAll();

    res.status(200).json({ message: "success", data });
  } catch (error) {
    next(error);
  }
};

//  PUT

export const updateddostavka = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, courier_id, order_id } = req.body;
    const { id } = req.params;
    if (status === "cancel") {
      await Order.update({ status: "pending" }, { where: { id: id } });
    } else if (status === "success") {
      await Order.update({ status: "delivered" }, { where: { id: id } });
    }
    await Delivery.update({ status, courier_id, order_id }, { where: { id } });
    res.status(201).json({ message: "Updated Delivery" });
  } catch (error) {
    next(error);
  }
};

//  DELETE

export const destroyDostavka = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Delivery.destroy({ where: { id } });
    res.status(201).json({ message: "Destroyed dostavka" });
  } catch (error) {
    next(error);
  }
};

//  GET STORY AND BY ID

export const getByIdDostavka = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const dostvka = await Delivery.findOne({ where: { id } });

    res.status(200).json({ message: "success", dostvka });
  } catch (error) {
    next(error);
  }
};

interface loc extends Request {
  verifyCourier?: number;
  id?: number;
}
export const getStory = async (req: loc, res: Response, next: NextFunction) => {
  try {
    const id = req.verifyCourier;
    const courierOne: any = await Delivery.findOne({
      where: { courier_id: id },
    });
    console.log(courierOne);
    if (courierOne == "null") {
      return res
        .status(404)
        .json({ message: "You are not ordered for delivery" });
    }

    
    res.status(200).json({ courierOne });
  } catch (error) {
    next(error);
  }
};
