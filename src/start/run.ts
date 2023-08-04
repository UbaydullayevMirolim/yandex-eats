import { relations } from "../models/relations.model";
import { Application } from "express";
import { sequelize } from '../../config/db/connections';
import config from "../../config/config";

export  const run = async (app: Application) => {
  relations();
  await sequelize.authenticate({
    logging: false,
  });
  await sequelize.sync({
    alter: true,
    logging: false,
  });
  console.log("connect to database ...");
  app.listen(config.PORT , () => {
    console.log(config.PORT);
  });
};
