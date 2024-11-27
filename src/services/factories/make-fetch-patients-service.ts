import { FirebasePatientRepository } from "../../repositories/firebase/firebase-patient-repository";
import { FetchPatientsService } from "../fetch-patients-service";

export function makeFetchPatientsService() {
  const patientRepository = new FirebasePatientRepository();

  const service = new FetchPatientsService(patientRepository);

  return service;
}
