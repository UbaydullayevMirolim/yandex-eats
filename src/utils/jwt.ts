import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config/config";

const SECRET_KEY: Secret = config.SECRET_KEY;

export const verify = (payload: any ) =>
  jwt.verify(payload, SECRET_KEY) ;

export const sign = (payload: any) => jwt.sign(payload, SECRET_KEY,  { expiresIn: "48h" });
