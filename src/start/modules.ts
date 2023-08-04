import express, { Application } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

import routes from "../routes";
import { errorHandler } from "../middlewares/error-handler";

export   const modules = async (app: Application) => {
  app.use(express.json());
  app.use(fileUpload());
  app.use(
    cors()
  );

  app.use(express.static(process.cwd() + "/uploads"));

  app.use(routes);
  app.use(errorHandler);
};
