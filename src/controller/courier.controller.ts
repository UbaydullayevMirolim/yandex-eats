import { NextFunction, Request, Response } from "express";
import Courier from "../models/courier.model";
import { sign } from '../utils/jwt';


// CREATE

export const createCouriers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phoneNumber } = req.body;

    const courier = await Courier.create({
      username,
      phoneNumber,
    });

    const token = sign({ id: courier.dataValues.id });

    res.status(201).json({ message: "Successfully Created", token });
  } catch (error) {
    next(error);
  }
};

// LOGIN

export const loginCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phoneNumber } = req.body;
    const userEmail = await Courier.findOne({ where: { phoneNumber } });
    if (
      userEmail?.dataValues.username !== username &&
      userEmail?.dataValues.phoneNumber !== phoneNumber
    ) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const id = userEmail?.dataValues.id;

    await Courier.create({
      username,
      phoneNumber,
    });
    const token = sign({ id: id });

    res.status(201).json({ message: "Successfully Created", token });
  } catch (error) {
    next(error);
  }
};

export const getCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const couriers = await Courier.findAll();
    res.status(200).json({ message: "success", couriers });
  } catch (error) {
    next(error);
  }
};

// UPDATED

export const updatedCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, phoneNumber } = req.body;
    const { id } = req.params;
    await Courier.update({ username, phoneNumber }, { where: { id } });
    res.status(201).json({ message: "Updated Courier success" });
  } catch (error) {
    next(error);
  }
};

// DELETE

export const destroyCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Courier.destroy({ where: { id } });

    res.status(201).json({ message: "Deleted Courier" });
  } catch (error) {
    next(error);
  }
};

export const getByIdCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const courier = await Courier.findOne({ where: { id } });

    res.status(200).json({ message: "success", courier });
  } catch (error) {
    next(error);
  }
};
