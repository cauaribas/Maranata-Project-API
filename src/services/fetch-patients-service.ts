import { PatientRepository } from "../repositories/patient-repository";
import { Patient, Status } from "../models/patient";

export class FetchPatientsService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(role: string, userId?: string): Promise<Patient[] | null> {
    const patients = await this.patientRepository.findAll(role, userId);
    return patients ?? [];
  }
}
