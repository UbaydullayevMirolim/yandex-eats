import { Sequelize } from "sequelize";
import config from "../config";

export const sequelize = new Sequelize(
  `postgres://postgres:mirolim@localhost:5432/yandexeats`
);
