import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

const LogoutScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    authService.logout().then(() => {
      navigate("/login", { replace: true });
    }); 
  }, []);

  return <div></div>;
};

export default LogoutScreen;
