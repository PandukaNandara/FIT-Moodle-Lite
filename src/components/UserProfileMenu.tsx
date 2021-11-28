import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

interface UserProfileMenuProps {
  anchorEl?: any;
  handleClose?: () => void;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  anchorEl,
  handleClose,
}) => {
  const currentUser = useUserContext();

  const navigate = useNavigate();

  const goToLogout = () => {
    navigate("/logout");
    if(handleClose) handleClose();
  };

  const goToSettings = () => {
    navigate("/settings");
    if(handleClose) handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>{currentUser.name}</MenuItem>
      <Divider />
      <MenuItem onClick={goToSettings}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={goToLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default UserProfileMenu;
