import { User } from "../models/user";
import { UserRepository } from "../repositories/user-repository";

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: User): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    
    if(existingUser) {
      throw new Error('User already exists');
    }

    const user: User = await this.userRepository.create(data);

    return user;
  }
}