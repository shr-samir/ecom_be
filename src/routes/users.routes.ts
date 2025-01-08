import { Router } from "express";
import { getAllUsers, getUserById, createUser } from "../handlers/users.handlers";

const router = Router();

// /api/users/
router.get("/", getAllUsers);

// /api/users/:id
router.get("/:id", getUserById);

// create a new user
router.post("/create", createUser);

export default router;
