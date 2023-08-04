"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relation = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = require("../../config/db/connections");
const food_model_1 = __importDefault(require("./food.model"));
class Restaurant extends sequelize_1.Model {
    id;
    name;
    longtitude;
    openTo;
    closeTo;
    lattitude;
    balance;
    image;
    createdAt;
}
// ...lattitude
Restaurant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lattitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    openTo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    closeTo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    longtitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connections_1.sequelize,
    modelName: 'restaurants',
    createdAt: "created_at",
});
// ...
const relation = () => {
    Restaurant.hasMany(food_model_1.default, {
        foreignKey: {
            name: "restaurant_id",
            allowNull: false,
        }
    }),
        food_model_1.default.belongsTo(Restaurant, {
            foreignKey: {
                name: "restaurant_id",
                allowNull: false,
            }
        });
};
exports.relation = relation;
exports.default = Restaurant;
