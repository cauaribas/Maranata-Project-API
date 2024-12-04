import { Patient, Status } from "../models/patient";

export interface PatientRepository {
  create(data: Patient): Promise<Patient>;
  findById(id: string): Promise<Patient | null>;
  findAll(userId?: string): Promise<Patient[] | null>;
  changeStatus(id: string, status: Status): Promise<void>;
}
