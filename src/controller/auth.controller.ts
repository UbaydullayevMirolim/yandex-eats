import {NextFunction, Request, RequestHandler, Response} from "express";
import Users from "../models/user.model";
import { createClient } from "redis";
import {  send } from '../utils/nodemailer';
import { sign } from "../utils/jwt";

 
export const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phoneNumber, address, latitude, longitude } =
      req.body;
    await Users.create({
      name,
      email,
      password,
      phoneNumber,
      address,
      latitude,
      longitude,
    });
    const code: number = Math.floor(100000 + Math.random() * 900000);

    const client = createClient();

    client.on("error", (err: any) => console.log("Redis Client Error", err));

    await client.connect();

    await client.set("code", code);
    await client.set("email", email);

    client.expire("code", 180);
    client.expire("email", 180);
    const mailData = {
      from: "abdulazizkenjaoxunov@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: "That was easy!",
      html: `<b>Hey there whats upp! </b>
        <br>Brat shu sizning maxfiy codingiz: ${code} <br/>`,
    };
    await send(mailData);

    await client.disconnect();

    res.status(201).json({ message: "SMS sent to your Email" });
  } catch (error: any) {
    next(error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction ) => {
  try {
    const { email, password } = req.body;

    const userEmail = await Users.findOne({ where: { email } });
    if (
      userEmail?.dataValues.email !== email &&
      userEmail?.dataValues.password !== password
    ) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const id = userEmail?.dataValues.id;

    const token = sign({ id: id });

    res.status(200).json({ message: "Success", token });
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await Users.findAll();

    res.status(201).json({ users });
  } catch (error: any) {
    next(error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyEmail: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { verifyCode } = req.body;

    const client = createClient();

    client.on("error", (err: any) => console.log("Redis Client Error", err));

    await client.connect();

    const email = await client.get("email");
    const code = await client.get("code");

    if (code != verifyCode) {
      return res.status(403).json({ message: "Invalid code" });
    }

    const user = await Users.findOne({ where: { email } });
    await Users.update(
      { is_verified: true },
      {
        where: {
          email,
        },
      }
    );
    const id = user?.dataValues.id;
    const token = sign({ id: id });

    res.status(200).json({ message: "Success verifyed", token: token });
    await client.disconnect();
  } catch (error) {
    next(error);
  }
};

export const putUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { balance, latitude, longitude } = req.body;
    const { id } = req.params;

    await Users.update({ balance, latitude, longitude }, { where: { id } });

    res.status(203).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

