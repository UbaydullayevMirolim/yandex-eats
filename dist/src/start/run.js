"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const relations_model_1 = require("../models/relations.model");
const connections_1 = require("../../config/db/connections");
const config_1 = __importDefault(require("../../config/config"));
const run = async (app) => {
    (0, relations_model_1.relations)();
    await connections_1.sequelize.authenticate({
        logging: false,
    });
    await connections_1.sequelize.sync({
        alter: true,
        logging: false,
    });
    console.log("connect to database ...");
    app.listen(config_1.default.PORT, () => {
        console.log(config_1.default.PORT);
    });
};
exports.run = run;
