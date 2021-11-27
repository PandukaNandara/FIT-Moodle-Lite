import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { firebaseApp } from "../config/firebaseConfig";
import User from "../models/User";
import { CircularProgress } from "@mui/material";

const UserContext = createContext<User>(undefined as any);

export default UserContext;

export const useUserContext = () => useContext(UserContext);

export const withUserContext = (Component: any) => (props: any) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(getAuth(firebaseApp), (user) => {
      if (!user) {
        navigate("/login", { replace: true });
      } else {
        setCurrentUser({ name: user.displayName!, username: user.email! });
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
