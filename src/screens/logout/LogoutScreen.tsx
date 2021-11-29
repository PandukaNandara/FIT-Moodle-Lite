import { useEffect } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

const LogoutScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    authService.logout().then(() => {
      navigate("/login", { replace: true });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
};

export default LogoutScreen;
