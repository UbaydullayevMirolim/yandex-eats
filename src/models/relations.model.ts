import Courier from "./courier.model";
import Order from "./order.model";
import Restaurant from "./restaurant.model";
import User from "./user.model";
import Food from "./food.model";
import Dostavka from "./dostavka.model";

export const relations = () => {
  // User 
  User.hasMany(Order, { foreignKey: "user_id" });
  Order.belongsTo(User, { foreignKey: "user_id" });

  // Restoran 
  Restaurant.hasMany(Food, { foreignKey: "restaurant_id" });
  Food.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

  Restaurant.hasMany(Order, { foreignKey: "restaurant_id" });
  Order.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

  // Food
  Food.hasMany(Order, { foreignKey: "food_id" });
  Order.belongsTo(Food, { foreignKey: "food_id" });

  // Courier 
  Courier.hasMany(Dostavka, { foreignKey: "courier_id" });
  Dostavka.belongsTo(Courier, { foreignKey: "courier_id" });
  Order.hasOne(Dostavka, { foreignKey: "order_id" });
  Dostavka.belongsTo(Order, { foreignKey: "order_id" });
  Dostavka.belongsTo(Courier, { foreignKey: "courier_id" });
  Dostavka.belongsTo(Order, { foreignKey: "order_id" });
};
