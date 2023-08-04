"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relations = void 0;
const courier_model_1 = __importDefault(require("./courier.model"));
const order_model_1 = __importDefault(require("./order.model"));
const restaurant_model_1 = __importDefault(require("./restaurant.model"));
const user_model_1 = __importDefault(require("./user.model"));
const food_model_1 = __importDefault(require("./food.model"));
const dostavka_model_1 = __importDefault(require("./dostavka.model"));
const relations = () => {
    // User 
    user_model_1.default.hasMany(order_model_1.default, { foreignKey: "user_id" });
    order_model_1.default.belongsTo(user_model_1.default, { foreignKey: "user_id" });
    // Restoran 
    restaurant_model_1.default.hasMany(food_model_1.default, { foreignKey: "restaurant_id" });
    food_model_1.default.belongsTo(restaurant_model_1.default, { foreignKey: "restaurant_id" });
    restaurant_model_1.default.hasMany(order_model_1.default, { foreignKey: "restaurant_id" });
    order_model_1.default.belongsTo(restaurant_model_1.default, { foreignKey: "restaurant_id" });
    // Food
    food_model_1.default.hasMany(order_model_1.default, { foreignKey: "food_id" });
    order_model_1.default.belongsTo(food_model_1.default, { foreignKey: "food_id" });
    // Courier 
    courier_model_1.default.hasMany(dostavka_model_1.default, { foreignKey: "courier_id" });
    dostavka_model_1.default.belongsTo(courier_model_1.default, { foreignKey: "courier_id" });
    order_model_1.default.hasOne(dostavka_model_1.default, { foreignKey: "order_id" });
    dostavka_model_1.default.belongsTo(order_model_1.default, { foreignKey: "order_id" });
    dostavka_model_1.default.belongsTo(courier_model_1.default, { foreignKey: "courier_id" });
    dostavka_model_1.default.belongsTo(order_model_1.default, { foreignKey: "order_id" });
};
exports.relations = relations;
