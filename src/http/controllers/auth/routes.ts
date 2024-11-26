import { FastifyInstance } from "fastify";
import { auth } from "./auth-user";
import { refresh } from "./refresh";

export async function AuthRoutes(app: FastifyInstance) {
  app.post('/login', auth);
  app.post('/refresh', refresh);
}