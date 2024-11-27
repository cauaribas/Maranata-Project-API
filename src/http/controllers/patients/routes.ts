import { FastifyInstance } from "fastify";
import { create } from "./register-patient";
import { verifyJWT } from "../../../http/middlewares/verify-jwt";

export async function PatientRoutes(app: FastifyInstance) {
  app.post("/patients/register", { onRequest: verifyJWT }, create);
}
