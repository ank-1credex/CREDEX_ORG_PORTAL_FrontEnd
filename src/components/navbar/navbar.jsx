import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import AuthContext from "../authContext/authContext";
// eslint-disable-next-line react/prop-types
const Navbar = ({ handleLogout }) => {
  let context = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Credex Org Portal
        </Typography>
        {!context.isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/registration">
              Register
            </Button>
          </>
        ) : (
          <>
            {context.currentUser.role === "manager" && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="managers/employees"
                >
                  All Employees
                </Button>
                <Button color="inherit" component={Link} to="/projectUpload">
                  Create Project
                </Button>
                <Button color="inherit" component={Link} to="/projectlists">
                  View Project
                </Button>
              </>
            )}
            {context.currentUser.role === "employee" && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/employee/contribution"
                >
                  AddContribution
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/viewcontributions"
                >
                  ViewContribution
                </Button>
              </>
            )}
            <div>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  {context.currentUser.name}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
