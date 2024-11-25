import { FastifyInstance } from "fastify";
import { auth } from "./auth-user";

export async function AuthRoutes(app: FastifyInstance) {
  app.post('/login', auth);
  // app.post('/refresh', refresh);
}