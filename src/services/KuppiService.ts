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
import Kuppi from "../models/Kuppi";
import CrudService from "./CrudService";

export default class KuppiService implements CrudService<Kuppi> {
  constructor(public readonly subjectId: string) {}

  getCollection(): CollectionReference<DocumentData> {
    return collection(
      getFirestore(firebaseApp),
      `subjects/${this.subjectId}/kuppi`
    );
  }
  async create(data: Kuppi): Promise<void> {
    const collection = this.getCollection();
    await addDoc(collection, data);
  }

  async update(id: string, data: Kuppi): Promise<void> {
    const collection = this.getCollection();
    await updateDoc(doc(collection, id), data as any);
  }

  async delete(id: string): Promise<void> {
    const collection = this.getCollection();
    await deleteDoc(doc(collection, id));
  }
  
  async stream(callback: (data: Kuppi[]) => void): Promise<void> {
    const collection = this.getCollection();
    onSnapshot(collection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      callback(data as Kuppi[]);
    });
  }
}
