import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { firebaseApp } from "../config/firebaseConfig";
import User from "../models/User";
import { CircularProgress } from "@mui/material";
import { collection, doc, getFirestore } from "@firebase/firestore";

export class UserDetails implements User {
  id?: string | undefined;
  name!: string;
  username!: string;
  password?: string | undefined;

  constructor(id: string, name: string, username: string) {
    this.id = id;
    this.name = name;
    this.username = username;
  }

  getFirestoreReference() {
    return doc(collection(getFirestore(firebaseApp), "users"), this.id);
  }
}

const UserContext = createContext<UserDetails>(undefined as any);

export default UserContext;

export const useUserContext = () => useContext(UserContext);

export const withUserContext = (Component: any) => (props: any) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(getAuth(firebaseApp), (user) => {
      if (!user) {
        navigate("/login", { replace: true });
      } else {
        setCurrentUser(new UserDetails(user.uid, user.displayName!, user.email!));
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <UserContext.Provider value={currentUser as any}>
      <Component {...props} />
    </UserContext.Provider>
  );
};
