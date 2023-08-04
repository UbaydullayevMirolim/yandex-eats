"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = require("../../config/db/connections");
class Users extends sequelize_1.Model {
    id;
    name;
    email;
    password;
    // public role  !: string;
    addres;
    balance;
    isVerify;
    createdAt;
}
Users.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    // role: {
    //   type: DataTypes.ENUM('admin', 'restaurant_admin', 'user'),
    //   allowNull: false,
    //   defaultValue: 'user', // "user" ro'li default qiymat sifatida qo'shildi
    // },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
    },
    is_verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connections_1.sequelize,
    modelName: 'users',
    createdAt: "created_at",
});
// ...
exports.default = Users;
