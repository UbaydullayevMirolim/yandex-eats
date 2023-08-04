"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = require("../../config/db/connections");
class Order extends sequelize_1.Model {
    id;
    userId;
    restoranId;
    foodId;
    status;
    balance;
    createdAt;
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "delivered", "delivering", "denied"),
        allowNull: false,
        defaultValue: "pending",
    },
    balance: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "created_at",
    },
}, {
    sequelize: connections_1.sequelize,
    tableName: "orders",
});
exports.default = Order;
