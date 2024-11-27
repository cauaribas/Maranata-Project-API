import { FastifyReply, FastifyRequest } from "fastify";

import { makeFetchPatientsService } from "../../../services/factories/make-fetch-patients-service";

export async function fetch(request: FastifyRequest, response: FastifyReply) {
  const userId = (request.user as any)?.userId;

  if (!userId) {
    response.code(401).send({
      message: "UNAUTHORIZED",
    });
  }

  const registerPatientService = makeFetchPatientsService();

  try {
    const patients = await registerPatientService.execute(userId);

    response.code(200).send(patients);
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}
