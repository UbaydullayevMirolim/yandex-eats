"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("./user.route");
const admin_route_1 = require("./admin.route");
const courier_route_1 = require("./courier.route");
const dostavka_route_1 = require("./dostavka.route");
const food_route_1 = require("./food.route");
const order_route_1 = require("./order.route");
const restaurant_route_1 = require("./restaurant.route");
const payments_rute_1 = require("./payments.rute");
exports.default = [
    user_route_1.router,
    admin_route_1.router,
    courier_route_1.router,
    dostavka_route_1.router,
    food_route_1.router,
    order_route_1.router,
    restaurant_route_1.router,
    payments_rute_1.router,
];
