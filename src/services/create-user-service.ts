import { User } from "../models/user";
import { UserRepository } from "../repositories/user-repository";
import bcrypt from 'bcrypt';

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ password, ...data }: User): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    
    if(existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = await this.userRepository.create({ ...data, password: hashedPassword });

    return user;
  }
}