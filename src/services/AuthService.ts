import { firebaseApp } from "../config/firebaseConfig";
import User from "../models/User";
import CrudService from "./CrudService";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

export default class AuthService implements CrudService<User> {
  async create({ username, name, password }: User): Promise<void> {
    username = username.toLowerCase().trim();
    const email = `${username}@uom.lk`; // Username is always like 181223a@uom.lk

    const createdUser = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password!
    );
    await updateProfile(createdUser.user, { displayName: name });
    const collection = this.getCollection();
    setDoc(doc(collection, createdUser.user.uid), {
      username,
      name,
    } as User);
  }

  private auth = getAuth(firebaseApp);

  update(id: string, data: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  stream(callback: (data: User[]) => void): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getCollection(): CollectionReference<DocumentData> {
    return collection(getFirestore(firebaseApp), "users");
  }

  async login(username: string, password: string): Promise<void> {
    username = username.toLowerCase().trim();
    const email = `${username}@uom.lk`; // Username is always like 181223a@uom.lk

    await signInWithEmailAndPassword(this.auth, email, password);
  }
}
