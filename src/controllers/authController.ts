import { Request, Response } from "express";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export const getUsers = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    console.log(email);
    console.log(password);
    const user = await authService.registerUser(name, email, password);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};