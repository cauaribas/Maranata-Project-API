import { FirebasePatientRepository } from "../../repositories/firebase/firebase-patient-repository";
import { ChangeStatusService } from "../change-status-service";

export function makeChangeStatusService() {
  const patientRepository = new FirebasePatientRepository();

  const service = new ChangeStatusService(patientRepository);

  return service;
}
