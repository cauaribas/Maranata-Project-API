import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeletePatientService } from "../../../services/factories/make-delete-patient-service";

export async function deletePatient (request: FastifyRequest, response: FastifyReply) {
  const { id } = request.params as { id: string };

  const userId = (request.user as any)?.userId;

  if (!userId) {
    response.code(401).send({
      message: "UNAUTHORIZED",
    });
  }

  const deletePatientService = makeDeletePatientService();

  try {
    await deletePatientService.execute(id);

    response.code(200).send({ message: "Patient deleted successfully" });
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}