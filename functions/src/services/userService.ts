import { UserRepository } from "../repositories/userRepository";

export async function incrementUserId(userId: string) {
  const userRepository = new UserRepository();
  const querySnapshot = await userRepository.getAllUsers();
  const totalUsers = querySnapshot.size;
  await userRepository.updateUser(userId, { increment_id: totalUsers });
}
