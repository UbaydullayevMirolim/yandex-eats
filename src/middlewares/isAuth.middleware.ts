import { NextFunction, Request, Response } from "express";
import { verify } from "../utils/jwt";

interface loc extends Request {
  verifyUser?: number;
  id?: number;
}
export const isAuth = (req: loc, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid Token" });

    const { id } = verify(token) as loc;

    req.verifyUser = id;

    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
