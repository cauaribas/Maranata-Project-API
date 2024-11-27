import { PatientRepository } from "../repositories/patient-repository";
import { Patient, Status } from "../models/patient";

export class FetchPatientsService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(userId?: string): Promise<Patient[] | null> {
    const patients = await this.patientRepository.findAll(userId);
    return patients ?? [];
  }
}
