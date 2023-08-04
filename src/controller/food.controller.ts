import { NextFunction, Request, RequestHandler, Response } from "express";
import { v4 as uuid } from "uuid";
import Food from "../models/food.model";
import { IFood } from "../types/types";


interface imageType extends Request {
  imageName: string;
}

export const foodPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, restaurant_id } = req.body as  IFood ;
    const image = req.files?.image;

    if (!image) {
      return res.status(400).json({ message: "Image not found" });
    }

    const extname = Array.isArray(image)
      ? image[0].mimetype.split("/")[1]
      : image.mimetype.split("/")[1];
    const imageName = `${uuid()}.${extname}`;

    if (Array.isArray(image)) {
      image[0].mv(`${process.cwd()}/uploads/${imageName}`);
    } else {
      image.mv(`${process.cwd()}/uploads/${imageName}`);
    }

    await Food.create({ image: imageName, name, price, restaurant_id });

    res.status(201).json({ message: "Successfully Created" });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

// UPDATED

export const updateFoods:RequestHandler = async (
    req: Request, 
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = req.params;
      const {name, price , restaurant_id}= req.body;
        await Food.update( {
        name, price ,restaurant_id
      }, {where: {id}})
  
   
      res.status(201).json({ message: "Successfully Updated" });
      } catch (error: any) {
     next(error)
    }
};

// GET FOODS

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods = await Food.findAll();

    res.status(200).json({ message: "Success", foods });
  } catch (error) {
    next(error);
  }
};


export const getByIdFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const food = await Food.findByPk(id);

    res.status(200).json({ message: "success", food });
  } catch (error) {
    next(error);
  }
};



// DELETE FOODS

export const destroyFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await Food.destroy({ where: { id } });
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    next(error);
  }
};