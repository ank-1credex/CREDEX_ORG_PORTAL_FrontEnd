import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../authContext/authContext";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Navbar = ({ handleLogout, setEmployeeData, user }) => {
  let context = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEmployeeClick = async (employeeName) => {
    handleMenuClose();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/getManager/allContributionByEmployee`,
        {
          name: employeeName,
        }
      );
      setEmployeeData(response.data.contributiions);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  console.log(context.isLoggedIn);
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
            {user === "manager" && (
              <>
                <Button
                  color="inherit"
                  aria-controls="employee-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  component={Link}
                  to="/managers"
                >
                  All Employees
                </Button>
                <Menu
                  id="employee-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {context.employees.map((employee) => (
                    <MenuItem
                      key={employee.id}
                      onClick={() => handleEmployeeClick(employee.name)}
                    >
                      {employee.name}
                    </MenuItem>
                  ))}
                </Menu>
                <Button color="inherit" component={Link} to="/projectUpload">
                  Create Project
                </Button>
                <Button color="inherit" component={Link} to="/projectlists">
                  View Project
                </Button>
              </>
            )}
            {user === "employee" && (
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

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
