import { FirebaseUserRepository } from "../../repositories/firebase/firebase-user-repository";
import { AuthUserService } from "../auth-user-service";

export function makeAuthUserService(): AuthUserService {
  const userRepository = new FirebaseUserRepository();
  const service = new AuthUserService(userRepository);

  return service;
}