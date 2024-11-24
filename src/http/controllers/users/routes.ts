import { FastifyInstance } from "fastify";
import { create } from "./create-user";

export async function UserRoutes(app: FastifyInstance) {
  app.post('/users', create);
}