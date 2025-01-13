import { Request, Response } from "express";
import { SALT_ROUNDS } from "../constants";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";

const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string);
};

// Route for user registration
const userRegister = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });
    // check if user exists
    if (userExists)
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    //validate
    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json({ success: false, message: "Provide a strong password" });

    // hashing password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id as string);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
});

// Route for user login
const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // check if user is available
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = createToken(user._id as string);
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.name}`,
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// Route for admin login
const adminLogin = async (req: Request, res: Response) => {};

export { userRegister, userLogin, adminLogin };
