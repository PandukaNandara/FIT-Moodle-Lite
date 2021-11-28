import db from "../../config/firebaseConfig";
import {
  addDoc,
  getDoc,
  collection,
  CollectionReference,
  DocumentData,
  onSnapshot,
  doc,
} from "@firebase/firestore";
import CrudService from "../CrudService";
import Subject from "../../models/Subject";

export class SubjectService implements CrudService<Subject> {
  async create(data: Subject): Promise<void> {
    await addDoc(this.getCollection(), data);
  }

  update(id: string, data: Subject): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getOne(id: string): Promise<Subject> {
    const data = await getDoc(doc(this.getCollection(), id));
    return { ...data.data(), id: data.id } as Subject;
  }

  async stream(callback: (data: Subject[]) => void): Promise<void> {
    onSnapshot(this.getCollection(), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      callback(data as Subject[]);
    });
  }
  getCollection(): CollectionReference<DocumentData> {
    return collection(db, "subjects");
  }

  //   create(tutorial: ISubjectData) {
  //     return db.add(tutorial);
  //   }

  //   update(id: string, value: any) {
  //     return db.doc(id).update(value);
  //   }

  //   delete(id: string) {
  //     return db.doc(id).delete();
  //   }
}
