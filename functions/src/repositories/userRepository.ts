import * as admin from "firebase-admin";
import { User, AbstractUserRepository } from "../types/userTypes";

export class UserRepository implements AbstractUserRepository {
  private readonly usersCollection = admin.firestore().collection("users");

  async getAllUsers() {
    return await this.usersCollection.get();
  }

  async updateUser(userId: string, data: Partial<User>): Promise<void> {
    await this.usersCollection.doc(userId).update(data);
  }

  async createUser(user: User): Promise<FirebaseFirestore.DocumentReference> {
    return await this.usersCollection.add(user);
  }
}
