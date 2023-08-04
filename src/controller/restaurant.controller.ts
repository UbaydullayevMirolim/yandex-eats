import { v4 as uuid } from "uuid";
import { NextFunction, Request, RequestHandler, Response } from "express";
import Restaurant from "../models/restaurant.model";
import Food from "../models/food.model";
import Users from "../models/user.model";

// Create 
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lattitude, closeTo, longtitude, openTo } = req.body;
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

    await Restaurant.create({
      image: imageName,
      name, lattitude, closeTo, longtitude, openTo
    });

    res.status(201).json({ message: "Successfully Created" });
  } catch (error) {
    next(error);
  }
};


// Updated
 
export const updateRestaurant:RequestHandler = async (
    req: Request, 
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = req.params;
      const {name, owner ,openTo, closeTo}= req.body;
        await Restaurant.update( {
        name, owner ,openTo, closeTo
      }, {where: {id}})
  
   
      res.status(201).json({ message: "Successfully Updated" });
  
      } catch (error: any) {
      next(error);
    }
  };

// DELETE

  export const destroyRestaurant:RequestHandler = async (
    req: Request, 
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = req.params;



        await Restaurant.destroy({where:{id}});
  
   
        res.status(201).json({ message: "Successfully deleted" });
  
      } catch (error: any) {
        next(error)
    }
};

// Get 
interface loc extends Request {
  verifyUser?: number;
}

export const getRestaurant:RequestHandler = async (
  req: loc,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Restaurant.findAll({
      include: {
        model: Food,
      },
    });
    res.status(200).json({ message: "Success", data });
  } catch (error) {
    next(error);
  }
};

export const getByIdRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const rest = await Restaurant.findOne({ where: { id } });

    res.status(200).json({ message: "Success", rest });
  } catch (error) {
    next(error);
  }
};


// Location 

export const getLocationRestaurant = async (
  req: loc,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.verifyUser;
    const user = await Users.findOne({ where: { id: userId } });
    const userLongitude = user?.dataValues.longitude;
    const userLatitude = user?.dataValues.latitude;

    const restaurants = await Restaurant.findAll({
      include: {
        model: Food,
      },
    });

    const ratios = restaurants.map((restaurant) => {
      const distanceToRestoran = Math.sqrt(
        (restaurant.dataValues.longitude - userLongitude) ** 2 +
          (restaurant.dataValues.latitude - userLatitude) ** 2
      );

      return { restaurant: restaurant.dataValues.name, distance: distanceToRestoran };
    });

    ratios.sort((a, b) => a.distance - b.distance);

    const closestRestaurants = ratios.slice(0,3).map((restaurant) => restaurant.restaurant);

    res.status(200).json({ closestRestaurants });
  } catch (error) {
    console.error(error);
    next;
  }
};
