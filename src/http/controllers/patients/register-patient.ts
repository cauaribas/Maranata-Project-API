import { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterPatientService } from "../../../services/factories/make-register-patient-service";
import { registerPatientBodySchema } from "../../../http/schemas/patient-schema";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const {
    name,
    age,
    city,
    description,
    isHomeless,
    referredBy,
    substances,
    usageDuration,
  } = registerPatientBodySchema.parse(request.body);

  const userId = (request.user as any)?.userId;

  if (!userId) {
    response.code(401).send({
      message: "UNAUTHORIZED",
    });
  }

  const registerPatientService = makeRegisterPatientService();

  try {
    const patient = await registerPatientService.execute({
      name,
      age,
      city,
      description,
      isHomeless,
      referredBy,
      substances,
      usageDuration,
      userId,
    });

    response.code(201).send(patient);
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}
