import { UserRepository } from "../../repositories/userRepository";
import * as admin from "firebase-admin";

interface User {
  name: string;
  increment_id?: number;
}

jest.mock("firebase-admin", () => {
  const mockGet = jest.fn().mockResolvedValue({});
  const mockUpdate = jest.fn();
  const mockAdd = jest.fn().mockResolvedValue({});

  const mockFirestoreCollection = jest.fn().mockReturnValue({
    get: mockGet,
    doc: jest.fn(() => ({ update: mockUpdate })),
    add: mockAdd,
  });

  const mockFirestore = jest.fn().mockReturnValue({
    collection: mockFirestoreCollection,
  });

  return {
    firestore: mockFirestore,
  };
});

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = new UserRepository();
  });

  it("should get all users", async () => {
    await userRepository.getAllUsers();
    expect(admin.firestore().collection).toHaveBeenCalledWith("users");
    expect(admin.firestore().collection("users").get).toHaveBeenCalled();
  });

  it("should update a user", async () => {
    const userId = "someUserId";
    const data: Partial<User> = { name: "Updated Name" };

    await userRepository.updateUser(userId, data);
    expect(admin.firestore().collection("users").doc).toHaveBeenCalledWith(
      userId
    );
    expect(
      admin.firestore().collection("users").doc(userId).update
    ).toHaveBeenCalledWith(data);
  });

  it("should create a user", async () => {
    const userData: User = { name: "John Doe", increment_id: 123 };

    await userRepository.createUser(userData);
    expect(admin.firestore().collection("users").add).toHaveBeenCalledWith(
      userData
    );
  });
});
