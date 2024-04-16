import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserDialog from "../components/UserDialog";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users list
          </Typography>
          <UserDialog type="create">
            <Typography
              color="white"
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Create user
            </Typography>
          </UserDialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
