import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateUserService } from "../../../services/factories/make-create-user-service";
import { Role } from "../../../models/user";
import { createUserBodySchema } from "../../schemas/user-schema";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const { name, email, password, phone, cpf } = createUserBodySchema.parse(request.body); 

  const createUserService = makeCreateUserService();

  try {
    const user = await createUserService.execute({ name, email, password, phone, cpf, role: Role.USER, createdAt: new Date() });

    response.code(201).send(user);
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}