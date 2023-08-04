"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationRestaurant = exports.getByIdRestaurant = exports.getRestaurant = exports.destroyRestaurant = exports.updateRestaurant = exports.createRestaurant = void 0;
const uuid_1 = require("uuid");
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const food_model_1 = __importDefault(require("../models/food.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Create 
const createRestaurant = async (req, res, next) => {
    try {
        const { name, lattitude, closeTo, longtitude, openTo } = req.body;
        const image = req.files?.image;
        if (!image) {
            return res.status(400).json({ message: "Image not found" });
        }
        const extname = Array.isArray(image)
            ? image[0].mimetype.split("/")[1]
            : image.mimetype.split("/")[1];
        const imageName = `${(0, uuid_1.v4)()}.${extname}`;
        if (Array.isArray(image)) {
            image[0].mv(`${process.cwd()}/uploads/${imageName}`);
        }
        else {
            image.mv(`${process.cwd()}/uploads/${imageName}`);
        }
        await restaurant_model_1.default.create({
            image: imageName,
            name, lattitude, closeTo, longtitude, openTo
        });
        res.status(201).json({ message: "Successfully Created" });
    }
    catch (error) {
        next(error);
    }
};
exports.createRestaurant = createRestaurant;
// Updated
const updateRestaurant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, owner, openTo, closeTo } = req.body;
        await restaurant_model_1.default.update({
            name, owner, openTo, closeTo
        }, { where: { id } });
        res.status(201).json({ message: "Successfully Updated" });
    }
    catch (error) {
        next(error);
    }
};
exports.updateRestaurant = updateRestaurant;
// DELETE
const destroyRestaurant = async (req, res, next) => {
    try {
        const { id } = req.params;
        await restaurant_model_1.default.destroy({ where: { id } });
        res.status(201).json({ message: "Successfully deleted" });
    }
    catch (error) {
        next(error);
    }
};
exports.destroyRestaurant = destroyRestaurant;
const getRestaurant = async (req, res, next) => {
    try {
        const data = await restaurant_model_1.default.findAll({
            include: {
                model: food_model_1.default,
            },
        });
        res.status(200).json({ message: "Success", data });
    }
    catch (error) {
        next(error);
    }
};
exports.getRestaurant = getRestaurant;
const getByIdRestaurant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rest = await restaurant_model_1.default.findOne({ where: { id } });
        res.status(200).json({ message: "Success", rest });
    }
    catch (error) {
        next(error);
    }
};
exports.getByIdRestaurant = getByIdRestaurant;
// Location 
const getLocationRestaurant = async (req, res, next) => {
    try {
        const userId = req.verifyUser;
        const user = await user_model_1.default.findOne({ where: { id: userId } });
        const userLongitude = user?.dataValues.longitude;
        const userLatitude = user?.dataValues.latitude;
        const restaurants = await restaurant_model_1.default.findAll({
            include: {
                model: food_model_1.default,
            },
        });
        const ratios = restaurants.map((restaurant) => {
            const distanceToRestoran = Math.sqrt((restaurant.dataValues.longitude - userLongitude) ** 2 +
                (restaurant.dataValues.latitude - userLatitude) ** 2);
            return { restaurant: restaurant.dataValues.name, distance: distanceToRestoran };
        });
        ratios.sort((a, b) => a.distance - b.distance);
        const closestRestaurants = ratios.slice(0, 3).map((restaurant) => restaurant.restaurant);
        res.status(200).json({ closestRestaurants });
    }
    catch (error) {
        console.error(error);
        next;
    }
};
exports.getLocationRestaurant = getLocationRestaurant;
