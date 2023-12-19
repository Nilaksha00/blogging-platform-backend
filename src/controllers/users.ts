import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";

// User signup controller
export const signUp: RequestHandler = async (req, res, next) => {
  const { fullName, email } = req.body;
  const passwordRaw = req.body.password;

  try {
    if (!passwordRaw || !fullName || !email) {
      throw new Error("Missing Parameters");
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) throw new Error("Email already taken");

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      fullName: fullName,
      email: email,
      password: passwordHashed,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// User signin controller
export const signIn: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const passwordRaw = req.body.password;

  try {
    if (!passwordRaw || !email) {
      throw new Error("Missing Parameters");
    }

    const user = await UserModel.findOne({ email: email }).exec();
    if (!user) throw new Error("User Not Found");

    const passwordMatch = await bcrypt.compare(passwordRaw, user.password);
    if (!passwordMatch) throw new Error("Invalid Password");

    // JWT token generation
    const token = jwt.sign(
      { _id: user?._id, email: user?.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: 200,
      user: user,
      message: "User Logged In Successfully",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
