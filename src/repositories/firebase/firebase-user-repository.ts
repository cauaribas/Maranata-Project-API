import { firestore } from "../../lib/firebase";
import { User } from "../../models/user";
import { UserRepository } from "../user-repository";
import { collection, addDoc, getDoc, doc, query, where, getDocs } from "firebase/firestore"; 

export class FirebaseUserRepository implements UserRepository {
  private collectionRef = collection(firestore, 'users');
  
  async create(data: User): Promise<User> {
    const docRef = await addDoc(this.collectionRef, data);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const q = query(this.collectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async findById(id: string): Promise<User | null> {
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
}

export const userRepository = new FirebaseUserRepository();