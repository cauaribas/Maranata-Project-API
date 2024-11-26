import { FastifyReply, FastifyRequest } from "fastify";
import { userRepository } from "../../../repositories/firebase/firebase-user-repository";

export async function refresh(request: FastifyRequest, response: FastifyReply) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response
      .status(401)
      .send({ error: "No Authorization header provided" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return response
      .status(401)
      .send({ error: "Invalid Authorization header format" });
  }

  try {
    const userParams = request.server.jwt.verify(token);

    const { type, userId } = userParams as any;

    const user = await userRepository.findById(userId);

    if (!user) {
      return response.status(404).send({ error: "User not found" });
    }

    const newToken = await response.jwtSign(
      { type, userId },
      { sub: userId, }
    );

    const newRefreshToken = await response.jwtSign(
      { type, userId },
      { sub: userId, expiresIn: "7d", }
    );

    return response
      .setCookie("refreshToken", newRefreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
      .status(200)
      .send({
        name: user?.name,
        token: newToken,
      });
  } catch (error) {
    console.error(error);
    return response.status(401).send({ error: "Invalid or expired token" });
  }
}