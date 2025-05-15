import { ICreateUser, IAuthUser, IAuthVerify } from "../interfaces/user.interface";
import authService from "../services/auth.service";
import { Request, Response } from "express";

export const login = async (req: Request<unknown, unknown, IAuthUser>, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  res.status(200).json(user);
};

export const history = async (req: Request<{ email: string }>, res: Response) => {
  const { email } = req.params;
  const user = await authService.history(email);
  res.status(200).json(user);
};

export const register = async (req: Request<unknown, unknown, ICreateUser>, res: Response) => {
  const requestUser: ICreateUser = req.body;
  const user = await authService.register(requestUser);
  res.status(201).json(user);
};

export const verify = async (req: Request<unknown, unknown, IAuthVerify>, res: Response) => {
  const { auth } = req.body;
  const user = await authService.verify(auth);
  res.status(200).json(user);
};


