import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import YesNoDialog from "../../components/dialog/YesNoDialog";
import { useUserContext } from "../../context/UserContext";
import { useAppBarContext } from "../../layouts/main/MainLayout";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

const AccountSettingsScreen = () => {
  const navigate = useNavigate();
  const appBarContext = useAppBarContext();

  const currentUser = useUserContext();
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
  useEffect(() => {
    appBarContext.setTitle("Settings");
    setName(currentUser.name);
  }, []);

  const updateAccountDetails = async () => {
    await authService.update(currentUser.id!, {
      name: name,
    } as any);
    alert("Updated!");
  };

  const updatePassword = async () => {
    try {
      const passwordErrorLocal = {
        oldPassword: !Boolean(oldPassword) ? "Required" : undefined,
        newPassword: !Boolean(newPassword) ? "Required" : undefined,
      }
      setPasswordError(passwordErrorLocal as any);
      if (passwordErrorLocal.oldPassword || passwordErrorLocal.newPassword) return;
      
      await authService.changePassword(oldPassword, newPassword);
      alert("Updated!");
    } catch (e) {
      const error = e as Error;
      console.error(e);
      alert(error.message);
    }
  };

  const deleteAccount = async () => {
    await authService.delete(currentUser.id!);
    navigate("/login");
  };

  return (
    <div className="d-padding">
      <Box className="settings-section">
        <Typography variant="h6" className="item">
          Update Account Details
        </Typography>
        <div>
          <TextField
            label="Name"
            className="item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            className="item"
            onClick={updateAccountDetails}
          >
            UPDATE
          </Button>
        </div>
      </Box>

      <Box className="settings-section">
        <Typography variant="h6" className="item">
          Change Password
        </Typography>
        <div>
          <TextField
            label="Current Password"
            className="item"
            value={oldPassword}
            error={Boolean(passwordError.oldPassword)}
            helperText={passwordError.oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <br />
          <TextField
            label="New Password"
            className="item"
            value={newPassword}
            error={Boolean(passwordError.newPassword)}
            helperText={passwordError.newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <Button variant="contained" className="item" onClick={updatePassword}>
            UPDATE
          </Button>
        </div>
      </Box>
      <Box className="settings-section">
        <Typography variant="h6" className="item">
          Danger Zone
        </Typography>
        <Button
          color="error"
          variant="contained"
          className="item"
          onClick={() => setDeleteAccountDialogOpen(true)}
        >
          DELETE MY ACCOUNT
        </Button>
      </Box>
      <YesNoDialog
        open={deleteAccountDialogOpen}
        onClose={() => setDeleteAccountDialogOpen(false)}
        onSubmit={deleteAccount}
        title="Warning"
        content="Do you want to delete your account? This action cannot be undone."
        buttonColor="error"
      />
    </div>
  );
};

export default AccountSettingsScreen;
