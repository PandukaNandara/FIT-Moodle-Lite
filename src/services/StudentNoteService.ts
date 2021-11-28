import {
  addDoc,
  doc,
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore";
import { firebaseApp } from "../config/firebaseConfig";
import StudentNote from "../models/StudentNote";
import CrudService from "./CrudService";

export default class StudentNoteService implements CrudService<StudentNote> {
  
  constructor(public readonly subjectId: string) {}

  getCollection(): CollectionReference<DocumentData> {
    return collection(
      getFirestore(firebaseApp),
      `subjects/${this.subjectId}/studentNotes`
    );
  }

  async create(data: StudentNote): Promise<void> {
    const collection = this.getCollection();
    await addDoc(collection, data);
  }

  async update(id: string, data: StudentNote): Promise<void> {
    const collection = this.getCollection();
    await updateDoc(doc(collection, id), data as any);
  }

  async delete(id: string): Promise<void> {
    const collection = this.getCollection();
    await deleteDoc(doc(collection, id));
  }
  
  async stream(callback: (data: StudentNote[]) => void): Promise<void> {
    const collection = this.getCollection();
    onSnapshot(collection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      callback(data as StudentNote[]);
    });
  }
}
