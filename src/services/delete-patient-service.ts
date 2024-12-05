import { PatientRepository } from "../repositories/patient-repository";

export class DeletePatientService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(id: string) {
    const existingPatient = await this.patientRepository.findById(id);
    
    if(!existingPatient) {
      throw new Error('Patient not found');
    }

    await this.patientRepository.delete(id);

  }
}