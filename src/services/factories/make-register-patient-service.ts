import { FirebasePatientRepository } from "../../repositories/firebase/firebase-patient-repository";
import { RegisterPatientService } from "../register-patient-service";

export function makeRegisterPatientService() {
  const patientRepository = new FirebasePatientRepository();

  const service = new RegisterPatientService(patientRepository);

  return service;
}
