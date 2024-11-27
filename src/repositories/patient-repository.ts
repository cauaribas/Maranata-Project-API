import { Patient } from "../models/patient";

export interface PatientRepository {
  create(data: Patient): Promise<Patient>;
  findById(id: string): Promise<Patient | null>;
}
