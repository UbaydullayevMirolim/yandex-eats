import { NextFunction, Request, Response } from "express";
import Admin from "../models/admin.model";
import { sign } from "../utils/jwt";

export const superAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findAll();
    if (
      admin[0].dataValues.username !== username &&
      admin[0].dataValues.password !== password
    )
      return res
        .status(200)
        .json({ message: "Incorrect username or password" });

    const token = sign({ id: admin[0].dataValues.id });

    res.status(201).json({ message: "Success", token });
  } catch (error: any) {
    next(error);
  }
};



export const addAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const admins = await Admin.create({ username, password });

    const token = sign({ id: admins.dataValues.id });
    res.status(201).json({ message: "Successfully created admin", token });
  } catch (error) {
    next(error);
  }
};
export const getAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admins = await Admin.findAll();
    res.status(201).json({ admins });
  } catch (error) {
    next(error);
  }
};
