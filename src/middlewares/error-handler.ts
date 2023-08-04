import {NextFunction, Request, RequestHandler, Response} from "express";
import { CustomerError } from "../utils/custom-error";

export const errorHandler = async (
  error: CustomerError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.code || 500).json({message: error.message});
};
