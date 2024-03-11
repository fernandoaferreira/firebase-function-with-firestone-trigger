import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../types/userTypes";

export async function createUserController(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const newUser: User = {
      name,
    };

    const userRepository = new UserRepository();
    await userRepository.createUser(newUser);

    res.status(201).json({
      message: `Usuario ${name} criado com sucesso`,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}
