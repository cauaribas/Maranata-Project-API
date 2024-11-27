import { PatientRepository } from "../repositories/patient-repository";
import { Patient, Status } from "../models/patient";

export class RegisterPatientService {
  constructor(private patientRepository: PatientRepository) {}

  async execute(data: Patient): Promise<Patient> {
    const user: Patient = await this.patientRepository.create({
      ...data,
      status: Status.UNDER_REVIEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  }
}
