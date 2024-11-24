import { User } from "../models/user";

export interface UserRepository {
  create(data: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}