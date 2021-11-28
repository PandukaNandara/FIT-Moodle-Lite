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
import RecommendedReading from "../models/RecommendedReading";
import CrudService from "./CrudService";

export default class RecommendedReadingService implements CrudService<RecommendedReading> {
  constructor(public readonly subjectId: string) {}

  getCollection(): CollectionReference<DocumentData> {
    return collection(
      getFirestore(firebaseApp),
      `subjects/${this.subjectId}/recommendedReadings`
    );
  }
  async create(data: RecommendedReading): Promise<void> {
    const collection = this.getCollection();
    await addDoc(collection, data);
  }

  async update(id: string, data: RecommendedReading): Promise<void> {
    const collection = this.getCollection();
    await updateDoc(doc(collection, id), data as any);
  }

  async delete(id: string): Promise<void> {
    const collection = this.getCollection();
    await deleteDoc(doc(collection, id));
  }
  
  async stream(callback: (data: RecommendedReading[]) => void): Promise<void> {
    const collection = this.getCollection();
    onSnapshot(collection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      callback(data as RecommendedReading[]);
    });
  }
}
