import { Patient, Status } from "../../models/patient";
import { firestore } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { PatientRepository } from "../patient-repository";

export class FirebasePatientRepository implements PatientRepository {
  private collectionRef = collection(firestore, "patients");

  async create(data: Patient): Promise<Patient> {
    const docRef = await addDoc(this.collectionRef, data);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as Patient;
  }

  async findById(id: string): Promise<Patient | null> {
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    return { id: docSnap.id, ...docSnap.data() } as Patient;
  }

  async findAll(role: string, userId: string) {
    let patientsQuery;

    if (role === "ADMIN") {
      patientsQuery = query(this.collectionRef, where("status", "==", "UNDER_REVIEW"));
    } else {
      patientsQuery = query(this.collectionRef, where("userId", "==", userId));
    }

    const querySnapshot = await getDocs(patientsQuery);

    const patients: Patient[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Patient[];

    return patients;
  }

  async changeStatus(patientId: string, status: Status) {
    const DocRef = doc(this.collectionRef, patientId);
    await updateDoc(DocRef, { status });
  }

  async delete(patientId: string) {
    const DocRef = doc(this.collectionRef, patientId);
    await deleteDoc(DocRef);
  }
}
