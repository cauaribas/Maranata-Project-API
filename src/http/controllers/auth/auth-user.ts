import { FastifyReply, FastifyRequest } from "fastify";
import { makeAuthUserService } from "../../../services/factories/make-auth-user-service";

export async function auth(request: FastifyRequest, response: FastifyReply) {
  const { email, password }: any = request.body;

  const authUserService = makeAuthUserService();

  try {
    const { user } = await authUserService.execute({ email, password });

    const token = await response.jwtSign(
      {
        type: user.role,
        userId: user.id,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '1h',
        },
      },
    );

    const refreshToken = await response.jwtSign(
      {
        type: user.role,
        userId: user.id,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    );

    return response
      .setCookie('refreshToken', refreshToken, { httpOnly: true })
      .send({ token });
  } catch (error) {
    console.error(error);
    throw new Error("Email or Password invalid.");
  }
}