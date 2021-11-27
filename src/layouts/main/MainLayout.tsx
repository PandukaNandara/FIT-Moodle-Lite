import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet, useNavigate } from "react-router";
import { useUserContext, withUserContext } from "../../context/UserContext";
import IconButton from "@mui/material/IconButton";
import UserProfileMenu from "../../components/UserProfileMenu";
import { createContext, useContext, useState } from "react";

const AppBarContext = createContext<{ setTitle: (title: string) => void }>(
  undefined as any
);
export const useAppBarContext = () => useContext(AppBarContext);

const MainLayout = () => {
  const currentUser = useUserContext();
  const navigate = useNavigate();
  const [anchorElement, setAnchorElement] = useState<any>();

  const [appBarTitle, setAppBarTitle] = useState("");
  return (
    <>
      <AppBarContext.Provider value={{ setTitle: setAppBarTitle }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                disabled={window.location.pathname === "/"}
                onClick={(e) => navigate("/")}
              >
                <img
                  src="https://img.icons8.com/nolan/40/moodle.png"
                  alt="logo"
                  draggable="false"
                />
              </IconButton>

              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {appBarTitle}
              </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={(e) => setAnchorElement(e.currentTarget)}
              >
                <Avatar
                  alt={currentUser.name}
                  src={`https://avatars.dicebear.com/api/initials/${currentUser.name}.svg`}
                />
              </IconButton>
            </Toolbar>
            <UserProfileMenu
              anchorEl={anchorElement}
              handleClose={() => setAnchorElement(undefined)}
            />
          </AppBar>
          <Toolbar />
          <main className="minus-appbar-height">
            <Outlet />
          </main>
        </Box>
      </AppBarContext.Provider>
    </>
  );
};

export default withUserContext(MainLayout);
