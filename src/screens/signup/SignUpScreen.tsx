import { Button, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    username: "",
    password: "",
    name: "",
  });
  const onClickLogin = async () => {
    const errorLocal = {
      username:
        username.length === 0
          ? "Required"
          : username.match(/[0-9]{6}[A-z]/)
          ? ""
          : "Invalid Username",
      password: password.length === 0 ? "Required" : "",
      name: name.length === 0 ? "Required" : "",
    };

    setError(errorLocal);
    if (
      errorLocal.username.length ||
      errorLocal.password.length ||
      errorLocal.name.length
    )
      return;

    try {
      await authService.create({
        username,
        password,
        name,
      });
      navigate("/");
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  };

  return (
    <main className="centered">
      <img
        src="https://img.icons8.com/nolan/128/moodle.png"
        alt="logo"
        draggable="false"
      />
      <div className="d-margin">
        <TextField
          className="d-margin"
          label="Name"
          error={Boolean(error.name.length)}
          helperText={error.name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="d-margin">
        <TextField
          label="Username"
          name="username"
          error={Boolean(error.username)}
          helperText={error.username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="d-margin">
        <TextField
          className="d-margin"
          label="Password"
          type="password"
          error={Boolean(error.password.length)}
          helperText={error.password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-margin">
        <Button variant="contained" onClick={onClickLogin}>
          SIGN UP
        </Button>
      </div>
      <div className="d-margin">
        <Button variant="contained" onClick={() => navigate("/signup")}>
          CREATE ACCOUNT
        </Button>
      </div>
    </main>
  );
};

export default SignUpScreen;
