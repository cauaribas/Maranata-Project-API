import { Status } from "../models/patient";
import { FirebasePatientRepository } from "../repositories/firebase/firebase-patient-repository"

export class ChangeStatusService {
  constructor(private patientRepository: FirebasePatientRepository) {}

  async execute(id: string, status: Status) {
    const patient = await this.patientRepository.findById(id);
    
    if(!patient) {
      throw new Error('Patient not found');
    }

    const updatedPatient = await this.patientRepository.changeStatus(id, status);

    return updatedPatient;
  }
}