import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, response: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    response.code(401).send({ message: "Token invalid." });    
  }
}