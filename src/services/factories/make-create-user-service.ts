import { FirebaseUserRepository } from "../../repositories/firebase/firebase-user-repository";
import { CreateUserService } from "../create-user-service";

export function makeCreateUserService() {
  const userRepository = new FirebaseUserRepository();

  const service = new CreateUserService(userRepository);

  return service;
}