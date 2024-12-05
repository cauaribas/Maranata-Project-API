import { FastifyRequest, FastifyReply } from "fastify";
import { makeChangeStatusService } from "../../../services/factories/make-change-status-service";
import { Status } from "../../../models/patient";
import { changePatientStatusBodySchema } from "../../schemas/patient-schema";

export async function changeStatus (request: FastifyRequest, response: FastifyReply) {
  const { id } = request.params as { id: string };
  
  const { status } = changePatientStatusBodySchema.parse(request.body);

  const userId = (request.user as any)?.userId;

  if (!userId) {
    response.code(401).send({
      message: "UNAUTHORIZED",
    });
  }

  const changeStatusService = makeChangeStatusService();

  try {
    const patient = await changeStatusService.execute(id as string, status as Status);

    response.code(200).send({ message: "Status changed successfully" });
  } catch (error) {
    response.code(500).send({ message: error.message });
  }
}