import { Secret } from "jsonwebtoken";

export interface IConfig {
    PORT: string | number;
    DB_PASSWORD: string;
    SECRET_KEY: Secret;
    PAYMENT_API_KEY: string
}

export interface IFood {
    name: string;
    price: string;
    restaurant_id: Secret;

}
 