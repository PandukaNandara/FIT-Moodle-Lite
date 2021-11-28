import { firebaseApp } from "../config/firebaseConfig";
import UserModel from "../models/User";
import CrudService from "./CrudService";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default class AuthService implements CrudService<UserModel> {
  async create({ username, name, password }: UserModel): Promise<void> {
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
    } as UserModel);
  }

  private auth = getAuth(firebaseApp);

  async update(id: string, data: UserModel): Promise<void> {
    const collection = this.getCollection();
    await updateDoc(doc(collection, id), data as any);
    await updateProfile(this.auth.currentUser!, {
        displayName: data.name,
    });
    await this.auth.currentUser?.reload();
  }

  async delete(id: string): Promise<void> {
    const collection = this.getCollection();
    await deleteDoc(doc(collection, id));
    await this.auth.currentUser?.delete();
  }

  stream(callback: (data: UserModel[]) => void): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const credential = EmailAuthProvider.credential(
      this.auth.currentUser!.email!,
      oldPassword
    );
    await reauthenticateWithCredential(this.auth.currentUser!, credential);
    await updatePassword(this.auth.currentUser!, newPassword);
  }

  getCollection(): CollectionReference<DocumentData> {
    return collection(getFirestore(firebaseApp), "users");
  }

  async login(username: string, password: string): Promise<void> {
    username = username.toLowerCase().trim();
    const email = `${username}@uom.lk`; // Username is always like 181223a@uom.lk

    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    await signOut(this.auth);
  }
}
