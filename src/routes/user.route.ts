import { Router } from "express";
import {
  getAllUsers,
  getUserById,
} from "../handlers/user.handler";
import {
  adminLogin,
  userLogin,
  userRegister,
} from "../controllers/user.controller";
import asyncHandler from "../utils/asyncHandler";

const userRouter = Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", asyncHandler(userLogin) );
userRouter.post("/admin", adminLogin);

// /api/users/
// userRouter.get("/", getAllUsers);

// /api/users/:id
// userRouter.get("/:id", getUserById);

// create a new user

export default userRouter;
