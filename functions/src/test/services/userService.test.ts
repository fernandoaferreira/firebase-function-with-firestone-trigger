import { incrementUserId } from "../../services/userService";
import { UserRepository } from "../../repositories/userRepository";

jest.mock("../../repositories/userRepository");

describe("incrementUserId function", () => {
  it("should increment user id correctly", async () => {
    const mockGetAllUsers = jest.fn().mockResolvedValue({ size: 5 });
    const mockUpdateUser = jest.fn();
    UserRepository.prototype.getAllUsers = mockGetAllUsers;
    UserRepository.prototype.updateUser = mockUpdateUser;

    await incrementUserId("someUserId");

    expect(mockGetAllUsers).toHaveBeenCalled();
    expect(mockUpdateUser).toHaveBeenCalledWith("someUserId", {
      increment_id: 5,
    });
  });
});
