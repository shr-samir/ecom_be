import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
export function getAllUsers(req: Request, res: Response) {
  res.send([]);
}

export function getUserById(req: Request, res: Response) {
  res.send({});
}

export function createUser(req: Request<{}, {}, CreateUserDto>, res: Response) {
   
}
