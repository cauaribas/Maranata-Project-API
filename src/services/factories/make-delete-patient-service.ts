import { FirebasePatientRepository } from "../../repositories/firebase/firebase-patient-repository";
import { DeletePatientService } from "../delete-patient-service";

export function makeDeletePatientService() {
  const patientRepository = new FirebasePatientRepository();

  const service = new DeletePatientService(patientRepository);

  return service;
}
