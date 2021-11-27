import { AppBar, Avatar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router";
import { useUserContext, withUserContext } from "../../context/UserContext";
import IconButton from "@mui/material/IconButton";

const MainLayout = () => {
  const currentUser = useUserContext();
  return (
    <main>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Subjects
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Avatar
                alt={currentUser.name}
                src={`https://avatars.dicebear.com/api/initials/${currentUser.name}.svg`}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </main>
  );
};

export default withUserContext(MainLayout);
