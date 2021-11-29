import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { firebaseApp } from "../config/firebaseConfig";
import ReminderModel from "../models/Reminder";
import CrudService from "./CrudService";
import db from "../config/firebaseConfig";

export default class ReminderService implements CrudService<ReminderModel> {
  documentId: string;

  constructor(id: string) {
    this.documentId = id;
  }
  async create(data: ReminderModel): Promise<void> {
    const reminderRef = this.getCollection();
    await setDoc(doc(reminderRef), data);
  }

  async update(id: string, data: ReminderModel): Promise<void> {
    try {
      const reminderRef = this.getCollection();
      await updateDoc(doc(reminderRef, id), data as any);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.getCollection(), id));
    } catch (e) {
      console.log(e);
    }
  }

  async stream(callback: (data: ReminderModel[]) => void): Promise<void> {
    try {
      onSnapshot(
        collection(db, `/subjects/${this.documentId}/reminders`),
        (querySnapshot) => {
          const reminders: ReminderModel[] = [];
          querySnapshot.docChanges().forEach((document) => {
            // document.doc.data().id = document.doc.id;
            // console.log(document.doc.id);
            const data = document.doc.data();
            reminders.push({
              ...(data as ReminderModel),
              id: document.doc.id,
              expireDate: data.expireDate && new Date((data.expireDate.seconds as any) * 1000),
            });
          });
          callback(reminders);
        }
      );
    } catch (e) {
      console.log("error", e);
    }
  }

  getCollection(): CollectionReference<DocumentData> {
    return collection(
      getFirestore(firebaseApp),
      `subjects/${this.documentId}/reminders`
    );
  }
}
