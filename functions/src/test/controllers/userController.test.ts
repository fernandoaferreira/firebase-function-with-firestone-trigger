import { Request, Response } from "express";
import { UserRepository } from "../../repositories/userRepository";
import { createUserController } from "../../controllers/userController";

jest.mock("../../repositories/userRepository");

describe("createUserController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        name: "Test User",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new user successfully", async () => {
    const mockCreateUser = jest.fn();
    // @ts-ignore: mocked UserRepository
    UserRepository.mockImplementation(() => ({
      createUser: mockCreateUser.mockResolvedValue(undefined),
    }));

    await createUserController(req as Request, res as Response);

    expect(mockCreateUser).toHaveBeenCalledWith({
      name: "Test User",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario Test User criado com sucesso",
    });
  });

  it("should handle errors while creating a user", async () => {
    const mockError = new Error("Test Error");
    const mockCreateUser = jest.fn().mockRejectedValue(mockError);
    // @ts-ignore: mocked UserRepository
    UserRepository.mockImplementation(() => ({
      createUser: mockCreateUser,
    }));

    await createUserController(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar usuário" });
  });
});
