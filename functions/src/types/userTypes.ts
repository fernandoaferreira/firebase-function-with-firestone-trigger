export interface User {
  name: string;
  increment_id?: number;
}

export interface AbstractUserRepository {
  getAllUsers(): Promise<any>;
  updateUser(userId: string, data: Partial<User>): Promise<void>;
  createUser(user: User): Promise<any>;
}
