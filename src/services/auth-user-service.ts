import { User } from "../models/user";
import { UserRepository } from "../repositories/user-repository";
import bcrypt from "bcrypt";

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
}

export class AuthUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: AuthRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email invalid.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Password invalid.");
    }

    return { user };
  }
}